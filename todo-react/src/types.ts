export type ListItemType = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TodosResponse = ListItemType[];
