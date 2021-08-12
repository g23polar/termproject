import { Component, OnInit } from '@angular/core';
import {RankcardComponent} from "../rankcard/rankcard.component";
import {RankCard} from "../_models/RankCard";
@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  cards: RankCard[];

  constructor() { }

  ngOnInit() {

  }

}
