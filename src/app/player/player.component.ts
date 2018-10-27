import { Component, OnInit } from '@angular/core';
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

  private pausedSubscription: Subscription;
  private trackSubscription: Subscription;
  private durationSubscription: Subscription;
  private elapsedSubscription: Subscription;

  constructor(private playerService: PlayerService) { 
    this.track = {} as Track;
    this.paused = true;
  }

  ngOnInit() {
    this.pausedSubscription = this.playerService.paused.subscribe(bool => this.paused = bool);
    this.trackSubscription = this.playerService.track.subscribe(track => this.track = track);
    this.durationSubscription = this.playerService.duration.subscribe(time => this.duration = time);
    this.elapsedSubscription = this.playerService.elapsed.subscribe(time => this.elapsed = time);
  }

  ngOnDestroy() {
    this.pausedSubscription.unsubscribe();
    this.trackSubscription.unsubscribe();
    this.durationSubscription.unsubscribe();
    this.elapsedSubscription.unsubscribe();
  }

  toggleAudio(): void {
    console.log("toggleAudio()");
    this.playerService.toggleAudio();
  }

  startTrack(): void {
    this.playerService.nextTrack({
      name: "TestTitle",
      artist: "TestArtist",
      url: "assets/fixture.wav",
    });
  }

}
