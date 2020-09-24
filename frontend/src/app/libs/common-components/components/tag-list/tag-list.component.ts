import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Tag } from '../../models/tag';
import { TagClickEvent } from '../../models/tag-click-event';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
	styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {

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

	@Output()
	public onClick: EventEmitter<TagClickEvent> = new EventEmitter<TagClickEvent>();

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public onTagRemove(tag: Tag): void {
		this.onRemove.emit(tag);
	}

	public onTagClick(tag: Tag): void {
		if (tag.onClick) {
			tag.onClick();
		}

		const tagClickEvent: TagClickEvent = {
			tag,
			selectable: this.selectable
		};
		this.onClick.emit(tagClickEvent);
	}
}
