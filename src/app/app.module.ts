import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AutoAddInputComponent } from './auto-input/auto-add-input.component';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MatInputModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, AutoAddInputComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
