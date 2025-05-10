import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private apiUrl = 'assets/leaderboards.json'

  constructor(private http: HttpClient) { }

  getLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
  }
}
