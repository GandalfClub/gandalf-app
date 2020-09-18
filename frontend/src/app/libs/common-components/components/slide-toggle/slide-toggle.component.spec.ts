import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideToggleComponent } from './slide-toggle.component';
import { CommonComponentsModule } from '../../common-components.module';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

describe('SlideToggleComponent', () => {
	let component: SlideToggleComponent;
	let fixture: ComponentFixture<SlideToggleComponent>;
	let htmlElement: HTMLElement;
	let toggleEl: HTMLElement;
	let toggleDebug: DebugElement;

  beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SlideToggleComponent ],
			imports: [CommonComponentsModule]
		})
		.compileComponents();
  }));

  beforeEach(() => {
		fixture = TestBed.createComponent(SlideToggleComponent);
		component = fixture.componentInstance;
		htmlElement = fixture.nativeElement;
		toggleEl = fixture.debugElement.query(By.css('mat-slide-toggle')).nativeElement;
		component.disabled = false;
		component.theme = ComponentTheme.Dark;
		fixture.detectChanges();
  });

  it('should create', () => {
		expect(component).toBeTruthy();
  });

  it('should become non disabled when @Input isDisabled===false', () => {
		expect(toggleEl.attributes['ng-reflect-disabled'].value).toBe('false');
  });

	it('should support black theme', () => {
		expect(toggleEl.className.includes('mat-slide-toggle-bar-dark')).toBeTruthy();
	});

  describe('toggle status', () => {
		beforeEach(() => {
			toggleDebug = fixture.debugElement.query(By.css('mat-slide-toggle'));
			toggleDebug.triggerEventHandler('change', null);
			fixture.detectChanges();
		});

		it('should send proper Output', () => {
			expect(component.value).toBe(true);
		});
  });
});
