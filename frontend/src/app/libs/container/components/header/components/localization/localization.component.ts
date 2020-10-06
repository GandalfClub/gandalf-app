import { Component, OnInit } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { LocalizationService } from '../../../../services/localization.service';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

  constructor(public localizationService: LocalizationService) {}
}
