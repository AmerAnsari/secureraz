import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * @description
   *
   * Authentication user subject which emits authenticated user's data information value whenever it is subscribed to.
   *
   * @see BehaviorSubject
   */
  private static userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /**
   * @description
   *
   * An observable snapshot data of {@link userSubject} value
   *
   * @see Observable
   */
  static userObservable: Observable<User> = UserService.userSubject.asObservable();

  constructor() { }

  /**
   * @description
   *
   * Set and update current authenticated user's data by updating {@link userSubject}'s value and local storage's
   * 'user' item
   *
   * @param data User data information
   */
  static set user(data: User) {
    localStorage.setItem('user', JSON.stringify(data));
    UserService.userSubject.next(data);
  }

  /**
   * @returns Latest authenticated user's data information from local storage
   */
  static get user(): User {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }
}
