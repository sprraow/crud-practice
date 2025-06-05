import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Player } from '../player.model'
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  //private apiUrl = 'http://localhost:3000/players';

  constructor(private http: HttpClient) { }

  getLeaderboard(sortField: string = 'score', sortOrder: string = 'desc'): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}?_sort=${sortField}&_order=${sortOrder}`).pipe(
      tap(data => console.log('Fetched leaderboard:', data)),
      catchError(this.handleError)
    );
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(environment.apiUrl, player).pipe(
      tap(data => console.log('Added player:', data)),
      catchError(this.handleError)
    );
  }

  deletePlayer(id: string): Observable<Player> {
    return this.http.delete<Player>(`${environment.apiUrl}/${id}`).pipe(
      tap(data => console.log('Deleted player:', data)),
      catchError(this.handleError)
    );
  }

  //updatePlayer(player: Player): Observable<Player> {
  //return this.http.put<Player>(`${this.apiUrl}/${player.id}`, player);
//}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
