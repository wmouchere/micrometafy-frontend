import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';
import { Track } from '../track';

import { TRACKS } from '../mock-tracks';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  tracks = TRACKS;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

  playTrack(track: Track) {
    this.playerService.nextTrack(track);
  }

  playTrackNext(track: Track) {
    this.playerService.addToPlaylist(track);
  }

}
