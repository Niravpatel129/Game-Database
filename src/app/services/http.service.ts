import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(ordering: string, search?: string): Observable<any> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<any>(`${environment.BASE_URL}/games`, {
      params,
    });
  }

  getGameDetails(gameId: string) {
    const gameInfoRequest = this.http.get<any>(
      `${environment.BASE_URL}/games/${gameId}`
    );
    const gameTrailersRequest = this.http.get<any>(
      `${environment.BASE_URL}/games/${gameId}/movies`
    );
    const gameScreenshotsRequest = this.http.get<any>(
      `${environment.BASE_URL}/games/${gameId}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenshotsRequest,
    }).pipe(
      map((res) => {
        return {
          ...res.gameInfoRequest,
          screenshots: res.gameScreenshotsRequest.results,
          trailers: res.gameTrailersRequest.results,
        };
      })
    );
  }

  getGame(gameId: string): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/games/${gameId}`);
  }
}
