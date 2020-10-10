import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { ContainerFacadeService } from '../../services/container-facade.service';
import { ContainerStoreModule } from '../../store/store.module';
import { LocalizationModule } from '../localization/localization.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule,
				LocalizationModule
			],
			declarations: [ HeaderComponent ],
			providers: [ ContainerFacadeService ]
		})
		.compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
