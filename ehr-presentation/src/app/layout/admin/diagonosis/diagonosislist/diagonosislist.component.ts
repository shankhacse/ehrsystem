import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../../service/common.service';
import { DatashareService } from '../../../../service/datashare.service';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import{ MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';
import { DiagonosisedialogComponent } from '../../components/diagonosisedialog/diagonosisedialog.component';





@Component({
  selector: 'app-diagonosislist',
  templateUrl: './diagonosislist.component.html',
  styleUrls: ['./diagonosislist.component.css']
})
export class DiagonosislistComponent implements OnInit {

  diagonosisList = [];
  dataSource:any;
  recordsFound = false;

  displayedColumns: string[] = [
    'slno',
    'diagonosis_name',
    'accociated_icd_code',
    'diagonosis_id'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private zone:NgZone,
    private commonService:CommonService ,
    private datashareService:DatashareService ,
    private router:Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getDiagonosisList();
  }


  getDiagonosisList() {
    this.diagonosisList = [];
    let dataval;
    let diaglist;

    this.commonService.getDiagonosisList().then(data => {
      dataval = data;
      diaglist = dataval.result;
      this.diagonosisList.push(diaglist);
      console.log(this.diagonosisList);
      const tcount = this.diagonosisList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.diagonosisList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
     
    } ,
    error => {
     console.log("error in todays investigation list");
   });

  }


  getDiagEditDetail(event,data) {
    

   // console.log(data);
    this.diagonosisList = [];
    let datavaledit;
    let diaglist;
    let diagonosis_id;
    let diagonosis_name;
    let icd_code;
    this.commonService.getDiagonosisDataById(data).then(data => {
      datavaledit = data;
      diaglist = datavaledit.result;
      this.diagonosisList.push(diaglist);
      console.log(this.diagonosisList);
      const tcount = this.diagonosisList[0].length;
      diagonosis_id=this.diagonosisList[0].diagonosis_id;
      diagonosis_name=this.diagonosisList[0].diagonosis_name;
      icd_code=this.diagonosisList[0].accociated_icd_code;


      const dialogRef = this.dialog.open(DiagonosisedialogComponent, {
        width: '650px',
        disableClose: true,
        data:  {
          msg : 'Save Successfully',
          msgicon : 'check_circle',
          iconcolor: '#1d8c3d',
          btnurl : 'panel/diagnosislist',
          diag_id : diagonosis_id,
          diag_name : diagonosis_name,
          i_code : icd_code,
          }
      });
      
      dialogRef.afterClosed().subscribe(result => {
       // console.log("fsds");

       this.getDiagonosisList();
       
      });
     
    } ,
    error => {
     console.log("error in todays diagnosis list");
   });
    
  }


  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoAdd(){
    this.router.navigateByUrl('panel/diagnosis');
  }


}//end of class
