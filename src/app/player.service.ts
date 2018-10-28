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
    this.paused.next(false);
    this.audio.src = track.url;
    this.audio.oncanplay = () => {
      this.audio.play();
      this.duration.next(this.audio.duration);
    };
    this.audio.ontimeupdate = () => {
      this.elapsed.next(this.audio.currentTime);
    };
    this.audio.onplay = () => {
      this.paused.next(false);
    };
    this.audio.onpause = () => {
      this.paused.next(true);
    }
  }

  public setTime(time: number) {
    if(time < 0) time = 0;
    this.audio.currentTime = time;
  }

  public toggleAudio(): void {
    if(this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }   
  }
}
