export type ResponseItem = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TodosResponse = {
  todos: ResponseItem[];
  total: number;
  skip: number;
  limit: number;
};
