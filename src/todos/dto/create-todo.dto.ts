export class CreateTodoDto {
  id: number;
  title: string;
  desc?: string;
  isComplete: boolean;
}
