import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserSignUpInterface } from 'src/app/interfaces/user-sign-up.interface';
import { ErrorRestInterface } from 'src/app/interfaces/error-rest.interface';
import { TitleService } from 'src/app/services/title.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  errorRest: ErrorRestInterface;
  signUpForm: FormGroup;
  loading = false;
  hide = true;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: TitleService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Registro');
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
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

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    let userSignUpData: UserSignUpInterface = this.signUpForm.value;

    this.loading = true;
    this.authenticationService
      .signUp(userSignUpData)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          this.errorRest = error.error;
        }
      );
  }

}
