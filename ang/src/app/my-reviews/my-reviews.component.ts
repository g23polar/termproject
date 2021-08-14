import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {ReviewService} from '../_services/review.service';
import {NotificationService} from '../_services/notification.service';
import {Review} from '../_models/Review';
import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {

  reviews: Review[];
  currUser: User;

  constructor(private reviewService: ReviewService,
              private notifService: NotificationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAllReviews();
    this.authService.currentUser.subscribe(currUser => { this.currUser = currUser; });
  }

  private loadAllReviews() {
    this.reviewService.getAll().subscribe(reviews => {
        // this.reviews = reviews.filter(review => review.createdBy === this.currUser);
      this.reviews = reviews;
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  deleteReview(date) {
    this.reviewService.delete(date).pipe(first()).subscribe( () => {
      this.reviews = null;
      this.loadAllReviews();
    });
  }
}
