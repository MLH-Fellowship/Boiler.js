const router = require("express").Router();
const get_git_repo = require("../../backend-local/download_files");
let Boiler = require("../models/boilers.models");
const path = require('path');
const os = require('os');

//connecting to db, init. gridstorage and creating a storage
const multer = require("multer");
const crypto = require("crypto");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");

var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

// .env
require("dotenv").config();
const uri = process.env.ATLAS_URI;

// connection
const conn = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads", // name of the bucket
  });
});

// init storage
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage: storage });

/* BOILER ROUTES */

// GET all boilers
router.route("/").get((req, res) => {
  Boiler.find()
    .then((boilers) => res.json(boilers))
    .catch((err) => res.status(400).json("error: " + err));
});

// POST add new boiler
router.route("/").post((req, res) => {
  const { type, name, directions, repo, commands } = req.body;
  const newBoiler = new Boiler({
    type,
    image: "",
    name,
    directions,
    type,
    repo,
    commands,
    description,
    files: [],
  });

  newBoiler
    .save()
    .then((boiler) => res.json(boiler._id))
    .catch((err) => res.status(400).json("error: " + err));
});

// GET exisitng boiler
router.route("/:id").get((req, res) => {
  Boiler.findById(req.params.id)
    .then((boiler) => res.json(boiler))
    .catch((err) => res.status(400).json("error: " + err));
});

// DELETE exisitng boiler
router.route("/:id").delete((req, res) => {
  Boiler.findById(req.params.id)
    .then(() => res.json("boiler deleted!"))
    .catch((err) => res.status(400).json("error: " + err));
});

/* FILES AND BOILER ROUTES */

// POST add a image to a boiler
router.post("/:id/image", upload.array("image", 1), (req, res) => {
  if (req.files[0].id === undefined) {
    return res.status(400).json("error: ", req);
  }
  Boiler.findById(req.params.id).then((boiler) => {
    boiler.image = req.files[0].id;

    boiler
      .save()
      .then((boiler) => res.json(boiler))
      .catch((err) => res.status(400).json(err));
  });
});

/* STANDARD FILE ROUTES */

// GET a document by id
router.get("/:id", (req, res) => {
  gfs
    .find({
      _id: mongoose.Types.ObjectId(req.params.id),
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStream(mongoose.Types.ObjectId(req.params.id)).pipe(res);
    });
});

// POST delete a document by id
router.post("/delete/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    res.json("document deleted");
  });
});

router.get("/deploy/:id", (req, res) => {
  const boilerPath = path.join(os.homedir(), 'Boilers')
  Boiler.findById(req.params.id)
  .then(res => get_git_repo(res, boilerPath))
 // .then(res => get_git_repo.get_repo(res.repo, boilerPath))
 // .then(res => console.log("Log" + res))
 // .then(res => get_git_repo.run(boilerPath, res.commands))
  .catch(e => console.log(e));
});

module.exports = router;
