import express, { Express, Request, Response } from "express";
import { Types, connect } from 'mongoose';
import { Task } from './models/TaskModel';

const app: Express = express();

app.use(express.json());


run().catch(err => console.log(err));

async function run() {
  try{
    await connect('mongodb://127.0.0.1:27017/taskdb');

     }catch(err){
        console.log("error while db connection" + err)
  }
  
//   const task = new Task({
//     content: 'Go to gym',
//     type: 'To Do',
//     checked: false,
//     isModalOpen: false
//   });
  //await task.save();
}

app.get("/task", async(req:Request, res:Response)=>{
    try{
        const task = await Task.findOne();
        res.status(200).json(task);
    }catch(err){
        console.error(err);
        res.status(500).send("Something is wrong server")

    }
});

app.get("/task/done", async(req:Request, res:Response)=>{
    try{
        const task = await Task.where("typeTask").equals("Done");
        res.status(200).json(task);
    }catch(err){
        console.error(err);
        res.status(500).send("Something is wrong server")

    }
});

app.get("/task/todo", async(req:Request, res:Response)=>{
    try{
        const task = await Task.where("typeTask").equals("To Do");
        res.status(200).json(task);
    }catch(err){
        console.error(err);
        res.status(500).send("Something is wrong server")

    }
});

app.get("/task/trash", async(req:Request, res:Response)=>{
    try{
        const task = await Task.where("typeTask").equals("Trash");
        res.status(200).json(task);
    }catch(err){
        console.error(err);
        res.status(500).send("Something is wrong server")

    }
});

app.post("/task/create", async(req:Request, res:Response)=>{
    try{
        const task = new Task({
            content: 'Go to lake',
            typeTask: 'To Do',
            checked: false,
            isModalOpen: false   
        })
        res.status(200).json(task);
        await task.save();
    }catch(err){
        console.error(err);
        res.status(500).send("Something is wrong server");

    }
});

const taskId = '645943c01a47ed2d08cc8fe1'
app.post("/task/done", async(req:Request, res:Response)=>{
    try{

        let task = await Task.findOneAndUpdate({_id: `${taskId}`},  {typeTask: "Done", checked: true});    
        res.json(task);
           
    }catch(err){ 
        console.error(err);
        res.status(500).send("Something is wrong server " + err);
    }
});

app.post("/task/trash", async(req:Request, res:Response)=>{
    try{
        
        let task = await Task.findOneAndUpdate({_id: `${taskId}`},  {typeTask: "Trash"});    
        res.json(task);
           
    }catch(err){ 
        console.error(err);
        res.status(500).send("Something is wrong server " + err);
    }
});

app.post("/task/todo", async(req:Request, res:Response)=>{
    try{
        
        let task = await Task.findOneAndUpdate({_id: `${taskId}`},  {typeTask: "To do", checked: false});    
        res.json(task);
           
    }catch(err){ 
        console.error(err);
        res.status(500).send("Something is wrong server " + err);
    }
});

app.post("/task/delete", async(req:Request, res:Response)=>{
    try{
        
        let task = await Task.findOneAndDelete({_id: `${taskId}`});    
        res.json(task);
           
    }catch(err){ 
        console.error(err);
        res.status(500).send("Something is wrong server " + err);
    }
});

app.listen(8080, ()=>{
    console.log("server is running")
})
