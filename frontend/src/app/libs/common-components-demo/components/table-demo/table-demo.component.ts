import { Component } from '@angular/core';
import { TableColumnType, ColumnConfig } from 'src/app/libs/common-components/components/table/models/row-config.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

@Component({
	selector: 'app-table-demo',
	templateUrl: './table-demo.component.html',
	styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent  {

	public columnsConfig: ColumnConfig[] = [
		{
			columnType: TableColumnType.Checkbox,
			columnName: 'check',
			dataName: 'check'
		},
		{
			columnType: TableColumnType.TextSortable,
			columnName: 'No.',
			dataName: 'number'
		},
		{
			columnType: TableColumnType.Text,
			columnName: 'Name',
			dataName: 'name'
		},
		{
			columnType: TableColumnType.Text,
			columnName: 'Weight',
			dataName: 'weight'
		},
		{
			columnType: TableColumnType.Toggle,
			columnName: 'Event Manager',
			dataName: 'toggleManager'
		},
		{
			columnType: TableColumnType.Text,
			columnName: 'Symbol',
			dataName: 'symbol'
		},
	];

	public data: PeriodicElement[] = [
		{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
		{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
		{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
		{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
		{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
		{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
		{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
		{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
		{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
		{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
	];

	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	public onToggle(row: PeriodicElement): void {
		console.log(row);
	}

	public onCheck(selected: PeriodicElement[]): void {
		console.log(selected);
	}
}
