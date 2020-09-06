import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-event-poover',
  templateUrl: './event-poover.component.html',
  styleUrls: ['./event-poover.component.scss']
})
export class EventPooverComponent implements OnInit {
  public eventPopoverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.eventPopoverForm = this.fb.group({
      title: ['', [Validators.required]]
    })
  }

  submitEventPopover() {
    console.log(this.eventPopoverForm.value.title)
    return this.eventPopoverForm.value.title
  }
}
