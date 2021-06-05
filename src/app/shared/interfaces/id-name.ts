import { PK } from '@app/shared/types/pk';

export interface IdName<IT = PK> {
  id: IT;
  name: string;
}
