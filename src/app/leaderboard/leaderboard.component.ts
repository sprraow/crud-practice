import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  players: any [] = []

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
      console.log('test')
      this.leaderboardService.getLeaderboard().subscribe(data => {
        this.players = data
      })
  }
}
