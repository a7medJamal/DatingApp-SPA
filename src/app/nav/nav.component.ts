import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(private autservice: AuthService) { }

  ngOnInit() {
  }
login() {
  this.autservice.login(this.model).subscribe(data => {
    console.log('logged in successfuly');
  }, error => {
    console.log('faild to login');
  });
}
}