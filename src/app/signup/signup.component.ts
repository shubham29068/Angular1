import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    if (!this.signupForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      }); return
    }
    this._http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe(res => {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      this.signupForm.reset()
      this.router.navigate(['login'])
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
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
