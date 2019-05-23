import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-patientbarcodedialog',
  templateUrl: './patientbarcodedialog.component.html',
  styleUrls: ['./patientbarcodedialog.component.css']
})
export class PatientbarcodedialogComponent implements OnInit {
  elementType = 'svg';
  value = 'someValue12340987';
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;


  patientbarCode:any;
  patientName:any;
  patientDOB:any;

  constructor(public dialogRef: MatDialogRef<PatientbarcodedialogComponent> ,  @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.patientName = this.data.patient_name;
    this.patientDOB = this.data.dateofbirth;
    this.patientbarCode = this.data.patient_code;
  }

  ngOnInit() {
  }


  closeDialog(): void {
    let data = {"from":"Close"}
    this.dialogRef.close(data);
  }


  printdocs(){
    window.print();
  }
}
