import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PARecord} from '../_models/PARecord';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {first} from "rxjs/operators";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'parecord-component',
  templateUrl: './parecord.component.html',
  styleUrls: ['./parecord.component.css']
})
export class ParecordComponent implements OnInit {
  @Input() parecord: PARecord;
  @Output() deleteEvent = new EventEmitter<Date>();

   mode = 'determinate';

   bufferValue = 0;

   activities = ['directions_walk', 'directions_run', 'directions_bike'];


   color1 = 'primary';
   color2 = 'warn';
   user: User;
   activity = this.activities[0];
   calprogressvalue = 100;
   minprogressvalue = 100;

  constructor(private notifService: NotificationService, private userService: UserService,
              private authService: AuthService, private router: Router) {

  }


  delete(date) {
    this.deleteEvent.emit(date);
  }

  notImplemented(message) {
    this.notifService.notImplementedWarning(message);
  }
  edit(parecord: PARecord) {
    this.router.navigate(["/add", {"date": parecord.createdDate, "mins": parecord.minutes, "cals": parecord.calories, "patype": parecord.activityType}]);
  }

  ngOnInit() {
    this.authService.currentUser.pipe(first()).subscribe(user =>{
      this.user = user;
    })


    this.activity = this.activities[this.parecord.activityType];
    //TODOc:  use userService to get the goal values corresponding the username that created the parecord and then use the obtained values to properly visualize the progress towards the goal.
    this.userService.getGoals(this.user).pipe(first()).subscribe(user =>{
      this.minprogressvalue = Math.floor(100 * this.parecord.minutes / user[0].minutegoal);

      this.calprogressvalue = Math.floor( 100 * this.parecord.calories / user[0].caloriegoal);
    });
  }
}
