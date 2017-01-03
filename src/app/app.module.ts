import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { LightsComponent } from './lights/lights.component';
import { LightsService } from "./lights.service";


const ROUTES = [
  {
    path: '',
    redirectTo: 'lights',
    pathMatch: 'full'
  },
  {
    path: 'lights',
    component: LightsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LightsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [LightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
