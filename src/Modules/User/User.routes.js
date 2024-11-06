import { Router } from 'express'
import * as UserControllers from'./User.controllers.js'
import {AsyncHandler} from '../../Utilis/ErrorHandling.js'
import { ValidationCoreFunction } from '../../Middleware/ValidationCoreFunction.js';
import { IsAuth } from '../../MiddleWare/auth.js';
IsAuth
const router=Router();


//SignUp
router.post('/SignUp',AsyncHandler(UserControllers.SignUp));
//SignIn
router.post('/SignIn',AsyncHandler(UserControllers.SignIn));

//signOut
router.patch('/SignOut',IsAuth(),AsyncHandler(UserControllers.SignOut));

export default router