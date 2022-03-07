import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
 // form data
  professional = this.fb.group({
    application: this.fb.group({
      jobTitle: ['', [Validators.required]],
      feeModel: this.fb.array([this.fb.control('', [Validators.required])], [Validators.required]),
      companyName: ['', [Validators.required]],
    })
  });

  constructor(
    private fb: FormBuilder,
  ) {}
}