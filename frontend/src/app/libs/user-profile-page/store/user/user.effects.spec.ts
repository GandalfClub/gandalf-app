import { TestBed, async } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { GetEvents, GetEventsSuccess, GetEventsFail } from './events.actions';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { UserService } from '../../service/user-service';
import { IUser } from '../../model/user';
import { UserEffects } from './user.effects';
import { AuthFacadeService } from '../../../auth/store/auth/auth.facade';
import { createSpy } from '../../helpers/createSpy';
import { GetUserFromAuthAction, GetUserFromAuthSuccessfullyAction } from './user.actions';

describe('User Effects', () => {
	let mockUserService: jasmine.SpyObj<UserService>;
	let mockAuthFacadeService: jasmine.SpyObj<AuthFacadeService>;
	let user: IUser;
	let error: Error;
	let actions: Observable<Action>;
	let expected: Observable<Action>;

	function createEffects(source: Observable<Action>): UserEffects {
		return new UserEffects(new Actions(source), mockUserService, mockAuthFacadeService);
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: UserService, useValue: createSpy(UserService.prototype) },
				{ provide: AuthFacadeService, useValue: createSpy(AuthFacadeService.prototype) },
			],
		});
		mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
		mockAuthFacadeService = TestBed.inject(AuthFacadeService) as jasmine.SpyObj<AuthFacadeService>;
	}));

	describe('getUser', () => {
		describe('when getUser successful', () => {
			beforeEach(() => {
				user = {
					firstName: '1',
					secondName: '1',
					mobilePhone: '1',
					password: '1',
					isAdmin: false,
					_id: '0',
					email: 'test@test.test',
				};

				mockAuthFacadeService.user$.and.returnValue(of([user]));
				actions = hot('-----a-----|', { a: new GetUserFromAuthAction() });
				expected = cold('-----s-----|', { s: new GetUserFromAuthSuccessfullyAction({ user }) });
			});

			it('should emit getEvents action', () => {
				expect(createEffects(actions).getUser$).toBeObservable(expected);
			});
		});

		describe('when getEvents failed', () => {
			beforeEach(() => {
				error = new Error('test');
				mockAuthFacadeService.user$.and.throwError(error);
				actions = hot('-----a-----|', { a: new GetUserFromAuthAction() });
				expected = cold('-----(s|)', { s: new GetUserFromAuthSuccessfullyAction(error) });
			});

			it('should emit getEventsFail action', () => {
				expect(createEffects(actions).getUser$).toBeObservable(expected);
			});
		});
	});
});
