import { Component } from '@angular/core';
import { ButtonType } from 'src/app/libs/common-components/components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { ContainerFacadeService } from '../../../../services/container.facade';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	constructor(public containerFacadeService: ContainerFacadeService) {}
}
