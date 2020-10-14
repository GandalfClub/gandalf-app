import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { RadioGroupDataDemo } from 'src/app/libs/common-components-demo/models/radio-group-data-demo';
import { ComponentTheme } from '../../shared/component-theme.enum';

import { RadioGroupComponent } from './radio-group.component';

const testData: RadioGroupDataDemo = {
	title: 'Radio group Title',
	value: 2,
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
		},
	],
	labelField: 'title',
	valueField: 'value',
};

describe('RadioGroupComponent', () => {
	let component: RadioGroupComponent;
	let fixture: ComponentFixture<RadioGroupComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RadioGroupComponent],
			imports: [MatRadioModule],
		}).compileComponents();
		fixture = TestBed.createComponent(RadioGroupComponent);
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

		it('should show radio button for each option', () => {
			expect(htmlElement.querySelectorAll('.radio-group__radio-button').length).toBe(testData.options.length);
		});
	});

	describe('when @Input gets theme', () => {
		describe('when theme is Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Dark;
				fixture.detectChanges();
			});

			it('should show dark radio button', () => {
				expect(htmlElement.querySelector('.radio-group--dark-theme')).toBeTruthy();
				expect(htmlElement.querySelector('.radio-group__radio-button--dark-theme')).toBeTruthy();
				expect(htmlElement.querySelector('.radio-group__radio-label')).toBeTruthy();
			});
		});
	});

	describe('when @Input gets title', () => {
		const title: string = 'Test Title of component';

		beforeEach(() => {
			component.title = title;
			fixture.detectChanges();
		});

		it('should show title', () => {
			expect(htmlElement.querySelector('.radio-group__title').textContent).toContain(title);
		});
	});

	describe('when @Input gets value', () => {
		beforeEach(() => {
			component.value = testData.value;
			fixture.detectChanges();
		});

		it('should define value', () => {
			expect(component.value).toBe(testData.value);
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

		it('should show radio labels', () => {
			htmlElement.querySelectorAll('.radio-group__radio-label').forEach((labelElement: HTMLElement, index: number) => {
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

	describe('when click radio', () => {
		let radioButtons: DebugElement[];

		beforeEach(() => {
			component.value = testData.value;
			component.valueField = testData.valueField;
			component.labelField = testData.labelField;
			fixture.detectChanges();

			radioButtons = fixture.debugElement.queryAll(By.css('.mat-radio-container'));
		});

		describe('when click unchecked radio', () => {
			beforeEach(() => {
				spyOn(component.valueChange, 'emit').and.callThrough();
				radioButtons[0].nativeElement.click();
				fixture.detectChanges();
			});

			it('should emit valueChange @Output', () => {
				expect(component.valueChange.emit).toHaveBeenCalled();
			});

			it('value should be changed', () => {
				expect(component.value).toBe(testData.options[0].value);
			});
		});

		describe('when click checked radio', () => {
			beforeEach(() => {
				radioButtons[1].nativeElement.click();
			});

			it('value should not be changed', () => {
				expect(component.value).toBe(testData.value);
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
