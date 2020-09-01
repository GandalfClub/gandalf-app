import { TestBed, async } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { UserRepository } from '../../service/user-repository.service';
import { IUser } from '../../model/user';
import { UserEffects } from './user.effects';
import { AuthFacadeService } from '../../../auth/store/auth/auth.facade';
import { createSpy } from '../../helpers/createSpy';
import { UpdateUserAction, UpdateUserInfoSuccessfulyAction, UpdateUserInfoFailedAction } from './user.actions';

import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

describe('User Effects', () => {
	let mockUserService: jasmine.SpyObj<UserRepository>;
	let mockAuthFacadeService: jasmine.SpyObj<AuthFacadeService>;
	let userAuth: User;
	let user: IUser;
	let users: EntityWrapper<User>;
	let error: Error;
	let actions: Observable<Action>;
	let expected: Observable<Action>;

	function createEffects(source: Observable<Action>): UserEffects {
		return new UserEffects(new Actions(source), mockUserService, mockAuthFacadeService);
	}

	beforeEach(() => {
		user = {
			firstName: '1',
			secondName: '1',
			mobilePhone: '1',
			password: '1',
			isAdmin: false,
			id: '0',
			email: 'test@test.test',
		};
		userAuth = {
			id: '0',
			email: 'test@test.test',
			isAdmin: false,
		};
		users = {
			status: EntityStatus.Success,
			value: userAuth,
		};
		TestBed.configureTestingModule({
			providers: [
				{ provide: UserRepository, useValue: createSpy(UserRepository.prototype) },
				{
					provide: AuthFacadeService,
					useValue: createSpy(AuthFacadeService.prototype),
				},
			],
		});
		mockUserService = TestBed.inject(UserRepository) as jasmine.SpyObj<UserRepository>;
		mockAuthFacadeService = TestBed.inject(AuthFacadeService) as jasmine.SpyObj<AuthFacadeService>;
	});

	describe('update user success', () => {
		beforeEach(() => {
			const payload: any = {
				user,
			};
			mockUserService.updateUser.and.returnValue(of(user));
			actions = hot('-a-', { a: new UpdateUserAction(payload) });
			expected = cold('-s-', { s: new UpdateUserInfoSuccessfulyAction(payload) });
		});

		it('should success', () => {
			expect(createEffects(actions).updateUser$).toBeObservable(expected);
		});
	});

	describe('update user error', () => {
		beforeEach(() => {
			const payload: any = {
				user,
			};
			error = new Error('test');
			mockUserService.updateUser.and.throwError(error);
			actions = hot('-a-', { a: new UpdateUserAction(payload) });
			expected = cold('-(s|)', { s: new UpdateUserInfoFailedAction({ message: error.message }) });
		});

		it('should error', () => {
			expect(createEffects(actions).updateUser$).toBeObservable(expected);
		});
	});
});
