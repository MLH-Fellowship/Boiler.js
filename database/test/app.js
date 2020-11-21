const mongoose = require('mongoose')

const url = `mongodb+srv://hi:hi@ranger.lay9i.mongodb.net/firstCollection?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
};

// Connect to Mongoose
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

// Connect to database
const Schema = mongoose.Schema
const BookSchema = new Schema({
name : String
})

const Model = mongoose.model
const Book = Model('Books',BookSchema)

const NodeJsGuide = new Book({name : 'NodeJS : A Guide' })

NodeJsGuide.save((err,result)=>{
    if(err) console.log(err)
    console.log(result);
})