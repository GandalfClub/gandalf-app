import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { ContainerStoreModule } from './store/store.module';
import { EffectsRootModule, EffectsModule } from '@ngrx/effects';
import { StoreRootModule, StoreModule } from '@ngrx/store';

describe('ContainerComponent', () => {
	let component: ContainerComponent;
	let fixture: ComponentFixture<ContainerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ContainerComponent],
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
