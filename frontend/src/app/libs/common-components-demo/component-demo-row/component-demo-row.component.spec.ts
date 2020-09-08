import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDemoRowComponent } from './component-demo-row.component';
import { BoxSize } from '../models/box-size';
import { DemoComponentState } from '../models/demo-component-state.ts';
import { Template } from '@angular/compiler/src/render3/r3_ast';

const defaultStates: DemoComponentState[] = [
	{
		name: 'state-1',
		template: null
	},
	{
		name: 'state-2',
		template: null
	}
];

describe('ComponentDemoComponent', () => {
	let component: ComponentDemoRowComponent;
	let fixture: ComponentFixture<ComponentDemoRowComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ ComponentDemoRowComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(ComponentDemoRowComponent);
		component = fixture.componentInstance;
		component.states = defaultStates;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets name', () => {
		const name: string = 'Contest';

		beforeEach(() => {
			component.name = name;
			fixture.detectChanges();
		});

		it('should show demo component name', () => {
			expect(htmlElement.querySelector('.component-demo-row__name').outerHTML).toContain(name);
		});
	});

	describe('when @Input gets container', () => {
		const container: BoxSize = {
			width: 400,
			height: 200
		};

		beforeEach(() => {
			component.container = container;
			fixture.detectChanges();
		});

		it('should style container size', () => {
			const cellContainer: HTMLElement = htmlElement.querySelector('.component-demo-row__state-container');
			expect(Number(cellContainer.getAttribute('width'))).toEqual(container.width);
			expect(Number(cellContainer.getAttribute('height'))).toEqual(container.height);
		});
	});

	describe('when @Input do not get container', () => {
		it('should have auto container size', () => {
			const cellContainer: HTMLElement = htmlElement.querySelector('.component-demo-row__state-container');
			expect(cellContainer.getAttribute('width')).toEqual('auto');
			expect(cellContainer.getAttribute('height')).toEqual('auto');
		});
	});

	describe('when @Input gets states', () => {
		beforeEach(() => {
			component.states = component.states;
			fixture.detectChanges();
		});

		it('should show state names', () => {
			htmlElement.querySelectorAll('.component-demo-row__state-name').forEach((nameContainer: HTMLElement, index: number) => {
				expect(nameContainer.outerHTML).toContain(defaultStates[index].name);
			});
		});

		it('should show container for each state', () => {
			expect(htmlElement.querySelectorAll('.component-demo-row__state-container').length).toBe(defaultStates.length);
		});
	});

	describe('when call isHeaderShown', () => {
		describe('if one of state names is Truthy', () => {
			beforeEach(() => {
				component.states = [
					{
						name: 'state-1',
						template: null
					},
					{
						name: null,
						template: null
					}
				];
				fixture.detectChanges();
			});

			it('should return true', () => {
				expect(component.isHeaderShown).toBeTrue();
			});
		});

		describe('if all state names Falsy', () => {
			beforeEach(() => {
				component.states = [
					{
						name: '',
						template: null
					},
					{
						name: null,
						template: null
					}
				];
				fixture.detectChanges();
			});

			it('should return false', () => {
				expect(component.isHeaderShown).toBeFalse();
			});
		});
	});
});
