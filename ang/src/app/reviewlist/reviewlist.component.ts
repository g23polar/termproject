import { Component, OnInit } from '@angular/core';
import {Review} from '../_models/Review';
import {ReviewService} from '../_services/review.service';
import {NotificationService} from '../_services/notification.service';
import {first} from 'rxjs/operators';
import {User} from '../_models/user';

@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent implements OnInit {

  location = 'Blacksburg'; // TODO get location
  reviews: Review[];
  sortTypes: ['Highest Rating', 'Lowest Rating', 'Most Recent', 'Least Recent'];
  sortType;


  constructor(private reviewService: ReviewService,
              private notifService: NotificationService) { }

  ngOnInit(): void {
    this.loadAllReviews();
  }

  private loadAllReviews() {
    this.reviewService.getAll().subscribe(reviews => {
      this.reviews = reviews.filter(review => review.location === this.location);
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

  sort() {
    console.log('sort', this.sortType);
    if (this.sortType === 'Highest Rating') {
      this.reviews.sort((prev, curr) => {
        const keyPrev = prev.rating;
        const keyCurr = curr.rating;
        if (keyPrev < keyCurr) { return 1; } else if (keyPrev > keyCurr) { return -1; }
        return 0;
      });
    }

    if (this.sortType === 'Lowest Rating') {
      this.reviews.sort((prev, curr) => {
        const keyPrev = prev.rating;
        const keyCurr = curr.rating;
        if (keyPrev < keyCurr) { return -1; } else if (keyPrev > keyCurr) { return 1; }
        return 0;
      });
    }

    if (this.sortType === 'Most Recent') {
      this.reviews.sort((prev, curr) => {
        const keyPrev = prev.createdDate;
        const keyCurr = curr.createdDate;
        if (keyPrev < keyCurr) { return 1; } else if (keyPrev > keyCurr) { return -1; }
        return 0;
      });
    }

    if (this.sortType === 'Least Recent') {
      this.reviews.sort((prev, curr) => {
        const keyPrev = prev.createdDate;
        const keyCurr = curr.createdDate;
        if (keyPrev < keyCurr) { return -1; } else if (keyPrev > keyCurr) { return 1; }
        return 0;
      });
    }
  }
}
