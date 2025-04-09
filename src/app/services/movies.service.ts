import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private genreUrl = `${environment.apiUrl}/genre/movie/list?language=en&api_key=${environment.apiKey}`;
  private moviesUrl = `${environment.apiUrl}/movie/top_rated?language=en-US&page=1&api_key=${environment.apiKey}`;
  movies: any[] = [];
  genres: any[] = [];

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(this.moviesUrl)
  }

  getGenres() {
    return this.http.get(this.genreUrl);
  }
}