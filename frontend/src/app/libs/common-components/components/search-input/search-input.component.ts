import { Component, Input, OnInit } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
	selector: 'app-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

	@Input() public theme: ComponentTheme;

	@Input() public label: string;

	@Input() public placeholder: string;

	@Input() public preIcon: string;

	@Input() public hidden: boolean;

}
