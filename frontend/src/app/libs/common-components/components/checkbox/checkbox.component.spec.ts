import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { CheckboxGroupDataDemo } from 'src/app/libs/common-components-demo/models/checkbox-group-data-demo';
import { ComponentTheme } from '../../shared/component-theme.enum';

import { CheckboxComponent } from './checkbox.component';

const testData: CheckboxGroupDataDemo = {
	options: [
		{
			title: 'Option 1',
			value: 1,
		},
		{
			title: 'Option 2',
			value: 2,
		},
		{
			title: 'Option 3',
			value: 3,
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

	describe('when @Input gets theme', () => {
		describe('when theme is Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Dark;
				fixture.detectChanges();
			});

			it('should show dark checkbox button', () => {
				expect(htmlElement.querySelector('.mat-checkbox-dark')).toBeTruthy();
				expect(htmlElement.querySelector('.mat-checkbox')).toBeTruthy();
			});
		});
	});

	describe('when @Input gets labelField', () => {
		beforeEach(() => {
			component.labelField = testData.labelField;
			fixture.detectChanges();
		});

		it('should define labelField', () => {
			expect(component.labelField).toBe(testData.labelField);
		});

		it('should show checkbox labels', () => {
			htmlElement.querySelectorAll('.mat-checkbox').forEach((labelElement: HTMLElement, index: number) => {
				expect(labelElement.textContent).toContain(testData.options[index].title);
			});
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

	describe('when click checkbox', () => {
		let checkboxes: DebugElement[];

		beforeEach(() => {
			component.valueField = testData.valueField;
			component.labelField = testData.labelField;
			fixture.detectChanges();

			checkboxes = fixture.debugElement.queryAll(By.css('.mat-checkbox-container'));
		});

		describe('when click unchecked radio', () => {
			beforeEach(() => {
				spyOn(component.onChange, 'emit');
				checkboxes[0].nativeElement.click();
				fixture.detectChanges();
			});

			it('should emit onChange @Output', () => {
				expect(component.onChange.emit).toHaveBeenCalled();
			});

			it('value should be changed', () => {
				expect(component.value).toBe(testData.options[0].value);
			});
		});

		describe('when click checked radio', () => {
			beforeEach(() => {
				checkboxes[1].nativeElement.click();
			});
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

		describe('theme is not Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Light;
				fixture.detectChanges();
			});

			it('should return false', () => {
				expect(component.isDarkTheme).toBeFalse();
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
