import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  chatForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.chatForm = this.formBuilder.group({
      q: ['', Validators.required]
    });
  }

  get f() { return this.chatForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.chatForm.invalid) {
      return;
    }

    console.log(this.f.q)

    // this.loading = true;
    // this.authenticationService.login(this.f.email.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       // this.alertService.error(error);
    //       this.loading = false;
    //     });
  }

}
