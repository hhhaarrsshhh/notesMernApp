import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import CreatePage from './pages/CreatePage.jsx'
//import { toast } from 'react-hot-toast'
const App = () => {
        //<button  onClick={()=>toast.success("congratulation")}>Click me</button>

  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createPage" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />

      </Routes>

    </div>
  )
}

export default App
