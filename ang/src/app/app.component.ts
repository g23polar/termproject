import {AfterViewInit, Component} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {User} from './_models/user';
import {Role} from './_models/role';
import {AvatarModule} from 'ngx-avatar';
import {ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HW3Angular';
  currentUser: User;
  initials;
  public circleColor: string;


  constructor(  private router: Router,
                private authService: AuthService
                ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.circleColor = '#707070';
      this.initials = (this.currentUser.firstName[0] + this.currentUser.lastName[0]).toUpperCase();
      console.log('initials', this.initials);
    });


  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  get isUser() {
    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['']);
  }




}
