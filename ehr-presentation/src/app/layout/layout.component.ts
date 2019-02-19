import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from '../service/common.service';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    time: Date;
    currdate = new Date();
    collapedSideBar: boolean;
    isNotAdmin:boolean = false;
    isAdmin:boolean = true;
    redirectHome;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
    username;

    constructor(private breakpointObserver: BreakpointObserver , private commonService:CommonService , private router:Router) {

        setInterval(() => {         
            this.currdate = new Date(this.currdate.setSeconds(this.currdate.getSeconds() + 1));
            this.time = this.currdate;
        }, 1000);

       

    }

    ngOnInit() {

        let token = this.getDecodedAccessToken(localStorage.getItem("token"));
       // console.log(token);
        this.redirectHome = this.getHomeUrl(token.data.user_role_code);

        if(token.data.user_role_code=="ADMIN") {
            this.isAdmin = true;
           // this.isNotAdmin = false;
        }
        else{
            this.isAdmin = false;
           // this.isNotAdmin = true;
        }
        //this.username = localStorage.getItem('fname') +" "+localStorage.getItem('lname');
        this.username = localStorage.getItem('fname') ;
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }


    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

      Logout(){
        localStorage.clear();
        this.router.navigate(['/']);
      }

      getHomeUrl(rolecode:string){
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
