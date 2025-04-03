import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';

@NgModule({
  declarations: [
    HomeComponent,
    DiscoverComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class LandingPageModule { }
