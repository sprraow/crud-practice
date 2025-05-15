import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../player.model'

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private apiUrl = 'http://localhost:3000/players';

  constructor(private http: HttpClient) { }

  getLeaderboard(sortField: string = 'score', sortOrder: string = 'desc'): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}?_sort=${sortField}&_order=${sortOrder}`);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  deletePlayer(id: number): Observable<Player> {
    return this.http.delete<Player>(`${this.apiUrl}/${id}`);
  }

  //updatePlayer(player: Player): Observable<Player> {
  //return this.http.put<Player>(`${this.apiUrl}/${player.id}`, player);
//}

}
