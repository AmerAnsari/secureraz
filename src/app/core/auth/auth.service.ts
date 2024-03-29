import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api/api.service';
import { UserService } from 'src/app/core/user/user.service';
import { AuthResponse } from 'src/app/shared/interfaces/auth-response';
import { AuthToken } from 'src/app/shared/interfaces/auth-token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
   * Storage version to use to force user to sign in again (should only be increased).
   */
  private static readonly STORAGE_VERSION = 1;

  /**
   * Storage key for storage version.
   */
  private static readonly STORAGE_VERSION_KEY = 'version';

  /**
   * Storage key for authentication token.
   */
  private static readonly STORAGE_TOKEN_KEY = 'token';

  /**
   * Cookie expires in days.
   */
  private static readonly COOKIE_EXPIRE_DAYS = 365;

  /**
   * Sign in redirect.
   */
  private static readonly SIGN_IN_REDIRECT = '/main';

  /**
   * Sign out redirect.
   */
  private static readonly SIGN_OUT_REDIRECT = '/';

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
    /**
     * Check if user is authenticated.
     */
    if (this.isAuth()) {
      /**
       * Update authenticated user and blog data.
       */
      UserService.user = JSON.parse(localStorage.getItem('user'));
      /**
       * Sign user out if authentication version is old.
       */
      if (AuthService.STORAGE_VERSION !== Number(localStorage.getItem(AuthService.STORAGE_VERSION_KEY))) {
        alert('Client authentication version is old, signing out.');
        this.signOut();
        return;
      }
    }
  }

  /**
   * @returns Cookie domain based on environment.
   */
  private static getCookieDomain(): string {
    let domain: string = environment.cookieDomain;
    if (environment.development && !domain.includes(location.hostname)) {
      domain = location.hostname;
    }
    return domain;
  }

  /**
   * Parse JWT from token.
   *
   * @param token JWT.
   *
   * @return Parsed JWT token.
   */
  private static parseJwt(token: string): AuthToken | null {
    const base64Url = token.split('.')[1];
    if (typeof base64Url === 'undefined') {
      return null;
    }
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  /**
   * @return Is the user authenticated.
   */
  isAuth(): boolean {
    return this.cookieService.check(AuthService.STORAGE_TOKEN_KEY);
  }

  /**
   * Save/update token to cookies.
   *
   * @param token Authentication token.
   */
  setToken(token: string): void {
    const parsedJwt: AuthToken = AuthService.parseJwt(token);
    if (parsedJwt) {
      this.cookieService.set(AuthService.STORAGE_TOKEN_KEY,
        token,
        AuthService.COOKIE_EXPIRE_DAYS,
        '/',
        AuthService.getCookieDomain(),
        null,
        'Lax',
      );
    }
  }

  /**
   * @returns Stored token from localStorage.
   */
  getToken(): string | null {
    return this.cookieService.get(AuthService.STORAGE_TOKEN_KEY);
  }

  /**
   * Un-authenticate user by cleaning localStorage and cookies.
   * Note: Cookies don't get deleted sometimes so let's expire it.
   */
  signOut(): void {
    localStorage.clear();
    this.cookieService.deleteAll();
    this.cookieService.deleteAll('/', AuthService.getCookieDomain());
    this.cookieService.set(AuthService.STORAGE_TOKEN_KEY, '', new Date(), '/');
    this.cookieService.set(AuthService.STORAGE_TOKEN_KEY,
      '',
      new Date(),
      '/',
      AuthService.getCookieDomain(),
      null,
      'Lax',
    );
    UserService.user = null;
    this.router.navigateByUrl(AuthService.SIGN_OUT_REDIRECT);
  }

  /**
   * Sign the user in.
   *
   * @param payload User username and password.
   *
   * @return String observable which can be subscribed to.
   */
  signIn(payload: { username: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${ApiService.BASE}auth/`, payload).pipe(
      map((data: AuthResponse): AuthResponse => {
        // Store token into cookies.
        this.setToken(data.token);
        // Store user into local storage.
        UserService.user = data.user;
        // Store storage version.
        localStorage.setItem(AuthService.STORAGE_VERSION_KEY, AuthService.STORAGE_VERSION.toString());
        // Redirect.
        this.router.navigateByUrl(AuthService.SIGN_IN_REDIRECT);
        // Return response.
        return data;
      }),
    );
  }

  /**
   * Sign the user up.
   *
   * @param email User email.
   * @param username User username.
   * @param password user password.
   */
  signUp(email: string, username: string, password: string): Observable<void> {
    return this.http.post(ApiService.BASE + 'user/', {
      email, username, password,
    }).pipe(
      map((): void => {
        this.signIn({ username, password }).subscribe();
      }),
    );
  }
}
