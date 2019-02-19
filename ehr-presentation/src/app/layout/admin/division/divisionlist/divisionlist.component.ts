import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../../service/common.service';
import { DatashareService } from '../../../../service/datashare.service';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import{ MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { DivisiondialogComponent } from '../../components/divisiondialog/divisiondialog.component';



@Component({
  selector: 'app-divisionlist',
  templateUrl: './divisionlist.component.html',
  styleUrls: ['./divisionlist.component.css']
})
export class DivisionlistComponent implements OnInit {
  divisionList = [];
  dataSource:any;
  recordsFound = false;

  displayedColumns: string[] = [
    'slno',
    'division_code',
    'division_name',
    'id'
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
    this.divisionList = [];
    let dataval;
    let divilist;

    this.commonService.getDivisionList().then(data => {
      dataval = data;
      divilist = dataval.result;
      this.divisionList.push(divilist);
      console.log(this.divisionList);
      const tcount = this.divisionList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.divisionList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
     
    } ,
    error => {
     console.log("error in todays division list");
   });

  }


  getDiviEditDetail(event,data) {
    
    console.log(data);
    console.log(data.division_code);
    console.log(data.division_name);
    console.log(data.id);
   
    const dialogRef = this.dialog.open(DivisiondialogComponent, {
     width: '650px',
     disableClose: true,
     data:  {
       msg : 'Save Successfully',
       msgicon : 'check_circle',
       iconcolor: '#1d8c3d',
       btnurl : 'panel/divisionlist',
       division_id : data.id,
       division_code : data.division_code,
       division_name : data.division_name,
       }
   });
   
   dialogRef.afterClosed().subscribe(result => {
    // console.log("fsds");
    this.getDiagonosisList();
    
   });
    
  }

 
 
   
   applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
 
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
 
   gotoAdd(){
     this.router.navigateByUrl('panel/division');
   }

}
