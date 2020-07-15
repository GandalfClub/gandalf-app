import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, } from './autn.actions';
import { Observable, of } from 'rxjs';
import {map, switchMap, catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.Login),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password)
          .pipe(map((user) => {
            console.log(user);
            return new LogInSuccess({ token: user.token, email: payload.email });
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
  ) { }

}
