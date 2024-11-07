import { Router } from 'express'
import * as TaskControllers from'./Task.controllers.js'
import {AsyncHandler} from '../../Utilis/ErrorHandling.js'
import { ValidationCoreFunction } from '../../Middleware/ValidationCoreFunction.js';
import { IsAuth } from '../../MiddleWare/auth.js';
import * as TaskValidation from './Task.validation.js'
IsAuth
const router=Router();


//Add
router.post('/',IsAuth(),ValidationCoreFunction(TaskValidation.AddTask),AsyncHandler(TaskControllers.AddTask));

//Delete
router.delete('/:TaskId',IsAuth(),ValidationCoreFunction(TaskValidation.Delete),AsyncHandler(TaskControllers.deleteTask));

//Update
router.put('/:TaskId',IsAuth(),ValidationCoreFunction(TaskValidation.UpdateTask),AsyncHandler(TaskControllers.UpdateTask));

//Get All Tasks
router.get('/GetAll',IsAuth(),AsyncHandler(TaskControllers.GetAlltasks));

//FIlter Status
router.get('/',IsAuth(), ValidationCoreFunction(TaskValidation.querySchema),AsyncHandler(TaskControllers.listTasks))
export default router