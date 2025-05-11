import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  players: any[] = [];
  showForm = false;
  newPlayer: { name: string; score: number } = { name: '', score: 0 };

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.leaderboardService.getLeaderboard().subscribe({
      next: (data) => {
        this.players = data;
      },
      error: (error) => {
        console.error('Error loading leaderboard:', error);
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addPlayer() {
    if (this.newPlayer.name && this.newPlayer.score) {
      const player = {
        playerName: this.newPlayer.name,
        score: this.newPlayer.score
      };
      
      this.leaderboardService.addPlayer(player).subscribe({
        next: () => {
          this.loadLeaderboard(); // Reload the leaderboard after adding
          this.newPlayer = { name: '', score: 0 };
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error adding player:', error);
        }
      });
    }
  }
}
