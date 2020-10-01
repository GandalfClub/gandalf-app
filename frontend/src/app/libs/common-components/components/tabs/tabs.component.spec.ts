import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentTheme } from '../../shared/component-theme.enum';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
	let component: TabsComponent;
	let fixture: ComponentFixture<TabsComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ TabsComponent ],
			imports: [ MatTabsModule ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TabsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets theme', () => {
		describe('theme is Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Dark;
				fixture.detectChanges();
			});

			it('should show dark themed tabs', () => {
				expect(htmlElement.querySelector('.tabs--dark-theme')).toBeTruthy();
			});
		});
		describe('theme is not provided', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Light;
				fixture.detectChanges();
			});

			it('should show light themed tabs', () => {
				expect(htmlElement.querySelector('.tabs')).toBeTruthy();
				expect(htmlElement.querySelector('.tabs--dark-theme')).toBeNull();
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
});
