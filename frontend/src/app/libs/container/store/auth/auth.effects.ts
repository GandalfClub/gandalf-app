import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, AuthActions, } from './autn.actions';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable()
export class AuthEffects {

  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.Login),
      exhaustMap(( login: any ) => {
        return from(this.fireAuthService.auth.signInWithEmailAndPassword(login.payload.email, login.payload.password));
      }),
      map((userModel: any) => userModel.user),
      switchMap((user:any) => {
        return this.authService.logIn(user.email, user.password)
          .pipe(map((user) => {
            console.log(user);
            return new LogInSuccess({ token: user.token, email: user.email });
          }),
            catchError((error) => {
              console.log(error);
              return of(new LogInFailure({ error: error }));
            })
          );
      }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LoginFailure)
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private fireAuthService: AngularFireAuth,
  ) { }

}
