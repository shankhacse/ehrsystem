import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../../../service/common.service';


@Component({
  selector: 'app-patientbarcodeprint',
  templateUrl: './patientbarcodeprint.component.html',
  styleUrls: ['./patientbarcodeprint.component.css']
})
export class PatientbarcodeprintComponent implements OnInit {
  patientsList = [];

  elementType = 'img';
  value = 'someValue12340987';
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 46;
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

  isBarCodeLoaded:boolean = false;

  constructor( private route: ActivatedRoute,private router: Router,private commonService:CommonService) { }

  ngOnInit() {
    this.isBarCodeLoaded = false;
    this.patientbarCode = "E2222";
   
    this.getPatientList(1);  // 1 harcoded for quik development. 1 = permament worker type need to modify of other type bar code will generate in future

  }


  getPatientList(patient_type_id) {
    this.patientsList = [];
    let dataval;
    let patientlist;
    //this.patientsList.push([]);
    this.commonService.getPatientListData(patient_type_id).then(data => {
      dataval = data;
      patientlist = dataval.result;
      this.patientsList = [];
      this.patientsList.push(patientlist);
      if(this.patientsList.length > 0){
        this.isBarCodeLoaded = true;
      }
      console.log(this.patientsList);
     } ,
    error => {
     console.log("error patient list");
   });

  }




   PrintPreview() {

    var toPrint = document.getElementById('print_section');

    var popupWin = window.open('', '_blank', 'width=850,height=350,location=no,left=200px');

        popupWin.document.open();

        popupWin.document.write('<html><title>::Preview::</title><link rel="stylesheet" type="text/css" href="print.css" /></head><body onload="window.print()">')

        popupWin.document.write(toPrint.innerHTML);

        popupWin.document.write('</html>');

        popupWin.document.close();

}


}
