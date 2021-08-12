import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';

import {first} from 'rxjs/operators';
import {MatSliderChange} from "@angular/material/slider";


import {FormControl, Validators} from '@angular/forms';
//TODO:

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  calgoal = 1500;
  mingoal = 120;
  user: User;
  caloriecontroller = new FormControl('', [Validators.max(3000), Validators.min(1000)]);
  minutecontroller = new FormControl('', [Validators.max(360), Validators.min(15)]);

  constructor(private userService: UserService,
              private authService: AuthService,
              private notifService: NotificationService) { }

  ngOnInit(): void {
    this.authService.currentUser.pipe(first()).subscribe(user => {
      this.user = user;
    });

    this.userService.getGoals(this.user).pipe(first()).subscribe( (newuser) => {
        console.log(newuser);
        this.mingoal = newuser[0].minutegoal;
        this.calgoal = newuser[0].caloriegoal;
      },
      (error) => {
        // this.notifService.showNotif(error, "settings comp error");
      }

    );

  }



  changecals(e) {
    this.calgoal = e.target.value;
  }

  changeminutes(e) {
    this.mingoal = e.target.value;
  }

  changefromsliderCal(e: MatSliderChange) {
    this.calgoal = e.value;
  }

  changefromsliderMin(e: MatSliderChange) {
    this.mingoal = e.value;
  }

  update() {
    this.user.minutegoal = this.mingoal;
    this.user.caloriegoal = this.calgoal;
    this.userService.setGoals(this.user).pipe(first()).subscribe();
  }
}
