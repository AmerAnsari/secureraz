import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from '@interfaces/media';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Crud } from 'src/app/models/crud';
import { Account } from '@interfaces/account';
import { Category } from '@interfaces/category';
import { User } from '@interfaces/user';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Base API URL
   */
  static readonly BASE = environment.api;

  /**
   * List of CRUD model APIs
   */
  static readonly USER = new Crud<User>('user');
  static readonly ACCOUNT = new Crud<Account>('account');
  static readonly CATEGORY = new Crud<Category>('category');
  static readonly FILE = new Crud<Media>('file');

  constructor(private http: HttpClient) {
  }

  /**
   * Download action endpoint file from API
   */
  download(url: string, name: string, action: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' },
    ).pipe(map((data: Blob): Blob => {
      const a: HTMLAnchorElement = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = `${name}.${action}`;
      a.click();
      a.remove();
      return data;
    }));
  }
}
