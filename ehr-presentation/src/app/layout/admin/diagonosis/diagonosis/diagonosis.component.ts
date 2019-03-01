import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../../service/common.service';
import { DatashareService } from './../../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';

@Component({
  selector: 'app-diagonosis',
  templateUrl: './diagonosis.component.html',
  styleUrls: ['./diagonosis.component.css']
})
export class DiagonosisComponent implements OnInit {

  addDiagonosisForm : FormGroup;
  
  diaNameCtrl:string = "";
  acdCodeNameCtrl:string = "";
 
  validFormErr:string = "";
  disableClick;
  


  constructor(
     private router:Router,
     private commonService:CommonService,
     private datashareService:DatashareService ,
     public dialog: MatDialog
  ) { 
    this.addDiagonosisForm = new FormGroup({ 
      diaNameCtrl: new FormControl('', Validators.required),  
      acdCodeNameCtrl: new FormControl(''),  
    });

    
  }

  ngOnInit() {

   
  
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable addDiagnosis: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }
    console.log('testing');
  }



  onSubmit(formdata) {
    console.log(formdata);

    if(this.validateForm()){
    let response;
    this.commonService.insertIntoDiagonosis(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
        this.openDialog();
        this.addDiagonosisForm.reset();
       
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
        btnurl : 'panel/diagnosis'
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
        btnurl : 'panel/test'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }




  validateForm(){
    this.validFormErr = "";
    let validForm = false;

    if(this.addDiagonosisForm.controls['diaNameCtrl'].value==''){
          this.validFormErr = "Error : Diagonosis name is required";
          validForm = false;
        
    }

  
    validForm = true;
    return validForm;
  }

  gotoList(){
    this.router.navigateByUrl('panel/diagnosislist');
  }
}// end of class
