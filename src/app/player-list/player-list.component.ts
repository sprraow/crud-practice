import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../player.model';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  @Input() players: Player[] = [];
  @Output() deletePlayer = new EventEmitter<number>();
  
  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.deletePlayer.emit(id);
    }
  }
} 