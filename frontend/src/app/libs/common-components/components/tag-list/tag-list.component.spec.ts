import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tag } from '../../models/tag';

import { TagListComponent } from './tag-list.component';

const tags: Tag[] = [
	new Tag('Tag label', '1', false, null),
	new Tag('Tag label', '2', false, null)
];

describe('TagListComponent', () => {
	let component: TagListComponent;
	let fixture: ComponentFixture<TagListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ TagListComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TagListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
