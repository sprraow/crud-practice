import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../player.model';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent {
  @Output() playerAdded = new EventEmitter<Player>();
  player: Player = { playerName: '', score: 0 };

  onSubmit() {
    if (this.player.playerName && this.player.score) {
      this.playerAdded.emit({ ...this.player });
      this.player = { playerName: '', score: 0 };
    }
  }
}