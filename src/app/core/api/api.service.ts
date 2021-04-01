import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Crud } from 'src/app/models/crud';
import { Account } from 'src/app/shared/interfaces/account';
import { Category } from 'src/app/shared/interfaces/category';
import { User } from 'src/app/shared/interfaces/user';
import { environment } from 'src/environments/environment';

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
  static readonly CATEGORY = new Crud<Category>('category');
  static readonly ACCOUNT = new Crud<Account>('account');

  constructor(private http: HttpClient) {
  }
}
