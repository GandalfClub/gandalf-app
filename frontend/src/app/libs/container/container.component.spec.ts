import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { ContainerStoreModule } from './store/store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { EntityWrapper } from '../auth/models/entity-wraper';
import { User } from '../auth/models/user';
import { EntityStatus } from '../auth/models/entity-status';
import { AuthModule } from '../auth/auth.module';
import { LocalizationModule } from './components/localization/localization.module';
import { UserClaim } from '../admin-role-management/models/user-claims.enum';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { UserService } from './services/user.service';

describe('ContainerComponent', () => {
	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: {
			id: '1',
			firstName: 'Uladzimir',
			secondName: 'Svirydzenka',
			photoUrl: '',
			email: '1@1.com',
			isAdmin: undefined,
			claims: [UserClaim.Admin],
		}
	};

	let component: ContainerComponent;
	let fixture: ComponentFixture<ContainerComponent>;

	const mockAuthFacadeService: any = {
		get user$(): Observable<EntityWrapper<User>> {
			return of(user);
		},

		loadUser(): EntityWrapper<User> {
			return user;
		},
		signInByGithub(): void {
			user.status = EntityStatus.Pending;
		},
		signIn(): void {
			user.status = EntityStatus.Pending;
		},
		signUp(): void {
			user.status = EntityStatus.Pending;
		},
	};
	const mockUserFacadeService: any = {
		subscribeUser(): void {}
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ContainerComponent],
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule,
				LocalizationModule,
				AuthModule
			],
			providers: [
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService },
				{ provide: UserService, useValue: mockUserFacadeService }
			],
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when component initializing', () => {
		beforeEach(() => {
			spyOn(mockAuthFacadeService, 'loadUser');
			spyOn(mockUserFacadeService, 'subscribeUser');
			component.ngOnInit();
		});

		it('should call method loadUser() from AuthFacadeService', () => {
			expect(mockAuthFacadeService.loadUser).toHaveBeenCalled();
		});
		it('should call method subscribeUser() from UserService', () => {
			expect(mockUserFacadeService.subscribeUser).toHaveBeenCalled();
		});
	});
});
