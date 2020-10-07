import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContainerFacadeService } from 'src/app/libs/container/services/container.facade';
import { ContainerStoreModule } from 'src/app/libs/container/store/store.module';
import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
	let component: NotificationsComponent;
	let fixture: ComponentFixture<NotificationsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				MatMenuModule,
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule
			],
			declarations: [ NotificationsComponent ],
			providers: [ ContainerFacadeService ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NotificationsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
