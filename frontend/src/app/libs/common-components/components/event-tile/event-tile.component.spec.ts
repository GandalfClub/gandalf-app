import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTileComponent } from './event-tile.component';
import { EventTileMenuItem } from '../../models/event-tile-menu-item';

// 	FAKE DATA
const name: string = 'Event name';
const startDateTime: Date = new Date('2020-02-03T14:00');
const endDateTime: Date = new Date('2020-02-04T18:30');
const statusList: string[] = ['HR', 'Mentor', 'Administrator'];
const menuItems: EventTileMenuItem[] = [
	{
		name: 'Action-1',
		action: () => {
			console.log('action-2');
		}
	},
	{
		name: 'Action-2',
		action: () => {
			console.log('action-2');
		}
	}
];

describe('EventTileComponent', () => {
	let component: EventTileComponent;
	let fixture: ComponentFixture<EventTileComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ EventTileComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(EventTileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets isDraft', () => {
		describe('isDraft is false', () => {
			beforeEach(() => {
				component.isDraft = false;
				fixture.detectChanges();
			});

			it(`should not show Draft print`, () => {
				expect(htmlElement.querySelector('.app-event-tile__draft-print')).toBeNull();
			});
		});

		describe('isDraft is true', () => {
			beforeEach(() => {
				component.isDraft = true;
				fixture.detectChanges();
			});

			it('should show Draft print', () => {
				expect(htmlElement.querySelector('.app-event-tile__draft-print').textContent).toBeTruthy();
			});
		});
	});

	describe('when @Input gets name', () => {
		beforeEach(() => {
			component.name = name;
			fixture.detectChanges();
		});

		it('should display name', () => {
			expect(htmlElement.querySelector('.app-event-tile__title').textContent).toContain(name);
		});
	});

	describe('when @Input gets start/end DateTime', () => {
		beforeEach(() => {
			component.startDateTime = startDateTime;
			component.endDateTime = endDateTime;
			fixture.detectChanges();
		});

		it('should define startDateTime', () => {
			expect(component.startDateTime).toEqual(startDateTime);
		});

		it('should define endDateTime', () => {
			expect(component.endDateTime).toEqual(endDateTime);
		});
	});

	describe('when @Input gets statusList', () => {
		beforeEach(() => {
			component.statusList = statusList;
			fixture.detectChanges();
		});

		it('should display status list', () => {
			htmlElement.querySelectorAll('.app-event-tile__status-item').forEach((statusItemElement: HTMLLIElement, index: number) => {
				expect(statusItemElement.textContent).toContain(statusList[index]);
			});
		});
	});

	describe('when @Input gets menuItems', () => {
		beforeEach(() => {
			component.menuItems = menuItems;
			fixture.detectChanges();
		});

		it('should show menu button', () => {
			expect(htmlElement.querySelector('button.app-event-tile__menu-button')).toBeTruthy();
		});

		it('should show menu item names', () => {
			htmlElement.querySelectorAll('.app-event-tile__menu-item').forEach((menuItemElement: HTMLElement, index: number) => {
				expect(menuItemElement.textContent).toContain(component.menuItems[index].name);
			});
		});

		it('should all provided menu item actions be callable on click', () => {
			const menuActionsSpies: jasmine.Spy[] = [];
			component.menuItems.forEach((menuItem: EventTileMenuItem) => {
				menuActionsSpies.push(spyOn(menuItem, 'action'));
			});

			const menuItemElements: NodeList = htmlElement.querySelectorAll('.app-event-tile__menu-item');
			menuItemElements.forEach((menuItem: HTMLButtonElement, index: number) => {
				menuItem.click();
				expect(component.menuItems[index].action).toHaveBeenCalled();
			});
		});
	});

	describe('when call isMenuShown', () => {
		describe('if menuItems length >= 1', () => {
			beforeEach(() => {
				component.menuItems = menuItems;
				fixture.detectChanges();
			});

			it('should return true', () => {
				expect(component.isMenuShown).toBeTrue();
			});
		});

		describe('if menuItems length < 1', () => {
			beforeEach(() => {
				component.menuItems = [];
				fixture.detectChanges();
			});

			it('should return false', () => {
				expect(component.isMenuShown).toBeFalse();
			});
		});
	});
});
