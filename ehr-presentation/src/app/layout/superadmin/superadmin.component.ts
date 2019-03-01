import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
    
    console.log('super');
  }


  gotoAdmin(){
    localStorage.setItem("isLeftpanel", 'Yes');
    console.log();
   // this.router.navigateByUrl('panel/dashboard');

   // location.reload('panel/dashboard');
    window.location.replace("panel/dashboard");
  }

}
