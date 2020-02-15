import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ErrorRestInterface } from 'src/app/interfaces/error-rest.interface';
import { ErrorRestService } from 'src/app/services/error-rest/error-rest.service';
import { TitleService } from 'src/app/services/title.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  errorRest: ErrorRestInterface;
  loginForm: FormGroup;
  loading = false;
  hide = true;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public errorRestService: ErrorRestService,
    private titleService: TitleService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getErrorMessage(field) {
    let obj = this.f[field];
    return obj.hasError('required') ? 'El campo es requerido' :
      obj.hasError('email') ? 'No es un correo válido' :
        '';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.me()
            .pipe(first())
            .subscribe(
              data => {
                this.loading = false;
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.loading = false;
                this.errorRest = error.error;
              });
        },
        error => {
          this.loading = false;
          this.errorRest = error.error;
        });
  }

}
