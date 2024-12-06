import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  registrationForm: FormGroup;
  regions: { code: string, name: string }[] = [
    { code: 'IDF', name: 'Île-de-France' },
    { code: 'PAC', name: 'Provence-Alpes-Côte d\'Azur' },
    { code: 'ARA', name: 'Auvergne-Rhône-Alpes' },
    { code: 'NAQ', name: 'Nouvelle-Aquitaine' },
    { code: 'OCC', name: 'Occitanie' },
    { code: 'BFC', name: 'Bourgogne-Franche-Comté' },
    { code: 'HDF', name: 'Hauts-de-France' },
    { code: 'BRE', name: 'Bretagne' },
    { code: 'CVL', name: 'Centre-Val de Loire' },
    { code: 'NOR', name: 'Normandie' },
    { code: 'GUA', name: 'Guadeloupe' },
    { code: 'MAY', name: 'Mayotte' },
    { code: 'REU', name: 'La Réunion' },
    { code: 'MART', name: 'Martinique' },
    { code: 'GUF', name: 'Guyane' },
    { code: 'WLF', name: 'Wallis-et-Futuna' },
    { code: 'POL', name: 'Polynésie française' },
    { code: 'NC', name: 'Nouvelle-Calédonie' },
    { code: 'COM', name: 'Comores' },
    { code: 'TAH', name: 'Tahiti' },
    { code: 'STP', name: 'Saint-Pierre-et-Miquelon' },
    { code: 'SF', name: 'Saint-Barthélemy' },
    { code: 'SG', name: 'Saint-Martin' },
    { code: 'GUF', name: 'Guyane' },
    { code: 'NC', name: 'Nouvelle-Calédonie' }
  ];
  

  constructor(private fb: FormBuilder,private api:ApisService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      region: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(18)]), // Added age form control
      motdepasse: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      gender: new FormControl('', [Validators.required]),
    }, [this.passwordsMatch]);  // Apply custom validator here
  }

  // Custom password match validator
  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;

    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.api.signup(this.registrationForm.value).subscribe(
        (response:any)=>
          {if (response["status"]==200)
          {
            console.log("sign up  Success")
          }
        }
      )

    }
  }

}