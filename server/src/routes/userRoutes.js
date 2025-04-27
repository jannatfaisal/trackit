import { Router } from 'express';
import { register } from '../controllers/users/register.js';
import { login } from '../controllers/users/login.js';
import { logout } from '../controllers/users/logout.js';
import { check_login } from '../controllers/users/checkLogin.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.delete('/logout', logout)
userRouter.get('/check-login', check_login)

export default userRouter;