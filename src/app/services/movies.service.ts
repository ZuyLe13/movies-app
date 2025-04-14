import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private genreUrl = `${environment.apiUrl}/genre/movie/list?language=en&api_key=${environment.apiKey}`;
  private topRatedMoviesUrl = `${environment.apiUrl}/movie/top_rated?language=en-US&page=1&api_key=${environment.apiKey}`;
  
  topRatedMovies: any[] = [];
  genres: any[] = [];
  popularMovies: any[] = [];

  constructor(private http: HttpClient) {}

  getTopRatedMovies() {
    return this.http.get(this.topRatedMoviesUrl)
  }

  getGenres() {
    return this.http.get(this.genreUrl);
  }

  getMovieDetail(id: number) {
    return this.http.get(`${environment.apiUrl}/movie/${id}?language=en-US&api_key=${environment.apiKey}`)
  }

  getMovies(page: number) {
    return this.http.get(`${environment.apiUrl}/movie/now_playing?language=en-US&page=${page}&api_key=${environment.apiKey}`);
  }
}