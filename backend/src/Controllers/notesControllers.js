 import Note from "../models/models.js"; // Ensure this import exists
 const getAllNotes = async (_, res) => {// Using underscore for unused parameter req in (req,res)
    try{
        const notes = await Note.find().sort({created:-1}); //sort by newest entry
        res.status(200).json(notes)

    }
    catch(error){
        console.log("error in getAllNotes controller",error)
        res.status(500).json({message:"internal server error",error})

    }
};

const getNoteById = async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(note);

    }


    catch(error){

    }
}





const createNote = async (req, res) => {
   try
   { const {title,content}= req.body;
    const newNote =new Note({
        title,
        content
    })
    await newNote.save();
    res.status(201).json({message:"Note created successfully",note:newNote});
}
catch(error){
    res.status(500).json({message:"Internal server error",error})
}
}


const updateNote = async (req, res) => {
    try{
        const{title,content}=req.body;
       const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content})
        res.status(200).json({message:"Note updated sucessfully"})
        if(!updatedNote){
            return res.status(404).json({message:"Note not found"});
        }

    }

    catch(error){
        res.status(500).json({message:"Internal server error",error})
    }

};

const deleteNote = async(req, res) => {
  try{  const deleteNote =  await Note.findByIdAndDelete(req.params.id);
    if(!deleteNote){
        return res.status(404).json({message:"Note not found"});
    }
    res.status(200).json({message:"Note deleted successfully"});
}
catch(error){
    res.status(500).json({message:"Internal server error",error})
}
}
export { getAllNotes, createNote, updateNote, deleteNote, getNoteById };

