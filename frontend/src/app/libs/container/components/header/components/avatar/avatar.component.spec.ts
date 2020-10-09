import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserService } from 'src/app/libs/container/services/user.service';
import { ContainerStoreModule } from 'src/app/libs/container/store/store.module';

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
				ContainerStoreModule
			],
			declarations: [ AvatarComponent ],
			providers: [ UserService ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AvatarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
