import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../services/leaderboard.service';
import { SortService } from '../services/sort.service';
import { Player } from '../player.model';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { PlayerListComponent } from '../player-list/player-list.component';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, PlayerFormComponent, PlayerListComponent],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  players: Player[] = [];
  showForm = false;
  sortAscending = false;
  error: string | null = null;

  constructor(
    private leaderboardService: LeaderboardService,
    private sortService: SortService
  ) {}

  ngOnInit(): void {
    this.sortAscending = this.sortService.getSortOrder();
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.error = null;
    this.leaderboardService.getLeaderboard().subscribe({
      next: (data) => {
        this.players = this.sortService.sortPlayers(data, this.sortAscending);
      },
      error: (error) => {
        console.error('Error loading leaderboard:', error);
        this.error = 'Failed to load leaderboard. Please try again.';
      }
    });
  }

  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.sortService.setSortOrder(this.sortAscending);
    this.players = this.sortService.sortPlayers(this.players, this.sortAscending);
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onPlayerAdded(player: Player) {
    this.error = null;
    this.leaderboardService.addPlayer(player).subscribe({
      next: (newPlayer) => {
        console.log("Added new player", newPlayer);
        this.loadLeaderboard();
        this.showForm = false;
      },
      error: (error) => {
        console.error('Error adding player:', error);
        this.error = 'Failed to add player. Please try again.';
      }
    });
  }

  onPlayerDeleted(id: string) {
    this.error = null;
    this.leaderboardService.deletePlayer(id).subscribe({
      next: (deletedPlayer) => {
        console.log('Deleted player', deletedPlayer);
        this.loadLeaderboard();
      },
      error: (error) => {
        console.error('Error deleting player:', error);
        this.error = 'Failed to delete player. Please try again.';
      }
    });
  }
}
