import { SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Tag } from '../../models/tag';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
	styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnChanges {

	@Input()
	public tags: Tag[];

	@Input()
	public removable: boolean = false;

	@Input()
	public selectable: boolean = false;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Output()
	public onRemove: EventEmitter<Tag> = new EventEmitter<Tag>();

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['tags'].isFirstChange) {
			this.tags = this.tags.map((tag: Tag) => {
				return new Tag(tag.label, tag.value, tag.selected, tag.onClick);
			});
		}
	}

	public onTagRemove(tag: Tag): void {
		tag.removed = true;
		this.onRemove.emit(tag);
	}

	public toggleSelectionOf(tag: Tag): void {
		if (this.selectable) {
			tag.selected = !tag.selected;
		}
	}
}
