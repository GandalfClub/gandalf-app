import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/libs/models/user'
import { Store } from '@ngrx/store';
import { State } from '../container/store/auth/auth.reducer'
import { Observable, from } from 'rxjs';
import { selectAuthState } from '../container/store/auth/auth.selectors';
import { LogIn, LogInByGithub } from '../container/store/auth/autn.actions';
import { UserCredentials } from '../models/userCredentials';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  credentials: UserCredentials = new UserCredentials();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private store: Store<State>
  ) { this.getState = this.store.select(selectAuthState); }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  };

  onSubmit(): void {
    this.store.dispatch(new LogIn(this.credentials));
  }

  loginByGithub(): void {
    this.store.dispatch(new LogInByGithub());
  }
}
