// TODO
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

import { NotificationService } from "../_services/notification.service";
import { first } from "rxjs/operators";
import { User } from "../_models/user";

import { AuthService } from "../_services/auth.service";
import { ReviewService } from "../_services/review.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  date: Date;
  user: User;

  minutes: number;
  calories: number;

  description: string;
  location: string;

  locationCntrl = new FormControl({value: '', disabled: false});

  edit: boolean;

  currentRating = 0;
  rating = [
    {
      id: 1,
      color: "gray",
    },
    {
      id: 2,
      color: "gray",
    },
    {
      id: 3,
      color: "gray",
    },
    {
      id: 4,
      color: "gray",
    },
    {
      id: 5,
      color: "gray",
    },
  ];

  selectRating(value) {
    console.log("selectRating", value);
    this.rating.filter((star) => {
      console.log("star", star.id, star.color);
      if (star.id <= value) {
        star.color = "orange";
      } else {
        star.color = "gray";
      }
      return star;
    });
    this.currentRating = value;
  }

  constructor(
    private authService: AuthService,
    private notifService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.edit = false;
    this.authService.currentUser.pipe(first()).subscribe((user) => {
      this.user = user;
    });

    if (this.route.snapshot.paramMap.get("date") != null) {
      this.edit = true;
      this.locationCntrl = new FormControl({value: '', disabled: true});
    }
  }

  save() {
    this.reviewService
      .add({
        description: this.description,
        location: this.location,
        rating: this.currentRating,
        createdDate: new Date(),
        createdBy: this.user,
      })
      .pipe(first())
      .subscribe(
        () => {
          if (this.edit) {
            this.notifService.showNotif("Update Saved", "OK");
          } else {
            this.notifService.showNotif("Review added", "OK");
          }
        },
        (error) => {
          this.notifService.showNotif(error);
        }
      );

    //TODO:
    this.router.navigate(["/"]);
  }

  newDate(e) {
    console.log("updateDate", e.value);
    this.date = e.value;
  }

  updateCals(e) {
    this.calories = e.target.value;
  }

  updateLocation(e) {
    this.location = e.target.value;
  }

  updateDesription(e) {
    this.description = e.target.value;
  }
}
