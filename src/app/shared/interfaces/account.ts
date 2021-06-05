import { Category } from './category';

export interface Account {
  id: number;
  site: string;
  username: string;
  password: string;
  category: Category;
}
