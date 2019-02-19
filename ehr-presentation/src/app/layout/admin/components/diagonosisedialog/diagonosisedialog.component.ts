import { Component, OnInit,Inject  } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../../service/patient.service';
import { Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-diagonosisedialog',
  templateUrl: './diagonosisedialog.component.html',
  styleUrls: ['./diagonosisedialog.component.css']
})
export class DiagonosisedialogComponent implements OnInit {
  editDiagonosisForm : FormGroup;
  diagIdCtrl:string = "";
  diaNameCtrl:string = "";
  acdCodeCtrl:string = "";

  validFormErr:string = "";

  diagId:string;
  diagName:string;
  IcdCode:string;

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;

  updatemessage:string;
  updateaction:string;
 

  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<DiagonosisedialogComponent> ,
    private commonService:CommonService,
    private patientService:PatientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any 
      ) {
    this.msg = this.data.msg;  
    this.msgIcon = this.data.msgicon;
    this.iconColor = this.data.iconcolor;
    this.redirectUrl = this.data.btnurl;
    this.diagId = this.data.diag_id;
    this.diagName = this.data.diag_name;
    this.IcdCode = this.data.i_code;
    console.log(this.diagId);
    this.editDiagonosisForm = new FormGroup({ 
      diagIdCtrl: new FormControl(''),
      diaNameCtrl: new FormControl(''),
      acdCodeCtrl: new FormControl(''),
      
    });

    this.editDiagonosisForm.patchValue({
       
      diaNameCtrl: this.diagName,
      acdCodeCtrl: this.IcdCode,
      diagIdCtrl: this.diagId,
     
     
       });

   }

  ngOnInit() {
  }

  onSubmitEdit(formdata) {
    console.log(formdata);
    

   
   
    if(this.validateForm()){
   
    let response;
    this.commonService.updateDiagonosis(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
           
        //this.openDialog();
        this.updatemessage='Save Successfully';
        this.updateaction='';
 
        
        this.openSnackBar(this.updatemessage,this.updateaction);
        
        
      }
      else{
       // this.openDialogError();
       this.updatemessage='Something Wrong!';
       this.updateaction='';

       
       this.openSnackBar(this.updatemessage,this.updateaction);
      }
      console.log(response);
    },
    error => {
        console.log("There is some error on submitting...");
    });
  }

  }
  redirectToComp(){
    console.log(this.redirectUrl);
    this.dialogRef.close();
    this.router.navigateByUrl(this.redirectUrl);
   
  }

 /* openDialog() {
    const dialogRef = this.dialog.open(SuccessdialogComponent, {
      width: '350px',
      disableClose: true,
      data:  {
        msg : 'Save Successfully',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/diagonosislist'
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
        btnurl : 'panel/diagonosislist'
        }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }*/

  validateForm(){
    this.validFormErr = "";
    let validForm = false;

    if(this.editDiagonosisForm.controls['diaNameCtrl'].value==''){
          this.validFormErr = "Error : Diagonosis name is required";
          validForm = false;
          return validForm;
    }

    


    validForm = true;
    return validForm;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}//end of class
