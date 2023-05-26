import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RandomService } from './random-number.service';
import { HttpClientModule } from '@angular/common/http';
import { LoggerComponent } from './components/logger.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoggerComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [RandomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
