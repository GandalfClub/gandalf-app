import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
	public hideHeader: boolean = false;
	public hideFooter: boolean = false;

	constructor() { }

	public ngOnInit(): void {
	}
}
