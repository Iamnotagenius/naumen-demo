import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AgeFormComponent } from './age-form/age-form.component';
import { GlobalStatsComponent } from './global-stats/global-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    AgeFormComponent,
    GlobalStatsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
