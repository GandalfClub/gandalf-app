import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}
// describe('TableComponent', () => {
// 	let component: TableComponent<PeriodicElement>;
// 	let fixture: ComponentFixture<TableComponent<PeriodicElement>>;

// 	beforeEach(async(() => {
// 		TestBed.configureTestingModule({
// 			declarations: [ TableComponent ]
// 		})
// 		.compileComponents();
// 	}));

	// beforeEach(() => {
	// 	fixture = TestBed.createComponent(TableComponent);
	// 	component = fixture.componentInstance;
	// 	fixture.detectChanges();
	// });

	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });
// });
