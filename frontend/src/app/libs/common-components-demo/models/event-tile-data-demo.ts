import { BoxSize } from './box-size';
import { EventTileMenuItem } from '../../common-components/models/event-tile-menu-item';

export interface EventTileDataDemo {
	container: BoxSize;
	startDateTime: Date;
	endDateTime: Date;
	statusList: string[];
	menuItems: EventTileMenuItem[];
}
