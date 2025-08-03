import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Ratelimited from '../components/Ratelimited';
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/");
        console.log("API Response:", response.data);

        // Handle both cases: array or object with `notes` key
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.notes || [];

        setNotes(data);
      } catch (error) {
        console.log("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Error fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <Ratelimited />}

      <h1 className="text-3xl font-bold mb-4">Notes</h1>

      <div className="p-6">
        {loading && <p>Loading...</p>}

        {!isRateLimited && notes.length > 0 && (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))
        )}

        {!loading && notes.length === 0 && !isRateLimited && (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
