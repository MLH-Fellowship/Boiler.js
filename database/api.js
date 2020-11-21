const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uri = `mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/testBoiler?retryWrites=true&w=majority`;
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
};

// Connection & Schema Code
async function connect(uri, connectionParams){
    // Connect to Mongoose
    mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ');
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
};

// Get Document for Backend
let back = async function getBackend(docName, boilSchema){
    
    try {
        await connect(uri, connectionParams);
        const back = await mongoose.model('uploadTest', boilSchema);
        const files = await back.find({name: docName});
        console.log(files);
        return files;
    } finally {
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
        });
    }
}

let front = async function getFrontend(boilSchema){
    try {
        await connect(uri, connectionParams);
        const back = await mongoose.model('uploadTest', boilSchema);
        const files = await back.find();
        console.log(files);
        return files;
    } finally {
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
        });
    }
}    

// Upload new files
let upload = async function(params, boilSchema){
    try {
        // Connect to Mongoose
        main(params, boilSchema);
        
        } finally {
            mongoose.connection.close(function(){
                console.log("Mongoose default connection is disconnected due to application termination");
            });
        }
}

function main(params, boilSchema) {
    connect(uri, connectionParams);
    console.log("Run");

    const Model = mongoose.model
    const boilerSchema = Model(params.colName, boilSchema);
    
    const boiler = new boilerSchema({
        image: params.image,
        name: params.name,
        directions: params.directions,
        repo: params.repo,
        commands: params.commands
    })
    
    boiler.save();
    console.log('New Boiler saved');
};

module.exports = {
    back: back,
    front: front,
    upload: upload
}