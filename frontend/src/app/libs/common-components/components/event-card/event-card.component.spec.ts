import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { Tag } from '../tag-list/models/tag';
import { TagListComponent } from '../tag-list/tag-list.component';

import { EventCardComponent } from './event-card.component';
import { EventCardColor } from './models/event-card-color';
import { EventCardRole } from './models/event-card-role';
import { EventCardRoundedCorner } from './models/event-card-rounded-corner';
import { EventCardSize } from './models/event-card-size';

const title: string = 'Event name';
const startDate: Date = new Date('2020-01-01');
const endDate: Date = new Date('2020-01-05');
const progress: number = 69;
const participants: number = 13;
const importantRoles: EventCardRole[] = [
	EventCardRole.HR,
	EventCardRole.Manager,
	EventCardRole.Mentor
];
const expectedTags: Tag[] = importantRoles.map((role: EventCardRole) => {
	return {
		label: role,
		value: role
	};
});

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

	describe('when @Input gets one of important role', () => {
		beforeEach(() => {
			component.roles = importantRoles;
			fixture.detectChanges();
		});

		it('should define roles', () => {
			expect(component.roles).toEqual(importantRoles);
		});

		it('should show colored background', () => {
			expect(htmlElement.querySelector('.event-card__container--color--important-role')).toBeTruthy();
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
		describe('when have not important roles', () => {
			beforeEach(() => {
				component.color = EventCardColor.Primary;
				fixture.detectChanges();
			});

			it('should show colored background', () => {
				expect(htmlElement.querySelector('.event-card__container--color--primary'));
			});
		});
	});

	describe('when @Input gets size', () => {
		beforeEach(() => {
			component.size = EventCardSize.Large;
			fixture.detectChanges();
		});

		it('should show large card', () => {
			expect(htmlElement.querySelector('.event-card__container--size--large'));
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

	describe('when call hasImportantRoles', () => {
		beforeEach(() => {
			component.roles = importantRoles;
			fixture.detectChanges();
		});

		it('should return true', () => {
			expect(component.hasImportantRoles).toBeTrue();
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
