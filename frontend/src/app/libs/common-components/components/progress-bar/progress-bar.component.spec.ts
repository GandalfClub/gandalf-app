import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { ComponentTheme } from '../../shared/component-theme.enum';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
	let component: ProgressBarComponent;
	let fixture: ComponentFixture<ProgressBarComponent>;
	const progress: number = 40;
	const percent: number = 100;
	let progressFill: DebugElement = null;
	let htmlElement: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProgressBarComponent ],
			imports: [ MatProgressBarModule ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProgressBarComponent);
		component = fixture.componentInstance;

		htmlElement = fixture.nativeElement;

		component.progress = progress;
		component.theme = ComponentTheme.Dark;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets progress value', () => {
		it('should render a properly progress status', () => {
			progressFill = fixture.debugElement.query(By.css('.mat-progress-bar-fill'));
			expect(progressFill.nativeElement.style.transform).toEqual(`scaleX(${progress / percent})`);
		});
	});

	describe('when theme is Dark', () => {
		it('should include dark-theme class', () => {
			expect(htmlElement.querySelector('.progress-bar--dark-theme')).toBeTruthy();
		});
	});

});
