import { Component, OnInit, Input, Optional, Host, SkipSelf, forwardRef, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, NG_VALUE_ACCESSOR, ControlContainer, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'shared-auto-add-input',
  templateUrl: './auto-add-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoAddInputComponent),
      multi: true
    }
  ]
})
export class AutoAddInputComponent implements OnInit, AfterViewInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() max: number;
  @Input() formArrayName: string;
  @Input() errors: ErrorModel[];

  arrayControl: FormArray;
  form: FormGroup;

  constructor(
    @Optional() @Host() @SkipSelf()
    private controlContainer: ControlContainer,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    if (!this.formArrayName) {
      throw new TypeError('\'formArrayName\' is required.');
    }
    this.form = this.fb.group({
      option: this.controlContainer.control.get(this.formArrayName)
    });
    this.arrayControl = this.form.get('option') as FormArray;

    this.form.valueChanges
      .subscribe(() => {
        this.controlContainer.control.updateValueAndValidity();
      });
  }

  ngAfterViewInit() {
  }

  addOption() {
    this.arrayControl.push(this.fb.control('', this.controlContainer.control.get(this.formArrayName).validator));
  }

  removeOption(index: number) {
    this.arrayControl.removeAt(index);
  }

  stopNew(option, i) {
    return option.value === ''
      || i !== this.arrayControl.controls.length - 1
      || (this.max && this.arrayControl.controls.length === +this.max);
  }

  getErrors(error: FormControl) {
    let result = [];
    if (this.errors) {
      result = this.errors.filter((message) => {
        return error.hasError(message.key);
      });
    }
    return result;
  }
}

class ErrorModel {
  key: string;
  message: string;
}
