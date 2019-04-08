import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../../service/common.service';
import { DatashareService } from '../../../../service/datashare.service';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import{ MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';
import { MedicinedialogComponent } from '../../components/medicinedialog/medicinedialog.component';


@Component({
  selector: 'app-medicinelist',
  templateUrl: './medicinelist.component.html',
  styleUrls: ['./medicinelist.component.css']
})
export class MedicinelistComponent implements OnInit {

  isPageloded=false;
  medicineList = [];
  dataSource:any;
  recordsFound = false;

  displayedColumns: string[] = [
    'slno',
    'medicine_name',
    'medicine_type',
    'brand_name',
    'generic',
    'medicine_id',
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
    this.getMedicineList();
  }

  getMedicineList() {
    this.medicineList = [];
    let dataval;
    let medlist;

    this.commonService.getMedicineList().then(data => {
      dataval = data;
      medlist = dataval.result;
      this.medicineList.push(medlist);
      console.log(this.medicineList);
      const tcount = this.medicineList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.medicineList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.isPageloded=true;
     
    } ,
    error => {
     console.log("error in todays investigation list");
   });

  }


  getmedEditDetail(event,data) {
    
    console.log(data.brand_name);
    console.log(data.generic);
    console.log(data.medicine_id);
    console.log(data.medicine_name);
    console.log(data.medicine_type);
  
   
    const dialogRef = this.dialog.open(MedicinedialogComponent, {
     width: '650px',
     disableClose: true,
     data:  {
       msg : 'Save Successfully',
       msgicon : 'check_circle',
       iconcolor: '#1d8c3d',
       btnurl : 'panel/medlist',
       medicine_id : data.medicine_id,
       medicine_name : data.medicine_name,
       medicine_type : data.medicine_type,
       brand_name : data.brand_name,
       generic : data.generic,
         
       }
   });
   
   dialogRef.afterClosed().subscribe(result => {
    // console.log("fsds");
    this.getMedicineList();
    
   });
    
  }


   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoAdd(){
    this.router.navigateByUrl('panel/med');
  }
  gotoImport(){
    this.router.navigateByUrl('panel/importmedicine');
  }

}
