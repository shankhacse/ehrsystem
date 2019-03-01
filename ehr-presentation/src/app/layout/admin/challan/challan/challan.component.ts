import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../../service/common.service';
import { DatashareService } from './../../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';

interface Estate {
  name: string;
  code: string;
}

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.css']
})
export class ChallanComponent implements OnInit {

  
  addChallanForm : FormGroup;
  estateList = []; 
  
  chalanCodeCtrl:string = "";
  chalanNameCtrl:string = "";
  estateCtrl:string = "";
 
  validFormErr:string = "";

   disableClick;
   
  constructor(
    private router:Router,
    private commonService:CommonService,
    private datashareService:DatashareService ,
    public dialog: MatDialog
  ) {
    this.addChallanForm = new FormGroup({ 
      chalanCodeCtrl: new FormControl('', Validators.required),  
      chalanNameCtrl: new FormControl('', Validators.required),  
      estateCtrl: new FormControl('', Validators.required),  
     
    });
   }

   private estates: Estate[] = [];
   public filterstate: ReplaySubject<Estate[]> = new ReplaySubject<Estate[]>(1);

  ngOnInit() {
 
  
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable addChallan: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }

    this.getEstate('estate'); //@param--tablename
    
  }

  getEstate(tablename) {
   
    let dataval;
    let estatelist;
    this.commonService.getDropdownData(tablename).then(data => {
      this.estateList = [];
      dataval = data;
      estatelist = dataval.result;
      this.estateList.push(estatelist);
      console.log(this.estateList);
    },
    error => {
     console.log("There is some error in estate List...");
   });
  }

  
  onSubmit(formdata) {
    console.log(formdata);

    if(this.validateForm()){
    let response;
    this.commonService.insertIntoChallan(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
        this.openDialog();
        this.addChallanForm.reset();
       
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
        btnurl : 'panel/challanlist'
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
        btnurl : 'panel/challan'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }

  validateForm(){
    this.validFormErr = "";
    let validForm = false;

    if(this.addChallanForm.controls['estateCtrl'].value==''){
          this.validFormErr = "Error : Estate is required";
          return validForm = false;
        
    }

    if(this.addChallanForm.controls['chalanCodeCtrl'].value==''){
      this.validFormErr = "Error : Challan Code is required";
      return validForm = false;
    
   }

   if(this.addChallanForm.controls['chalanNameCtrl'].value==''){
    this.validFormErr = "Error : Challan Name is required";
    return validForm = false;
  
}

 

  
    validForm = true;
    return validForm;
  }

  gotoList(){
    this.router.navigateByUrl('panel/challanlist');
  }

}
