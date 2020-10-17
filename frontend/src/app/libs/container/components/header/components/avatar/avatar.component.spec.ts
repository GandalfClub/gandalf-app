import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserService } from 'src/app/libs/container/services/user.service';
import { LocalizationModule } from '../../../localization/localization.module';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
	let component: AvatarComponent;
	let fixture: ComponentFixture<AvatarComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				MatMenuModule,
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				LocalizationModule
			],
			declarations: [ AvatarComponent ],
			providers: [ UserService ]
		})
		.compileComponents();

		fixture = TestBed.createComponent(AvatarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets userName', () => {
		const userName: string = '1 2';

		beforeEach(() => {
			component.userName = userName;
			fixture.detectChanges();
		});

		it('should define userName', () => {
			expect(component.userName).toEqual(userName);
		});
	});
});
