import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from './../../interface/game';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId: string = '';
  game: Game;
  routeSub: Subscription = new Subscription();
  gameSub: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: any) => {
      this.gameId = params.id;
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string) {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((res) => {
      this.game = res;

      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    });
  }

  getColor(value: number): string {
    if (value >= 75) return '#5ee432';
    if (value >= 50) return '#fffa50';
    if (value >= 30) return '#f7aa38';

    return '#ef4655';
  }

  ngOnDestroy(): void {
    if (this.gameSub) this.gameSub.unsubscribe();
    if (this.routeSub) this.gameSub.unsubscribe();
  }
}
