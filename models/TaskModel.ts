import { model } from "mongoose";
import { ITask } from "../interfaces/ITask";
import { taskSchema } from "../schemas/TaskSchema";

export const Task = model<ITask>('Task', taskSchema);