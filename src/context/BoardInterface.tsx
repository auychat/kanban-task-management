export interface ISubtask {
  title: string;
  isCompleted: boolean;
}

export interface ITask {
  title: string;
  description: string;
  status: string;
  subtasks: ISubtask[];
}

export interface IColumn {
  name: string;
  tasks: ITask[];
}

export interface IBoard {
  name: string;
  columns: IColumn[];
}

export interface IBoardContextValue {
  boards: IBoard[];
  selectedBoard: string | null;
  setSelectedBoard: (boardName: string | null) => void;
  selectedColumn: string | null;
  setSelectedColumn: (columnName: string | null) => void;
  addBoard: (board: IBoard) => void;
  updateBoard: (boardIndex: number, updateBoard: IBoard) => void;
  deleteBoard: (boardIndex: number) => void;
  addTask: (task: ITask) => void;
  selectedTask: { task: ITask; index: number } | null;
  setSelectedTask: (task: { task: ITask; index: number } | null) => void;
  updateTask: (prevTask:ITask, task: ITask) => void;
  deleteTask: (task: ITask) => void;
}
