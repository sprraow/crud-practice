import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  players =[
    {playerName: 'Abe', score: 90},
    {playerName: 'Babe', score: 80},
    {playerName: 'Cabe', score: 70}
  ]
}
