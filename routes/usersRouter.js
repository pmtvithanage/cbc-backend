import express from 'express';

import { createUser, loginUser } from '../controllers/usersController.js';

const userRouter = express.Router();

// Define the route for creating a user
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);



// Export the router
export default userRouter;

