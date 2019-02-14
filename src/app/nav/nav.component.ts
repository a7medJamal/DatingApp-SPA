import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};

  constructor(private autservice: AuthService, private alertify: AlertifyService , private router: Router) { }

  ngOnInit() {
  }

login() {
  this.autservice.login(this.model).subscribe(data => {
    this.alertify.success('logged in successfuly');
  }, error => {
    this.alertify.error('Faild to login');
  }, () => {
  this.router.navigate(['/members']);
  });
}

 logout() {
    this.autservice.userToken = null;
    localStorage.removeItem('token');
     this.alertify.message('logged out');
     this.router.navigate(['/home']);
  }

  loggedIn() {
  return this.autservice.loggedIn();
  }
}
