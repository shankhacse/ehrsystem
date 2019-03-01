import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../../service/common.service';
import { DatashareService } from './../../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';

interface Group {
  id: string;
  name: string;
}

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})
export class SymptomsComponent implements OnInit {
  addSymptomsForm : FormGroup;
  groupsList = []; 
  
  symptomsCtrl:string = "";
  groupCtrl:string = "";
 
  validFormErr:string = "";
  disableClick;

  constructor(
     private router:Router,
     private commonService:CommonService,
     private datashareService:DatashareService ,
     public dialog: MatDialog
  ) { 
    this.addSymptomsForm = new FormGroup({ 
      symptomsCtrl: new FormControl('', Validators.required),  
      groupCtrl: new FormControl(''), 
    });
  }
  private groups: Group[] = [];
  public filtergroups: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);

  
  ngOnInit() {
  
  
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable addStmptoms: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }
    this.getGroups();
  }

  getGroups() {
   
    let dataval;
    let grouplist;
    this.commonService.getGroup().then(data => {
      this.groupsList = [];
      dataval = data;
      grouplist = dataval.result;
      this.groupsList.push(grouplist);
      console.log(this.groupsList);
    },
    error => {
     console.log("There is some error in Relation List...");
   });
  }
  onSubmit(formdata) {
    console.log(formdata);

    if(this.validateForm()){
    let response;
    this.commonService.insertIntoSymptoms(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
        this.openDialog();
        this.addSymptomsForm.reset();
       
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
        btnurl : 'panel/symptomslist'
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
        btnurl : 'panel/symptoms'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }




  validateForm(){
    this.validFormErr = "";
    let validForm = false;

    if(this.addSymptomsForm.controls['symptomsCtrl'].value==''){
          this.validFormErr = "Error : Symptoms is required";
          return validForm = false;
        
    }

  
    validForm = true;
    return validForm;
  }

  gotoList(){
    console.log('list')
    this.router.navigateByUrl('panel/symptomslist');
  }
}// end of class
