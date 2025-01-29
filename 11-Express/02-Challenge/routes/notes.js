import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import winston from 'winston';
import Joi from 'joi';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../Develop/db.json');

// Configure winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Middleware to read notes from the file
const readNotes = (callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      logger.error('Failed to read notes', { error: err });
      return callback(err);
    }
    callback(null, JSON.parse(data));
  });
};

// Middleware to write notes to the file
const writeNotes = (notes, callback) => {
  fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      logger.error('Failed to write notes', { error: err });
      return callback(err);
    }
    callback(null);
  });
};

// Note validation schema
const noteSchema = Joi.object({
  title: Joi.string().min(1).required(),
  text: Joi.string().min(1).required(),
});

// Get all notes
router.get('/', (req, res) => {
  readNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    res.json(notes);
  });
});

// Create a new note
router.post('/', (req, res) => {
  const { error } = noteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newNote = { id: uuidv4(), ...req.body };

  readNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes' });
    }

    notes.push(newNote);

    writeNotes(notes, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save note' });
      }
      res.json(newNote);
    });
  });
});

// Update an existing note
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { error } = noteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  readNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes' });
    }

    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    notes[noteIndex] = { id, ...req.body };

    writeNotes(notes, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update note' });
      }
      res.json(notes[noteIndex]);
    });
  });
});

// Delete a note
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  readNotes((err, notes) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read notes' });
    }

    const newNotes = notes.filter(note => note.id !== id);

    writeNotes(newNotes, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete note' });
      }
      res.json({ message: 'Note deleted successfully' });
    });
  });
});

export default router;