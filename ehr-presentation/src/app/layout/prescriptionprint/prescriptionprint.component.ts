//import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Component, Input, OnInit, Inject , ViewChild , ElementRef } from '@angular/core';
//declare let jsPDF;
import * as $ from "jquery";
import 'jspdf-autotable';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-prescriptionprint',
  templateUrl: './prescriptionprint.component.html',
  styleUrls: ['./prescriptionprint.component.css']
})
export class PrescriptionprintComponent implements OnInit {
  @ViewChild('test') el: ElementRef;
  constructor() { }

  ngOnInit() {
  }


  generatePDF() {
    let doc = new jsPDF();
    /*
   doc.addHTML(document.getElementById('toHTML'), 10, 10, {pagesplit: true, margin: {top: 10, right: 10, bottom: 10, left: 10, useFor: 'content'}}, function () {doc.save("test.pdf")})
*/


  // doc.fromHTML(document.getElementById('contentToConvert'), 10, 10, {pagesplit: true, margin: {top: 10, right: 10, bottom: 10, left: 10, useFor: 'content'}}, function () {doc.save("test.pdf")});

  let table1 = this.tableToJson($('#contentToConvert').get(0)),
  cellWidth = 35,
  rowCount = 0,
  cellContents,
  leftMargin = 2,
  topMargin = 12,
  topMarginTable = 55,
  headerRowHeight = 13,
  rowHeight = 9,

   l = {
   orientation: 'l',
   unit: 'mm',
   format: 'a3',
   compress: true,
   fontSize: 8,
   lineHeight: 1,
   autoSize: false,
   printHeaders: true
};



doc.setProperties({
  title: 'Test PDF Document',
  subject: 'This is the subject',
  author: 'author',
  keywords: 'generated, javascript, web 2.0, ajax',
  creator: 'author'
});

doc.cellInitialize();


$.each(table1, function (i, row)
{

    rowCount++;

    $.each(row, function (j, cellContent) {

        if (rowCount == 1) {
            
            doc.setFont("helvetica");
            doc.setFontType("bold");
            doc.setFontSize(9);

            doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, cellContent, i,'center')
        }
        else if (rowCount == 2) {
           // doc.margins = 1;
            doc.setFont("times ");
            doc.setFontType("italic");  // or for normal font type use ------ doc.setFontType("normal");
            doc.setFontSize(8);                    

            doc.cell(leftMargin, topMargin, cellWidth, rowHeight, cellContent, i ,'center'); 
        }
        else {

           // doc.margins = 1;
            doc.setFont("courier ");
            doc.setFontType("bolditalic ");
            doc.setFontSize(6.5);                    

            doc.cell(leftMargin, topMargin, cellWidth, rowHeight, cellContent, i , 'center');  // 1st=left margin    2nd parameter=top margin,     3rd=row cell width      4th=Row height
        }
    })
})
doc.save('sample Report.pdf'); 

  }



  tableToJson(table) {
    // https://stackoverflow.com/questions/23060563/how-to-set-column-width-for-generating-pdf-using-jspdf/23385322#23385322
    var data = [];
    
    // first row needs to be headers
    var headers = [];
    for (var i=0; i<table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }
    
    // go through cells
    for (var i=1; i<table.rows.length; i++) {
    
        var tableRow = table.rows[i];
        var rowData = {};
    
        for (var j=0; j<tableRow.cells.length; j++) {
    
            rowData[ headers[j] ] = tableRow.cells[j].innerHTML;
    
        }
    
        data.push(rowData);
    }       
    
    return data; }
    



    pdf2(){
      var pdf = new jsPDF();
      pdf.addHTML(document.body,function() {
        var string = pdf.output('datauristring');
        $('.preview-pane').attr('src', string);
       });

      // We'll make our own renderer to skip this editor
      var specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
      };

      // All units are in the set measurement for the document
      // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
      pdf.fromHTML($('body').get(0), 15, 15, {
      'width': 170, 
      'elementHandlers': specialElementHandlers
      });
    }


/*
    pdf3(){
     
      let l = {
        orientation: 'l',
        unit: 'mm',
        format: 'a3',
        compress: true,
        fontSize: 8,
        lineHeight: 1,
        autoSize: false,
        printHeaders: true
     };

        var doc = new jsPDF(l, 'pt');
      
        var res = doc.autoTableHtmlToJson(document.getElementById("basic-table"));
        //doc.autoTable(res.columns, res.data, {margin: {top: 80}});
      
        var header = function(data) {
          doc.setFontSize(18);
          doc.setTextColor(40);
          doc.setFontStyle('normal');
          //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
          doc.text("Testing Report", data.settings.margin.left, 50);
        };
      
        var options = {
          beforePageContent: header,
          margin: {
            top: 80
          }
         
        };
      
        doc.autoTable(res.columns, res.data, options);
      
        doc.save("table.pdf");
     
    } */


    downloadPdf() {
      let doc = new jsPDF();
      doc.addHTML(document.getElementById("obrz"), function() {
         doc.save("obrz.pdf");
      });
  }

  margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
  };
  
abc(){
  
  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.setFontSize(18);
  pdf.fromHTML(document.getElementById('html-2-pdfwrapper'), 
    30, // x coord
    70,
    {
      // y coord
      width: 550// max width of content on PDF
    },function(dispose) {
      //headerFooterFormatting(pdf)
    }, 
    this.margins);
    
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style','z-index:9999;position:absolute;left:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  
  document.body.appendChild(iframe);
  
  iframe.src = pdf.output('datauristring');
}


}
