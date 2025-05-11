import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard.service';
import { FormsModule } from '@angular/forms';
import { Player } from '../player.model'

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  players: Player[] = [];
  showForm = false;
  newPlayer: Player = { playerName: '', score: 0 };
  sortAscending = false; // Default to descending order

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    // Load sort preference from localStorage
    const savedSortOrder = localStorage.getItem('sortOrder');
    if (savedSortOrder) {
      this.sortAscending = savedSortOrder === 'asc';
    }
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.leaderboardService.getLeaderboard().subscribe({
      next: (data) => {
        // Sort the data
        this.players = this.sortPlayers(data);
      },
      error: (error) => {
        console.error('Error loading leaderboard:', error);
      }
    });
  }

  sortPlayers(players: Player[]): Player[] {
    return [...players].sort((a, b) => {
      if (this.sortAscending) {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
  }

  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    // Save sort preference to localStorage
    localStorage.setItem('sortOrder', this.sortAscending ? 'asc' : 'desc');
    // Re-sort the current data
    this.players = this.sortPlayers(this.players);
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addPlayer() {
    if (this.newPlayer.playerName && this.newPlayer.score) {
      const player = {
        playerName: this.newPlayer.playerName,
        score: this.newPlayer.score
      };
      
      this.leaderboardService.addPlayer(player).subscribe({
        next: () => {
          this.loadLeaderboard();
          this.newPlayer = { playerName: '', score: 0 };
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error adding player:', error);
        }
      });
    }
  }

  deletePlayer(id: number | undefined) {
    if (id !== undefined) {
      this.leaderboardService.deletePlayer(id).subscribe({
        next: () => {
          this.loadLeaderboard();
        },
        error: (error) => {
          console.error('Error deleting player', error);
        }
      });
    }
  }
}
