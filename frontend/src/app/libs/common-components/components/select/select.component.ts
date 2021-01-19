import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
	public icon: string = 'keyboard_arrow_down';
	public opened: boolean = false;
	@Input() public label: string;
	@Input() public placeholder: string;

	public openedChange(opened: boolean): void {
		this.opened = opened;
		this.icon = opened ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
	}

	public generateTime(): string[] {
		const maxhour: number = 23;
		const zero: number = 0;
		const one: number = 1;
		const tenhour: number = 10;
		const arrayTime: string[] = [];

		for (let i: number = zero; i <= maxhour; i++) {
			let hour: number | string = i;
			if (i < tenhour) {
				hour = '0' + hour;
			}
			for (let j: number = zero; j <= one; j++) {
				const min: string = j === 1 ? '30' : '00';
				arrayTime.push(`${hour}:${min}`);
			}
		}
		return arrayTime;
	}
}
