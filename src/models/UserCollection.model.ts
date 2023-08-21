export type UserCollection = {
  id: number;
  name: string;
  description: string;
  player_id: number;
  total_value: number;
  created_at: Date;
  updated_at: Date;
};

export type CollectionSelectOption = {
  label: string;
  value: number;
};
