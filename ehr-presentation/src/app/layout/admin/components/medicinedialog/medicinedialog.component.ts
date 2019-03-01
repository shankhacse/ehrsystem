import { Component, OnInit,Inject,ViewChild  } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../../service/patient.service';
import { Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { SuccessdialogComponent } from '../../../components/successdialog/successdialog.component';
import {MatSnackBar} from '@angular/material';
import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import {map, startWith} from 'rxjs/operators';


interface Medicine {
  name: string;
}

interface MedicineType {
  id: string;
  type: string;
}

@Component({
  selector: 'app-medicinedialog',
  templateUrl: './medicinedialog.component.html',
  styleUrls: ['./medicinedialog.component.css']
})
export class MedicinedialogComponent implements OnInit {

  editMedicineForm : FormGroup;
  medicinesTypeList = []; 
  medicinesList = []; 

  medicineCtrl:string = "";
  oldmedicineCtrl:string = "";
  medTypeCtrl:string = "";
  brandnameCtrl:string = "";
  genericCtrl:string = "";


  msg:string;
  msgIcon:string;
  iconColor:string;
  redirectUrl:string;

  message:string;
  action:string;

  validFormErr:string = "";
  disableClick;

  filtermedcines: Observable<Medicine[]>;
  medicineinfo:Medicine[] = [];


  constructor(
    private router:Router,
    public dialogRef: MatDialogRef<MedicinedialogComponent> ,
    private commonService:CommonService,
    private patientService:PatientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.msg = this.data.msg;  
    this.msgIcon = this.data.msgicon;
    this.iconColor = this.data.iconcolor;
    this.redirectUrl = this.data.btnurl;
   

    this.editMedicineForm = new FormGroup({ 
      medIdCtrl: new FormControl(''),
      medicineCtrl: new FormControl(''),  
      oldmedicineCtrl: new FormControl(''),  
      medTypeCtrl: new FormControl(''), 
      brandnameCtrl: new FormControl(''), 
      genericCtrl: new FormControl(''), 
    });

    this.editMedicineForm.patchValue({
       
      medIdCtrl: this.data.medicine_id,
      medicineCtrl: this.data.medicine_name,
      oldmedicineCtrl: this.data.medicine_name,
      medTypeCtrl: this.data.medicine_type,
      brandnameCtrl: this.data.brand_name,
      genericCtrl: this.data.generic
     
     
       });

 
   }
   @ViewChild('singleSelect') singleSelect: MatSelect; 
   private medicinestype: MedicineType[] = [];
   public filtermedicines: ReplaySubject<MedicineType[]> = new ReplaySubject<MedicineType[]>(1);

  ngOnInit() {

    
  
    var isReadableCheck = localStorage.getItem('isReadable');
    console.log('isReadable editMedicine: '+isReadableCheck);
    if(isReadableCheck=='true'){
      this.disableClick = 1;
    }else{
      this.disableClick = 0;
    }
    this.getMedicineTypeData('medicine_type');

    this.getMedicine('medicine');

    console.log(this.editMedicineForm.get("medicineCtrl").value);
  
            this.filtermedcines = this.editMedicineForm.get("medicineCtrl").valueChanges
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


  onSubmitEdit(formdata) {
    console.log(formdata);
    

   
   
    if(this.validateForm()){
   
    let response;
    this.commonService.updateMedicine(formdata,).then(data => {
      response = data;
      if(response.msg_data == "SUCCESS" && response.msg_status == "200"){
           
        //this.openDialog();
        this.message='Updated Successfully';
        this.action='';
 
        
        this.openSnackBar(this.message,this.action);
        
        
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
      }
      console.log(response);
    },
    error => {
        console.log("There is some error on submitting...");
    });
  }

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

  if(this.editMedicineForm.controls['medicineCtrl'].value==''){
        this.validFormErr = "Error : Medicine is required";
        return validForm = false;
      
  }

  if(this.editMedicineForm.controls['medTypeCtrl'].value==''){
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

redirectToComp(){
  console.log(this.redirectUrl);
  this.dialogRef.close();
  this.router.navigateByUrl(this.redirectUrl);
 
}


}// end of class
