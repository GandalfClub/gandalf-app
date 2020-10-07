import { Component, Input } from '@angular/core';
import { User } from 'src/app/libs/auth/models/user';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { Localization } from 'src/app/libs/container/models/localization';
import { LocalizationService } from 'src/app/libs/container/services/localization.service';

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

	private defaultPhotoUrl: { admin: string , manager: string , participant: string } = {
		admin: 'assets/images/avatars/admin.svg',
		manager: 'assets/images/avatars/event-manager.svg',
		participant: 'assets/images/avatars/participant.svg'
	};

	public get localization(): Localization {
		return this.localizationService.currentLocalization;
	}

	public get photoUrl(): string {
		return Boolean(this.userPhotoUrl) ? this.userPhotoUrl :
			this.isAdminUser ? this.defaultPhotoUrl.admin :
			this.isEventManagerUser ? this.defaultPhotoUrl.manager :
			this.defaultPhotoUrl.participant;
	}

	constructor(private localizationService: LocalizationService) {}

	public refreshPage(): void {
		window.location.reload();
	}
}
