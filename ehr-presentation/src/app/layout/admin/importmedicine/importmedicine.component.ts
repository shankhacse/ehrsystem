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

import { ImportdependentdialogComponent } from '../components/importdependentdialog/importdependentdialog.component';
import { ImportmedicinedialogComponent } from '../components/importmedicinedialog/importmedicinedialog.component';



@Component({
  selector: 'app-importmedicine',
  templateUrl: './importmedicine.component.html',
  styleUrls: ['./importmedicine.component.css']
})
export class ImportmedicineComponent implements OnInit {

  addMedicineuploadForm : FormGroup;

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
    this.addMedicineuploadForm = new FormGroup({ 
      fileCtrl : new FormControl(''), 
    
    
    });
  }

  ngOnInit() {
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable import dependent: '+isReadableCheck);
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
    this.http.post(this.global.importMedicine_URL,formData,httpOptions)
      .subscribe(event => {  
        console.log(event)
        this.isLoader=false;
        const dialogRef = this.dialog.open(ImportmedicinedialogComponent, {
          width: '850px',
          height:'500px',
          disableClose: true,
          data: event 
        });
  
        dialogRef.afterClosed().subscribe(result => {
          this.addMedicineuploadForm.reset();
          this.filename='';
      
        });
  
  
      })
    });
  }


  gotoList(){
    this.router.navigateByUrl('panel/medlist');
  }

}// end
