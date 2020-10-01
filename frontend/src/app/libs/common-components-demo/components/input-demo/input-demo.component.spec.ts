import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from 'src/app/libs/common-components/components/input/input.component';

import { InputDemoComponent } from './input-demo.component';

describe('ParentControlComponent', () => {
	let component: InputDemoComponent;
	let fixture: ComponentFixture<InputDemoComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				InputComponent,
				InputDemoComponent,
			],
			imports: [
				BrowserAnimationsModule,
				FormsModule,
				ReactiveFormsModule,
				MatFormFieldModule,
				MatInputModule
			],
			providers: [
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(InputDemoComponent);

		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
