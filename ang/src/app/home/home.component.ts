import { Component, OnDestroy, OnInit } from "@angular/core";
import { first, mergeMap } from "rxjs/operators";

import { NotificationService } from "../_services/notification.service";
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { User } from "../_models/user";

<<<<<<< HEAD
<<<<<<< HEAD
import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';
import {PArecordService} from '../_services/parecord.service';
import {UserService} from '../_services/user.service';
import {Router} from "@angular/router";
import {User} from "../_models/user";
import {from} from "rxjs";
<<<<<<< HEAD
import {ReviewService} from "../_services/review.service";

@Component({ templateUrl: 'home.component.html' ,
            styleUrls: ['home.component.css']})
=======
=======
=======
>>>>>>> 36553f4a0a9292c2427ccf6e7407ab07229a29ba
@Component({
  templateUrl: "home.component.html",

  styleUrls: ["home.component.css"],
})
>>>>>>> 756202f47cd52212b4cf8c3d1ad6262fbdc444d5
export class HomeComponent implements OnInit {
  homeUser: User;

  constructor(
    private router: Router,
    private notifService: NotificationService,
    private userService: UserService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {}

  //    TODO add searching functionality

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

  navToCreate() {
    this.router.navigate(["/create"]);
  }
}