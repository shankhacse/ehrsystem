import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  loginButtonActive:boolean = true;
  loaderActive:boolean = false;
  invalidErr:boolean = false;
  invalidErrMsg:string = "";

  constructor(private authService:AuthService,private router:Router) {

    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
     
    });

   }

  ngOnInit() {
  }



  onSubmit(formVal) {
    
    
    localStorage.removeItem("token");
  
    if(this.isLoginFormValid(formVal)){
    this.loginButtonActive = false;
    this.loaderActive = true;
    let response;
    this.authService.signInVerification(formVal).then(data => {
     
    response = data;
    if(response.msg_status==100){
      const user_data = response.userdata;
      localStorage.setItem("token", response.token);
      
      localStorage.setItem("fname", user_data.first_name);
      localStorage.setItem("lname", user_data.last_name);
     // this.router.navigate(['/panel/registration']);
      
      if(user_data.user_role_code=="ADMIN"){
        this.router.navigate(['/panel/dashboard']);
      }
      else if(user_data.user_role_code=="DOC"){
        this.router.navigate(['/panel/doctor']);
      }
      else if(user_data.user_role_code=="ASST"){
        this.router.navigate(['/panel/registration']);
      }
      else if(user_data.user_role_code=="PHRM"){
        this.router.navigate(['/panel/prescriptionlist']);
      }
      else{
        this.router.navigate(['/not-found']);
      }
      
      
      

     }
     else{
      this.invalidErr = true;
      this.invalidErrMsg = response.msg_data;
      this.loginButtonActive = true;
      this.loaderActive = false;

     }
    },
       error => {
        console.log("Error from login attempt");
     });
    }




  }

  isLoginFormValid(formVal){
    let isFormValidate:boolean = true;
    if(formVal.username=="" || formVal.username == null){
      isFormValidate = false;
    }
    if(formVal.password=="" || formVal.password == null){
      isFormValidate = false;
    }
    return isFormValidate;
  }

  clearError(){

    this.invalidErrMsg = "";
    this.invalidErr = false;
  }


}
