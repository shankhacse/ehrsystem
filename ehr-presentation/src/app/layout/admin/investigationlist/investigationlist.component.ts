import {  Component, OnInit, ViewChild ,  ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../service/common.service';
import { DatashareService } from '../../../service/datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investigationlist',
  templateUrl: './investigationlist.component.html',
  styleUrls: ['./investigationlist.component.css']
})
export class InvestigationlistComponent implements OnInit {

  investigationList = [];
  dataSource:any;
  recordsFound = false;
  isPageloded=false;
  disableClick;

  displayedColumns: string[] = [
    'slno',
    'investigation_name',
    'status',
    'investigation_id'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  

  constructor(
    private commonService:CommonService ,
    private datashareService:DatashareService ,
    private router:Router
  ) { }

  ngOnInit() {
 
  
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable testList: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }

    this.getInvestigationList();

  }


  getInvestigationList() {
    this.investigationList = [];
    let dataval;
    let invlist;

    this.commonService.getTestList().then(data => {
      dataval = data;
      invlist = dataval.result;
      this.investigationList.push(invlist);
      console.log(this.investigationList);
      const tcount = this.investigationList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
       
      }
        this.dataSource = new MatTableDataSource(this.investigationList[0]);
        this.dataSource.paginator = this.paginator;
      
        this.dataSource.sort = this.sort;
        this.isPageloded=true;
        console.log(this.paginator)
     
    } ,
    error => {
     console.log("error in todays investigation list");
   });

  }


  getInvEditDetail(event,data) {

    console.log(data);
    this.datashareService.setINVRowData(data);
    this.router.navigate(['/panel/test']);
    
  }

  changeStatus(rowid,status){
    console.log(rowid);
    console.log(status);
    let tablename='investigation';
    let columnname='investigation_id';

    this.commonService.setstatus(rowid,tablename,columnname,status).then(data => {
      this.getInvestigationList();
     
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
    this.router.navigateByUrl('panel/test');
  }

}//end of class
