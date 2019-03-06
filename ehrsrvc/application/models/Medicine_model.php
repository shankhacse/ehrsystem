<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Medicine_model extends CI_Model{
    
	/**
     * @name getMedicineBySymptoms
     * @author Mithilesh Routh
     * @return $data
     * @desc get medicine by diagnosis list
     */
	
	public function getMedicineBySymptoms($request){
		$resultdata = "";
		
		$values = $request->medicine;
		$diseaseIDs = [];
		for($i = 0; $i < count($values) ; $i++){
			array_push($diseaseIDs , $values[$i]->id);
		}
		
	
		/* Temporary Commented Block 
		$query = $this->db->select("medicine.medicine_id,medicine.medicine_name,medicine.medicine_type")
                         ->from("diagonesis_medicine_map") 
						  ->join("medicine","medicine.medicine_id = diagonesis_medicine_map.medicine_id","INNER")
						 ->order_by('medicine.medicine_name')
						 ->where_in('diagonesis_medicine_map.diagonosis_id', $diseaseIDs)
						 ->get(); */
						 
		$query = $this->db->select("medicine.medicine_id,medicine.medicine_name,medicine.medicine_type")
                         ->from("medicine") 
						 ->order_by('medicine.medicine_name')
						 ->get();				 
		//echo $this->db->last_query();
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}
	
	
	/**
     * @name getMedicineBySymptoms
     * @author Mithilesh Routh
     * @return $data
     * @desc get medicine by diagnosis list
     */
	
	public function getMedicineByName($medname){
		$resultdata = "";
		$query = $this->db->select("medicine.medicine_id,medicine.medicine_name,medicine.medicine_type")
                         ->from("medicine") 
						 ->like('medicine.medicine_name', $medname,'after') 
						 ->limit(20)
						 ->order_by('medicine.medicine_name')
						 ->get();				 
		if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}


	/**
     * @name getAllMedicines
     * @author Mithilesh Routh
     * @return $data
     * @desc get all medicine by name
     */
	
	public function getAllMedicines(){
		$resultdata = "";
		$query = $this->db->select("medicine.medicine_id,medicine.medicine_name,medicine.medicine_type,medicine.brand_name,medicine.generic")
                         ->from("medicine") 
						 ->order_by('medicine.medicine_name')
						 ->get();				 
		if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}
	
	
	/**
     * @name getDosageByMedicine
     * @author Mithilesh Routh
     * @return $data
     * @desc get dosage by medicine
     */
	
	public function getDosageByMedicine($request){
		$resultdata = "";
		
		$values = $request->medicine;
		$type = $values->type;
		
		$where = [
			"medicine_dosage.medicine_type_id" => $type
		];
	
		
		$query = $this->db->select("*")
                         ->from("medicine_dosage") 
						 ->where($where)
						 ->order_by('medicine_dosage.srl')
						 ->get();
		//echo $this->db->last_query();
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}
	
	/**
     * @name getFrequencyByMedicine
     * @author Mithilesh Routh
     * @return $data
     * @desc get frequency by medicine
     */
	
	public function getFrequencyByMedicine($request){
		$resultdata = "";
		
		$values = $request->medicine;
		$type = $values->type;
		
		$where = [
			"frequency_master.medicine_type" => $type
		];
	
		$query = $this->db->select("*")
                         ->from("frequency_master") 
						 ->where($where)
						 ->get();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}
	
	
	public function getLastPrescMedicines($adms_pres_id,$flag,$hospital_id,$healthprofile_id=NULL) {
		$resultdata = "";
		$where = [
			"opd_ipd_medicine.hospital_id" => $hospital_id , 
			"opd_ipd_medicine.prescription_admission_id" => $adms_pres_id , 
			"opd_ipd_medicine.opd_ipd_flag" => $flag,
			"opd_ipd_medicine.health_profile_id" => $healthprofile_id
		];
	
		$query = $this->db->select("opd_ipd_medicine.*,
									medicine.medicine_name,
									medicine_dosage.value,
									frequency_master.frequency AS frequency_name
									")
                         ->from("opd_ipd_medicine") 
						 ->join("medicine","medicine.medicine_id = opd_ipd_medicine.medicine_id","INNER")
						 ->join("medicine_dosage","medicine_dosage.dosage_id = opd_ipd_medicine.dose_id","LEFT")
						 ->join("frequency_master","frequency_master.frequency_master_id = opd_ipd_medicine.frequeny","LEFT")
						 ->where($where)
						 ->get();
		//echo $this->db->last_query();
        if($query->num_rows()>0) {
            $resultdata=$query->result();
        }
        return $resultdata;
	}
	
	public function getMedicineBatchInfoAccordingtoStock($medid,$required_qty,$hospital_id) {
		$resultdata = "";
		$where = [
			"medicine_stock.hospital_id" => $hospital_id , 
			"medicine_stock.medicine_id" => $medid 
		];
	
		$query = $this->db->select("*")
                         ->from("medicine_stock") 
						 ->where($where)
						 ->where("medicine_stock.stock > 0")
						 ->order_by("medicine_stock.expairy_date")
						 ->get();
						 
		 // $this->db->last_query();
		
        if($query->num_rows()>0) {
           // $resultdata=$query->result();
		   $batchInfoArry = $this->calculateQtyForbatchInfo($query->result() , $required_qty);
		
		   $resultdata = [
				"batchinfo" => $batchInfoArry
				
		   ];
        }
        return $resultdata;
	}
	
	private function calculateQtyForbatchInfo($dataArry , $required_qty ){
				/*
				echo "<pre>";
				print_r($dataArry);
				echo "</pre>";
				*/
		
		$stock_qty = 0;
		$need_to_adjust_qty = $required_qty;
		
		$batch_info_array = [];
		$full_batch_info_datas = [];
		
		if(isset($dataArry)) {
			$count = sizeof($dataArry);
			$batch_info_dtl = [];
			for($i=0;$i<$count;$i++) {
				$stock_qty+= $dataArry[$i]->stock; 
				$qty = 0;
				if($need_to_adjust_qty > $dataArry[$i]->stock) {
					$qty =  $dataArry[$i]->stock;
				}
				else{
					$qty =  ($need_to_adjust_qty)  ;
				}
				
				$need_to_adjust_qty = $need_to_adjust_qty - $dataArry[$i]->stock ;
					$batch_info_dtl = [
						"medicineid" => $dataArry[$i]->medicine_id, 
						"batchno" => $dataArry[$i]->batch_id,
						"qty" => $qty,
						"exp" => date('m/y',strtotime($dataArry[$i]->expairy_date))
					];
				array_push($batch_info_array,$batch_info_dtl);
				if($stock_qty >= $required_qty) { break; }
			}
		}
			
		return $batch_info_array;
		
	}

	/**
     * @name insertMedicine
     * @author Shankha ghosh
     * @desc insert medicine
	 * @date 29.01.2019
     */

	public function insertIntoMedicine($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
			$MedForm = $request->fdata;


			$brand_name = NULL;
			if(isset($MedForm->brandnameCtrl) && !empty($MedForm->brandnameCtrl)) {
				$brand_name = $MedForm->brandnameCtrl;	
			}

			$generic = NULL;
			if(isset($MedForm->genericCtrl) && !empty($MedForm->genericCtrl)) {
				$generic = $MedForm->genericCtrl;	
			}

			$medicineArry = [
				"medicine_name" => $MedForm->medicineCtrl, 
				"medicine_type" => $MedForm->medTypeCtrl, 
				"brand_name" => $brand_name, 
				"generic" => $generic, 
			];
		
			$this->db->insert('medicine', $medicineArry); 
			
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
     * @name updateMed
     * @author Shankha ghosh
     * @desc update Medicine
     */

	public function updateMed($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");

			//$medForm = $request->fdata;
			$brand_name = NULL;
			if(isset($request->fdata->brandnameCtrl) && !empty($request->fdata->brandnameCtrl)) {
				$brand_name = $request->fdata->brandnameCtrl;	
			}

			$generic = NULL;
			if(isset($request->fdata->genericCtrl) && !empty($request->fdata->genericCtrl)) {
				$generic = $request->fdata->genericCtrl;	
			}




			$medicineArry = [
				"medicine_name" => $request->fdata->medicineCtrl, 
				"medicine_type" => $request->fdata->medTypeCtrl, 
				"brand_name" => $brand_name, 
				"generic" => $generic, 
			];
			
			$this->db->where("medicine_id", $request->fdata->medIdCtrl);
            $this->db->update("medicine",$medicineArry);

		
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
	

    
}
