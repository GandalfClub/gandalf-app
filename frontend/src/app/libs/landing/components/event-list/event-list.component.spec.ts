import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import {Location} from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { EventListComponent } from './event-list.component';
import { routes } from 'src/app/app-routing.module';
import { CommonComponentsDemoComponent } from 'src/app/libs/common-components-demo/common-components-demo.component';

describe('EventListComponent', () => {
	let component: EventListComponent;
	let fixture: ComponentFixture<EventListComponent>;
	let router: Router;
	let location: Location;
	const mockRoutes: Routes = [
		{
			path: 'eventsecription/:id',
			component: CommonComponentsDemoComponent
		}
	];

	const path: string = 'eventsecription/testid';

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EventListComponent ],
			imports: [RouterTestingModule.withRoutes(mockRoutes)]
		})
		.compileComponents();
		router = TestBed.inject(Router);

		location = TestBed.inject(Location);

		router.initialNavigation();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should navigate to path', fakeAsync(() => {
		router.navigate([`/eventsecription/testid`]);
		flush();
		expect(location.path()).toBe(`/${path}`);
	  }));
});
