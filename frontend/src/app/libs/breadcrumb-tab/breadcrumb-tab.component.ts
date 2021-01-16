import { Component, OnInit } from '@angular/core';
import { ComponentTheme } from '../common-components/shared/component-theme.enum';

@Component({
	selector: 'app-breadcrumb-tab',
	templateUrl: './breadcrumb-tab.component.html',
	styleUrls: ['./breadcrumb-tab.component.scss'],
})
export class BreadcrumbTabComponent {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
}
