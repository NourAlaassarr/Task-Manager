import { Router } from 'express'
import * as UserControllers from'./User.controllers.js'
import {AsyncHandler} from '../../Utilis/ErrorHandling.js'
import { ValidationCoreFunction } from '../../Middleware/ValidationCoreFunction.js';
import { IsAuth } from '../../MiddleWare/auth.js';
import * as UserValidation from './User.validation.js'
const router=Router();


//SignUp
router.post('/SignUp',ValidationCoreFunction(UserValidation.SignUp),AsyncHandler(UserControllers.SignUp));
//SignIn
router.post('/SignIn',ValidationCoreFunction(UserValidation.SignIn),AsyncHandler(UserControllers.SignIn));

//signOut
router.patch('/SignOut',IsAuth(), ValidationCoreFunction(UserValidation.SignOut),AsyncHandler(UserControllers.SignOut));

export default router