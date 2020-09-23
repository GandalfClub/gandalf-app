import { Component } from '@angular/core';
import { Tag } from 'src/app/libs/common-components/models/tag';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-tag-demo',
  templateUrl: './tag-demo.component.html',
  styleUrls: ['./tag-demo.component.scss']
})
export class TagDemoComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	public tags: Tag[] = [
		new Tag('Tag label', '1', false, this.onClick),
		new Tag('Tag label', '2', false, this.onClick),
	];

	public tagsSelectable: Tag[] = [
		new Tag('Tag label', '3', false, this.onClick),
		new Tag('Tag label', '4', true, this.onClick),
	];

	private get onClick(): Function {
		return (): void => {
			console.log(`Tag was clicked`);
		};
	}

	public onRemove(tag: Tag): void {
		console.log(`Tag with value ${tag.value} was removed`);
	}
}
