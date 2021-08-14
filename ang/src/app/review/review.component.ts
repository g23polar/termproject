// TODO : add, delete
import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Review} from '../_models/Review';
import {AuthService} from '../_services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'review-component',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;
  @Output() deleteEvent = new EventEmitter<Date>();


  constructor(private authService: AuthService) { }

  editable = false;
  currentRating = 0;
  initials;

  rating = [
    {id: 1, color: 'gray'},
    {id: 2, color: 'gray'},
    {id: 3, color: 'gray'},
    {id: 4, color: 'gray'},
    {id: 5, color: 'gray'}
  ];
  ngOnInit(): void {
    this.selectRating(this.review.rating);
    this.authService.currentUser.subscribe(user => {
      this.review.createdBy = user;
      this.initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
    } );
  }

  delete(date) {
    this.deleteEvent.emit(date);
  }

  toggleEdit() {
    this.editable = !this.editable;
  }

  selectRating(value) {
    this.rating.filter((star) => {
      if (star.id <= value) {
        star.color = 'orange';
      } else {
        star.color = 'gray';
      }
      return star;
    });
    this.currentRating = value;
  }
}
