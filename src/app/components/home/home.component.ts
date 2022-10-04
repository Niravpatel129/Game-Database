import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public games: any = [];
  public sort = 'name';
  private routerSub: any;
  private gameSub: any;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let query = '';

    this.routerSub = this.activatedRoute.params.subscribe((params) => {
      query = params['game-search'];
    });

    this.searchGames('metacrit', query);
  }

  searchGames(sort: string, query?: string) {
    this.gameSub = this.httpService
      .getGameList(sort, query)
      .subscribe((data: any) => {
        this.games = data.results;
      });
  }

  openGameDetails(id: any) {
    console.log('clicked openGameDetails', id);
    this.router.navigate(['details', id]);
  }

  imgError(image: any) {
    image.style.display = 'none';
  }

  ngOnDestroy(): void {
    if (this.gameSub) this.gameSub.unsubscribe();
    if (this.routerSub) this.gameSub.unsubscribe();
  }
}
