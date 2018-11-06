import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatChipInput, MatIcon } from '@angular/material';
import { Subscription } from 'rxjs';
import { Track } from '../track'
import { PlayerService } from "../player.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  private paused: boolean;
  private track: Track;
  private duration: number;
  private elapsed: number;
  private barProgress: number;
  private progressBarWidth: number;
  private playlist: Track[];

  private pausedSubscription: Subscription;
  private trackSubscription: Subscription;
  private durationSubscription: Subscription;
  private elapsedSubscription: Subscription;
  private playlistSubscription: Subscription;

  constructor(private playerService: PlayerService, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('play',sanitizer.bypassSecurityTrustResourceUrl('assets/images/baseline-play_arrow-24px.svg'));
    iconRegistry.addSvgIcon('pause',sanitizer.bypassSecurityTrustResourceUrl('assets/images/baseline-pause-24px.svg'));
    this.track = {} as Track;
    this.paused = true;
    this.duration = 0;
    this.elapsed = 0;
    this.playlist = [];
  }

  ngOnInit() {
    this.pausedSubscription = this.playerService.paused.subscribe(bool => this.paused = bool);
    this.trackSubscription = this.playerService.track.subscribe(track => this.track = track);
    this.durationSubscription = this.playerService.duration.subscribe(time => this.duration = time);
    this.elapsedSubscription = this.playerService.elapsed.subscribe(time => {this.elapsed = time; this.barProgress = this.elapsed/this.duration * 100});
    this.playlistSubscription = this.playerService.playlist.subscribe(playlist => this.playlist = playlist);
  }

  ngOnDestroy() {
    this.pausedSubscription.unsubscribe();
    this.trackSubscription.unsubscribe();
    this.durationSubscription.unsubscribe();
    this.elapsedSubscription.unsubscribe();
    this.playlistSubscription.unsubscribe();
  }

  toggleAudio(): void {
    if(this.track.url != null) {
      this.playerService.toggleAudio();
    }
  }

  barClick(x: number, width: number): void {
    this.playerService.setTime(x/width * this.duration);
  }

  startTrack(): void {
    this.playerService.nextTrack({
      name: "TestTitle",
      author: "TestAuthor",
      url: "assets/fixture.wav",
      duration: 26500,
      origin: "Spotify",
    });
  }

}
