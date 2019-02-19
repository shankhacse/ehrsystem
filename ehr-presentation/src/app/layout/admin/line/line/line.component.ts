import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../../service/common.service';
import { DatashareService } from './../../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';

interface Division {
  id: string;
  code: string;
}

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  addLineForm : FormGroup;
  divisionList = []; 
  
  lineCodeCtrl:string = "";
  lineNameCtrl:string = "";
  divisionCtrl:string = "";
 
  validFormErr:string = "";

  constructor(
    private router:Router,
    private commonService:CommonService,
    private datashareService:DatashareService ,
    public dialog: MatDialog
  ) {
    this.addLineForm = new FormGroup({ 
      divisionCtrl: new FormControl('', Validators.required),  
      lineCodeCtrl: new FormControl('', Validators.required),  
      lineNameCtrl: new FormControl('', Validators.required),  
     
    });
   }

   private divisions: Division[] = [];
   public filterdivision: ReplaySubject<Division[]> = new ReplaySubject<Division[]>(1);

  ngOnInit() {
    this.getDivision('division_master'); //@param--tablename
    
  }

  getDivision(tablename) {
   
    let dataval;
    let divisionlist;
    this.commonService.getDropdownData(tablename).then(data => {
      this.divisionList = [];
      dataval = data;
      divisionlist = dataval.result;
      this.divisionList.push(divisionlist);
      console.log(this.divisionList);
    },
    error => {
     console.log("There is some error in Relation List...");
   });
  }


  onSubmit(formdata) {
    console.log(formdata);

    if(this.validateForm()){
    let response;
    this.commonService.insertIntoLine(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
        this.openDialog();
        this.addLineForm.reset();
       
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
        btnurl : 'panel/linelist'
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
        btnurl : 'panel/line'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  validateForm(){
    this.validFormErr = "";
    let validForm = false;

    if(this.addLineForm.controls['divisionCtrl'].value==''){
          this.validFormErr = "Error : Division is required";
          return validForm = false;
        
    }

    if(this.addLineForm.controls['lineCodeCtrl'].value==''){
      this.validFormErr = "Error : Line Code is required";
      return validForm = false;
    
   }

   if(this.addLineForm.controls['lineNameCtrl'].value==''){
    this.validFormErr = "Error : Line Name is required";
    return validForm = false;
  
}

 

  
    validForm = true;
    return validForm;
  }

  gotoList(){
    this.router.navigateByUrl('panel/linelist');
  }

}
