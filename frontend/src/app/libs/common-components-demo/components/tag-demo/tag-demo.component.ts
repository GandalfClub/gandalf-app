import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tag } from 'src/app/libs/common-components/components/tag-list/models/tag';
import { TagClickEvent } from 'src/app/libs/common-components/components/tag-list/models/tag-click-event';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-tag-demo',
  templateUrl: './tag-demo.component.html',
	styleUrls: ['./tag-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagDemoComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	public tags: Tag[] = this.createTagListDemo();
	public tagsRemovable: Tag[] = this.createTagListDemo();
	public tagsDark: Tag[] = this.createTagListDemo();
	public tagsRemovableDark: Tag[] = this.createTagListDemo();

	public onClick(tagClickEvent: TagClickEvent): void {
		const tag: Tag = tagClickEvent.tag;
		if (tagClickEvent.selectable) {
			tag.selected = !tag.selected;
		}
	}

	public onRemove(tag: Tag): void {
		tag.removed = true;
	}

	private createTagListDemo(): Tag[] {
		function createTag(label: string, value: string, selected: boolean, removed: boolean, onClick?: Function): Tag {
			return { label, value, selected, removed, onClick };
		}

		return [
			createTag('Tag label', '1', false, false, () => { console.log('additional click action'); }),
			createTag('Tag label', '2', true, false, null)
		];
	}
}
