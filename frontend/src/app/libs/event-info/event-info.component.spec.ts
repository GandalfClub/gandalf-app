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
	let router: Router;
	let activatedRoute: ActivatedRoute;
	let eventFacadeService: EventFacadeService;
	let breadcrumbFacadeService: BreadcrumbFacadeService;
	const eventMock: Event = { tasks: ['1', '2'] } as Event;
	const tabMock: Tab = { title: Tabs.Tasks, amount: 0 } as Tab;

	eventFacadeService = {
		eventValue$: of(eventMock)
	} as EventFacadeService;

	breadcrumbFacadeService = {
		loadBreadcrumb: (_: string) => { }
	} as BreadcrumbFacadeService;

	router = jasmine.createSpyObj('Router', ['navigate']);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EventInfoComponent],
			providers: [
				{ provide: Router, useValue: router },
				{ provide: ActivatedRoute, useValue: activatedRoute },
				{ provide: EventFacadeService, useValue: eventFacadeService },
				{ provide: BreadcrumbFacadeService, useValue: breadcrumbFacadeService },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		router = TestBed.inject(Router);
		activatedRoute = TestBed.inject(ActivatedRoute);
		eventFacadeService = TestBed.inject(EventFacadeService);
		breadcrumbFacadeService = TestBed.inject(BreadcrumbFacadeService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('changeTab', () => {
		it('should set currentTab field', () => {
			component.changeTab(tabMock);
			expect(component.currentTab).toEqual(tabMock);
		});

		it('should navigate using tab title', () => {
			component.changeTab(tabMock);
			expect(router.navigate).toHaveBeenCalledWith([tabMock.title], { relativeTo: activatedRoute });
		});
	});
});
