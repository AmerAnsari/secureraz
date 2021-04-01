import { Category } from 'src/app/shared/interfaces/category';

export interface Account {
  id: number;
  site: string;
  username: string;
  password: string;
  category: Category;
}
