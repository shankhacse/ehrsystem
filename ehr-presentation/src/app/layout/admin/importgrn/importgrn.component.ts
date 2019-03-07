import { Injectable } from '@angular/core';
import { Component,ElementRef, OnInit,VERSION } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../service/common.service';
import { DatashareService } from './../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../components/successdialog/successdialog.component';
import {HttpClientModule,HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';


import { GlobalconstantService } from './../../../service/globalconstant.service';
import { Observable } from 'rxjs';
import { TokeninterceptorService } from './../../../service/tokeninterceptor.service';
import { ExcelvalidationdialogComponent } from '../components/excelvalidationdialog/excelvalidationdialog.component';
import { ImportgrnvalidationdialogComponent } from '../components/importgrnvalidationdialog/importgrnvalidationdialog.component';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-importgrn',
  templateUrl: './importgrn.component.html',
  styleUrls: ['./importgrn.component.css']
})
export class ImportgrnComponent implements OnInit {

  addGrnuploadForm : FormGroup;

  isLoader=false;
  filename:string = "";
  disableClick;

  backhome=false;

  constructor(
    private router:Router,
    private commonService:CommonService,
    private datashareService:DatashareService ,
    public dialog: MatDialog,
    private elem:ElementRef,
    private http: HttpClient,
    private global:GlobalconstantService
  ) { 
    this.addGrnuploadForm = new FormGroup({ 
      fileCtrl : new FormControl(''), 
    
    
    });
  }

  ngOnInit() {

      let token = this.getDecodedAccessToken(localStorage.getItem("token"));
      console.log("role:");
      console.log(token.data.user_role_code);

      if(token.data.user_role_code=='PHRM'){
        this.backhome=true;
      }


      
 
  
  var isReadableCheck = localStorage.getItem('isReadable');
  console.log('isReadable import grn: '+isReadableCheck);
  if(isReadableCheck=='true'){
    this.disableClick = 1;
  }else{
    this.disableClick = 0;
  }

   
  }
upload(files: File[]){
  console.log(files);
  this.filename=files[0].name;

  this.basicUpload(files);
  this.isLoader=true;

}
onSubmit(formdata) {

}

basicUpload(files: File[]){
  
  let headers_object =  new HttpHeaders();
  let token = localStorage.getItem('token'); // your custom token getter function here
 // headers.set('Authorization', `Bearer ${token}`);
  headers_object.append("Authorization",`Bearer ${token}`);
  const httpOptions = {
   headers: headers_object
 };
  console.log(headers_object);
 
  var formData = new FormData();
  let test="testing";
  Array.from(files).forEach(f => formData.append('file', f))
  return new Promise(resolve => {
  this.http.post(this.global.grnvalidation_URL,formData,httpOptions)
    .subscribe(event => {  
      console.log(event)
      this.isLoader=false;
      const dialogRef = this.dialog.open(ImportgrnvalidationdialogComponent, {
        width: '950px',
        height:'500px',
        disableClose: true,
        data: event 
      });

      dialogRef.afterClosed().subscribe(result => {
        this.addGrnuploadForm.reset();
        this.filename='';
    
      });


    })
  });
}


getDecodedAccessToken(token: string): any {
  try{
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}
importGrn(){
  console.log('list')
  this.router.navigateByUrl('panel/grn');
}

} // end of class
