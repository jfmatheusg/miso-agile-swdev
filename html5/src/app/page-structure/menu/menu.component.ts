import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  user: {};


  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    this.user = {}
  }

}
