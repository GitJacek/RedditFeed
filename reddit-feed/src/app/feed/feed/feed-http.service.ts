import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { RedditPage } from '../models/reddit-page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedHttpService {
  baseUrl = environment.redditApiUrl;
  subreddit = 'sweden.json';
  constructor(private http: HttpClient) { }

  getEntries(limit: number, showedEntries: number, beforeId?: string, afterId?: string): Observable<RedditPage> {
    const parameters = `limit=${limit}&count=${showedEntries}${beforeId ? `&before=${beforeId}` : ''}${afterId ? `&after=${afterId}` : ''}`
    return this.http.get(`${this.baseUrl}${this.subreddit}?${parameters}`)
      .pipe(
        map((response: any) => response.data));
  }
}
