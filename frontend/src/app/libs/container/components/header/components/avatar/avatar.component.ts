import { Component, Input } from '@angular/core';
import { User } from 'src/app/libs/auth/models/user';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { Localization } from 'src/app/libs/container/models/localization';
import { LocalizationService } from 'src/app/libs/container/services/localization.service';
import { DefaultAvatarUrl } from './models/default-avatar-url';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	@Input()
	public userName: string = '';

	@Input()
	private userPhotoUrl: string = '';

	@Input()
	private isEventManagerUser: boolean;

	@Input()
	private isAdminUser: boolean;

	public get localization(): Localization {
		return this.localizationService.currentLocalization;
	}

	public get photoUrl(): string {
		return Boolean(this.userPhotoUrl) ? this.userPhotoUrl :
			this.isAdminUser ? DefaultAvatarUrl.Admin :
			this.isEventManagerUser ? DefaultAvatarUrl.EventManager :
			DefaultAvatarUrl.Participation;
	}

	constructor(private localizationService: LocalizationService) {}

	public refreshPage(): void {
		window.location.reload();
	}
}
