
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxGroupDataDemo } from 'src/app/libs/common-components-demo/models/checkbox-group-data-demo';
import { ComponentTheme } from '../../shared/component-theme.enum';

import { CheckboxComponent } from './checkbox.component';

const testData: CheckboxGroupDataDemo = {
	options: [
		{
			title: 'Active 1',
			value: 1,
			checked: true
		},
		{
			title: 'Active 2',
			value: 2,
			checked: false
		},
		{
			title: 'Disabled 1',
			value: 3,
			disabled: true,
			checked: true
		},
		{
			title: 'Disabled 2',
			value: 4,
			disabled: true,
			checked: false
		}
	],
	labelField: 'title',
	valueField: 'value',
};

describe('CheckboxComponent', () => {
	let component: CheckboxComponent;
	let fixture: ComponentFixture<CheckboxComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ CheckboxComponent ],
			imports: [ MatCheckboxModule ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(CheckboxComponent);
		component = fixture.componentInstance;
		component.options = testData.options;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets options', () => {
		it('should define options', () => {
			expect(JSON.stringify(component.options)).toBe(JSON.stringify(testData.options));
		});

		it('should show checkbox for each option', () => {
			expect(htmlElement.querySelectorAll('.mat-checkbox').length).toBe(testData.options.length);
		});
	});

	describe('when @Input gets valueField', () => {
		beforeEach(() => {
			component.valueField = testData.valueField;
			fixture.detectChanges();
		});

		it('should define valueField', () => {
			expect(component.valueField).toBe(testData.valueField);
		});
	});

	describe('when call isDarkTheme', () => {
		describe('theme is Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Dark;
				fixture.detectChanges();
			});

			it('should return true', () => {
				expect(component.isDarkTheme).toBeTrue();
			});
		});
	});

	describe('when call isDefined', () => {
		describe('when isDefined gets undefined type', () => {
			it('should return false', () => {
				expect(component.isDefined(undefined)).toBeFalse();
			});
		});

		describe('when isDefined gets not undefined type', () => {
			let testValues: any[];

			beforeEach(() => {
				testValues = [false, null, 0, 'disabled'];
			});

			it('should return true', () => {
				testValues.forEach((testValue: any) => {
					expect(component.isDefined(testValue));
				});
			});
		});
	});
});
