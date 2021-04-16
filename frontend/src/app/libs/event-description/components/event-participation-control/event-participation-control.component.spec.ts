import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/libs/auth/models/user';
import { Event } from '../../../landing/models/event';
import { EventParticipationControlComponent } from './event-participation-control.component';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { EventParticipationControlTypes } from '../../models/participation-control-types.enum';
import { EventParticipation } from 'src/app/libs/landing/models/event-participation.class';

describe('EventParticipationControlComponent', () => {
	let component: EventParticipationControlComponent;
	let fixture: ComponentFixture<EventParticipationControlComponent>;
	let mockUser: User;
	let mockEvent: Event;
	let mockparticipation: EventParticipation;
	let router: Router;
	let activatedRoute: ActivatedRoute;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EventParticipationControlComponent],
			providers: [
				{ provide: Router, useValue: router },
				{ provide: ActivatedRoute, useValue: activatedRoute },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventParticipationControlComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		router = TestBed.inject(Router);
		activatedRoute = TestBed.inject(ActivatedRoute);

		mockUser = {
			id: '1',
			email: 'test@test',
			isAdmin: false,
			claims: []
		};

		mockEvent = {
			id: 'test',
			title: 'test',
			description: 'test',
			created: null,
			startDate: null,
			startTime: null,
			endDate: null,
			endTime: null,
			users: [],
			size: EventCardSize.S,
			eventParticipations: [],
			roles: [],
			tasks: []
		};

		component.user = mockUser;
		component.event = mockEvent;
		mockparticipation = new EventParticipation(component.user.id, component.event.id);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('onTakePart: ', () => {
		let emitterSpy: jasmine.Spy;

		beforeEach(() => {
			emitterSpy = spyOn(component.registered, 'emit');
			component.onTakePart(component.event, component.user);
		});

		it('should call registered emitter', () => {
			expect(emitterSpy).toHaveBeenCalled();
		});

		it('should call registered emitter with an EventParticipation instance', () => {
			expect(emitterSpy).toHaveBeenCalledWith(mockparticipation);
		});
	});

	describe('getControlType:', () => {
		const startTime: number = 24;
		const endTime: number = 48;

		it(`should return "takePart" type if user doesn't participate for event`, () => {
			const type: EventParticipationControlTypes = component.getControlType(component.event, component.user);
			expect(type).toEqual(EventParticipationControlTypes.TakePart);
		});

		it(`should return "approved" type if admin has approved user participation for event and event hasn't started yet`, () => {
			mockparticipation.approved = true;
			const startDate: number = new Date().getTime() + startTime;
			const endDate: number = new Date().getTime() + endTime;
			component.event.startDate = new Date(startDate);
			component.event.endDate = new Date(endDate);
			component.event.eventParticipations.push(mockparticipation);
			const type: EventParticipationControlTypes = component.getControlType(component.event, component.user);
			expect(type).toEqual(EventParticipationControlTypes.Approved);
		});

		it(`should return "waiting" type if admin hasn't approved user participation for event yet`, () => {
			component.event.eventParticipations.push(mockparticipation);
			const type: EventParticipationControlTypes = component.getControlType(component.event, component.user);
			expect(type).toEqual(EventParticipationControlTypes.Waiting);
		});

		it(`should return "open event" type if admin has approved user participation for event and event has already started`, () => {
			mockparticipation.approved = true;
			const startDate: number = new Date().getTime() - startTime;
			const endDate: number = new Date().getTime() + endTime;
			component.event.startDate = new Date(startDate);
			component.event.endDate = new Date(endDate);
			component.event.eventParticipations.push(mockparticipation);
			const type: EventParticipationControlTypes = component.getControlType(component.event, component.user);
			expect(type).toEqual(EventParticipationControlTypes.OpenEvent);
		});

		it(`should return "no user" if no user or user not registered`, () => {
			component.user = null;
			const type: EventParticipationControlTypes = component.getControlType(component.event, component.user);
			expect(type).toEqual(EventParticipationControlTypes.NoUser);
		});
	});
});
