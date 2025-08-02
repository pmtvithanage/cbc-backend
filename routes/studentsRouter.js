import express from 'express';
import { getStudents,createStudent, updateStudent, deleteStudent } from '../controllers/studentsController.js';

const studentsRouter = express.Router();

studentsRouter.get('/', getStudents);

studentsRouter.post('/', createStudent);

studentsRouter.put('/', updateStudent);

studentsRouter.delete('/', deleteStudent);

export default studentsRouter;

