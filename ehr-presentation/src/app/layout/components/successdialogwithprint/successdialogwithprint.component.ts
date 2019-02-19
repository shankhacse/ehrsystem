import { Component, OnInit,Inject,ElementRef,ViewChild } from '@angular/core';


import { CommonService } from '../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import { IpdService } from '../../../service/ipd.service';
import { GlobalconstantService } from '../../../service/globalconstant.service';

@Component({
  selector: 'app-successdialogwithprint',
  templateUrl: './successdialogwithprint.component.html',
  styleUrls: ['./successdialogwithprint.component.css']
})
export class SuccessdialogwithprintComponent implements OnInit {

  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;
  opdipdMasterID:number;
  opdipdHealthProfileID:number;
  ipdOpdType;
  url_string:any;
  tokenValue:any;
  isloadPDFClick = false;
  callingFrom;
  constructor(private router:Router,public dialogRef: MatDialogRef<SuccessdialogwithprintComponent> , private commonService:CommonService,private ipdService:IpdService, @Inject(MAT_DIALOG_DATA) public data: any , private globalContant:GlobalconstantService ) {

    this.msg = this.data.msg;  
    this.msgIcon = this.data.msgicon;
    this.iconColor = this.data.iconcolor;
    this.redirectUrl = this.data.btnurl;
    this.opdipdMasterID = this.data.savedIdRef.opdipdID;
    this.opdipdHealthProfileID = this.data.savedIdRef.hlthPrflID;
    this.ipdOpdType = this.data.savedIdRef.ipdopd;
    this.callingFrom = this.data.savedIdRef.callfrom;
    this.tokenValue = localStorage.getItem("token");

    
      this.url_string = globalContant.getApiURL()+"ipd/getOpdIpdPrescPrint/"+this.tokenValue+"/"+this.opdipdMasterID+"/"+this.opdipdHealthProfileID+"/"+this.ipdOpdType+"/"+this.callingFrom;
    

    
    
    //console.log(this.url_string);

    //let element: HTMLElement = document.getElementById("asdasd") as HTMLElement;
    //document.getElementById("asdasd").click();
  /*  let a = document.getElementById("aaasddasdasd");
    a.setAttribute("href",this.url_string);
    a.click(); */
   }

  ngOnInit() {

    let a = document.getElementById("generatePDF");
    a.setAttribute("href",this.url_string);
    a.click();
    
    

    /* let element: HTMLElement = document.getElementById("asdasd") as HTMLElement;
    element.click(); */
    //this.getPrintPrescData(this.opdipdMasterID,this.opdipdHealthProfileID,'O');
    //this.getPrintPrescData(51,96,'O');
  }


  loadPDFEnable(){
    this.isloadPDFClick = true;
  }

  redirectToComp(){
    this.dialogRef.close();
    this.router.navigateByUrl(this.redirectUrl);
   
  }

  margins = {
    top: 10,
    bottom: 40,
    left: 20,
    width: 600
  };

  
  getPrintPrescData(opdipdid,healthprofileid,type) {
    let response;
    let res ;
    let healthprofile;
    let params = {
      "opdipd":opdipdid,
      "healthprofile":healthprofileid,
      "type":type
    };
    let patientProfile;
    this.ipdService.getPrintDataForPresc(params).then(data => {
      
      response = data;
      if(response.msg_status == 200) {
      //  response = data;
       
       // healthprofile = res.patienthealthProfileData
      //  console.log(healthprofile);

      }
      else{
     
      }
   


     },
       error => {
         console.log("There is some error on submitting...");
     });
  }

  abc(){
   this.generatePDF();
   /*
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFontSize(16);
    pdf.fromHTML(document.getElementById('html-2-pdfwrapper'), 
      10, // x coord
      10,
      {
        // y coord
        width: 660// max width of content on PDF
      },function(dispose) {
        //headerFooterFormatting(pdf)
      }, 
      this.margins);
      
    var iframe = document.createElement('iframe');
    iframe.setAttribute('style','z-index:9999;position:absolute;left:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
    
    document.body.appendChild(iframe);
    
    
    pdf.text(iframe.src,10,10,1,50,'center');
    //iframe.src = pdf.output('datauristring');
    pdf.save('asd.pdf');
    */
  }


  generatePDF() {
    

      var pdf_c = new jsPDF('p', 'mm', 'a4');
      pdf_c.addImage('src/logo.png', 'PNG', 10,20,200, 300);
      pdf_c.text("fa", {align: "center"}, 0, 10);
      pdf_c.text("das", 10, 20);
      pdf_c.setFontSize(20);
      pdf_c.setFont("times");
      pdf_c.setFontType("bold");
      pdf_c.setTextColor(255, 0, 0);
      pdf_c.text(10,10, 'This is a 20pt Times Bold red string');
      pdf_c.save('asd.pdf');


  }

  aaaaaa(){

  }




/*

  headers = [];
generatePdf() {
   this.headers = [{
    "name":"column1",
    "prompt":"Header 1",
    "width":35,
    "align":"right",
    "padding":0
}, {
    "name":"column2",
    "prompt":"Header 2",
    "width":65,
    "align":"left",
    "padding":0
},


];

var rows = [{
    "column1":"Lorem",
    "column2":"Lorem ipsum dolor sit amet."
}, {
    "column1":"Ipsum",
    "column2":"Etiam malesuada erat."
}, {
    "column1":"Dolor",
    "column2":"Vivamus tempor urna vitae."
}];

var doc = new jsPDF();

doc.table(10, 10, rows, this.headers, {
    autoSize: false,
    printHeaders: true,
    rowMargin: 0,
    fontSize: 12
});
doc.table(10, 10, rows, this.headers, {
  autoSize: false,
  printHeaders: true,
  rowMargin: 0,
  fontSize: 12
});
doc.save("test.pdf")
}
*/
}
