import mongoose from "mongoose";

const Schema = new mongoose.Schema({

    title:{
        type:String,
        required:true

    },
    content:{
        type:String,
        required:true
    },





},{timestamps:true});
const Note = mongoose.model("Note",Schema)
export default Note;