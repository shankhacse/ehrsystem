import {Component, Injectable } from '@angular/core';
export interface myData {
  objPatient : any;
}

export interface prescriptionData {
  objPresSingledata : any;
}

export interface ipdRowData {
  objIPDSingledata : any;
}

export interface ipdDischargeRowData {
  objIPDDischargeSingledata : any;
}

export interface invRowData {
  objINVSingledata : any;
}

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  sharedData:string = "";
  


  constructor() { }

  sharingData: myData= {objPatient:""};
  prescriptionsingleRow : prescriptionData = { objPresSingledata : "" };
  ipdRegSingleRow : ipdRowData = { objIPDSingledata : "" };
  ipddischargeSingleRow : ipdDischargeRowData = { objIPDDischargeSingledata : "" };
  invSingleRow : invRowData = { objINVSingledata : "" };

  saveData(obj){
    this.sharingData.objPatient = obj; 
  }
  getData()
  {
    return this.sharingData.objPatient;
  }

  savePrescriptionRowData(obj){
    this.prescriptionsingleRow.objPresSingledata = obj;
  }

  getPrescriptionRowData(){
    return this.prescriptionsingleRow.objPresSingledata;
  }

  setIPDRowData(obj){
    this.ipdRegSingleRow.objIPDSingledata = obj;
  }

  getIPDRowData(){
    return this.ipdRegSingleRow.objIPDSingledata;
  }

  setIPDDischargeRowData(obj){
    this.ipddischargeSingleRow.objIPDDischargeSingledata = obj;
  }

  getIPDDischargeRowData(){
    return this.ipddischargeSingleRow.objIPDDischargeSingledata;
  }

  setINVRowData(obj){
    this.invSingleRow.objINVSingledata = obj;
  }

  getINVRowData(){
    return this.invSingleRow.objINVSingledata;
  }



}
