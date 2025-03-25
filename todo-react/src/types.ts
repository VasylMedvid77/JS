export type ResponceItem = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TodosResponce = {
  todos: ResponceItem[];
  total: number;
  skip: number;
  limit: number;
};
