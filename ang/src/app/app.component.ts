import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {User} from './_models/user';
import {Role} from './_models/role';
import {AvatarModule} from "ngx-avatar";
import {ElementRef} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'HW3Angular';
  currentUser: User;
  first = 'G';
  last = 'N';
  initials = 'fmerlkf fekrmlf';
  public circleColor: string;


  constructor(  private router: Router,
                private authService: AuthService
                ) {
    this.authService.currentUser.subscribe(x => {
      // console.log("do i get here");
      this.currentUser = x;
      this.circleColor = "#707070";

    });

    // this.first = this.currentUser.firstname;

    // console.log(this.currentUser);
    // console.log("HERE");
    // this.first = this.currentUser.firstname[0];
    // this.last = this.currentUser.lastname[0];

  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  get isUser() {
    return this.currentUser;
  }

  get getInitials(){
    // this.first = this.authService.currentUserSubject.value.firstname.substr(0, 1);
    // this.last = this.authService.currentUserSubject.value.lastname.substr(0, 1);

    console.log(this.authService.currentUserSubject.value.firstname);
    // this.last = this.authService.currentUserSubject.value.lastname.substr(0, 1);
    // this.initials = this.first + " " +this.last;
    // console.log(this.initials);

    this.initials = "Adam Ilan";
    if(this.authService.currentUserValue.firstname){
      this.initials = this.authService.currentUserValue.firstname;
    }
    else if(this.authService.currentUserSubject.getValue().firstname){
      this.initials = this.authService.currentUserSubject.getValue().firstname;
    }
    else{
      // this.logout();
    }
    // console.log("returning initials " , this.initials);
    return 'AI'
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToHome(){
    this.router.navigate(['']);
  }




}
