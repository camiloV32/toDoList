export enum StatusTaskType {
  pending = 'pending',
  inProgress = 'inProgress',
  completed = 'completed'
}


export interface PrimitiveTask{
  taskId?: string;
  userId: string;
  title: string;
  description?: string;
  status: StatusTaskType;
  createdAt?: Date;
  updatedAt?: Date;
}


export class Task {
    constructor(private attributes: PrimitiveTask){}

    static create(task: PrimitiveTask): Task{
        return new Task({
            taskId: task.taskId,
            userId: task.userId,
            title: task.title,
            description: task.description,
            status: task.status,
        })
    }

    toPrimitives(): PrimitiveTask{
        return{
            taskId: this.attributes.taskId,
            userId: this.attributes.userId,
            title: this.attributes.title,
            description: this.attributes.description,
            status: this.attributes.status,
        }
    }
    
}