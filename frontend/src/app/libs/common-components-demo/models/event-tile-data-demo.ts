import { EventTileMenuItem } from '../../common-components/models/event-tile-menu-item';

export interface EventTileDataDemo {
	startDateTime: Date;
	endDateTime: Date;
	statusList: string[];
	menuItems: EventTileMenuItem[];
}
