import { Component, OnDestroy, OnInit } from "@angular/core";
import { first, mergeMap } from "rxjs/operators";

import { NotificationService } from "../_services/notification.service";
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { User } from "../_models/user";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReviewService } from "../_services/review.service";



import {from} from "rxjs";


@Component({ templateUrl: 'home.component.html' ,
            styleUrls: ['home.component.css']})

@Component({
  templateUrl: "home.component.html",

  styleUrls: ["home.component.css"],
})


export class HomeComponent implements OnInit {
  homeUser: User;


  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPlaces: string[];
  autoCompleteList: any[];

  constructor(
    private router: Router,
    private notifService: NotificationService,
    private userService: UserService,
    private reviewService: ReviewService 
  ) {}

  ngOnInit() {
    this.reviewService.getPlaces().subscribe(places => {
      this.allPlaces = places
      this.reviewService.places = places
    });
  }

  navToCreate() {
    this.router.navigate(["/create"]);
  }
}

