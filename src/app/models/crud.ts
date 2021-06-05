import { HttpClient } from '@angular/common/http';
import { GetParams } from '@app/shared/types/get-params';
import { Payload } from '@app/shared/types/payload';
import { PK } from '@app/shared/types/pk';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * CRUD API model (v21.3.2).
 *
 * T is the type of data.
 * LT is the type of data returned in list.
 */
export class Crud<T, LT = T[]> {

  /**
   * Must be set in API service before usage.
   */
  private static http: HttpClient;

  /**
   * Base API URL.
   */
  private static base: string;

  /**
   * Last cache value stored.
   *
   * @see enableCache
   */
  private cache: LT;

  /**
   * @returns Full API endpoint URL
   */
  get endpoint(): string {
    return `${Crud.base}${this.name}/`;
  }

  /**
   * @param name API endpoint.
   * @param enableCache Enable cache for list?
   */
  constructor(public name: string,
              public enableCache?: boolean) {
  }

  /**
   * Initiate and set static properties.
   */
  static initiate(http: HttpClient, base: string): void {
    Crud.http = http;
    Crud.base = base;
  }

  /**
   * Remove stored cache.
   */
  clearCache(): void {
    delete this.cache;
  }

  /**
   * Get list of objects
   */
  list(params: GetParams = {}, ignoreCache?: boolean): Observable<LT> {
    if (this.enableCache && !ignoreCache && this.cache) {
      return of(this.cache);
    }
    return Crud.http.get<LT>(this.endpoint, { params }).pipe(map((data: LT): LT => {
      if (!ignoreCache) {
        this.cache = data;
      }
      return data;
    }));
  }

  /**
   * Create a new object
   */
  create(payload: Payload<T>): Observable<T> {
    return Crud.http.post<T>(this.endpoint, payload);
  }

  /**
   * Create a new file upload object.
   */
  upload(file: File): Observable<T> {
    const payload: FormData = new FormData();
    payload.append('file', file, file.name);
    return Crud.http.post<T>(this.endpoint, payload);
  }

  /**
   * Update a single object
   */
  update(pk: PK, payload: Payload<T>): Observable<T> {
    return Crud.http.patch<T>(`${this.endpoint}${pk}/`, payload);
  }

  /**
   * Get a single object
   */
  retrieve(pk: PK): Observable<T> {
    return Crud.http.get<T>(`${this.endpoint}${pk}/`);
  }

  /**
   * Delete a single object
   */
  delete(pk: PK): Observable<void> {
    return Crud.http.delete<void>(`${this.endpoint}${pk}/`);
  }
}
