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

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies();
    this.movies = this.moviesService.movies;
  }
}
