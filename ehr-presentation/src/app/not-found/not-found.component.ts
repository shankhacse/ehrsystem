import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  
redirectHome;
constructor(private router:Router) {}

    ngOnInit() {
        let token = this.getDecodedAccessToken(localStorage.getItem("token"));
        this.redirectHome = this.getHomeUrl(token.data.user_role_code);
    }

    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
    }

     

    getHomeUrl(rolecode:string) {
        let homeUrl = "";
        if(rolecode == "ADMIN"){
            homeUrl = "/panel/dashboard";
        }

        else if(rolecode == "DOC"){
            homeUrl = "/panel/doctor";
        }

        else if(rolecode == "PHRM"){
            homeUrl = "/panel/prescriptionlist";
        }

        
        else if(rolecode == "ASST"){
            homeUrl = "/panel/registration";
        }
        else {
            homeUrl = "";
        }

        return homeUrl;

      }


    redirectToHome(){
      this.router.navigate([this.redirectHome]);
    }

}
