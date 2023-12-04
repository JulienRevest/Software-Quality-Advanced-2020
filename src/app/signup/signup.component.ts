import { Component, OnInit } from '@angular/core';
// Import the User model
import { User } from './../User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  
  private country: string[];
  
  private user:User;

  ngOnInit() {

    this.country =  ['France', 'Espagne', 'Allemagne', 'Portugal', 'Chine'];
    //Creer un nouvel objet user
    this.user = new User({email:"thomas.fabre@outlook.fr", login: "", password: { pwd: "" , confirmPwd: ""}, country: this.country[0], phone:"", terms: false});
  }

   onFormSubmit({ value, valid}: { value: User, valid: boolean }) {
    	this.user = value;
    	console.log( this.user);
    	console.log("valid: " + valid);
  	}
}

