import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faEnvelope, faEyeSlash, faEye, faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  // login = "";
  // password = "";
  submitted = false;
  faEye = faEye;
  faAddressCard = faAddressCard;
  faEnvelope = faEnvelope;
  faEyeSlash = faEyeSlash;
  myLoginForm: FormGroup;
  fieldTextType = false;
  user = {login: 'Bernard32', password:'supermotdepasse32'}

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myLoginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$') ]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    })
  }


  get f(){ return this.myLoginForm.controls; }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.myLoginForm.invalid){
      return;
    }

    //display form values on success
    alert('SUCCESS !'+ JSON.stringify(this.myLoginForm.value, null, 4))
  }

  togglefieldTextType(){
    this.fieldTextType = !this.fieldTextType;
    console.log(this.fieldTextType);
  }

}