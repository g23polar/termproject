import { Component, OnDestroy, OnInit } from "@angular/core";
import { first, mergeMap } from "rxjs/operators";

import { NotificationService } from "../_services/notification.service";
import { UserService } from "../_services/user.service";
import { User } from "../_models/user";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReviewService } from "../_services/review.service";
import { ActivatedRoute, Router } from "@angular/router";



import {from} from "rxjs";
import {Review} from "../_models/Review";


@Component({
  templateUrl: "home.component.html",

  styleUrls: ["home.component.css"],
})


export class HomeComponent implements OnInit {
  homeUser: User;

  query: string;
  SearchControl = new FormControl({value: "", disabled: false});

  filteredOptions: Observable<string[]>;
  allPlaces: Review[];
  autoCompleteList: any[];

  constructor(
    private router: Router,
    private notifService: NotificationService,
    private userService: UserService,
    private reviewService: ReviewService
  ) {}

  search(query){
    this.reviewService.getAll().subscribe(
      reviews => {
        this.allPlaces = reviews.filter(myre => { 
         return myre.location === query.target.value;
        } );
        
        this.reviewService.reviews = this.allPlaces;
        
        this.router.navigate(['/viewReviews']);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'Not found, ok'); });

    // if(!found){
    //   this.notifService.showNotif('There are no reviews for this location yet!');
    // }
  }

  // loadAllPArecords() {
  //   console.log('loadAllParecords()');

  //   this.parecordservice.getAll().subscribe(
  //        parecords => {
  //          this.parecords = parecords;
  //          // this.homeUser = this.parecords[0].createdBy;
  //        },
  //       error => {
  //           this.notifService.showNotif(error.toString(), 'warning'); });
  // }

  /**
   * dont need this anymore,
   * middleware for using random activity addition
   */
  // createPARecord() {
  //   this.parecordservice.add().pipe(first()).subscribe(
  //     resp => {
  //       this.notifService.showNotif(resp, 'response');
  //       this.parecords = null;
  //       this.loadAllPArecords();
  //       }, error => {
  //       this.notifService.showNotif(error); });
  // }

  // deletePARecord(date) {
  //   // this.userService.deleteActivity(date);
  //   this.parecordservice.delete(date).pipe(first()).subscribe( () => { this.parecords = null;
  //                                                                      this.loadAllPArecords();
  //   });
  // }

  ngOnInit() {
    this.reviewService.getAll().subscribe(places => {
      this.allPlaces = places;
    });
  }

  navToCreate() {
    this.router.navigate(["/create"]);
  }
}
