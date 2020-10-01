import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { TagListComponent } from '../tag-list/tag-list.component';

import { EventCardComponent } from './event-card.component';
import { EventCardColor } from './models/event-card-color';
import { EventCardRoundedCorner } from './models/event-card-rounded-corner';
import { EventCardSize } from './models/event-card-size';

const title: string = 'Event name';
const startDate: Date = new Date('2020-01-01');
const endDate: Date = new Date('2020-01-05');
const progress: number = 69;
const participants: number = 13;
const roles: string[] = ['Mentor', 'HR', 'Manger'];

describe('EventCardComponent', () => {
	let component: EventCardComponent;
	let fixture: ComponentFixture<EventCardComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ EventCardComponent, TagListComponent ],
			imports: [ MatChipsModule ]
		})
		.compileComponents();

		fixture = TestBed.createComponent(EventCardComponent);
		component = fixture.componentInstance;
		component.startDate = startDate;
		component.endDate = endDate;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets title', () => {
		beforeEach(() => {
			component.title = title;
			fixture.detectChanges();
		});

		it('should show title', () => {
			expect(htmlElement.querySelector('.event-card__title').textContent).toContain(title);
		});
	});

	describe('when @Input gets startDate and endDate', () => {
		it('should define startDate', () => {
			expect(component.startDate).toEqual(startDate);
		});

		it('should define endDate', () => {
			expect(component.startDate).toEqual(startDate);
		});

		describe('when @Input does not get endDate', () => {
			beforeEach(() => {
				component.endDate = undefined;
				fixture.detectChanges();
			});

			it('should not show not-started label', () => {
				expect(htmlElement.querySelector('.event-card__not-started-label')).toBeNull();
			});
		});
	});

	describe('when @Input gets endDate', () => {
		beforeEach(() => {
			component.endDate = endDate;
			fixture.detectChanges();
		});

		it('should define endDate', () => {
			expect(component.endDate).toEqual(endDate);
		});
	});

	describe('when @Input gets progress', () => {
		beforeEach(() => {
			component.progress = progress;
			fixture.detectChanges();
		});

		it('should define progress', () => {
			expect(component.progress).toBe(progress);
		});
	});

	describe('when @Input gets draft', () => {
		beforeEach(() => {
			component.draft = true;
			fixture.detectChanges();
		});

		it('should define draft', () => {
			expect(component.draft).toBeTrue();
		});
	});

	describe('when @Input gets participants', () => {
		beforeEach(() => {
			component.participants = participants;
			fixture.detectChanges();
		});

		it('should show participants quantity', () => {
			expect(htmlElement.querySelector('.event-card__participants').textContent).toContain(participants.toString());
		});
	});

	describe('when @Input gets roles', () => {
		beforeEach(() => {
			component.roles = roles;
			fixture.detectChanges();
		});

		it('should define roles', () => {
			expect(component.roles).toEqual(roles);
		});
	});

	describe('when @Input gets roundedCorner', () => {
		beforeEach(() => {
			component.roundedCorner = EventCardRoundedCorner.TopRight;
			fixture.detectChanges();
		});

		it('should show roundedCorner', () => {
			expect(htmlElement.querySelector('.event-card__container--rounded-corner--top-right'));
		});
	});

	describe('when @Input gets color', () => {
		describe('when color is Primary', () => {
			beforeEach(() => {
				component.color = EventCardColor.Primary;
				fixture.detectChanges();
			});

			it('should show primary background', () => {
				expect(htmlElement.querySelector('.event-card__container--color--primary'));
			});
		});

		describe('when color is Secondary', () => {
			beforeEach(() => {
				component.color = EventCardColor.Secondary;
				fixture.detectChanges();
			});

			it('should show secondary background', () => {
				expect(htmlElement.querySelector('.event-card__container--color--secondary'));
			});
		});

		describe('when color is Tertiary', () => {
			beforeEach(() => {
				component.color = EventCardColor.Tertiary;
				fixture.detectChanges();
			});

			it('should show tertiary background', () => {
				expect(htmlElement.querySelector('.event-card__container--color--tertiary'));
			});
		});

		describe('when color is ImportantRole', () => {
			beforeEach(() => {
				component.color = EventCardColor.ImportantRole;
				fixture.detectChanges();
			});

			it('should show color for important roles', () => {
				expect(htmlElement.querySelector('.event-card__container--color--important-role'));
			});
		});
	});

	describe('when @Input gets size', () => {
		describe('when @Input gets large size', () => {
			beforeEach(() => {
				component.size = EventCardSize.Large;
				fixture.detectChanges();
			});

			it('should show large card', () => {
				expect(htmlElement.querySelector('.event-card__container--size--large'));
			});
		});

		describe('when @Input gets small size', () => {
			beforeEach(() => {
				component.size = EventCardSize.Small;
				fixture.detectChanges();
			});

			it('should show small card', () => {
				expect(htmlElement.querySelector('.event-card__container--size--small'));
			});
		});
	});

	describe('when @Input gets hideNotStartedLabel', () => {
		describe('hideNotStartedLabel is true', () => {
			beforeEach(() => {
				component.hideNotStartedLabel = true;
				fixture.detectChanges();
			});

			it('should hide not-started label', () => {
				expect(htmlElement.querySelector('.event-card__not-started-label')).toBeNull();
			});
		});

		describe('hideNotStartedLabel is false', () => {
			beforeEach(() => {
				component.hideNotStartedLabel = false;
				fixture.detectChanges();
			});

			it('should hide not-started label', () => {
				expect(htmlElement.querySelector('.event-card__not-started-label').textContent).toContain('Not started');
			});
		});
	});

	describe('when call lightTheme', () => {
		it('should return light theme', () => {
			expect(component.lightTheme).toBe(ComponentTheme.Light);
		});
	});

	describe('when call darkTheme', () => {
		it('should return dark theme', () => {
			expect(component.darkTheme).toBe(ComponentTheme.Dark);
		});
	});

	describe('when call isNotStartedLabelShown', () => {
		describe('when hideNotStartedLabel is true', () => {
			beforeEach(() => {
				component.hideNotStartedLabel = true;
				fixture.detectChanges();
			});

			it('should return false', () => {
				expect(component.isNotStartedLabelShown).toBeFalse();
			});
		});

		describe('when card is draft', () => {
			beforeEach(() => {
				component.draft = true;
				fixture.detectChanges();
			});

			it('should return false', () => {
				expect(component.isNotStartedLabelShown).toBeFalse();
			});
		});

		describe('when have not endDate', () => {
			beforeEach(() => {
				component.endDate = undefined;
				fixture.detectChanges();
			});

			it('should return falsy value', () => {
				expect(component.isNotStartedLabelShown).toBeFalsy();
			});
		});
	});

	describe('when call isProgressDefined', () => {
		describe('when progress is number', () => {
			beforeEach(() => {
				component.progress = 1;
				fixture.detectChanges();
			});

			it('should return true', () => {
				expect(component.isProgressDefined).toBeTrue();
			});
		});

		describe('when progress was not provided', () => {
			it('should return falsy value', () => {
				expect(component.isProgressDefined).toBeFalsy();
			});
		});
	});
});
