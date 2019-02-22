<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Pharamcy_model extends CI_Model{
	
	public function __construct() {
        parent::__construct();
		$this->load->model("Patient_model", "patient", TRUE);
		$this->load->model("Opd_model", "opd", TRUE);
		$this->load->model("Medicine_model", "medicine", TRUE);
	}
    
	/**
     * @name getPrescriptionListPharamcy
     * @author Mithilesh Routh
     * @return $data
     * @desc get medicine by diagnosis list
     */
	
	public function getPrescriptionListPharamcy($request,$hospital_id){
		$resultdata = "";
		
		/* Block temporary on  14.12.2018
		$searchDt = date("Y-m-d", strtotime($request->searchdt));
		$where = [
			"opd_prescription.hospital_id" => $hospital_id,
			"DATE_FORMAT(opd_prescription.date,'%Y-%m-%d')" => $searchDt
		];
		*/		
		
		$where = [
			"opd_prescription.hospital_id" => $hospital_id
		]; 
		
		$query = $this->db->select("
							patient_type.patient_type,
							patients.patient_name,
							patients.mobile_one , 
							patients.patient_code,
							patients.patient_id,
							/* opd_prescription.id AS prescription_ID, */
							opd_prescription.unique_id AS prescription_ID, 
							opd_prescription.opd_prescription_id AS prescription_No,
							DATE_FORMAT(opd_prescription.date,'%d/%m/%Y') AS prescDate,
							'O' AS prescFrom,
						/*	patient_health_profile.patient_health_profile_id, */
							patient_health_profile.unique_id AS health_profile_uid
							",FALSE)
                          ->from("opd_prescription") 
						  ->join("issue_medicine_master","issue_medicine_master.opd_ipd_prescription_id = opd_prescription.unique_id AND issue_medicine_master.opd_ipd_flag = 'O' ", "LEFT")
						  ->join("patients" , "patients.patient_id = opd_prescription.patient_id" , "INNER")
						  ->join("patient_health_profile" , "patient_health_profile.prescription_addmission_id = opd_prescription.unique_id AND patient_health_profile.opd_ipd_flag = 'O'" , "INNER")
						  ->join("opd_ipd_medicine" , "opd_ipd_medicine.health_profile_id = patient_health_profile.unique_id AND opd_ipd_medicine.opd_ipd_flag = 'O'" , "LEFT")
						  ->join("patient_type" , "patient_type.patient_type_id = patients.patient_type_id" , "INNER")
						  ->where($where)
						  ->where('issue_medicine_master.issue_id IS NULL')
						  ->where('opd_ipd_medicine.id IS NOT NULL')
						  ->group_by("`patient_health_profile`.`unique_id`")
						  ->order_by('opd_prescription.date','DESC')
						  ->get();
						  
		 // echo $this->db->last_query();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}
	
	
	public function getIPDPrescriptionListPharamcy($request,$hospital_id){
		$resultdata = "";
		
		//$searchDt = date("Y-m-d", strtotime($request->searchdt));
		
		$where = [
			"ipd_patient_master.hospital_id" => $hospital_id
			
		]; 
		
		/*
		$query = $this->db->select("
							patient_type.patient_type,
							patients.patient_name,
							patients.mobile_one , 
							patients.patient_code,
							ipd_patient_master.admission_id AS prescription_ID,
							'I' AS prescFrom
						")
                          ->from("ipd_patient_master") 
						  ->join("issue_medicine_master","issue_medicine_master.opd_ipd_prescription_id = ipd_patient_master.admission_id AND issue_medicine_master.opd_ipd_flag = 'I' ", "LEFT")
						  ->join("patients" , "patients.patient_id = ipd_patient_master.patient_id" , "INNER")
						  ->join("patient_type" , "patient_type.patient_type_id = patients.patient_type_id" , "INNER")
						  ->where($where)
						  ->where('issue_medicine_master.issue_id IS NULL')
						  ->get();
		*/
		$query = $this->db->select("
		/*	`patient_type`.`patient_type`,
			`patients`.`patient_name`,
			`patients`.`patient_code`, 
			*/
			`patients`.`patient_id`,
			`patients`.`mobile_one`,
			

			patients.patient_code as associate_permworker_code,
			patients.patient_name as associate_permworker_name,
			ipd_patient_master.patient_gender,
			ipd_patient_master.patient_name,
			ipd_patient_master.patient_type,
			/* `ipd_patient_master`.`admission_id` AS `prescription_ID`, */
			ipd_patient_master.unique_id AS `prescription_ID`,
			'I' AS prescFrom,
			 DATE_FORMAT(patient_health_profile.date,'%d/%m/%Y') AS prescDate,
			/* patient_health_profile.`patient_health_profile_id` */
			 patient_health_profile.unique_id AS health_profile_uid
		",FALSE)
	  ->from("patient_health_profile") 
	  ->join("ipd_patient_master","ipd_patient_master.unique_id = patient_health_profile.`prescription_addmission_id` AND patient_health_profile.`opd_ipd_flag` = 'I'", "INNER")
	/*  ->join("patients" , "patients.patient_id = ipd_patient_master.patient_id" , "INNER") */
	  ->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")
	  ->join("patient_type" , "patient_type.patient_type_id = patients.patient_type_id" , "INNER")
	  ->join("issue_medicine_master" , "`issue_medicine_master`.`opd_ipd_prescription_id` = `ipd_patient_master`.`unique_id` AND issue_medicine_master.`health_profile_id` = patient_health_profile.`unique_id`" , "LEFT")
	  ->join("opd_ipd_medicine" , "opd_ipd_medicine.health_profile_id = patient_health_profile.unique_id AND opd_ipd_medicine.opd_ipd_flag = 'I'" , "LEFT")
	  ->where($where)
	  ->where("patient_health_profile.`patient_health_profile_id` IN (
				SELECT MAX(patient_health_profile.`patient_health_profile_id`)
				FROM patient_health_profile
				GROUP BY patient_health_profile.`prescription_addmission_id`
			)")
	  ->where('issue_medicine_master.issue_id IS NULL')
	  ->where('opd_ipd_medicine.id IS NOT NULL')
	  ->group_by("`patient_health_profile`.`patient_health_profile_id`")
	  ->order_by('patient_health_profile.date','DESC')
	  ->get();

						  
		// echo $this->db->last_query();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}
	
	public function getMedicineByPrescription($prescription_id , $from, $hospital_id) {
		//$resultdata = "";
		// echo "OPD/IPD :: ".$from;
		$resultdata = [];
		$where = [
			"opd_ipd_medicine.hospital_id" => $hospital_id , 
			"opd_ipd_medicine.prescription_admission_id" => $prescription_id , 
			"opd_ipd_medicine.opd_ipd_flag" => $from
		];

		if($from == "O") {
				$query = $this->db->select("opd_ipd_medicine.*,
				medicine.medicine_name,
				medicine_dosage.value,
				frequency_master.frequency AS frequency_name,
				CASE
					WHEN frequency_master.`is_consider_for_issued` IS TRUE
						THEN (frequency_master.`times`*`medicine_dosage`.`value`*opd_ipd_medicine.`number_of_days_sick_leave`)
					ELSE 0 END AS expectedissue 
				")
				->from("opd_ipd_medicine") 
				->join("medicine","medicine.medicine_id = opd_ipd_medicine.medicine_id","INNER")
				->join("medicine_dosage","medicine_dosage.dosage_id = opd_ipd_medicine.dose_id","LEFT")
				->join("frequency_master","frequency_master.frequency_master_id = opd_ipd_medicine.frequeny","LEFT")
				->where($where)
				->get();
		}
		else {
			// IPD Medicines
			$query = $this->db->select("opd_ipd_medicine.*,
				medicine.medicine_name,
				medicine_dosage.value,
				frequency_master.frequency AS frequency_name,
				CASE
					WHEN frequency_master.`is_consider_for_issued` IS TRUE
						THEN (frequency_master.`times`*`medicine_dosage`.`value`*opd_ipd_medicine.`number_of_days_sick_leave`)
					ELSE 0 END AS expectedissue 
				")
				->from("opd_ipd_medicine") 
				->join("medicine","medicine.medicine_id = opd_ipd_medicine.medicine_id","INNER")
				->join("medicine_dosage","medicine_dosage.dosage_id = opd_ipd_medicine.dose_id","LEFT")
				->join("frequency_master","frequency_master.frequency_master_id = opd_ipd_medicine.frequeny","LEFT")
				->join("issue_medicine_master","issue_medicine_master.health_profile_id = opd_ipd_medicine.health_profile_id","LEFT")
				->where($where)
				->where("opd_ipd_medicine.health_profile_id = 
						(SELECT 
						patient_health_profile.unique_id
						FROM
						patient_health_profile 
						WHERE patient_health_profile.opd_ipd_flag = 'I' 
						AND patient_health_profile.prescription_addmission_id ='".$prescription_id."'
						ORDER BY patient_health_profile.patient_health_profile_id DESC LIMIT 1)"
						)
				->where("issue_medicine_master.issue_id IS NULL")
				->get();

			//	q();

		}

		//echo $this->db->last_query();

        if($query->num_rows()>0) {
			//$resultdata  = $query->result();
			$batchinfos = "";
			foreach ($query->result() as $rows) {
				$expected_issued_qty = "";
				if($rows->expectedissue <=0 || empty($rows->expectedissue)) {
					$expected_issued_qty = "";
					$batchinfos = "";
				}
				else{
					$result['batchinfo'] = [];
					$batchinfos = "";
					$expected_issued_qty = $rows->expectedissue;
					$result = $this->medicine->getMedicineBatchInfoAccordingtoStock($rows->medicine_id,$expected_issued_qty,$rows->hospital_id);

					if(!empty($result['batchinfo']) && isset($result['batchinfo']) && count($result['batchinfo']) > 0 ){
						$batchinfos = $this->convertArrayToString($result['batchinfo']);
					}

					
				}


				$resultdata[] = [
					"hospital_id" => $rows->hospital_id,
					"prescription_admission_id" => $rows->prescription_admission_id,
					"opd_ipd_flag" => $rows->opd_ipd_flag,
					"medicine_id" => $rows->medicine_id,
					"dose_id" => $rows->dose_id,
					"frequeny" => $rows->frequeny,
					"number_of_days_sick_leave" => $rows->number_of_days_sick_leave,
					"medicine_name" => $rows->medicine_name,
					"value" => $rows->value,
					"frequency_name" => $rows->frequency_name,
					"expectedissueqty" => $expected_issued_qty,
					"totalstock" => $this->calculateStockBymedicine($rows->medicine_id,$rows->hospital_id),
					"batchnos" => $batchinfos
				];
			}
			
		}
		//pre($resultdata);
         return $resultdata;
	}
	
	public function insertIntoMedicineIssue($request , $hospital_id) {
		
			try{
				$this->db->trans_begin();
				$insert_data = [];
			
				$todaydt = date("Y-m-d H:i:s");
				$master_data = [];
				$patients = $request->patientinfo;
				$doneFrom = $request->from;


				

				$healthProfileID = $request->hprofile;
				//$rowPatient = $this->patient->getPatientByCode($patients->patientID);
				$patientid = $patients->patientID;
				


				$pres_id = 0;
				/* commented on 02.02.2019
				* because presc uniq id introduce instead of id
				*/
				/*
				if($doneFrom=="O") {
					$rowPrescription = $this->opd->getPrescriptionDataByPrescCode($patients->prescriptionNo);	
					$pres_id = $rowPrescription->id;
				}
				if($doneFrom=="I") {
					$pres_id = $patients->prescriptionNo;
				}
				*/

				$pres_id = $request->prescuid;
				
				$master_data = [
					"hospital_id" => $hospital_id, 
					"patient_id" => $patientid, 
					"date_of_issue" => $todaydt, 
					"opd_ipd_prescription_id" => $pres_id, 
					"opd_ipd_flag" => $doneFrom,
					"health_profile_id" => $healthProfileID,
					"servertag" => getServerTag(),
				];

				
				$this->db->insert('issue_medicine_master', $master_data); 
				$medicine_iisue_master_id = $this->db->insert_id();
				
				$medicine_iisue_uniq_id = generateUniqRowID($medicine_iisue_master_id,getServerTag(),$hospital_id);

				// Update Table 
				$whereMedIssue = [
					"issue_id" => $medicine_iisue_master_id,
					"servertag" => getServerTag(),
					"hospital_id" => $hospital_id
				];
				$upda_MedIssue = [
					"unique_id" => $medicine_iisue_uniq_id
				];
				$this->commondatamodel->updateSingleTableData('issue_medicine_master',$upda_MedIssue,$whereMedIssue);

				$this->insertIntoMedicineIssueDtl($request->medicineinfo,$medicine_iisue_uniq_id,$hospital_id);
			
			
				if($this->db->trans_status() === FALSE) {
					$this->db->trans_rollback();
					return false;
				}
				else {
					$this->db->trans_commit();
					return true;
				}
				
		}
		catch(Exception $exc){
			 echo $exc->getTraceAsString();
		}
			
		
	}

    public function insertIntoMedicineIssueDtl($issueMedicineArr,$master_id,$hospital_id) {

		$medicineRowsValue = $issueMedicineArr->medicineRows;
	
	
        if(isset($medicineRowsValue)) {
             $count = count($medicineRowsValue);
             $detailArr = [];
				
			
				for($i=0; $i<$count; $i++) {

						/*  Commented because medicine_issue_detail inserted according to stock
							$detailArr = [
							"issue_master_id" => $master_id ,
							"hospital_id" => $hospital_id,
							"medicine_id" => $medicineRowsValue[$i]->medicineHdnID ,
							"batch_id" => 1 ,
							"qty" => $medicineRowsValue[$i]->issue
							];
							$this->db->insert('issue_medicine_detail', $detailArr); 

						*/
					
					$this->getMedicineBatchInfoAccordingtoStock($medicineRowsValue[$i]->medicineHdnID,$medicineRowsValue[$i]->issue,$hospital_id,$master_id);
					
				}
			
				
				//print_r($medicineRowsValue);
				
				
				

        }


    }
	
	
	
	
	public function getMedicineBatchInfoAccordingtoStock($medid,$required_qty,$hospital_id,$master_id) {
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
						 
		// echo $this->db->last_query();
		
        if($query->num_rows()>0) {
           // $resultdata=$query->result();
		   $batchInfoArry = $this->calculateQtyForbatchInfo($query->result() , $required_qty , $master_id , $hospital_id );
		
		   
        }
       // return $resultdata;
	}
	
	private function calculateQtyForbatchInfo($dataArry , $required_qty , $master_id , $hospital_id){
		
		try {
			
			$this->db->trans_begin();
			
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
							
								
								// insert into medicine details --------------
								$detailArr = [
									"issue_master_id" => $master_id ,
									"hospital_id" => $hospital_id ,
									"medicine_id" => $dataArry[$i]->medicine_id ,
									"batch_id" => $dataArry[$i]->batch_id ,
									"qty" => $qty,
									"servertag" => getServerTag()
								];
								
								$this->db->insert('issue_medicine_detail', $detailArr);
								$last_insert_id = $this->db->insert_id(); 


								// Update Table 
								$whereMedIssue = [
									"id" => $last_insert_id,
									"servertag" => getServerTag(),
									"hospital_id" => $hospital_id
								];
								$upda_MedIssue = [
									"unique_id" => generateUniqRowID($last_insert_id,getServerTag(),$hospital_id)
								];
								$this->commondatamodel->updateSingleTableData('issue_medicine_detail',$upda_MedIssue,$whereMedIssue);

								// update medicine stock
								$update_stock = [
									"medicine_stock.stock" =>  $dataArry[$i]->stock - $qty
								];
								
								$updt_where = [
									"medicine_stock.hospital_id" => $hospital_id , 
									"medicine_stock.medicine_id" => $dataArry[$i]->medicine_id , 
									"medicine_stock.batch_id" => $dataArry[$i]->batch_id  
								];
								
								  $this->db->where($updt_where);
								  $this->db->update('medicine_stock', $update_stock);
								
								array_push($batch_info_array,$batch_info_dtl);
								if($stock_qty >= $required_qty) { break; }
					}
				}
			
				if($this->db->trans_status() === FALSE) {
					$this->db->trans_rollback();
					return false;
				}
				else {
					$this->db->trans_commit();
					return true;
				}
			//return $batch_info_array;
			
		}
		catch(Exception $exc) {
			echo $exc->getTraceAsString();
		}
		
	}
	
	

	
	private function calculateStockBymedicine($medicine_id,$hospital_id) {
		$stock = 0;
		$where = [
			"medicine_stock.hospital_id" => $hospital_id , 
			"medicine_stock.medicine_id" => $medicine_id 
		];
	
		$query = $this->db->select("SUM(medicine_stock.stock) AS totalStock")
                         ->from("medicine_stock") 
						 ->where($where)
						 ->get();
		
		
        if($query->num_rows()>0) {
           $row = $query->row();
		   $stock = $row->totalStock;
		}
		return $stock;
	}



	public function getIssuedMedByDtAndMed($request, $hospital_id) {
		$resultdata = [];
		
		$formData = $request->data;
		$opd_Ipd = $formData->opdIpdCtrl;
		$from_date = $formData->searchFromDateCtrl;
		$to_date = $formData->searchToDateCtrl;
		$medicineData = $formData->medicineCtrl;

			if(empty($medicineData)) {
				/**
				 * Filterd Medicine With date range to avoid no of loops for detail data
				 */

				$query = $this->db->select("medicine.*")
                         ->from("medicine") 
						 ->join("issue_medicine_detail","issue_medicine_detail.medicine_id=medicine.medicine_id","INNER")
						 ->join("issue_medicine_master","issue_medicine_detail.issue_master_id = issue_medicine_master.issue_id","INNER")
						 ->where('DATE_FORMAT(issue_medicine_master.date_of_issue,"%Y-%m-%d") BETWEEN "'. date('Y-m-d', strtotime($from_date)). '" AND "'. date('Y-m-d', strtotime($to_date)).'"')
						 ->group_by('medicine.medicine_id')
						 ->order_by("medicine.medicine_name")
						 ->get();
			}
			else {

				$medicineIds = [];
				for($i=0; $i<count($medicineData); $i++) {
					array_push($medicineIds,$medicineData[$i]->id);
				}
				$query = $this->db->select("medicine.*")
                         ->from("medicine") 
						 ->where_in('medicine.medicine_id', $medicineIds)
						 ->order_by("medicine.medicine_name")
						 ->get();
			}
			
			

		if($query->num_rows()>0) {
			foreach ($query->result() as $rows) {
				$resultdata[] = [
					"medicine_data" => $rows,
					"med_issued_dtl" => $this->getIssuedMedicineDetail($from_date,$to_date,$rows->medicine_id,$opd_Ipd)
				];
			}
			
		}
        return $resultdata;
	}

	public function getIssuedMedicineDetail($from_date,$to_date,$medicine_id,$opd_Ipd) {
		$detail_data = [];
		$where_opd_ipd = [];
		if($opd_Ipd == "I" || $opd_Ipd == "O" ) {
			$where_opd_ipd = [
				"issue_medicine_master.opd_ipd_flag" => $opd_Ipd
			];
		}

		$query = $this->db->select("CASE
									WHEN opd_prescription.id > 0 THEN opd_prescription.`opd_prescription_id`
									WHEN  ipd_patient_master.`admission_id` > 0 THEN ipd_patient_master.`admission_id`
									END AS prescno ,

									CASE 
									WHEN issue_medicine_master.patient_id > 0 THEN patients.patient_name
									WHEN issue_medicine_master.patient_id IS NULL THEN ipd_patient_master.patient_name
									END AS patientname,
									DATE_FORMAT(issue_medicine_master.`date_of_issue`,'%d/%m/%Y') AS issueDate,
									
									issue_medicine_detail.`qty`
								/*	patients.`patient_name` AS patientname*/
									
									
									" ,FALSE)
						  ->from("issue_medicine_detail") 
						  ->join("issue_medicine_master","issue_medicine_detail.issue_master_id = issue_medicine_master.issue_id","INNER")
							->join("patients","patients.patient_id = issue_medicine_master.patient_id","INNER")
							
						  ->join("opd_prescription","opd_prescription.id = issue_medicine_master.opd_ipd_prescription_id AND issue_medicine_master.opd_ipd_flag = 'O'","LEFT")
						  ->join("ipd_patient_master","ipd_patient_master.admission_id = issue_medicine_master.opd_ipd_prescription_id AND issue_medicine_master.opd_ipd_flag = 'I'","LEFT")
						  ->where('DATE_FORMAT(issue_medicine_master.date_of_issue,"%Y-%m-%d") BETWEEN "'. date('Y-m-d', strtotime($from_date)). '" AND "'. date('Y-m-d', strtotime($to_date)).'"')
						  ->where($where_opd_ipd)
						  ->where("issue_medicine_detail.medicine_id" , $medicine_id)
						  ->get();
		/*
		echo $this->db->last_query();
		echo "\n";
		echo "\n";
		echo "\n";
		*/
	
		
		if($query->num_rows()>0) 
		{
			$resultdata = $query->result();
			$detail_data = $resultdata ;
		}

		return $detail_data;

	}


	private function convertArrayToString($batchArray) {
	
		$string = "";
		$batchnos = "";
		if(isset($batchArray)){
			$string = "";
			for($i=0; $i<count($batchArray); $i++ ) {
				$string.= $batchArray[$i]['batchno']." - ".abs($batchArray[$i]['qty'])." - ".$batchArray[$i]['exp']."\n";
			}
		}
		//$batchnos = rtrim($string,',');
		
		return $string;
	}

    
}
