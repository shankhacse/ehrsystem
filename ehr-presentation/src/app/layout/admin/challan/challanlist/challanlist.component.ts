import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../../service/common.service';
import { DatashareService } from '../../../../service/datashare.service';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import{ MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { ChallandialogComponent } from '../../components/challandialog/challandialog.component';


@Component({
  selector: 'app-challanlist',
  templateUrl: './challanlist.component.html',
  styleUrls: ['./challanlist.component.css']
})
export class ChallanlistComponent implements OnInit {

  challanList = [];
  dataSource:any;
  recordsFound = false;

  displayedColumns: string[] = [
    'slno',
    'estate_name',
    'challan_code',
    'name',
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
    this.getChallanList();
  }

  getChallanList() {
    this.challanList = [];
    let dataval;
    let challanlist;

    this.commonService.getChallanList().then(data => {
      dataval = data;
      challanlist = dataval.result;
      this.challanList.push(challanlist);
      console.log(this.challanList);
      const tcount = this.challanList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.challanList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
     
    } ,
    error => {
     console.log("error in todays Line list");
   });

  }

  getChallanEditDetail(event,data) {
    

    // console.log(data);
     this.challanList = [];
     let datavaledit;
     let diaglist;
     let challan_id;
     let estate_code;
     let challan_code;
     let challan_name;
    
     this.commonService.getChallanDataById(data).then(data => {
       datavaledit = data;
       diaglist = datavaledit.result;
       this.challanList.push(diaglist);
       console.log(this.challanList);
       const tcount = this.challanList[0].length;
       challan_id=this.challanList[0].id;
       estate_code=this.challanList[0].estate_code;
       challan_code=this.challanList[0].challan_code;
       challan_name=this.challanList[0].name;
      
       console.log(challan_name);
 
       const dialogRef = this.dialog.open(ChallandialogComponent, {
         width: '650px',
         disableClose: true,
         data:  {
           msg : 'Save Successfully',
           msgicon : 'check_circle',
           iconcolor: '#1d8c3d',
           btnurl : 'panel/challanlist',
           challan_id : challan_id,
           estate_code : estate_code,
           challan_code : challan_code,
           challan_name : challan_name,
           }
       });
       
       dialogRef.afterClosed().subscribe(result => {
        // console.log("fsds");
 
        this.getChallanList();
        
       });
      
     } ,
     error => {
      console.log("error in todays investigation list");
    });
     
   }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoAdd(){
    this.router.navigateByUrl('panel/challan');
  }

}
