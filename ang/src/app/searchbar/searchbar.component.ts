import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReviewService } from "../_services/review.service";


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPlaces: string[];
  autoCompleteList: any[]

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    private reviewService: ReviewService 
  ) { }

  ngOnInit() {

      // get all the post
      this.reviewService.getPlaces().subscribe(places => {
        this.allPlaces = places
        this.reviewService.places = places
      });

      // // when user types something in input, the value changes will come through this
      // this.myControl.valueChanges.subscribe(userInput => {
      //     this.autoCompleteExpenseList(userInput);
      // })
  }



  // after you clicked an autosuggest option, this function will show the field you want to show in input
  displayFn(post: string) {
      return post;
  }


  // focus the input field and remove any unwanted text.
  focusOnPlaceInput() {
      this.autocompleteInput.nativeElement.focus();
      this.autocompleteInput.nativeElement.value = '';
  }


}
