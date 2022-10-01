import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  games: any = [];
  sort = 'name';
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let query = '';

    this.activatedRoute.params.subscribe((params) => {
      query = params['game-search'];
    });

    this.searchGames('metacrit', query);
  }

  searchGames(sort: string, query?: string) {
    this.httpService.getGameList(sort, query).subscribe((data: any) => {
      this.games = data.results;
    });
  }

  openGameDetails(id: any) {
    console.log('clicked openGameDetails');
  }

  imgError(image: any) {
    image.style.display = 'none';
  }
}
