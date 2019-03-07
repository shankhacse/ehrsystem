<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Fileimport_model extends CI_Model{


    	/**
     * @name insertIntoDiag
     * @author Shankha ghosh
     * @desc insert diagonosis
     */
/* -------------------------------------------------modified on 08.02.2019-------------------------------*/ 
	public function insertIntoEmployee($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
          //  $EmpData = $request->fdata;
          $value = $request->fdata;
            
          //  pre($EmpData);exit;

           // foreach ($EmpData as $key => $value) {
             
                $dob=$value->dob->value;
                if($dob!=""){
                    $dob = str_replace('/', '-', $dob);
                    $dob = date("Y-m-d",strtotime($dob));
                }
                else{
                    $dob = NULL;
                }

             
             
              

         /*   $employeeArray= [
                "estate" => $estateId,
                "patient_code" => $value->employee_code->value,
                "pf_no" => $value->pf_no->value,
                "employee_name" => $value->employee_name->value,
                "father_name" => $value->father_name->value,
                "division_or_departm" => $value->division_or_departm->value,
                "category" => $value->category->value,
                "dob" => $dob,
                "doj" => $doj,
                "challan" => $value->challan->value,
                "line" => $value->line->value,
                "hospital_id" => $hospital_id
            ];*/


          

        
            if($value->type->value=='MR'){
                $patient_type_id=1;
            }else{

                $PatientTypeWhere = array('patient_type.dr_type' =>trim($value->dr_type->value));
                $PatientTypeData = $this->commondatamodel->getSingleRowByWhereCls('patient_type',$PatientTypeWhere);
                if(!empty($PatientTypeData)){
                $patient_type_id=$PatientTypeData->patient_type_id;
                }else{$patient_type_id=null;}
            }
            

            $patientwhere = array('patients.patient_code' =>$value->employee_code->value);
            $checkpatientCode=$this->commondatamodel->checkExistanceData('patients',$patientwhere);

            if($checkpatientCode){
                                $patientUpdateArray = [
                                    'estate' => $value->garden_code->value,
                                    'patient_type_id' => $patient_type_id,
                                    'patient_name' => $value->employee_name->value,
                                    'gender' => $value->sex->value,
                                    'mobile_one' => $value->phno->value,
                                    'mobile_two' => $value->mobilephno->value,
                                    'challan_number' => $value->challan->value,
                                    'currant_status' => $value->current_status->value,
                                    "dob" => $dob,
                                    'division_number' => $value->division->value,
                                    'line_number' => $value->line->value,
                                    'house_no' => $value->houseno->value, 
                                    "hospital_id" => $hospital_id,
                                    
                                ];


                                $this->db->where($patientwhere);
                                $this->db->update('patients',$patientUpdateArray);

                            
            
            
                        }else{

                           



                            $patientArray = [
                                'estate' => $value->garden_code->value,
                                'patient_code' => $value->employee_code->value,
                                'patient_type_id' => $patient_type_id,
                                'patient_name' => $value->employee_name->value,
                                'gender' => $value->sex->value,
                                'mobile_one' => $value->phno->value,
                                'mobile_two' => $value->mobilephno->value,
                                'challan_number' => $value->challan->value,
                                'currant_status' => $value->current_status->value,
                                "dob" => $dob,
                                'division_number' => $value->division->value,
                                'line_number' => $value->line->value,
                                'house_no' => $value->houseno->value,
                                
                                "hospital_id" => $hospital_id,
                                
                            ];


                            $this->db->insert('patients', $patientArray); 
            }

			//pre($patientArray);
			
            
     //   }//end of foreach
		
			if($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
				return false;
            } else {
				$this->db->trans_commit();
                return true;
            }
				
		}
		catch(Exception $exc){
			 echo $exc->getTraceAsString();
		}
		
	}


        	/**
     * @name insertIntoMedicine
     * @author Shankha ghosh
     * @desc insert medicine
     */

	public function insertIntoMedicine($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
            $MedData = $request->fdata;
            
            //pre($MedData);

            foreach ($MedData as $key => $meddata) {
             
                $date=$meddata->date->value;
                $supplier=$meddata->supplier->value;
                $medicine=trim($meddata->medicine->value);
                $batch_id=$meddata->batch->value;
                $expiry=$meddata->expiry->value;
                $quantity=$meddata->quantity->value;
                $po_no=$meddata->po_no->value;
                if($date!=""){
                    $date = str_replace('/', '-', $date);
                    $date = date("Y-m-d",strtotime($date));
                }
                else{
                    $date = NULL;
                }

                if($expiry!=""){
                    $expiry = str_replace('/', '-', $expiry);
                    $expiry = date("Y-m-d",strtotime($expiry));
                }
                else{
                    $expiry = NULL;
                }

                $grn_array = [
                    'hospital_id' =>$hospital_id,
                    'date' =>$date,
                    'supplier_details' =>$supplier,
                    'po_no' =>$po_no,
                 ];

                 $grnmasterID = $this->commondatamodel->insertSingleTableDataRerurnInsertId('grn_master',$grn_array);
                 $medicineWhere = array('medicine.medicine_name' =>$medicine );
                 $medicineData = $this->commondatamodel->getSingleRowByWhereCls('medicine',$medicineWhere);
                 $medicine_id=$medicineData->medicine_id;
                 $grn_details_array = [
                    'grn_master_id' =>$grnmasterID,
                    'medicine_id' =>$medicine_id,
                    'batch_id' =>$batch_id,
                    'expiray_date' =>$expiry,
                    'qty' =>$quantity,
                    
                 ];

                 $grnDetails= $this->commondatamodel->insertSingleTableDataRerurnInsertId('grn_details',$grn_details_array);

                 $medWhere = array(
                                 
                                    'medicine_stock.medicine_id' =>$medicine_id,
                                    'medicine_stock.batch_id' =>$batch_id,
                                    'medicine_stock.hospital_id' =>$hospital_id
                                 );
                 $checkMedStock= $this->commondatamodel->duplicateValueCheck('medicine_stock',$medWhere);
                 if($checkMedStock){

                    $MedStockData= $this->commondatamodel->getSingleRowByWhereCls('medicine_stock',$medWhere);
                    $medicine_stock_id=$MedStockData->medicine_stock_id;
                    $stock=$MedStockData->stock;
                    $new_stock=$stock+$quantity;

                    $med_stock_array = array('stock' =>$new_stock);
                    $where_med_stockID = array('medicine_stock.medicine_stock_id' =>$medicine_stock_id);

                    $this->commondatamodel->updateSingleTableData('medicine_stock',$med_stock_array,$where_med_stockID);


                 }else{
                    $med_stock_array = array(
                                            'hospital_id' =>$hospital_id,
                                            'medicine_id' =>$medicine_id,
                                            'batch_id' =>$batch_id,
                                            'expairy_date' =>$expiry,
                                            'stock' =>$quantity,
                                            );

                                            $this->db->insert('medicine_stock', $med_stock_array); 

                 }
              

            
        }//end of foreach
		
			if($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
				return false;
            } else {
				$this->db->trans_commit();
                return true;
            }
				
		}
		catch(Exception $exc){
			 echo $exc->getTraceAsString();
		}
		
	}


}//end of class