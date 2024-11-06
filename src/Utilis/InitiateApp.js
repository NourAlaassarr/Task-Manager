import {DBConnection} from '../../DB/connection.js'
import * as Router from'../Modules/index.routes.js'
import cors from 'cors';
import {GlobalErrorHandler} from'./ErrorHandling.js'
export const InitiateApp = (app,express) => {
    app.use(express.json());
DBConnection();
const port =5000;
app.use(cors());

app.get('/',(req,res)=>res.send("Hello!!!"))
app.use('/User',Router.UserRoutes);
app.use('/Task',Router.TaskRoutes);

app.use(GlobalErrorHandler);
app.all('*',(req,res,next)=>
    res.status(404).json({ message: '404 URL Not Found' })
)
app.listen(port,()=>console.log(`..........................server started on port number ${port}..................................`));
}