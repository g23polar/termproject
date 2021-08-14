// TODO : add, delete
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  // @Input() parecord: PARecord;

  constructor() { }

  description = 'This is a sample description. ';
  date = '8/13/2021';
  editable = false;
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

  toggleEdit() {
    this.editable = !this.editable;
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
