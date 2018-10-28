import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { TrackTimePipe } from './track-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    TrackTimePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
