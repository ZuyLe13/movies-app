import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperRef') swiperRef: ElementRef | undefined;

  topRatedMovies: any[] = [];
  releaseMovies: any[] = [];
  popularMovies: any[] = [];
  featureMovies: any[] = [];
  genresMap: { [id: number]: string } = {};
  selectedMovie: any;
  activeIndex = 0;

  constructor(
    private moviesService: MoviesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.moviesService.getGenres().subscribe((genreData: any) => {
      // Create genresMap
      genreData.genres.forEach((genre: any) => {
        this.genresMap[genre.id] = genre.name;
      });
  
      // After getting genres, fetch movies
      this.moviesService.getTopRatedMovies().subscribe((data: any) => {
        this.topRatedMovies = data.results.slice(0, 5);

        this.topRatedMovies.forEach((movie) => {
          this.moviesService.getMovieDetail(movie.id).subscribe((detail: any) => {
            movie.formattedRuntime = this.formatRuntime(detail.runtime);
          });
        });
      });

      this.moviesService.getMovies(1).subscribe((data: any) => {
        this.releaseMovies = data.results.slice(0, 10);
      });

      this.moviesService.getMovies(2).subscribe((data: any) => {
        this.popularMovies = data.results.slice(0, 10);
      });

      this.moviesService.getMovies(3).subscribe((data: any) => {
        this.featureMovies = data.results.slice(0, 10);

        this.featureMovies.forEach((movie) => {
          this.moviesService.getMovieDetail(movie.id).subscribe((detail: any) => {
            movie.formattedRuntime = this.formatRuntime(detail.runtime);
          });
        });
        
        // Set the initial active movie
        if (this.featureMovies.length > 0) {
          this.activeIndex = 0;
        }
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupSwiper();
    }, 500);
  }

  setupSwiper(): void {
    const swiperEl = this.swiperRef?.nativeElement;
    
    if (swiperEl) {
      Object.assign(swiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: false,
        initialSlide: 0,
        watchSlidesProgress: true,
      });

      // Use proper event handling for Swiper Element
      swiperEl.addEventListener('slidechange', (event: any) => {
        this.activeIndex = event.detail[0].activeIndex;
        this.cdr.detectChanges(); // Force change detection
      });

      // Also add click listeners to each slide for better interactivity
      swiperEl.addEventListener('swiperclick', (event: any) => {
        const clickedIndex = event.detail.clickedIndex;
        if (clickedIndex !== undefined) {
          this.activeIndex = clickedIndex;
          this.updateActiveMovie(this.activeIndex);
          this.cdr.detectChanges();
        }
      });

      swiperEl.initialize();
    }
  }

  // Add this method to handle slide clicks
  onSlideClick(index: number): void {
    this.activeIndex = index;
    this.updateActiveMovie(index);
    
    // Also update the Swiper to reflect the selection
    const swiperEl = this.swiperRef?.nativeElement;
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.slideTo(index);
    }
  }

  // Helper method to update active movie
  updateActiveMovie(index: number): void {
    if (this.featureMovies && this.featureMovies.length > index) {
      this.selectedMovie = this.featureMovies[index];
    }
  }

  get activeMovie() {
    return this.featureMovies && this.featureMovies.length > 0 
      ? this.featureMovies[this.activeIndex] 
      : null;
  }

  getGenreNames(genreIds: number[]): string[] {
    if (!genreIds) return [];
    return genreIds.map(id => this.genresMap[id]).filter(name => !!name).slice(0, 2);
  }

  getVoteAverage(movie: any): string {
    return movie && movie.vote_average ? (movie.vote_average / 2).toFixed(1) : '0.0';
  }

  formatRuntime(minutes: number): string {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes}m`;
  }
}
