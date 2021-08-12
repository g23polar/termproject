// TODO
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import {NotificationService} from '../_services/notification.service';
import {first} from 'rxjs/operators';
import {User} from '../_models/user';

import {AuthService} from '../_services/auth.service';
import {MatSliderChange} from '@angular/material/slider';
import {PArecordService} from '../_services/parecord.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  calControl = new FormControl('', [Validators.max(6000), Validators.min(1000)]);
  minControl = new FormControl('', [Validators.max(360), Validators.min(15)]);
  dateControl: FormControl;
  date: Date;
  user: User;

  activities = ['Running', 'Walking', 'Biking'];

  minutes: number;
  calories: number;

  activity: string;
  edit: boolean;


  constructor(private parecordService: PArecordService,
              private authService: AuthService,
              private notifService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.edit = false;
    this.authService.currentUser.pipe(first()).subscribe((user) =>{
      this.user = user;
    });
    this.minutes = Number.parseInt(this.route.snapshot.paramMap.get("mins"));
    this.calories = Number.parseInt(this.route.snapshot.paramMap.get("cals"));

    if (this.route.snapshot.paramMap.get("date") != null) {
      //{ new Date(this.route.snapshot.paramMap.get("date")),
      // disabled: true }
      this.edit = true;
      this.date = new Date(this.route.snapshot.paramMap.get("date"));
      this.dateControl = new FormControl({
        value: this.route.snapshot.paramMap.get("date"),
        disabled: true,
      });
    }

    this.activity = this.activities[this.route.snapshot.paramMap.get("patype")];
  }

  save() {

    this.parecordService.add( {
        minutes: this.minutes,
        createdDate:this.date,
        activityType: this.getActivity(),
        calories: this.calories,
      }
    ).pipe(first()).subscribe(() => {
        if(this.edit){
          this.notifService.showNotif('Physical activity updated', 'OK');
        }
        else{
          this.notifService.showNotif('Physical activity added', 'OK');
        }
      }
      , error => { this.notifService.showNotif(error); });
    this.router.navigate(['/']);
  }

  newDate(e) {
    console.log('updateDate', e.value);
    this.date = e.value;
  }

  changeCalsFromSlider(e: MatSliderChange) {
    this.calories = e.value;
  }

  changeMinsFromSlider(e: MatSliderChange) {
    this.minutes = e.value;
  }

  updateCals(e) {
    this.calories = e.target.value;
  }

  updateMins(e) {
    this.minutes = e.target.value;
  }

  getActivity(): number {
    if (this.activity === 'Running') {
      return 0;
    }
    else if (this.activity === 'Walking') {
      return 1;
    }
    else {
      return 2;
    }
  }
}
