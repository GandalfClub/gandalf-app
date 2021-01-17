import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';

export class AppDateAdapter extends NativeDateAdapter {

	format(date: Date, displayFormat: {}): string {
		const monthNames: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		];
		if (displayFormat === 'input') {
			const day: number = date.getDate();
			const month: number = date.getMonth();
			const year: number = date.getFullYear();
			return `${this._to2digit(day)}  ${monthNames[month]} ${year}`;
		} else {
			return date.toDateString();
		}
	}

	private _to2digit(n: number): string {
		const deleteNumber: number = -2;
		return ('00' + n).slice(deleteNumber);
	}
}
export const APP_DATE_FORMATS: MatDateFormats = {
	parse: {
		dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
	},
	display: {
		dateInput: 'input',
		monthYearLabel: { year: 'numeric', month: 'short' },
		dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
		monthYearA11yLabel: { year: 'numeric', month: 'long' },
	}
};
