import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private apiUrl = 'http://localhost:3000/players';

  constructor(private http: HttpClient) { }

  getLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPlayer(player: { playerName: string; score: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, player);
  }
}
