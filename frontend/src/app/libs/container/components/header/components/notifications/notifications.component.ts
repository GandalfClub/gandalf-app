import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/services/container-facade.service';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	constructor(public containerFacadeService: ContainerFacadeService) {}
}
