import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  topRatedMovies: any[] = [];
  releaseMovies: any[] =[];
  popularMovies: any[] =[];
  genresMap: { [id: number]: string } = {};

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getGenres().subscribe((genreData: any) => {
      // Tạo genresMap
      genreData.genres.forEach((genre: any) => {
        this.genresMap[genre.id] = genre.name;
      });
  
      // Sau khi genres có, mới lấy movies
      this.moviesService.getTopRatedMovies().subscribe((data: any) => {
        this.topRatedMovies = data.results.slice(0, 5);

        this.topRatedMovies.forEach((movie) => {
          this.moviesService.getMovieDetail(movie.id).subscribe((detail: any) => {
            movie.formattedRuntime = this.formatRuntime(detail.runtime);
          })
        })
      });

      this.moviesService.getMovies(1).subscribe((data: any) => {
        this.releaseMovies = data.results.slice(0, 10);
      })

      this.moviesService.getMovies(2).subscribe((data: any) => {
        this.popularMovies = data.results.slice(0, 10);
      })
    });
  }

  getGenreNames(genreIds: number[]): string[] {
    return genreIds.map(id => this.genresMap[id]).filter(name => !!name).slice(0, 2);
  }

  getVoteAverage(movie: any): string {
    return (movie.vote_average / 2).toFixed(1);
  }

  formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes}m`;
  }
}
