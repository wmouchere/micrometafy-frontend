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
  public _playlist: Track[] = [];
  public playlist: Subject<Track[]> = new Subject<Track[]>();

  constructor() {
    this.audio = new Audio();
    this.audio.onended = async () => {
      if(this._playlist.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 400));
        this.nextTrack(this._playlist.pop())
        this.playlist.next(this._playlist);
      }
    }
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
    };
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

  public addToPlaylist(track: Track): void {
    if(this.audio.paused) {
      this.nextTrack(track)
    } else {
      this._playlist.push(track);
      this.playlist.next(this._playlist);
    }
  }
}
