import { FormGroup } from '@angular/forms';
import { ApiError } from 'src/app/shared/interfaces/api-error';

/**
 * Reactive form object for API
 */
export interface ReactiveFormData {
  form?: FormGroup;
  loading?: boolean;
  error: ApiError;
  success?: boolean;
}
