import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-input-demo',
  templateUrl: './input-demo.component.html',
  styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent {

  public inputDemoForm: FormGroup;

  public lightTheme: ComponentTheme = ComponentTheme.Light;
  public darkTheme: ComponentTheme = ComponentTheme.Dark;
  
  constructor(
    private fb: FormBuilder
  ) { }
  

	public ngOnInit(): void {
		this.inputDemoForm = this.fb.group({
      title: '',
      title1: '',
      title2: '',
		});
	}

}
