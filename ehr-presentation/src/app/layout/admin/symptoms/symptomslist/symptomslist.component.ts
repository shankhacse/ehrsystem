import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from '../../../../service/common.service';
import { DatashareService } from '../../../../service/datashare.service';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import{ MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';
import { SymptomsdialogComponent } from '../../components/symptomsdialog/symptomsdialog.component';


@Component({
  selector: 'app-symptomslist',
  templateUrl: './symptomslist.component.html',
  styleUrls: ['./symptomslist.component.css']
})
export class SymptomslistComponent implements OnInit {

  symptomsList = [];
  dataSource:any;
  recordsFound = false;

  displayedColumns: string[] = [
    'slno',
    'symptom',
    'group_name',
    'symptom_id'
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
    this.getSymptomsList();
    
  }

  getSymptomsList() {
    this.symptomsList = [];
    let dataval;
    let symplist;

    this.commonService.getSymptomsList().then(data => {
      dataval = data;
      symplist = dataval.result;
    this.symptomsList = [];
    this.symptomsList.push(symplist);
      console.log(this.symptomsList);
      const tcount = this.symptomsList[0].length;
      if(tcount > 0){
        this.recordsFound = true;
        this.dataSource = new MatTableDataSource(this.symptomsList[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
     
    } ,
    error => {
     console.log("error in todays symptomslist list");
   });

  }

  getsympEditDetail(event,data) {
    
     console.log(data);
     console.log(data.group);
     console.log(data.symptom);
     console.log(data.symptom_id);
    
     const dialogRef = this.dialog.open(SymptomsdialogComponent, {
      width: '650px',
      disableClose: true,
      data:  {
        msg : 'Save Successfully',
        msgicon : 'check_circle',
        iconcolor: '#1d8c3d',
        btnurl : 'panel/symptomslist',
        symptom_id : data.symptom_id,
        symptom : data.symptom,
        group : data.group,
        }
    });
    
    dialogRef.afterClosed().subscribe(result => {
     // console.log("fsds");
     this.getSymptomsList();
     
    });
     
   }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  gotoAdd(){
    this.router.navigateByUrl('panel/symptoms');
  }

}//end of class
