import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  private apiKey = '';
  private apiUrl = '';

  swiperConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index: number, className: string) => {
        return `<span class="${className} w-3 h-3 bg-gray-400 rounded-full mx-1"></span>`;
      }
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.http.get(`${this.apiUrl}?api_key=${this.apiKey}&language=v1`)
      .subscribe((req: any) => {
        this.movies = req.results.slice(0, 5);
      }, error => {
        console.log("Lỗi khi lấy danh sách phim:", error)
      })
  }
}
