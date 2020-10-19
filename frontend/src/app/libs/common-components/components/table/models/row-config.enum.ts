export enum TableColumnType {
	Checkbox = 'checkbox',
	Text = 'text',
	TextSortable = 'text_sortable',
	Toggle = 'toggle'
}

export interface TableConfig {
	columnType: TableColumnType;
	name: string;
}

export interface Column {
	columnType: TableColumnType;
	dataName: string;
	columnName: string;
}
