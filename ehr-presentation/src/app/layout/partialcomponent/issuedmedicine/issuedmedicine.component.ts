import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild , ViewEncapsulation } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommonService } from '../../../service/common.service';
import { SymptomdiseaseService } from '../../../service/symptomdisease.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatashareService } from '../../../service/datashare.service';
import { PatientService } from '../../../service/patient.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { IpdService } from '../../../service/ipd.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';




interface Medicine {
  id: string,
  name: string,
  type: string
}

interface Dosage {
  id: string,
  value: string,
}

interface Frequency {
  id: string,
  frequency: string,
}

interface Relation {
  id: string;
  name: string;
}

interface Instruction{
  id: string;
  name: string;
}

interface Reports{
  id: string;
  name: string;
}

interface AssociatedEmpl {
  id: string,
  code: string,
  name: string
}


export interface medicineDetailData {
  date: string;
  pres: string;
  name: string;
  qty: string;
}

export interface GroupBy {
  initial: string;
  isGroupBy: boolean;
}


const ELEMENT_DATA = [];
export interface MedicineTableData {
  date: any;
  prescno: any;
  name: any;
  qty: any ;
}



export interface GroupByMed {
  medname: string;
  isGroupBy: boolean;
}



@Component({
  selector: 'app-issuedmedicine',
  templateUrl: './issuedmedicine.component.html',
  styleUrls: ['./issuedmedicine.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IssuedmedicineComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['pres', 'date', 'name', 'qty'];
 

  isGroup(index, item): boolean{
    return item.isGroupBy;
  }
  issuedMednoRecordFound = false;
  issuedMedicineSearchForm : FormGroup;
  patientList = []; 
  relationsList = []; 
  bloodGroupList = [];
  addedMeddata = [];
  addedInvestigations = [];

  
  medicineError:string = "";
  testReportError:string = "";
  validFormErr:string = "";

  constructor(private router:Router, private commonService:CommonService, private symptomdiseaseService:SymptomdiseaseService , private datashareService:DatashareService , private patientService:PatientService , public dialog: MatDialog , private ipdService:IpdService) { 
    
    this.issuedMedicineSearchForm = new FormGroup({
      opdIpdCtrl : new FormControl('ALL'),
      searchFromDateCtrl : new FormControl(new Date().toISOString()),
      searchToDateCtrl : new FormControl(new Date().toISOString()),
      medicineCtrl : new FormControl(''),
      medicineFilterCtrl : new FormControl('')
    });

  }

  version = VERSION;

  private relations: Relation[] = [];
  private medicines: Medicine[] = [];
  private dosages: Dosage[] = [];
  private frequency: Frequency[] = [];
  private instructions: Instruction[] = [];
  private medreports: Reports[] = [];
  
  public filteredMedicines: ReplaySubject<Medicine[]> = new ReplaySubject<Medicine[]>(1);
  public filteredDosages: ReplaySubject<Dosage[]> = new ReplaySubject<Dosage[]>(1);
  public filteredFrequency: ReplaySubject<Frequency[]> = new ReplaySubject<Frequency[]>(1);

  public filterRelations: ReplaySubject<Relation[]> = new ReplaySubject<Relation[]>(1);
  public filteredRelationsMulti: ReplaySubject<Relation[]> = new ReplaySubject<Relation[]>(1);

  public filteredInstruction: ReplaySubject<Frequency[]> = new ReplaySubject<Frequency[]>(1);
  public filteredReports: ReplaySubject<Reports[]> = new ReplaySubject<Reports[]>(1);


  private associatedEmplList: AssociatedEmpl[] = [];
  public filteredAssociatedEmpl: ReplaySubject<AssociatedEmpl[]> = new ReplaySubject<AssociatedEmpl[]>(1);
  
  @ViewChild('singleSelect') singleSelect: MatSelect; 
  @ViewChild('multiSelect') multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  ngOnInit() {
    this.getMedicine();
  }


/*
  getMedicineBySerach(event) {
    if(event.key == "ArrowDown" || event.key == "ArrowUp"){}
    else{
      this.getMedicine(event.target.value);
    }
  }
  */

  removeData(i){
    this.addedMeddata.splice(i, 1);
  }

  removeMedReports(i){
    this.addedInvestigations.splice(i, 1);
  }

  clearTestError(obj){
    this.testReportError = "";
  }


  medDisplayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  medDataSource = ELEMENT_DATA;

  medIsGroup(index, item): boolean{
    return item.isGroupBy;
  }

  onSubmit() {
   
    console.log(this.issuedMedicineSearchForm.value);

      
        let response;
        let dataval
        let medicinelist
        let medcineName = [];
        this.symptomdiseaseService.getIssuedMedicineListByDateAndMedicine(this.issuedMedicineSearchForm.value).then(data => {
          response = data;
         
          if(response.msg_data == "SUCCESS" && response.msg_status == "200") {
            this.issuedMednoRecordFound = false;
            dataval = data;
            medicinelist = dataval.result;
            var count = Object.keys(dataval.result).length;
            if(count <= 0) {
              this.issuedMednoRecordFound = true;
            }
            let mednameObj;
            let medDetailObj;
            for(let i = 0; i<count; i++) {
                let detailCount = Object.keys(medicinelist[i].med_issued_dtl).length;
                console.log("Detail count is " + detailCount);
                if(detailCount>0) {
                  
                 
                  mednameObj = {
                    "initial" : medicinelist[i].medicine_data.medicine_name,
                    "isGroupBy" : true
                  }
                  medcineName.push(mednameObj);
                  
                  let totalQty:any = 0;
                  for(let k = 0; k < detailCount; k++) {
                    medDetailObj = {
                      "pres" : medicinelist[i].med_issued_dtl[k].prescno,
                      "date" : medicinelist[i].med_issued_dtl[k].issueDate,
                      "name" : medicinelist[i].med_issued_dtl[k].patientname,
                      "qty" :  medicinelist[i].med_issued_dtl[k].qty
                    }
                    medcineName.push(medDetailObj);
                    totalQty = parseInt(totalQty) + parseInt(medicinelist[i].med_issued_dtl[k].qty);
                  }
                  medDetailObj = {
                    "pres" : 'Total',
                    "date" : '',
                    "name" : '',
                    "qty" : totalQty
                  }
                  medcineName.push(medDetailObj);
                }
            }

          //  this.dataSource = ELEMENT_DATA;

            console.log(this.dataSource);
            this.dataSource = new MatTableDataSource(medcineName); 
            
          }
          else{
          
          }
          
          
         
        },
        error => {
            console.log("There is some error on submitting...");
        });
      

  }




 

 getMedicine(){
  let dataval;
  let medicinelist;
  this.medicines = [];
  this.symptomdiseaseService.getAllMedicineList().then(data => {
    dataval = data;
    medicinelist = dataval.result;
    var count = Object.keys(dataval.result).length;
             let resultObj;
             for(let i = 0; i<count; i++){
              resultObj = {
                  'name':dataval.result[i].medicine_name,
                  'id': dataval.result[i].medicine_id	,
                  'type' : dataval.result[i].medicine_type
              }
              this.medicines.push(resultObj);
          }
         
  this.filteredMedicines.next(this.medicines.slice());
  this.issuedMedicineSearchForm.get('medicineFilterCtrl').valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterMedicines();
    });

           
  },
  error => {
   console.log("There is some error in Medicine List...");
 });
}







  private filterMedicines() {
    if (!this.medicines) {
      return;
    }
    // get the search keyword
    let search =  this.issuedMedicineSearchForm.get('medicineFilterCtrl').value;
    if (!search) {
      this.filteredMedicines.next(this.medicines.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMedicines.next(
    //  this.medicines.filter(medicine => medicine.name.toLowerCase().indexOf(search) > -1) // commented on 07.03.2019
      this.medicines.filter(medicine => medicine.name.toLowerCase().startsWith(search))
    );
  }

}
