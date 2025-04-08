import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesUrl = `${environment.apiUrl}movie/top_rated?language=en-US&page=1&region=en-US&api_key=${environment.apiKey}`;
  movies: any[] = [];

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(this.moviesUrl).subscribe((response: any) => {
      this.movies = response.results.slice(0, 5);
    }, error => {
      console.error('Lỗi khi lấy danh sách phim:', error);
    })
  }
}