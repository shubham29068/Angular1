import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted: boolean = false;
  signupForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: ['', [Validators.required, Validators.required]],
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {

    console.log('this.signupForm', this.signupForm)
  }
  // make method to create user
  signup() {
    this.submitted = true;
    console.log('this.signupForm', this.signupForm)
    if (!this.signupForm.valid) { alert("fill all fields"); return }
    this._http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe(res => {
      alert("Registration successfull")
      this.signupForm.reset()
      this.router.navigate(['login'])
    }, err => {
      alert("Error 404")
    }
    )
  }
  form() {

    this.signupForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: ['', [Validators.required, Validators.required]],
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }
}
