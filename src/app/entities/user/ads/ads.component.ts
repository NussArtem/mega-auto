import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService, AlertService} from '../../../shared/services/helpers';
import {User} from '../../../shared/models';
import {AutoriaDevCredentialsService} from "../../../shared/services/auto-ria/autoria-dev-credentials.service";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit, OnDestroy {

  isTrue = false;

  form: FormGroup;
  loading = false;
  submitted = false;
  username: string = '';
  user: User;
    public adsUser: any[];


    constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private autoriaDevCredentialsService: AutoriaDevCredentialsService
  ) {
    this.accountService.user.subscribe(x => this.user = x);
    this.username = this.user.username;
  }

  ngOnInit() {
     console.log(this.adsUser)
    this.form = this.formBuilder.group({
      autoRiaId: ['', Validators.required],
      autoRiaKey: ['', Validators.required]
    });

    if (localStorage.getItem('AuthRia') == 'Done' ) {
      this.isTrue = true;
      this.autoriaDevCredentialsService.getAutoriaAds().subscribe(value =>{this.adsUser = value.active
          console.log(this.adsUser)
          return
      }, error => localStorage.removeItem('AuthRia'));
    }
    console.log(localStorage.getItem('AuthRia'))
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
      this.autoriaDevCredentialsService.postAutoriaDevCredentials(this.f.autoRiaId.value, this.f.autoRiaKey.value);
     this.submitted = true;
     // reset alerts on submit
     this.alertService.clear()
      if (localStorage.getItem('AuthRia') == 'Done' ) {
          this.isTrue = true;
          this.autoriaDevCredentialsService.getAutoriaAds();
      }
  }

  ngOnDestroy(): void {
    this.isTrue = false;
  }

}
