import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserRepository } from '../../service/user-repository.service';
import { UserEffects } from './user.effects';
import { AuthFacadeService } from '../../../auth/store/auth/auth.facade';
import { createSpy } from '../../helpers/createSpy';
import { UpdateUserAction, UpdateUserInfoSuccessAction, UpdateUserInfoFailAction } from './user.actions';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { UserConverter } from '../../service/user-converter.service';

describe('User Effects', () => {
	let mockUserService: jasmine.SpyObj<UserRepository>;
	let mockAuthFacadeService: jasmine.SpyObj<AuthFacadeService>;
	let mockUserConverter: jasmine.SpyObj<UserConverter>;
	let userAuth: User;
	let user: User;
	let users: EntityWrapper<User>;
	let actions: Observable<Action>;
	let expected: Observable<Action>;

	function createEffects(source: Observable<Action>): UserEffects {
		return new UserEffects(new Actions(source), mockUserService, mockAuthFacadeService, mockUserConverter);
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
		mockUserConverter = TestBed.inject(UserConverter) as jasmine.SpyObj<UserConverter>;
	});

	describe('update user success', () => {
		beforeEach(() => {
			mockUserService.updateUser.and.returnValue(of(user));
			actions = hot('-a-', { a: new UpdateUserAction({ user }) });
			expected = cold('-s-', { s: new UpdateUserInfoSuccessAction({ user }) });
		});

		it('should success', () => {
			expect(createEffects(actions).updateUser$).toBeObservable(expected);
		});
	});
});
