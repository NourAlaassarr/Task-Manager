import status from "statuses";
import { TaskModel } from "../../../DB/Models/Task.model.js";
import { UserModel } from "../../../DB/Models/User.model.js";
import { SystemRoles } from "../../Utilis/System.Roles.js";

import { ApiFeatures } from "../../Utilis/ApiFeatures.js";




//Add
export const AddTask = async (req, res, next) => {
    const { Title, Description, DeadLine } = req.body
    const UserId = req.AuthUser
    console.log(UserId)
    const CheckUser = await UserModel.findById(UserId)
    if (!CheckUser) {
        return next(new Error('User Not Found', { cause: 400 }));
    }
    if (CheckUser.Status !== SystemRoles.Online) {
        return next(new Error('Please sign in first', { cause: 400 }));
    }
    const Task = await TaskModel.findOne({ Title })
    
    const UserTasks = await TaskModel.findOne().populate('UserId','Title').exec()

    const existingTask = await TaskModel.findOne({ Title, UserId: UserId });
    if (existingTask) {
        return next(new Error('Task Already Exists', { cause: 400 }));
    }
    const timestamp = Date.parse(DeadLine)
    if (isNaN(timestamp) || timestamp < Date.now()) {
        return next(new Error('Invalid date or date is in the past', { cause: 400 }));
    }
    const TaskObj = new TaskModel({
        Title,
        Description,
        UserId,
        DeadLine
    });
    await TaskModel.create(TaskObj);
    res.status(200).json({ Message: 'Successfully Added' })
}

//Delete
export const deleteTask = async (req, res, next) => {
    const { TaskId } = req.params;
    const UserId = req.AuthUser._id
    const CheckUser = await UserModel.findById(UserId)
    const Task = await TaskModel.findById(TaskId)
    if (!CheckUser) {
        return next(new Error('User Not Found', { cause: 400 }));
    }
    if (CheckUser.Status !== SystemRoles.Online) {
        return next(new Error('Please sign in first', { cause: 400 }));
    }
    if (!Task) {
        return next(new Error('Task Not Found', { cause: 400 }));
    }
    if (!Task.UserId.equals(UserId)) {
        return next(new Error('UnAuthorized To delete this Task', { cause: 400 }));
    }
    await TaskModel.findByIdAndDelete(TaskId)
    res.status(200).json({ Message: 'Successfully Deleted' })
}

//Update (Title - description -status-Deadline )
export const UpdateTask = async(req,res,next)=>{
    const {Title , Description , DeadLine , Status}= req.body
    const {TaskId}=req.params
    const UserId = req.AuthUser._id

    const CheckUser = await UserModel.findById(UserId)
    const Task = await TaskModel.findById(TaskId)

    //Check if user Exists
    if (!CheckUser) {
        return next(new Error('User Not Found', { cause: 400 }));
    }
    //User Should Be Signed in
    if (CheckUser.Status !== SystemRoles.Online) {
        return next(new Error('Please sign in first', { cause: 400 }));
    }
    //Check if Task Exists
    if (!Task) {
        return next(new Error('Task Not Found', { cause: 400 }));
    }

    if (!Task.UserId.equals(UserId)) {
        return next(new Error('UnAuthorized To Update this Task', { cause: 400 }));
    }
    if(Status){
        if(Status.toLowerCase()== SystemRoles.Completed.toLowerCase()){
            Task.Status=SystemRoles.Completed;
        }
        else if (Status.toLowerCase()== SystemRoles.Incomplete.toLowerCase()){
            Task.Status=SystemRoles.Incomplete;
        }
        else{
            return next(new Error('Error Updating Status', { cause: 400 }));
        }
    }

    if(Title){
        if(Task.Title == Title){
            return next(new Error('Choose a new name', { cause: 400 }));
        }
        const existingTask = await TaskModel.findOne({ Title, UserId: UserId });
        if (existingTask) {
            return next(new Error('Task Already Exists', { cause: 400 }));
        }

        Task.Title=Title;
    }
    //Update Deadlinr
    if(DeadLine){
        const timestamp = Date.parse(DeadLine)
        if (isNaN(timestamp) || timestamp < Date.now()) {
        return next(new Error('Invalid date or date is in the past', { cause: 400 }));
    }
        Task.DeadLine=DeadLine;
    }
    if(Description){
        Task.Description=Description;
    }

    const updatedTask= await Task.save();
    if(!updatedTask){
        return next(new Error('Error Updating This task', { cause: 400 }));
    }
    res.status(200).json({Message:'Success'});


}

//Get All Tasks (users tasks )
export const GetAlltasks =async(req,res,next)=>{
    const UserId = req.AuthUser._id

    const CheckUser = await UserModel.findById(UserId);
    if (!CheckUser) {
        return next(new Error('User Not Found', { cause: 400 }));
    }
 
    //User Should Be Signed in
    if (CheckUser.Status !== SystemRoles.Online) {
        return next(new Error('Please sign in first', { cause: 400 }));
    }

    const Tasks = await TaskModel.find({ UserId: UserId })
 
//  console.log(Tasks)
res.status(200).json({Message:'Success',Tasks})
}


//Filter by Complete - incomplete
export const listTasks = async (req, res, next) => {
    const userId = req.AuthUser._id;
  
    const ApiFeaturesInstance = new ApiFeatures(TaskModel.find({ UserId: userId }), req.query)
      .pagination()
      .filters()  
      .sort()
      .select();
  console.log(req.query)
    const tasks = await ApiFeaturesInstance.mongooseQuery;
  
    res.status(200).json({ message: 'successfully Fetched', tasks });
  }