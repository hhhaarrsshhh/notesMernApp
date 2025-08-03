import express from 'express';
import { createNote, getAllNotes , updateNote, deleteNote,getNoteById} from '../Controllers/notesControllers.js';

const router = express.Router();

router.get('/',getAllNotes);
router.get('/:id',getNoteById);
router.post('/sth2',createNote);
router.put('/:id',updateNote);
router.delete('/:id', deleteNote);

export default router;