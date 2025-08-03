import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils.js';
import { toast } from 'react-hot-toast'; // assuming you use toast
import api from '../lib/axios.js'; // make sure this is imported if you're using axios instance

const NoteCard = ({ note,setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter(note => note._id !== id));
      toast.success("Note deleted successfully");
      // Optional: trigger state update in parent via props callback
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note");
    }
  };

  return (
    <div className="border p-4 mb-4 rounded shadow-sm bg-white">
      {/* Main clickable area */}
      <Link to={`/note/${note._id}`} className="block mb-3">
        <h2 className="text-xl font-semibold mb-1">{note.title}</h2>
        <p className="text-gray-700">{note.content}</p>
      </Link>

      {/* Created date */}
      <div className="text-sm text-gray-500 mb-3">
        {formatDate(new Date(note.createdAt))}
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-4">
        <PenSquareIcon className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-500" />
        <button
          className="flex items-center text-red-500 hover:text-red-700 cursor-pointer"
          onClick={(e) => handleDelete(e, note._id)}
        >
          <Trash2Icon className="w-6 h-6 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
