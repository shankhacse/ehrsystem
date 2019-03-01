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

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-importexcel',
  templateUrl: './importexcel.component.html',
  styleUrls: ['./importexcel.component.css']
})
export class ImportexcelComponent implements OnInit {
  excelImportForm : FormGroup;
  fileNameCtrl:string = "";
  authentication;
  isLoader=false;
  filename:string = "";
  disableClick;
  
  constructor(
     private router:Router,
     private commonService:CommonService,
     private datashareService:DatashareService ,
     public dialog: MatDialog,
     private elem:ElementRef,
     private http: HttpClient,
     private global:GlobalconstantService
    
  ) { 
    this.excelImportForm = new FormGroup({ 
      fileNameCtrl: new FormControl(''),  
    });
    
    
     
     
  }
  version = VERSION
  ngOnInit() {

 
  
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable Patint import: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }
  }

  onSubmit() {
  // console.log(formdata);

    let test = "";
    let files=this.elem.nativeElement.querySelector('#selectFile').files;
    let formData= new FormData();
    let file = files[0];
    formData.append('selectFile',file,file.name);
    this.commonService.uploadImage(formData).subscribe();
   console.log(file);
    if(0){
    let response;
    this.commonService.uploadFile(formData,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
       // this.openDialog();
       
       
      }
      else{
      //  this.openDialogError();
      }
      console.log(response);
    },
    error => {
        console.log("There is some error on submitting...");
    });
  }

  }
  onFileChanged(data: any) {
    console.log(data);
}

upload(files: File[]){
 
  console.log(files);
  this.isLoader=true;
  this.filename=files[0].name;
  this.basicUpload(files);
  this.isLoader=true;
  

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
  this.http.post(this.global.excelvalidation_URL,formData,httpOptions)
    .subscribe(event => {  
      console.log(event)
      this.isLoader=false;
      const dialogRef = this.dialog.open(ExcelvalidationdialogComponent, {
        width: '1250px',
        height:'500px',
        disableClose: true,
        data: event 
      });


    })
  });
}

}//end of class
