import {Component, HostListener, Inject} from '@angular/core';

import {User} from '@app/shared/models';
import {AccountService} from '@app/shared/services/helpers';
import {DOCUMENT} from '@angular/common';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  user: User;
  isCookie: boolean;

  constructor(private accountService: AccountService, @Inject(DOCUMENT) private document: Document) {
    this.user = this.accountService.userValue;
    }


  windowScrolled: boolean;


  @HostListener('window:scroll', [])


  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {

      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }

    })();
  }

  ngOnInit() {
  }

}
