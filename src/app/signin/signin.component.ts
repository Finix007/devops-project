import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  // Declare the form group
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private apis:ApisService) {}

  ngOnInit(): void {
    // Initialize the form group
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required]], // Password field with validation
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form submitted', this.signupForm.value);
      this.apis.login(this.signupForm.value).subscribe(
        (response:any)=>
        {
          console.log("login success")
        }
      )
    } else {
      console.log('Form is invalid');
    }
  }
}