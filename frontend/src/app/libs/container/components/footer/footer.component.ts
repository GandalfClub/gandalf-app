import { Component } from '@angular/core';
import { Localization } from '../../models/localization';
import { LocalizationService } from '../../services/localization.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	public get localization(): Localization {
		return this.localizationService.currentLocalization;
	}

	constructor(private localizationService: LocalizationService) {}
}
