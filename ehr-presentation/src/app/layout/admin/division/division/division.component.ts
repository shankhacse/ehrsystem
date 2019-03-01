import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../../service/common.service';
import { DatashareService } from './../../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  addDiavisionForm : FormGroup;
  
  divCodeCtrl:string = "";
  divNameCtrl:string = "";
 
  validFormErr:string = "";
  disableClick;

  constructor(
    private router:Router,
    private commonService:CommonService,
    private datashareService:DatashareService ,
    public dialog: MatDialog
  ) {
    this.addDiavisionForm = new FormGroup({ 
      divCodeCtrl: new FormControl('', Validators.required),  
      divNameCtrl: new FormControl('', Validators.required),  
    });
   }

  ngOnInit() {
   
  
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable add Division: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }

    console.log('division testing');
  }


  onSubmit(formdata) {
    console.log(formdata);

    if(this.validateForm()){
    let response;
    this.commonService.insertIntoDivision(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
        this.openDialog();
        this.addDiavisionForm.reset();
       
      }
      else{
        this.openDialogError();
      }
      console.log(response);
    },
    error => {
        console.log("There is some error on submitting...");
    });
  }

  }


  openDialog() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'Save Successfully',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/divisionlist'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
    
    });
  }

  openDialogError() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'There is some problem.Try again ...',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/division'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  validateForm(){
    this.validFormErr = "";
    let validForm = false;

    if(this.addDiavisionForm.controls['divCodeCtrl'].value=='' || this.addDiavisionForm.controls['divCodeCtrl'].value==null){
          this.validFormErr = "Error : Division Code is required";
          return validForm = false;
        
    }

    if(this.addDiavisionForm.controls['divNameCtrl'].value=='' || this.addDiavisionForm.controls['divNameCtrl'].value==null){
      this.validFormErr = "Error : Division Name is required";
      return validForm = false;
    
}

  
    validForm = true;
    return validForm;
  }

  gotoList(){
    this.router.navigateByUrl('panel/divisionlist');
  }

}// end of class
