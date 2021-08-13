import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';
import {PArecordService} from '../_services/parecord.service';
import {UserService} from '../_services/user.service';
import {Router} from "@angular/router";
import {User} from "../_models/user";
import {from} from "rxjs";

@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {


  homeUser: User;

  parecords: PARecord[] = [];


  constructor(
    private parecordservice: PArecordService,
    private router: Router,
    private notifService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadAllPArecords();
      }

  //    TODO add searching functionality



  loadAllPArecords() {
    console.log('loadAllParecords()');

    this.parecordservice.getAll().subscribe(
         parecords => {
           this.parecords = parecords;
           // this.homeUser = this.parecords[0].createdBy;
         },
        error => {
            this.notifService.showNotif(error.toString(), 'warning'); });
  }

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

  deletePARecord(date) {
    // this.userService.deleteActivity(date);
    this.parecordservice.delete(date).pipe(first()).subscribe( () => { this.parecords = null;
                                                                       this.loadAllPArecords();
    });
  }
  // @ts-ignore
    @Output() searchcriteria = new EventEmitter<String>();
  // searchword: any;
  searchword = "testword"
  searchThis() {
  // @ts-ignore
  this.searchcriteria.emit(this.searchword)
  }

  navToCreate(){
    this.router.navigate(['/create']);
  }
}

