import { Category } from '@interfaces/category';
import { IdName } from '@interfaces/id-name';

export interface Media {
  uuid: string;
  name: string;
  description: string;
  file: string;
  file_type: IdName;
  action: string;
  category: Category;
  created: string;
  updated: string;
}
