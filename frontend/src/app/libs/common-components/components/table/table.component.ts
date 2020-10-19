import { SelectionModel } from '@angular/cdk/collections';
import { Identifiers } from '@angular/compiler';
import { Compiler, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, Input, ModuleWithComponentFactories, NgModule, OnInit, Renderer2, TemplateRef, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Data } from '@angular/router';
import { element } from 'protractor';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { TableConfig, Column, TableColumnType } from './models/row-config.enum';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

@Component({
	selector: 'app-table',
	template: '',
	styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public template: string;

	public columns: Column[] = [];

	public tableTemplate: string;

	public displayedColumns: string[] = [];

	@Input()
	public tableConfig: TableConfig[];

	@Input()
	public data: any;

	@ViewChild('table', {read: ViewContainerRef})
	public container: ViewContainerRef;

	constructor(private elementRef: ElementRef,
		private renderer: Renderer2,
		private viewContainer: ViewContainerRef,
		private compiler: Compiler) {
	}

	public ngOnInit(): void {
		this.setRows();
		this.createDom();

		// формируем лист для шапки таблицы из инпутов даты и конфига
		// формирем через элементреф начинку дома
	}

	public setRows(): void {
		const dataNames: string[] = Object.keys(this.data[0]);
		let i: number = 0;
		for (const tableConfig of this.tableConfig) {
			if (tableConfig.columnType === TableColumnType.Text) {
				this.columns.push({
					columnType: tableConfig.columnType,
					columnName: tableConfig.name,
					dataName: dataNames[i]
				});
				i++;
			} else {
				this.columns.push({
					columnType: tableConfig.columnType,
					columnName: tableConfig.name,
					dataName: null
				});
			}
		}
	}

	public createDom(): void {
		// tableEl.outerHTML = `<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">`;

		let columns: string = '';

		for (const column of this.columns) {
			console.log('row', column)
			let element: string = null;
			if (column.columnType === TableColumnType.Text) {
				element =
				`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef> ${column.columnName} </th>
					<td mat-cell *matCellDef="let element"> {{element.${column.dataName}}} </td>
				</ng-container>`;
				this.displayedColumns.push(column.dataName)
			} else if (column.columnType === TableColumnType.Checkbox) {
				element =
				`<ng-container matColumnDef="select">
					<th mat-header-cell *matHeaderCellDef>
						<mat-checkbox (change)="$event ? masterToggle() : null"
							[checked]="selection.hasValue() && isAllSelected()"
							[indeterminate]="selection.hasValue() && !isAllSelected()"
							[aria-label]="checkboxLabel()">
						</mat-checkbox>
					</th>
					<td mat-cell *matCellDef="let row">
						<mat-checkbox (click)="$event.stopPropagation()"
							(change)="$event ? selection.toggle(row) : null"
							[checked]="selection.isSelected(row)"
							[aria-label]="checkboxLabel(row)">
						</mat-checkbox>
					</td>
				</ng-container>`;
				this.displayedColumns.push('select')
			}
			columns = columns + ` ${element}`;
		}

		this.tableTemplate = `
		<table mat-table [dataSource]="dataSource" class="mat-elevation-z8 table-component" [class.table-component--dark-theme]="isDarkTheme">
			${columns}
			<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
			<tr mat-row *matRowDef="let row; columns: displayedColumns;"
				(click)="selection.toggle(row)">
			</tr>
		</table>
		`;

		const component = this.createDynamicComponent();
		console.log(component)
		const module = this.createDynamicModule(component);
		this.compiler.compileModuleAndAllComponentsAsync(module)
			.then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
				const componentFactory: ComponentFactory<typeof component> =
				moduleWithFactories.componentFactories.find((x: ComponentFactory<any>) => x.componentType === component);
				const componentRef: ComponentRef<typeof component> = this.viewContainer.createComponent(componentFactory);
				componentRef.instance.theme = this.theme;
				componentRef.instance.data = this.data;
				componentRef.instance.displayedColumns = this.displayedColumns;

			})
			.catch((error: Error) => {
				console.log(error);
			});
	}

	public createDynamicComponent(): any  {

		@Component({template: this.tableTemplate, jit: true })
		class CustomDynamicComponent implements OnInit {

			@Input()
				public theme: ComponentTheme = ComponentTheme.Light;
			@Input()
				public data: any;

			public displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
			public dataSource: MatTableDataSource<PeriodicElement>;
			public selection: SelectionModel<PeriodicElement> = new SelectionModel<PeriodicElement>(true, []);

			public ngOnInit(): void {
				this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
			}

			/** Whether the number of selected elements matches the total number of rows. */
			isAllSelected() {
			  const numSelected = this.selection.selected.length;
			  const numRows = this.dataSource.data.length;
			  return numSelected === numRows;
			}

			/** Selects all rows if they are not all selected; otherwise clear selection. */
			masterToggle() {
			  this.isAllSelected() ?
				  this.selection.clear() :
				  this.dataSource.data.forEach(row => this.selection.select(row));
			}

			/** The label for the checkbox on the passed row */
			checkboxLabel(row?: PeriodicElement): string {
			  if (!row) {
				return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
			  }
			  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
			}
			public get isDarkTheme(): boolean {
				return this.theme === ComponentTheme.Dark;
			}
		}

		console.log( CustomDynamicComponent);

		return CustomDynamicComponent;
	  }

	  private createDynamicModule (component: Type<any>) {

		const moduleClass = class RuntimeComponentModule {
		};
		const decoratedNgModule = NgModule({ imports: [MatTableModule, MatCheckboxModule], declarations: [component] })(moduleClass);

	 return decoratedNgModule;
	  }



}
