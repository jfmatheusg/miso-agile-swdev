import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../../services/authentication.service";
import { UserSignUpDataDTO } from 'src/app/services/DTO/userSignUpDataDTO.interface';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title: string = "Olímpicos Tokyo 2020";
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "/gallery";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ["", Validators.required],
      username: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  signUp() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    //console.log(this.f.q);

    let userSignUpData : UserSignUpDataDTO = this.signUpForm.value;
    console.log('userSignUpData', userSignUpData);

    this.loading = true;
    this.authenticationService
      .signUp(userSignUpData)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          //this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
