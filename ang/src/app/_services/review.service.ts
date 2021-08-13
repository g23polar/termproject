// TODO 1/2

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {Review} from '../_models/Review';




@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll() {
    return this.http.get<Review[]>(`http://localhost:3030/review/getreview`);
  }


  add(data: Review) {
    const dataRecord = {
      location: data.location,
      description: data.description,
      rating: data.rating
    };

    return this.http.post(`http://localhost:3030/review/addreview`, dataRecord);

  }

  delete(date: string) {
    return this.http.delete(`http://localhost:3030/review/${date}`);
  }



}
