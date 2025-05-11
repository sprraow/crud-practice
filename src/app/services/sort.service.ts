import { Injectable } from '@angular/core';
import { Player } from '../player.model';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private readonly STORAGE_KEY = 'sortOrder';

  getSortOrder(): boolean {
    const savedSortOrder = localStorage.getItem(this.STORAGE_KEY);
    return savedSortOrder ? savedSortOrder === 'asc' : false;
  }

  setSortOrder(ascending: boolean): void {
    localStorage.setItem(this.STORAGE_KEY, ascending ? 'asc' : 'desc');
  }

  sortPlayers(players: Player[], ascending: boolean): Player[] {
    return [...players].sort((a, b) => {
      if (ascending) {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
  }
} 