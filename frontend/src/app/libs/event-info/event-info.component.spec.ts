import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of} from 'rxjs';
import { BreadcrumbFacadeService } from '../common-components/components/breadcrumb/store/breadcrumb.facade';
import { Tab } from '../common-components/components/tab-navigation/models/tab.model';
import { Tabs } from '../common-components/components/tab-navigation/models/tabs.enum';
import { EventFacadeService } from '../event-description/store/event/event.facade';
import { Event } from '../landing/models/event';
import { EventInfoComponent } from './event-info.component';

describe('EventInfoComponent', () => {
	let component: EventInfoComponent;
	let fixture: ComponentFixture<EventInfoComponent>;
	let eventFacadeService: EventFacadeService;
	let breadcrumbFacadeService: BreadcrumbFacadeService;

	const eventMock: Event = {
		tasks: ['1', '2'],
		generalInfo: {
			title: 'someTitle',
		},
	} as Event;
	const tabMock: Tab = { title: Tabs.Tasks, amount: 0 };

	const activatedRoute: ActivatedRoute = {} as ActivatedRoute;

	eventFacadeService = {
		eventValue$: of(eventMock)
	} as EventFacadeService;

	breadcrumbFacadeService = {
		loadBreadcrumb: (_: string) => { }
	} as BreadcrumbFacadeService;

	const router: { navigate: jasmine.Func } = {
		navigate: jasmine.createSpy('navigate'),
	} as { navigate: jasmine.Func };

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EventInfoComponent],
			providers: [
				{ provide: Router, useValue: router },
				{ provide: ActivatedRoute, useValue: activatedRoute },
				{ provide: EventFacadeService, useValue: eventFacadeService },
				{ provide: BreadcrumbFacadeService, useValue: breadcrumbFacadeService },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.currentTab = {} as any;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('#changeTab', () => {
		beforeEach(() => {
			component.changeTab(tabMock);
		});

		it('should set currentTab field', () => {
			expect(component.currentTab).toEqual(tabMock);
		});

		it('should call navigate', () => {
			expect(router.navigate).toHaveBeenCalled();
		});
	});
});
