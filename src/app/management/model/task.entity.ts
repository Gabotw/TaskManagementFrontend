export class Task {
  taskkId:number;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: number;

  constructor(
    taskkId: number,
    title: string,
    description: string,
    isCompleted: boolean,
    userId: number
  ) {
    this.taskkId = taskkId;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.userId = userId;
  }
}
