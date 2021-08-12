import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor() { }

  currentRating = 0;
  rating = [
    {
      id: 1,
      color: 'gray'
    },
    {
      id: 2,
      color: 'gray'
    },
    {
      id: 3,
      color: 'gray'
    },
    {
      id: 4,
      color: 'gray'
    },
    {
      id: 5,
      color: 'gray'
    }
  ];
  ngOnInit(): void {
  }

  delete() {

  }

  selectRating(value) {
    console.log('selectRating', value);
    this.rating.filter((star) => {
      console.log('star', star.id, star.color);
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
