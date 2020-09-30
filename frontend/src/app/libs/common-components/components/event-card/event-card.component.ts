import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventCardSize as EventCardSize } from './models/event-card-size';
import { NgClassInput } from '../../models/ng-class-input';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { EventCardColor } from './models/event-card-color';
import { EventCardRoundedCorner } from './models/event-card-rounded-corner';
import { Tag } from '../tag-list/models/tag';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnChanges {

	@Input()
	public title: string;

	@Input()
	public startDate: Date;

	@Input()
	public endDate: Date;

	@Input()
	public progress: number;

	@Input()
	public draft: boolean;

	@Input()
	public participants: number;

	@Input()
	public roles: string[] = [];

	@Input()
	public roundedCorner: EventCardRoundedCorner;

	@Input()
	public color: EventCardColor;

	@Input()
	public size: EventCardSize = EventCardSize.Small;

	@Input()
	public hideNotStartedLabel: boolean = false;

	public tags: Tag[];

	public ngOnChanges(changes: SimpleChanges): void {
		if (this.draft) {
			this.tags = [{
				label: 'Draft',
				value: 'Draft'
			}];
		}

		if ('roles' in changes) {
			this.tags = this.roles.map((role: string) => {
				return {
					label: role,
					value: role
				};
			});
		}
	}

	public get cardContainerModifiers(): NgClassInput {
		return {
			'event-card__container--color--primary': this.color === EventCardColor.Primary,
			'event-card__container--color--secondary': this.color === EventCardColor.Secondary,
			'event-card__container--color--tertiary': this.color === EventCardColor.Tertiary,
			'event-card__container--color--important-role': this.color === EventCardColor.ImportantRole,
			'event-card__container--color--draft': this.draft,
			'event-card__container--rounded-corner--top-left': this.roundedCorner === EventCardRoundedCorner.TopLeft,
			'event-card__container--rounded-corner--top-right': this.roundedCorner === EventCardRoundedCorner.TopRight,
			'event-card__container--rounded-corner--bottom-right': this.roundedCorner === EventCardRoundedCorner.BottomRight,
			'event-card__container--rounded-corner--bottom-left': this.roundedCorner === EventCardRoundedCorner.BottomLeft,
			'event-card__container--size--small': this.size === EventCardSize.Small,
			'event-card__container--size--large': this.size === EventCardSize.Large
		};
	}

	public get lightTheme(): ComponentTheme {
		return ComponentTheme.Light;
	}

	public get darkTheme(): ComponentTheme {
		return ComponentTheme.Dark;
	}

	public get isNotStartedLabelShown(): boolean {
		return !this.hideNotStartedLabel && this.endDate && !this.draft && this.roles.length === 0;
	}

	public get isProgressDefined(): boolean {
		return typeof this.progress === 'number';
	}
}
