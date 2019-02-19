import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../../service/common.service';
import { DatashareService } from '../../../../service/datashare.service';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import{ MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { LinedialogComponent } from '../../components/linedialog/linedialog.component';



@Component({
  selector: 'app-linelist',
  templateUrl: './linelist.component.html',
  styleUrls: ['./linelist.component.css']
})
export class LinelistComponent implements OnInit {

  lineList = [];
  dataSource:any;
  recordsFound = false;

  displayedColumns: string[] = [
    'slno',
    'division_name',
   
    'line_code',
    'lie_name',
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
    this.getLineList();
  }

  getLineList() {
    this.lineList = [];
    let dataval;
    let linelist;

    this.commonService.getLineList().then(data => {
      dataval = data;
      linelist = dataval.result;
      this.lineList.push(linelist);
      console.log(this.lineList);
      const tcount = this.lineList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.lineList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
     
    } ,
    error => {
     console.log("error in todays Line list");
   });

  }

  getLineEditDetail(event,data) {
    

    // console.log(data);
     this.lineList = [];
     let datavaledit;
     let linelist;
     let line_id;
     let division_code;
     let line_code;
     let lie_name;
     this.commonService.getLineDataById(data).then(data => {
       datavaledit = data;
       linelist = datavaledit.result;
       this.lineList.push(linelist);
       console.log(this.lineList);
       const tcount = this.lineList[0].length;
       line_id=this.lineList[0].id;
       division_code=this.lineList[0].division_code;
       line_code=this.lineList[0].line_code;
       lie_name=this.lineList[0].lie_name;
 
 
       const dialogRef = this.dialog.open(LinedialogComponent, {
         width: '650px',
         disableClose: true,
         data:  {
          msg : 'Save Successfully',
          msgicon : 'check_circle',
          iconcolor: '#1d8c3d',
          btnurl : 'panel/linelist',
          line_id : line_id,
          division_code : division_code,
          line_code : line_code,
          line_name : lie_name,
           }
       });
       
       dialogRef.afterClosed().subscribe(result => {
        // console.log("fsds");
 
        this.getLineList();
        
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
     this.router.navigateByUrl('panel/line');
   }

}
