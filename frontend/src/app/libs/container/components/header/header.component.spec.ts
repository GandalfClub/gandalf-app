import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContainerFacadeService } from '../../services/container-facade.service';
import { ContainerStoreModule } from '../../store/store.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule
			],
			declarations: [ HeaderComponent ],
			providers: [ ContainerFacadeService ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
  });

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
