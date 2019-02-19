import { Component, OnInit,ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonService } from './../../../../service/common.service';
import { DatashareService } from './../../../../service/datashare.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig } from '@angular/material';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';
import { MatSelect, VERSION } from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';


interface Medicine {
  name: string;
}

interface MedicineType {
  id: string;
  type: string;
}

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  addMedicineForm : FormGroup;
  medicinesTypeList = []; 
  medicinesList = []; 

  medicineCtrl:string = "";
  medTypeCtrl:string = "";
  brandnameCtrl:string = "";
  genericCtrl:string = "";

  message:string;
  action:string;


  validFormErr:string = "";

  filtermedcines: Observable<Medicine[]>;
  medicineinfo:Medicine[] = [];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(
    private router:Router,
    private commonService:CommonService,
    private datashareService:DatashareService ,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 

    this.addMedicineForm = new FormGroup({ 
      medicineCtrl: new FormControl(''),  
      medTypeCtrl: new FormControl(''), 
      brandnameCtrl: new FormControl(''), 
      genericCtrl: new FormControl(''), 
    });

    }
    @ViewChild('singleSelect') singleSelect: MatSelect; 
    private medicinestype: MedicineType[] = [];
    public filtermedicines: ReplaySubject<MedicineType[]> = new ReplaySubject<MedicineType[]>(1);

   

    

    private _filterMedicine(value: string): Medicine[] {
      const filterValue = value.toLowerCase();
      return this.medicineinfo.filter(medicine => medicine.name.toLowerCase().indexOf(filterValue) === 0);
    }

  ngOnInit() {
    this.getMedicineTypeData('medicine_type');
    this.getMedicine('medicine');

  console.log(this.addMedicineForm.get("medicineCtrl").value);

          this.filtermedcines = this.addMedicineForm.get("medicineCtrl").valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        

  }

  getMedicineTypeData(tablename) {
   
    let dataval;
    let medicinetypelist;
    this.commonService.getDropdownData(tablename).then(data => {
      this.medicinesTypeList = [];
      dataval = data;
      medicinetypelist = dataval.result;
      this.medicinesTypeList.push(medicinetypelist);
      console.log(this.medicinesTypeList);
    },
    error => {
     console.log("There is some error in Relation List...");
   });
  }

  getMedicine(tablename) {
   
    let dataval;
    let medicinelist;
    this.commonService.getDropdownData(tablename).then(data => {
      this.medicinesList = [];
      dataval = data;
      medicinelist = dataval.result;

      this.medicinesList.push(medicinelist);
      var count = Object.keys(dataval.result).length;
      let resultObj;
      for(let i = 0; i<count; i++){

        resultObj = {
            'name' : dataval.result[i].medicine_name
         }
         this.medicineinfo.push(resultObj);
      }
      console.log(this.medicineinfo);

    
    },
    error => {
     console.log("There is some error in Relation List...");
   });
  }

  onSubmit(formdata) {
   // console.log(formdata);

   if(this.validateForm()){
    let response;
    this.commonService.insertNewMedicine(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
       // this.openDialog();
       // this.addMedicineForm.reset();
        this.message='Saved Successfully';
        this.action='';
 
        console.log('success');
        this.openSnackBar(this.message,this.action);

        this.addMedicineForm.patchValue({
       
          medicineCtrl: '',
          medTypeCtrl: '',
          brandnameCtrl: '', 
          genericCtrl: '', 
         
         
           });
        this.getMedicine('medicine');



        
        
       
      }
      else{

        if(response.msg_data == "FAIL" && response.msg_status == "222"){

          this.validFormErr = "Error : Medicine already exist";

        }else{
            this.message='Something Wrong!';
            this.action='';
    
            console.log('success');
            this.openSnackBar(this.message,this.action);
            this.getMedicine('medicine');
        }


       // this.openDialogError();
      }
      console.log(response);
    },
    error => {
        console.log("There is some error on submitting...");
    });
  }


  }

  gotoList(){
    console.log('list')
    this.router.navigateByUrl('panel/medlist');
  }

  openedChange(opened: boolean) {
    console.log(opened ? 'opened' : 'closed');
 }

 private _filter(value: string) : Medicine[]{
  const filterValue = value.toLowerCase();

 // return this.options.filter(option => option.toLowerCase().includes(filterValue));
 console.log('start');
 console.log(this.medicineinfo.filter(medinfo => medinfo.name.toLowerCase().includes(filterValue)));
 
 return this.medicineinfo.filter(medinfo => medinfo.name.toLowerCase().includes(filterValue));
}


validateForm(){
  this.validFormErr = "";
  let validForm = false;

  if(this.addMedicineForm.controls['medicineCtrl'].value==''){
        this.validFormErr = "Error : Medicine is required";
        return validForm = false;
      
  }

  if(this.addMedicineForm.controls['medTypeCtrl'].value==''){
    this.validFormErr = "Error : Medicine Type is required";
    return validForm = false;
  
  }


  validForm = true;
  return validForm;
}


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });

  
}

}//end of class
