import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalconstantService {

  constructor() { }
  
 // private APIURL = "http://192.168.2.16:8088/ehrsystem/ehrsrvc/";
  //private APIURL = "http://192.168.2.10/ehrsystem/ehrsrvc/";
  //private APIURL = "http://127.0.0.1:8011/ehrsystem/ehrsrvc/";
 // private APIURL = "http://127.0.0.1/ehrsystem/ehrsrvc/";
 //  private APIURL = "http://127.0.0.1:8088/ehrsystem/ehrsrvc/";
  // private APIURL = "http://127.0.0.1/ehr/ehrsrvc/";
  //private APIURL =  "http://13.234.41.243/devehrsystem/ehrsrvc/";
  //private APIURL = "http://medewise.com/medehr/";
  // private APIURL = "http://softhought.com/medewise/ehrsrvc/";

  private APIURL =  "http://13.234.41.243/ehr/ehrsrvc/";
  // private APIURL = "http://127.0.0.1/ehrsystem/ehrsrvc/";
  private APIKEY = "24ecdccb1258eaacfd441e012ac034392403c692";

  // URL INFO
  //public signin = this.APIURL+"login/getLogin" ;

  public signin = this.APIURL+"login/getLogin";

  //Patient
  public ListPatient = this.APIURL+"patient/getAllPatient";
  public patientdetail_URL = this.APIURL+"patient/getPatientDetail";
  public registerPatient_URL = this.APIURL+"registration/registerPatient";
  public addnewPatient_URL = this.APIURL+"patient/addNewPatient";
  public searchPatient_URL = this.APIURL+"patient/searchPatient";
  

  public todaysReg_URL = this.APIURL+"registration/getTodaysRegistration";
  public isregisterdToday_URL = this.APIURL+"registration/isRegisteredToday";

  public insertVaccination_URL = this.APIURL+"opd/insertIntoVaccination";
  public insertIntoPregnancy_URL = this.APIURL+"opd/savePregnancyInfo";
  public regBydate_URL = this.APIURL+"registration/getRegistrationByDate";
 

  // Blood Group
  public bloodgrpList_URL = this.APIURL+"master/getBloodGroup";
  public patienttypeList_URL = this.APIURL+"master/getPatientType";
  public empDependPatienttypeList_URL = this.APIURL+"master/getDepTagEmplType";

  // Relations
  public relationList_URL = this.APIURL+"master/getRelations";
  public relationbyTypeList_URL = this.APIURL+"master/getRelationsByType";
  public hospitalList_URL = this.APIURL+"master/getHospitals";
  public estateList_URL = this.APIURL+"estate/getEstate";
  public estateByEmpl_URL = this.APIURL+"estate/getEstateByEmpl";

  public investigationlist_URL = this.APIURL+"master/getInvestigations";
  public symptomlist_URL = this.APIURL+"symptoms/getSymptoms";
  public diseaselist_URL = this.APIURL+"disease/getDiseaseBySymptoms";
  public medicinelist_URL = this.APIURL+"medicine/getMedicineBySymptoms";
  public medicinelistByName_URL = this.APIURL+"medicine/getMedicineByName";
  public allMedicineList_URL = this.APIURL+"medicine/getAllMedicineList";
  public insertMEDI_URL = this.APIURL+"medicine/insertIntoMedicine";
  public updateMEDI_URL = this.APIURL+"medicine/updateMedicine";

  public dosageByMedlist_URL = this.APIURL+"medicine/getDosageByMedicine";
  public frequencyByMedlist_URL = this.APIURL+"medicine/getFrequencyByMedicine";

  public insertOPD_URL = this.APIURL+"opd/insertIntoOpd";
  public insertSickLeave_URL = this.APIURL+"opd/saveSickLeave";

  public todaysRegDoct_URL = this.APIURL+"registration/getTodaysRegDoct";
  public todaysRegByRegType_URL = this.APIURL+"registration/todaysRegByRegType";
  public RegListBydate_URL = this.APIURL+"registration/RegListByDateRange";
  public attendentListBydate_URL = this.APIURL+"registration/AttendentListByDate";

  //sick leave approval
  public sickApprovalList_URL = this.APIURL +"patient/getSickApprovedList";
  public sickApprovalListDtRange_URL = this.APIURL +"patient/getSickApprovedListByDateRange";
  public sickApprovalUpdate_URL = this.APIURL +"patient/updateSickLeaveApprovalStatus";
  public sickApprovalCount_URL = this.APIURL+"patient/getSickLeaveApproveCount";
  public sickApprovalCountListDtRange_URL = this.APIURL+"patient/getSickLeaveApproveCountByDateRange";
  public sickleaveregisterList_URL = this.APIURL +"patient/getSickleaveregisterList";

  public sickApprovedListcountgrpDt_URL = this.APIURL +"patient/getSickApprovedListcountgrpDate";

  public approvedsiclleaveDtl_URL = this.APIURL+"patient/approvedsickleavedetailsbydate";	


  public patientPrescInfoBycode_URL = this.APIURL+"opd/getPatientPrescInfoByCode";
  public patientPrescInfoByPatientID_URL = this.APIURL+"opd/getPatientPrescInfoByPatientID";
  public patientLastPregnenctInfoBycode_URL = this.APIURL+"opd/getLastPregnencyInfoByCode";

  public patientInfoBycode_URL = this.APIURL+"patient/getPatientInfoByCode";
  public patientInfoByPatientID_URL = this.APIURL+"patient/getPatientInfoByPatientID";
  public patientSearchBycode_URL = this.APIURL+"patient/patientSearchByCode";
  public patientSearchByQry_URL = this.APIURL+"patient/patientSearchByQry";
  public associatedEmpSearchBycode_URL = this.APIURL+"patient/associateEmpByCode";
  public patientSearchByaadhar_URL = this.APIURL+"patient/patientSearchByAadhar";
  public ipdpatientByEmpRel_URL = this.APIURL+"patient/getPatientListIPD";

  public patientIPDInfoByUniqueID_URL = this.APIURL+"patient/getPatientIPDInfoByUniqueID";

  public patientSickLeaveRegSearchByQry_URL = this.APIURL+"patient/patientSickLeaveRegSearchByQry";

  /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ Pharmcy URL LIST
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */

  public todaysPrescriptionPharmcy_URL = this.APIURL+"pharamcy/getPrescriptionListPharamcy";
  public todaysIPDPrescriptionPharmcy_URL = this.APIURL+"pharamcy/getIPDPrescriptionListPharamcy";
  public medicineByprescriptionID_URL = this.APIURL+"pharamcy/getMedicineByPrescription";
  public insertMedicineIssue_URL = this.APIURL+"pharamcy/insertIntoMedicineIssue";
  public medicineBatchInfo_URL = this.APIURL+"medicine/getMedicineBatchInfoAccordingtoStock";
  public issuedMedByDateAndMed_URL = this.APIURL+"pharamcy/getIssuedMedByDtAndMed";


  public deleteRecord_URL = this.APIURL+"remove/removeRecord";
  public deleteRowRecord_URL = this.APIURL+"remove/removeRowRecord";

    /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ Pharmcy URL IPD
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */

  public insertIPD_URL = this.APIURL+"ipd/registerIPD";
  public todasyIPDList_URL = this.APIURL+"ipd/getIPDListByDt";
  public todasyIPDListDtRange_URL = this.APIURL+"ipd/getIPDListByDtByDateRange";
  public ipdDischargeList_URL = this.APIURL+"ipd/getIPDDischargeListByDt";
  public ipdDischargeListDtRange_URL = this.APIURL+"ipd/getIPDDischargeListByDateRange";
  public ipdDetailInfoByID_URL = this.APIURL+"ipd/getIpdDetailInfoByID";
  public insertregularVisitIPD_URL = this.APIURL+"ipd/saveIPDRegularVisit";
  public ipddischargeSave_URL = this.APIURL+"ipd/saveIPDDischarge";
  public removeDischarge_URL = this.APIURL+"ipd/removeIPDDischarge";

  public ipdPatientVisitHistory_URL = this.APIURL+"ipd/getIpdPatientVisitHistory";
  public opdPatientPrescHistory_URL = this.APIURL+"opd/getOpdPatientPrescHistory";
  
  public opdipdPrescPrint_URL = this.APIURL+"ipd/getOpdIpdPrescPrint";

  public vaccinationScheduleList_URL = this.APIURL+"master/getVaccinationSchedule";
  public vaccinListByschedule_URL = this.APIURL+"master/getPatientVaccinListBySchedule";




  public masterDataSave_URL = this.APIURL+"master/saveCommonMastDatas";
  public getmasterTblData_URL = this.APIURL+"master/getMasterInfos";
  public getmasterDropdown_URL = this.APIURL+"master/getMasterDropdown";

// Group
public groupList_URL = this.APIURL+"master/getGroup";



  /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ INVESTIGATION URL 
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */

  public insertINV_URL = this.APIURL+"investigation/insertIntoInvestigation";
  public updateINV_URL = this.APIURL+"investigation/updateInvestigation";
  public invList_URL = this.APIURL+"investigation/getInvestigationList";

   /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ DIAGONOSIS URL 
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */

  public insertDIAG_URL = this.APIURL+"diagonosis/insertIntoDiagonosis";
  public updateDIAG_URL = this.APIURL+"diagonosis/updateDiagonosis";
  public diagList_URL = this.APIURL+"diagonosis/getDiagonosisList";
  public diagData_URL = this.APIURL+"diagonosis/getDiagonosisDataById";

  /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ SYMPTOMS URL 
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */

  public insertSYMP_URL = this.APIURL+"symptoms/insertIntoSymptoms";
  public sympList_URL = this.APIURL+"symptoms/getSymptomsList";
  public updateSYMP_URL = this.APIURL+"symptoms/updateSymptoms";


  /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ FILE UPLOAD URL 
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */

  public excelvalidation_URL = this.APIURL+"fileimport/insertIntoTemp";
  public insertEMP_URL = this.APIURL+"Fileimport/insertIntoEmployee";
  public grnvalidation_URL = this.APIURL+"fileimport/verifyGrnFile";		
  public insertMED_URL = this.APIURL+"Fileimport/insertIntoMedicine";
  public importDependent_URL = this.APIURL+"fileimport/verifyDependentExcelFile";		
  public insertDependent_URL = this.APIURL+"Fileimport/insertIntoDependentPatient";
  public importMedicine_URL = this.APIURL+"fileimport/verifyMedicineExcelFile";	
  public insertMedicineimport_URL = this.APIURL+"Fileimport/insertIntoMedicineFromExcel";


/* --------------------------------------------------------- 		
 * ---------------------------------------------------------		
 * @ Reports UPLOAD URL 		
* ---------------------------------------------------------		
* ---------------------------------------------------------		
*/		
public testSearchByQry_URL = this.APIURL+"reportupload/testSearchByQry";		
public reportUpload_URL = this.APIURL+"Reportupload/uploadReport";		
public reportUploadList_URL = this.APIURL+"Reportupload/getReportList";		
public deleteReport_URL = this.APIURL+"Reportupload/deleteReport";		
		
/**		
* change stasus		
*/		
		
public changeStatusData_URL = this.APIURL+"Commoncontroller/changeStatus";


public divisionListMaster_URL = this.APIURL+"master/getDivision";
public challanListMaster_URL = this.APIURL+"master/getChallanMaster";
public lineListMaster_URL = this.APIURL+"master/getLineMaster";


/*  -------------------------------- 7 February 2019 ------------------------------------------------- */



   /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ DIVISION URL 
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */

  public insertDIVI_URL = this.APIURL+"division/insertIntoDivision";
  public divigList_URL = this.APIURL+"division/getDivisionList";
  public updateDIVI_URL = this.APIURL+"division/updateDivision";

  
   /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ LINE URL 
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */

  public insertLINE_URL = this.APIURL+"line/insertIntoLine";
  public lineList_URL = this.APIURL+"line/getLineList";
  public lineData_URL = this.APIURL+"line/getLineDataById";
  public updateLINE_URL = this.APIURL+"line/updateLine";

   /* --------------------------------------------------------- 
   * ---------------------------------------------------------
   * @ CHALLAN URL 
   * ---------------------------------------------------------
   * ---------------------------------------------------------
   */
  public insertCHALLAN_URL = this.APIURL+"challan/insertIntoChallan";
  public challanList_URL = this.APIURL+"challan/getChallanList";
  public challanData_URL = this.APIURL+"challan/getChallanDataById";
  public updateCHALLAN_URL = this.APIURL+"challan/updateChallan";


/*  -------------------------------- End of 7 February 2019 -----------------------------------------  */
/*  -------------------------------- 8 February 2019 -----------------------------------------  */
public getmasterPatientBydr_URL = this.APIURL+"patient/getAllPatientByDrType";



public verifyAndRegisterPatient_URL = this.APIURL+"registration/verifyAndRegisterPatient";

  getApiURL(){
    return this.APIURL;
  }
 
  getAPiKey(){
    return this.APIKEY;
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

}