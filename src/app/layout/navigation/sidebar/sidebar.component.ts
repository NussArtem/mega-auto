import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: boolean;
  constructor() {

  }
  ngOnInit(): void {
    this.user = false;
      if (localStorage.getItem('user')) {
          this.user = true;
      }
  }
}
