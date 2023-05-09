import { Schema} from 'mongoose';
import { ITask } from '../interfaces/ITask';

export const taskSchema = new Schema<ITask>({
    content: { type: String, required: true },
    typeTask: { type: String, required: true },
    checked: {type: 'boolean'},
    isModalOpen: {type: 'boolean'}
  });