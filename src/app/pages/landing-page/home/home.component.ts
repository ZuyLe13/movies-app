import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  genresMap: { [id: number]: string } = {};

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getGenres().subscribe((genreData: any) => {
      // Tạo genresMap
      genreData.genres.forEach((genre: any) => {
        this.genresMap[genre.id] = genre.name;
      });
  
      // Sau khi genres có, mới lấy movies
      this.moviesService.getMovies().subscribe((movieData: any) => {
        this.movies = movieData.results.slice(0, 5);
      });
    });
  }

  getGenreNames(genreIds: number[]): string[] {
    return genreIds.map(id => this.genresMap[id]).filter(name => !!name);
  }
}
