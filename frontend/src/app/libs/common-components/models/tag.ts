export class Tag {
	public label: string;
	public value: string;
	public selected: boolean;
	public removed: boolean;
	public onClick: Function;

	constructor(label: string, value: string, selected: boolean, onClick: Function) {
		this.label = label;
		this.value = value;
		this.selected = selected;
		this.removed = false;
		this.onClick = onClick;
	}
}
