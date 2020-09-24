import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Tag } from '../../models/tag';
import { ComponentTheme } from '../../shared/component-theme.enum';

import { TagListComponent } from './tag-list.component';

const tags: Tag[] = [
	{
		label: 'Tab label 1',
		value: '1',
		selected: false,
		removed: false,
		onClick: () => {
			return true;
		}
	},
	{
		label: 'Tab label 2',
		value: '2',
		selected: true,
		removed: false
	}
];

describe('TagListComponent', () => {
	let component: TagListComponent;
	let fixture: ComponentFixture<TagListComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ TagListComponent ],
			imports: [ MatChipsModule ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TagListComponent);
		component = fixture.componentInstance;
		component.tags = tags.map((tag: Tag) => {
			return {
				label: tag.label,
				value: tag.value,
				selected: tag.selected,
				removed: tag.removed,
				onClick: tag.onClick
			};
		});
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets tags', () => {
		it('should define tags', () => {
			expect(JSON.stringify(component.tags)).toBe(JSON.stringify(tags));
		});

		it('should show all provided tags', () => {
			const tagElements: NodeListOf<HTMLElement> = htmlElement.querySelectorAll('mat-chip');
			expect(tagElements.length).toBe(tags.length);
		});

		it('should show labels', () => {
			const tagLabelElements: NodeListOf<HTMLElement> = htmlElement.querySelectorAll('mat-chip > span');
			tagLabelElements.forEach((tagElement: HTMLElement, index: number) => {
				expect(tagElement.innerHTML).toContain(tags[index].label);
			});
		});

		describe('when tag have removed flag', () => {
			beforeEach(() => {
				component.tags.forEach((tag: Tag) => {
					tag.removed = true;
				});
				fixture.detectChanges();
			});

			it('should hide removed tags', () => {
				expect(htmlElement.querySelector('mat-chip')).toBeNull();
			});
		});
	});

	describe('when @Input gets removable as true', () => {
		beforeEach(() => {
			component.removable = true;
			fixture.detectChanges();
		});

		it('should define removable', () => {
			expect(component.removable).toBeTrue();
		});

		it('should show remove button on each tag', () => {
			const closeIconElements: NodeListOf<HTMLElement> = htmlElement.querySelectorAll('mat-chip > mat-icon');
			expect(closeIconElements.length).toBe(tags.length);
		});

		describe('when remove button clicked', () => {
			it('should emit onRemove @Event', () => {
				const onRemoveSpy: jasmine.Spy = spyOn(component.onRemove, 'emit');
				const closeIconElement: HTMLElement = htmlElement.querySelector('mat-chip > mat-icon');
				closeIconElement.click();
				expect(onRemoveSpy).toHaveBeenCalledWith(tags[0]);
			});
		});
	});

	describe('when @Input gets selectable', () => {
		describe('when selectable is true', () => {
			beforeEach(() => {
				component.selectable = true;
				fixture.detectChanges();
			});

			it('should define selectable as true', () => {
				expect(component.selectable).toBeTrue();
			});

			it('all tags should show selected state', () => {
				const tagElements: NodeListOf<HTMLElement> = htmlElement.querySelectorAll('mat-chip');
				tags.forEach((tag: Tag, index: number) => {
					expect(tagElements[index].classList.contains('mat-chip-selected')).toBe(tag.selected);
				});
			});
		});

		describe(('when selectable is false or was not provided'), () => {
			beforeEach(() => {
				component.selectable = false;
				fixture.detectChanges();
			});

			it('should define selectable as false', () => {
				expect(component.selectable).toBeFalse();
			});

			it('all tags should be shown as unselected', () => {
				expect(htmlElement.querySelector('.mat-chip-selected')).toBeNull();
			});
		});
	});

	describe('when @Input gets theme', () => {
		describe('theme is Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Dark;
				fixture.detectChanges();
			});

			it('should show dark themed tag-list', () => {
				expect(htmlElement.querySelector('.tag-list--dark-theme')).toBeTruthy();
			});
		});
		describe('theme is not provided', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Light;
				fixture.detectChanges();
			});

			it('should show light themed tag-list', () => {
				expect(htmlElement.querySelector('.tag-list')).toBeTruthy();
				expect(htmlElement.querySelector('.tag-list--dark-theme')).toBeNull();
			});
		});
	});

	describe('when user clicks tag', () => {
		it('should emit onClick @Event', () => {
			const onClickSpy: jasmine.Spy = spyOn(component.onClick, 'emit');
			const tagElement: HTMLElement = htmlElement.querySelector('mat-chip');
			tagElement.click();
			expect(onClickSpy).toHaveBeenCalledWith({ tag: tags[0], selectable: false });
		});

		it('should call additional tag-action if that was provided', () => {
			const onClickFirstElementSpy: jasmine.Spy = spyOn(component.tags[0], 'onClick');
			const tagElement: HTMLElement = htmlElement.querySelector('mat-chip');
			tagElement.click();
			expect(onClickFirstElementSpy).toHaveBeenCalled();
		});
	});
});
