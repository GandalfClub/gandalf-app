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

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ContainerComponent],
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule,
				LocalizationModule,
				AuthModule
			]
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
});
