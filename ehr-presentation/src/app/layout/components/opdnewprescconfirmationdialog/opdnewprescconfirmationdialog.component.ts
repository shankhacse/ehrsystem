import { Component, OnInit,Inject } from '@angular/core';


import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opdnewprescconfirmationdialog',
  templateUrl: './opdnewprescconfirmationdialog.component.html',
  styleUrls: ['./opdnewprescconfirmationdialog.component.css']
})
export class OpdnewprescconfirmationdialogComponent implements OnInit {

  constructor(private router:Router,public dialogRef: MatDialogRef<OpdnewprescconfirmationdialogComponent> , public dialog: MatDialog, private commonService:CommonService,private patientService:PatientService, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }

  onClickNo(){
    let data = {"status":"NO"}
    this.dialogRef.close(data);
  }

  onClickYes(){
    let data = {"status":"YES"}
    this.dialogRef.close(data);
  }

}
