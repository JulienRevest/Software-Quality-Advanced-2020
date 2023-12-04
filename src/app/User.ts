export class User {

	email: string;
	login: string;
    //Both the passwords are in a single object
	password: { 
	  pwd: string;
	  confirmPwd: string;
	};
	country: string;
	phone: string;
	terms: boolean;

	constructor(values: Object = {}) {
	  //Constructor initialization
      Object.assign(this, values);
  }

}