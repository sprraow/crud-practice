import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../player.model'
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  
  constructor(private http: HttpClient) { }

  getLeaderboard(sortField: string = 'score', sortOrder: string = 'desc'): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/players?_sort=${sortField}&_order=${sortOrder}`);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${environment.apiUrl}/players`, player);
  }

  deletePlayer(id: number): Observable<Player> {
    return this.http.delete<Player>(`${environment.apiUrl}/players/${id}`);
  }

  //updatePlayer(player: Player): Observable<Player> {
  //return this.http.put<Player>(`${this.apiUrl}/${player.id}`, player);
//}

}
