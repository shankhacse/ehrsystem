import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../service/common.service';
import { DatashareService } from './../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../components/successdialog/successdialog.component';

@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.css']
})
export class InvestigationComponent implements OnInit {
 
  addInvestigationForm : FormGroup;
  editInvestigationForm : FormGroup;
  testNameCtrl:string = "";
  edittestNameCtrl:string = "";
  
  investMode = "ADD";
  invObj;
  investigation_id;
  investigation_name;

  constructor(
     private router:Router,
     private commonService:CommonService,
     private datashareService:DatashareService ,
     public dialog: MatDialog
     ) { 

    this.addInvestigationForm = new FormGroup({ 
      testNameCtrl: new FormControl('', Validators.required),  
    });

    this.editInvestigationForm = new FormGroup({ 
      edittestNameCtrl: new FormControl('', Validators.required),
      invIdNameCtrl: new FormControl('')
    });

    this.invObj = this.datashareService.getINVRowData();
   
   // console.log(this.invObj);

    if(this.invObj) {
      
      localStorage.setItem("invID", this.invObj.investigation_id);
      localStorage.setItem("invName", this.invObj.investigation_name);
   
   
    console.log("Investigation edit");

     }
     this.investigation_id = localStorage.getItem("invID");
     this.investigation_name = localStorage.getItem("invName");
     
     if (localStorage["invID"]) {
      this.investMode = "EDIT";
     }
   
   
    
     if(this.investMode=='EDIT'){
      this.editInvestigationForm.patchValue({
       
        edittestNameCtrl: this.investigation_name,
        invIdNameCtrl: this.investigation_id,
       
       
         });
       console.log(this.investMode);
     }
    
  }

  ngOnInit() {
    console.log('testing');
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addInvestigationForm.controls[controlName].hasError(errorName);
  }

  public hasError2 = (controlName: string, errorName: string) =>{
    return this.addInvestigationForm.controls[controlName].hasError(errorName);
  }

 



 

  onSubmit(formdata) {
    console.log(formdata);

    let test = this.addInvestigationForm.get('testNameCtrl').value;
   
    if(test!=''){
    let response;
    this.commonService.insertIntoInvestigation(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
        this.openDialog();
        this.addInvestigationForm.reset();
       
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

  onSubmitEdit(formdata) {
    console.log(formdata);

    let test = this.editInvestigationForm.get('edittestNameCtrl').value;
   
    if(test!=''){
    let response;
    this.commonService.updateInvestigation(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
        this.openDialogEdit();
        this.addInvestigationForm.reset();
        localStorage.removeItem("invID");
        localStorage.removeItem("invName");
        
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
        msg : 'Test name save Successfully',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/test'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  openDialogEdit() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'Test name update Successfully',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/testlist'
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

  openDialogErrorEdit() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'There is some problem.Try again ...',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/testlist'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  gotoList(){
    this.router.navigateByUrl('panel/testlist');
  }

} // end of class
