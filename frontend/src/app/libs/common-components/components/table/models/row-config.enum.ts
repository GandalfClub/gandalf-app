export enum TableColumnType {
	Checkbox = 'checkbox',
	Text = 'text',
	TextSortable = 'text_sortable',
	Toggle = 'toggle'
}

export interface ColumnConfig {
	columnType: TableColumnType;
	columnName: string;
	dataName: string;
}

export interface Column {
	columnType: TableColumnType;
	dataName: string;
	columnName: string;
}
