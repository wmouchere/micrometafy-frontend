import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Track } from './track';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private audio: HTMLAudioElement;

  public paused: Subject<boolean> = new Subject<boolean>();
  public track: Subject<Track> = new Subject<Track>();
  public duration: Subject<number> = new Subject<number>();
  public elapsed: Subject<number> = new Subject<number>();

  constructor() {
    this.audio = new Audio();
  }

  public nextTrack(track: Track): void {
    this.track.next(track);
    this.audio.src = track.url;
    this.paused.next(false);
    this.audio.oncanplay = () => {
      this.audio.play();
      this.duration.next(this.audio.duration);
    };
    this.audio.ontimeupdate = () => {
      this.elapsed.next(this.audio.currentTime);
    };
  }

  public toggleAudio(): void {
    if(this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }   
    this.paused.next(this.audio.paused);
  }
}
