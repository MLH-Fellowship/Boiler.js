const router = require("express").Router();
const get_git_repo = require("../../backend-local/download_files");
let Boiler = require("../models/boilers.models");
const path = require("path");
const os = require("os");

// connecting to db, init. gridstorage and creating a storage
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
  const { type, name, directions, repo, description } = req.body;

  const commands = req.body.commands.split(',');

  const newBoiler = new Boiler({
    type,
    image: "",
    name,
    directions,
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

// GET existing boiler
router.route("/:id").get((req, res) => {
  Boiler.findById(req.params.id)
    .then((boiler) => res.json(boiler))
    .catch((err) => res.status(400).json("error: " + err));
});

// DELETE existing boiler
router.route("/:id").delete((req, res) => {
  Boiler.findById(req.params.id)
    .then(() => res.json("boiler deleted!"))
    .catch((err) => res.status(400).json("error: " + err));
});

/* DB QUERY ROUTES */
// GET exisitng boiler
router.route("/query/:input/").get((req, res) => {
  const query = req.params.input;
  if (query === "") {
    Boiler.find()
      .then((boilers) => res.json(boilers))
      .catch((err) => res.status(400).json("error: " + err));
  } else {
    Boiler.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
      .then((boiler) => res.json(boiler))
      .catch((err) => res.status(400).json("error: " + err));
  }
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
        return res.status(404).json({ err: "no files exist" });
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
  // Compute path for a boiler.
  const boilerPath = path.join(os.homedir(), "Boilers");
  // Make a request to the database.
  let id = req.params.id;
  Boiler.findById(req.params.id)
  // Process the document via get_git_repo.
    .then(async (res) => await get_git_repo.get(res.repo, boilerPath, res.commands))
    // Process the response on success/failure and return the response to the caller.
    .then(({ message, success, code, path, commands }) => {
      if (success == true) {
        response = {
          success: true,
          message: message,
          id: id,
          path: path,
          commands: commands,
        };
        console.log(response);
        res.send(response);
      } else if (code == 128) {
        response = {
          success: false,
          message: `That boiler already exists. Check "${boilerPath}"!`,
          id: id,
          path: path,
          commands: commands,
        };
        console.log(response);
        res.send(response);
      } else {
        res.send({
          success: false,
          message: `Unknown error with code ${code}.`,
        });
      }
    })
    // I don't think this ever comes to pass.
    .catch((e) => console.log(e));
});

// Runs commands
router.get("/setup/:id/:command/:folder", (req, res) => {
    // Compute path for a boiler.
    // const boilerPath = path.join(os.homedir(), "Boilers");
    console.log("Running right");
    console.log("Command", req.params.command);
    console.log("Path", req.params.folder)
    fullPath = req.params.folder;
    console.log("Test");
    let store = [req.params.command, req.params.folder];

    Boiler.findById(req.params.id)
    .then(async (res) => await get_git_repo.command(store[1], res.commands, store[0]))
      .then(({ message, success, code }) => {
        if (success == true) {
          response = {
            success: true,
            message: message,
          };
          console.log("Run!", response);
          res.send(response);
        } else if (code == 128) {
          response = {
            success: false,
            message: `That boiler already exists. Check ${boilerPath}!`,
          };
          console.log(response);
          res.send(response);
        } else {
          res.send({
            success: false,
            message: `Unknown error with code ${code}.`,
          });
        }
      })
      // I don't think this ever comes to pass.
      .catch((e) => console.log(e));
  });

module.exports = router;
