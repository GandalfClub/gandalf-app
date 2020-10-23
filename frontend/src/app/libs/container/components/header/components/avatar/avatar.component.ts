import { Component, Input } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/services/container-facade.service';
import { UserService } from 'src/app/libs/container/services/user.service';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	@Input()
	public userName: string = '';

	public get displayedName(): string {
		return Boolean(this.userService.userFullName) ?
		this.userService.userFullName :
		this.userService.userEmail;
	}

	constructor(public userService: UserService, public containerFacadeService: ContainerFacadeService) {}
}
