import { Component, OnDestroy, OnInit } from "@angular/core";
import { first, mergeMap } from "rxjs/operators";

import { NotificationService } from "../_services/notification.service";
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { User } from "../_models/user";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReviewService } from "../_services/review.service";

<<<<<<< HEAD


import {from} from "rxjs";
import {Review} from "../_models/Review";


@Component({
  templateUrl: "home.component.html",

  styleUrls: ["home.component.css"],
})

=======
@Component({ templateUrl: 'home.component.html' ,
            styleUrls: ['home.component.css']})
>>>>>>> 2aaeb04b9b876d2e3b779349578a9ab005cd7955

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
<<<<<<< HEAD
    private reviewService: ReviewService
  ) {}

  search(query: string){
    this.reviewService.getPlaces().subscribe(
      reviews => {
        this.allPlaces = reviews.filter(review => review === query);
      },
      error => {
        this.notifService.showNotif(error.toString(), 'error, home comp ts'); });

    // if(!found){
    //   this.notifService.showNotif('There are no reviews for this location yet!');
    // }
  }

=======
    private reviewService: ReviewService) {}

  search(query: string) {
  }


  //    TODO add searching functionality

>>>>>>> 2aaeb04b9b876d2e3b779349578a9ab005cd7955
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
    this.reviewService.getPlaces().subscribe(places => {
      this.allPlaces = places;
<<<<<<< HEAD
      this.reviewService.places = places
=======
      this.reviewService.places = places;
>>>>>>> 2aaeb04b9b876d2e3b779349578a9ab005cd7955
    });
  }

  navToCreate() {
    this.router.navigate(['/create']);
  }
}
