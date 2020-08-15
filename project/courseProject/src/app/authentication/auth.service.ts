import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";

import {UserModel} from "./user.model";
import {environment} from "../../environments/environment";
import * as fromApp from "../store/app.reducer"
import * as AuthActions from "../authentication/store/auth.actions"

export interface ResponseBody {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable()
export class AuthService {
  userSubject = new BehaviorSubject<UserModel>(null);
  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

  login(email: string, password: string){
    return this.http.post<ResponseBody>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorResponse => this.handleError(errorResponse)),
      tap(responseData => {this.handleUserEntry(responseData)}));
  }
  signUp(email: string, password: string){
    return this.http.post<ResponseBody>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorResponse => this.handleError(errorResponse)),
      tap(responseData => {this.handleUserEntry(responseData)}));
  }

  autoLogin(){
    const loadedUserData:{
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!loadedUserData){
      return;
    }
    const loadedUser = new UserModel(
      loadedUserData.email,
      loadedUserData.id,
      loadedUserData._token,
      new Date(loadedUserData._tokenExpirationDate));

    if (loadedUser.token){
      // this.userSubject.next(loadedUser);
      this.store.dispatch(new AuthActions.Login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(loadedUserData._tokenExpirationDate)}));
      this.autoLogout(new Date(loadedUserData._tokenExpirationDate).getTime() - new Date().getTime());
    }
  }

  logout(){
    // this.userSubject.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationTime: number){
    setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  private handleUserEntry(responseData){
    const expDate = new Date(new Date().getTime() + +responseData.expiresIn*1000);
    const user = new UserModel(responseData.email, responseData.localId, responseData.idToken, expDate);
    localStorage.setItem('userData', JSON.stringify(user));
    //this.userSubject.next(user);
    this.store.dispatch(new AuthActions.Login({
      email: responseData.email,
      userId: responseData.localId,
      token: responseData.idToken,
      expirationDate: expDate}));
    this.autoLogout(responseData.expiresIn * 1000);
  }
  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'Unknown error occurred!';
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is incorrect! أنت فاكرها زريبة يبني ';
        break;
      case 'ERR_INTERNET_DISCONNECTED':
        errorMessage = 'No Internet!';
        break;
    }
    return throwError(errorMessage);
  }
}
