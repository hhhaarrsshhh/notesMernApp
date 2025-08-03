import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import axios from 'axios';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit= async (e) => {
    e.preventDefault();
  //  if(!title || !content){
     // alert("Please fill in all fields");
    //  return;
  //  }
    setLoading(true);

    try{
      await api.post("/notes",{
        title,
        content
      })
      toast.success("Note created successfully");
      navigate("/");
      setTitle('');
      setContent('');
    }

    catch(error) {
      console.error("Error creating note:", error);
      if (error.response?.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.",{
          duration: 5000,
          icon: "🚫",
        });
      } else {
        toast.error("An error occurred while creating the note.");
      }
    }

    finally{
      setLoading(false);
      
    }


  }
  return (
    <div>
      <div>
        <Link to={"/"} className="text-blue-500 hover:underline">
        <ArrowLeftIcon/>
          Back to Home
        </Link>
      </div>
      <div><h1 className='font-bold'>Create New Note</h1></div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 pl-4'>
        <label className="mb-4">title</label>
        <input type="text" placeholder='type title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <label className="mb-4">content</label>

        <input type="text" placeholder='type content' value={content} onChange={(e)=>setContent(e.target.value)}/>
      <button type='submit' className='btn btn-primary' disabled={loading} >{loading?"Creating note....":"Create note"}</button>
      </form>

    </div>
  )
}

export default CreatePage
