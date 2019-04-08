<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Ipd_model extends CI_Model{
    
	public function __construct() {
        parent::__construct();
		$this->load->model("Patient_model", "patient", TRUE);
	}
	

	public function insertIntoIPD($request,$hospital_id,$doctor_id) {
		
		try{
			
			$this->db->trans_begin();
			$ipd_master_data = [];
			$healthProfileArry = [];
			$todaydt = date("Y-m-d H:i:s");
			
			$formMasterData = $request->fdata;
			//$selectedPatient = $formMasterData->choosePatientCtrl;

			
			
			$roomNo = $formMasterData->roomNoCtrl;
			$bedNo = $formMasterData->bedNoCtrl;
			$gender=$formMasterData->genderCtrl;
			$age=$formMasterData->ageCtrl;
			$patient_name=$formMasterData->patinetNameCtrl;
			$blood_grp=$formMasterData->bldgrpCtrl;
			$permworker_id=$formMasterData->patientAdvSearchCtrl;
			$patientType=$formMasterData->patientTypeCtrl;
			$general_exm = (trim(htmlspecialchars($formMasterData->generalExaminationCtrl)));
			$systemic_exm = (trim(htmlspecialchars($formMasterData->systemicExaminationCtrl)));
			$provision_exm = (trim(htmlspecialchars($formMasterData->provisionalExaminationCtrl)));
			$final_dignosis = (trim(htmlspecialchars($formMasterData->finalDiagnosisCtrl)));

			 // added on 20.02.2019
			if($patientType=='SELF'){
				$patient_id=$permworker_id;

			}else{
				$patient_id=NULL;
			}

			if($blood_grp==''){
				$blood_grp=NULL;
			}
			

			/**
            *  update patients table for blood group
            *  Blood Group Info
			*/
		// commenter on 20.02.2019 by shankha
			/*
			if(isset($formMasterData->bldgrpCtrl)) {

					$bloodGrp = $formMasterData->bldgrpCtrl;
					$updData = ["patients.blood_group" => $bloodGrp];
                    $this->db->where('patients.patient_id', $selectedPatient->patient_id);
					$this->db->update('patients', $updData);
			} */
			
			$ipd_master_data = [
				"hospital_id" => $hospital_id,
				"admission_date" => date('Y-m-d H:i:s',strtotime($formMasterData->admissionDtCtrl)),
				"patient_id" => $patient_id,
				"doctor_id" => $doctor_id,
				"room_no" => $roomNo,
				"bed_no" => $bedNo,
				"discharge_date" => NULL,
				"opd_prescription_id" => NULL,
				"illness_history" => NULL,
				"comment" => NULL,
				"discharge_flag" => 'N',
				"general_examination" => $general_exm,
				"systemic_examination" => $systemic_exm,
				"provision_diagnosis" => $provision_exm,
				"final_digonosis" => $final_dignosis,
				"patient_name" => $patient_name,
				"patient_age" => $age,
				"patient_gender" => $gender,
				"patient_blood_grp" => $blood_grp,
				"associate_permworker_id" => $permworker_id,
				"patient_type" => $patientType,
				"servertag" => getServerTag()
			];
			
			/*
			echo "From HHTP";
			echo "<br>";
			pre($request);
			



			echo "From HHTP";
			echo "<br>";
			pre($ipd_master_data);
			
			exit;
			*/
			
			$this->db->insert('ipd_patient_master', $ipd_master_data); 
			$ipd_inserted_id = $this->db->insert_id();
			$ipd_uniq_id = generateUniqRowID($ipd_inserted_id,getServerTag(),$hospital_id);
			//$ipd_inserted_id = 0;


			// Update Table 
			$whereIpdPresc = ["admission_id" => $ipd_uniq_id, "servertag" => getServerTag(), "hospital_id" => $hospital_id];
			$upda_IpdPresc = ["unique_id" => $ipd_uniq_id];
			$this->commondatamodel->updateSingleTableData('ipd_patient_master',$upda_IpdPresc,$whereIpdPresc);
			
			
			$temp = trim($formMasterData->tempCtrl);
			$anemia = trim($formMasterData->haemoglobinCtrl);
			$bp = trim($formMasterData->bpSystolicCtrl); //systolic bp
			$bp_diastolic = trim($formMasterData->bpDiastolicCtrl); //diastolic bp

			$jaundice = trim($formMasterData->jaundiceCtrl);
			$odema = trim($formMasterData->odemaCtrl);
			$height = trim($formMasterData->heightCtrl);
			$weight = trim($formMasterData->weightCtrl);
			$blood_sugar_f = trim($formMasterData->bldsugarFCtrl);
			$blood_sugar_pp = trim($formMasterData->bldsugarPPCtrl);
			$blood_sugar_random = trim($formMasterData->bldsugarRCtrl);
			
			
			
			$healthProfileArry = [
				"patient_id" =>$patient_id, 
				"date" => date('Y-m-d',strtotime($formMasterData->admissionDtCtrl)),
				"prescription_addmission_id" => $ipd_uniq_id,
				"opd_ipd_flag" => "I",
				"pulse" => NULL,
				"temp" => $temp,
				"anemia" => $anemia, // haemoglobin 
				"bp" => $bp,
				"bp_diastolic" => $bp_diastolic,
				"jaundice" => $jaundice,
				"odema" => $odema,
				"height" => $height,
				"weight" => $weight,
				"blood_sugar_f" => $blood_sugar_f,
				"blood_sugar_pp" => $blood_sugar_pp,
				"blood_sugar_random" => $blood_sugar_random,
				"comment" => NULL,
				"hospital_id" => $hospital_id,
				"servertag" => getServerTag()
			];
			
			$this->db->insert('patient_health_profile', $healthProfileArry); 
			$healthprofile_inserted_id = $this->db->insert_id();
			$health_profile_uniq_id = generateUniqRowID($healthprofile_inserted_id,getServerTag(),$hospital_id);

			// Update Table 
			$whereHealth= [
				"patient_health_profile_id" => $healthprofile_inserted_id,
				"servertag" => getServerTag(),
				"hospital_id" => $hospital_id
			];
			$upda_Health = [
				"unique_id" => $health_profile_uniq_id
			];
			$this->commondatamodel->updateSingleTableData('patient_health_profile',$upda_Health,$whereHealth);

			
			$medInsert = $this->insertIntoMedicines($hospital_id,$ipd_uniq_id,$health_profile_uniq_id,$request->medicines);
			$testReportinsert = $this->insertIntoTestReports($hospital_id,$ipd_uniq_id,$health_profile_uniq_id,$request->reports);
			
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
	
	
	public function saveIPDRegularVisit($request,$hospital_id,$doctor_id) {
		
		try{
			
			$this->db->trans_begin();
			$ipd_master_data = [];
			$healthProfileArry = [];
			$todaydt = date("Y-m-d H:i:s");
			$formMasterData = $request->fdata;
			
			$temp = trim($formMasterData->tempCtrl);
			$anemia = trim($formMasterData->haemoglobinCtrl);
			$bp = trim($formMasterData->bpCtrl);//systolic bp
			$bp_diastolic = trim($formMasterData->bpDiastolicCtrl); //diastolic bp
			$jaundice = trim($formMasterData->jaundiceCtrl);
			$odema = trim($formMasterData->odemaCtrl);
			$height = trim($formMasterData->heightCtrl);
			$weight = trim($formMasterData->weightCtrl);
			$blood_sugar_f = trim($formMasterData->bldsugarFCtrl);
			$blood_sugar_pp = trim($formMasterData->bldsugarPPCtrl);
			$doctor_comment =  (trim(htmlspecialchars($formMasterData->doctorCommentCtrl)));
			$blood_sugar_random = trim($formMasterData->bldsugarRCtrl);
			
			$ipd_row_id =  trim($formMasterData->ipdRowIDCtrl); 
			$patient_id = trim($formMasterData->patientID); 

			// added on 21.02.2019
			
			

			if(isset($formMasterData->bldgrpCtrl)) {
				$bloodGrp = $formMasterData->bldgrpCtrl;
				$updData = ["ipd_patient_master.patient_blood_grp" => $bloodGrp];
				$this->db->where('ipd_patient_master.unique_id', $ipd_row_id);
				$this->db->update('ipd_patient_master', $updData);
			} 


		
			/**
            *  update patients table for blood group
            *  Blood Group Info
			*/
			// commented on 21.02.2019
		/*
			if(isset($formMasterData->bldgrpCtrl)) {
				$bloodGrp = $formMasterData->bldgrpCtrl;
				$updData = ["patients.blood_group" => $bloodGrp];
				$this->db->where('patients.patient_id', $patient_id);
				$this->db->update('patients', $updData);
			} */

			
			$healthProfileArry = [
				"patient_id" => $patient_id,
				"date" => date('Y-m-d',strtotime($formMasterData->visitDtCtrl)),
				"prescription_addmission_id" => $ipd_row_id,
				"opd_ipd_flag" => "I",
				"pulse" => NULL,
				"temp" => $temp,
				"anemia" => $anemia, // haemoglobin 
				"bp" => $bp,
				"bp_diastolic" => $bp_diastolic,
				"jaundice" => $jaundice,
				"odema" => $odema,
				"height" => $height,
				"weight" => $weight,
				"blood_sugar_f" => $blood_sugar_f,
				"blood_sugar_pp" => $blood_sugar_pp,
				"blood_sugar_random" => $blood_sugar_random,
				"comment" => $doctor_comment,
				"servertag" => getServerTag(),
				"hospital_id" => $hospital_id
			];
			
			$this->db->insert('patient_health_profile', $healthProfileArry); 
			$healthprofile_inserted_id = $this->db->insert_id();
			$health_profile_uniq_id = generateUniqRowID($healthprofile_inserted_id,getServerTag(),$hospital_id);

			// Update Table 
			$whereHealth= [
				"patient_health_profile_id" => $healthprofile_inserted_id,
				"servertag" => getServerTag(),
				"hospital_id" => $hospital_id
			];
			$upda_Health = [
				"unique_id" => $health_profile_uniq_id
			];
			$this->commondatamodel->updateSingleTableData('patient_health_profile',$upda_Health,$whereHealth);

			$medInsert = $this->insertIntoMedicines($hospital_id,$ipd_row_id,$health_profile_uniq_id,$request->medicines);
			$testReportinsert = $this->insertIntoTestReports($hospital_id,$ipd_row_id,$health_profile_uniq_id,$request->reports);
			
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
	
	
	
	public function saveIPDDischarge($request,$hospital_id,$doctor_id) {
	    
	    try{
	        
	        $this->db->trans_begin();
	        $ipd_master_data = [];
	        $healthProfileArry = [];
	        
	        $ipd_master_upd = [];
	        
	        $todaydt = date("Y-m-d H:i:s");
	        $formMasterData = $request->fdata;
	        
	        $temp = trim($formMasterData->tempCtrl);
	        $anemia = trim($formMasterData->haemoglobinCtrl);
			$bp = trim($formMasterData->bpCtrl);
			$bp_diastolic = trim($formMasterData->bpDiastolicCtrl); //diastolic bp
	        $jaundice = trim($formMasterData->jaundiceCtrl);
	        $odema = trim($formMasterData->odemaCtrl);
	        $height = trim($formMasterData->heightCtrl);
	        $weight = trim($formMasterData->weightCtrl);
	        $blood_sugar_f = trim($formMasterData->bldsugarFCtrl);
			$blood_sugar_pp = trim($formMasterData->bldsugarPPCtrl);
			$blood_sugar_random = trim($formMasterData->bldsugarRCtrl);
	       
	        
	        $ipd_row_id =  trim($formMasterData->ipdRowIDCtrl);
	        $patient_id = trim($formMasterData->patientID);
	        
	        $nextCheckUpDt = NULL;
	        if($formMasterData->nextCheckUpDt!='') {
	            $nextCheckUpDt = date('Y-m-d H:i:s',strtotime($formMasterData->nextCheckUpDt));
	        }
			
			
	        $instruction = trim(htmlspecialchars($formMasterData->instructionCommentCtrl));
	        $dischargeSummry = trim(htmlspecialchars($formMasterData->dischargeCommentCtrl));
	        $finalDiagnos = trim(htmlspecialchars($formMasterData->finalCommentCtrl));
	        
			$referal_hospital_id = $formMasterData->reffHospitalCtrl;


			if(isset($formMasterData->bldgrpCtrl)) {
				$bloodGrp = $formMasterData->bldgrpCtrl;
				$updData = ["ipd_patient_master.patient_blood_grp" => $bloodGrp];
				$this->db->where('ipd_patient_master.unique_id', $ipd_row_id);
				$this->db->update('ipd_patient_master', $updData);
			} 
			

			/**
            *  update patients table for blood group
            *  Blood Group Info
			*/
		// commented on 21.02.2019
			/*if(isset($formMasterData->bldgrpCtrl)) {
				$bloodGrp = $formMasterData->bldgrpCtrl;
				$updData = ["patients.blood_group" => $bloodGrp];
				$this->db->where('patients.patient_id', $patient_id);
				$this->db->update('patients', $updData);
			} */
	        
	           
	        $ipd_master_upd = [
	            "discharge_flag" => TRUE,
	            "discharge_date" => date('Y-m-d H:i:s',strtotime($formMasterData->dischargeDt)),
	            "next_checkup_dt" => $nextCheckUpDt,
	            "instruction" => $instruction,
	            "discharge_summary" => $dischargeSummry,
	            "final_digonosis" => $finalDiagnos,
	            "referral_id" => $referal_hospital_id
	        ];
	        
	     
	        $this->db->where('ipd_patient_master.unique_id', $ipd_row_id);
	        $this->db->update('ipd_patient_master', $ipd_master_upd);
	        
	        $healthProfileArry = [
	            "patient_id" => $patient_id,
	            "date" => date('Y-m-d H:i:s',strtotime($formMasterData->dischargeDt)),
	            "prescription_addmission_id" => $ipd_row_id,
	            "opd_ipd_flag" => "I",
	            "pulse" => NULL,
	            "temp" => $temp,
	            "anemia" => $anemia, // haemoglobin
				"bp" => $bp,
				"bp_diastolic" => $bp_diastolic,
	            "jaundice" => $jaundice,
	            "odema" => $odema,
	            "height" => $height,
	            "weight" => $weight,
	            "blood_sugar_f" => $blood_sugar_f,
				"blood_sugar_pp" => $blood_sugar_pp,
				"blood_sugar_random" => $blood_sugar_random,
				"comment" => NULL,
				"servertag" => getServerTag(),
				"hospital_id" => $hospital_id
	        ];
	        
	        $this->db->insert('patient_health_profile', $healthProfileArry);
			$healthprofile_inserted_id = $this->db->insert_id();
			$health_profile_uniq_id = generateUniqRowID($healthprofile_inserted_id,getServerTag(),$hospital_id);

			// Update Table 
			$whereHealth= [
				"patient_health_profile_id" => $healthprofile_inserted_id,
				"servertag" => getServerTag(),
				"hospital_id" => $hospital_id
			];
			$upda_Health = [
				"unique_id" => $health_profile_uniq_id
			];
			$this->commondatamodel->updateSingleTableData('patient_health_profile',$upda_Health,$whereHealth);

	        
	        $medInsert = $this->insertIntoMedicines($hospital_id,$ipd_row_id,$health_profile_uniq_id,$request->medicines);
	        
	        
	        
	        if($this->db->trans_status() === FALSE) {
	            $this->db->trans_rollback();
	            return false;
	        } else {
				$this->db->trans_commit();
				$returnData = [];
				$returnData = [
					"prescription" => $ipd_row_id,
					"healthprfl" => $health_profile_uniq_id
				];
				return $returnData;
	            //return true;
	        }
	        
	    }
	    catch(Exception $exc){
	        echo $exc->getTraceAsString();
	    }
	    
	}
	
	
	
	private function insertIntoMedicines($hospital_id,$admission_id,$healthprofile_inserted_id,$medicineData){
		if(isset($medicineData)){
			$len = count($medicineData);
			$insert_arry = [];
			for($i=0; $i<$len; $i++){
				
				$medicinerow = $medicineData[$i]->medicinetd;
				$doserow = $medicineData[$i]->dosagetd;
				$frequencyrow = $medicineData[$i]->unittd;

				$doseRowID = NULL;
				if(isset($doserow->id)){ $doseRowID = $doserow->id; }

				$freqRowID = NULL;
				if(isset($frequencyrow->id)){ $freqRowID = $frequencyrow->id; }
					
				$insert_arry = [
					"hospital_id" => $hospital_id,
					"prescription_admission_id" => $admission_id,
					"opd_ipd_flag" => 'I',
					"medicine_id" => $medicinerow->id,
					"dose_id" => $doseRowID,
					"frequeny" => $freqRowID,
					"number_of_days_sick_leave" => $medicineData[$i]->daystd,
					"health_profile_id" => $healthprofile_inserted_id,
					"servertag" => getServerTag()
				];
				
				// insert query
				$this->db->insert('opd_ipd_medicine', $insert_arry); 

				$last_insert_id = $this->db->insert_id();
				
				
				// Update Table 
				$whereMedicine= [
					"id" => $last_insert_id,
					"servertag" => getServerTag(),
					"hospital_id" => $hospital_id
				];
				$upda_Medicine = [
					"unique_id" => generateUniqRowID($last_insert_id,getServerTag(),$hospital_id)
				];
				$this->commondatamodel->updateSingleTableData('opd_ipd_medicine',$upda_Medicine,$whereMedicine);
			}
			
		}
		
	}
	
	private function insertIntoTestReports($hospital_id,$admission_id,$health_profile_id,$reportsData){
		if(isset($reportsData)){
			$len = count($reportsData);
			$insert_arry = [];
			for($i=0; $i<$len; $i++){
				
				$testsrow = $reportsData[$i]->reports;
				
				$insert_arry = [
					"hospital_id" => $hospital_id,
					"prescription_addmission_id" => $admission_id,
					"opd_ipd_flag" => 'I',
					"test_id" => $testsrow->id,
					"date" => date('Y-m-d',strtotime($reportsData[$i]->invdate)),
					"health_profile_id" => $health_profile_id,
					"servertag" => getServerTag()
				];
				$this->db->insert('opd_ipd_test', $insert_arry); 
				
				$last_insert_id = $this->db->insert_id();
				
				// Update Table 
				$whereTest= [
					"opd_ipd_test_id" => $last_insert_id,
					"servertag" => getServerTag(),
					"hospital_id" => $hospital_id
				];
				$upda_Test = [
					"unique_id" => generateUniqRowID($last_insert_id,getServerTag(),$hospital_id)
				];
				$this->commondatamodel->updateSingleTableData('opd_ipd_test',$upda_Test,$whereTest);

			}
			
		}
	}
	
	
	
	
	/**
     * @name getIPDListByDt
     * @author Mithilesh Routh
     * @return $data
     * @desc get medicine by diagnosis list
	 * @ modified on 20.02.2019
     */
	
	public function getIPDListByDt($request,$hospital_id) {
		$resultdata = "";
		
		$searchDt = date("Y-m-d", strtotime($request->searchdt));
		/*
		$where = [
			"ipd_patient_master.hospital_id" => $hospital_id,
			"DATE_FORMAT(ipd_patient_master.admission_date,'%Y-%m-%d')" => $searchDt ,
			"ipd_patient_master.`discharge_flag`" => FALSE,
			"ipd_patient_master.`discharge_date`" => NULL
		]; 
		*/
		
		$where = [
			"ipd_patient_master.hospital_id" => $hospital_id,
			"ipd_patient_master.`discharge_flag`" => FALSE
		]; 
		
		$query = $this->db->select("
						  /*patient_type.patient_type,
							patients.patient_name,
							patients.mobile_one , */
							patients.patient_code as associate_permworker_code,
							patients.patient_name as permworker_name,
							patients.patient_id,
							ipd_patient_master.patient_name,
							  ipd_patient_master.patient_type,
							  ipd_patient_master.patient_age,
							  ipd_patient_master.patient_gender,
							  ipd_patient_master.provision_diagnosis,
							/* ipd_patient_master.admission_id AS ipdID, */
							ipd_patient_master.unique_id AS ipdID,
							ipd_patient_master.room_no,
							ipd_patient_master.bed_no,
							DATE_FORMAT(ipd_patient_master.admission_date,'%d-%m-%Y') AS admission_dt
							",FALSE)
                          ->from("ipd_patient_master") 
						 /* ->join("patients" , "patients.patient_id = ipd_patient_master.patient_id" , "LEFT")*/
						  ->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")
						  ->join("patient_type" , "patient_type.patient_type_id = patients.patient_type_id" , "LEFT")
						  ->where($where)
						  ->get();
						  
		//echo $this->db->last_query();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}
	
	/**
	 * @name getIPDListByDt
	 * @author Mithilesh Routh
	 * @return $data
	 * @desc get medicine by diagnosis list
	 */
	
	public function getIPDDischargeListByDt($request,$hospital_id) {
	    $resultdata = [];
	    
	    $searchDt = date("Y-m-d", strtotime($request->searchdt));
	    /*
	     $where = [
	     "ipd_patient_master.hospital_id" => $hospital_id,
	     "DATE_FORMAT(ipd_patient_master.admission_date,'%Y-%m-%d')" => $searchDt ,
	     "ipd_patient_master.`discharge_flag`" => FALSE,
	     "ipd_patient_master.`discharge_date`" => NULL
	     ];
	     */
	    
	    $where = [
	        "ipd_patient_master.hospital_id" => $hospital_id,
	        "ipd_patient_master.`discharge_flag`" => TRUE
	    ];
	    
	    $query = $this->db->select("
							
							/*patient_type.patient_type,
							patients.patient_name,
							patients.mobile_one , */
							patients.patient_code as associate_permworker_code,
							patients.patient_name as permworker_name,
							patients.patient_id,
							  ipd_patient_master.patient_name,
							  ipd_patient_master.patient_type,
							  ipd_patient_master.patient_age,
							  ipd_patient_master.patient_gender,
							  ipd_patient_master.provision_diagnosis,
						/*	ipd_patient_master.admission_id AS ipdID, */
							ipd_patient_master.unique_id AS ipdID,
							ipd_patient_master.room_no,
							ipd_patient_master.bed_no,
							DATE_FORMAT(ipd_patient_master.admission_date,'%d-%m-%Y') AS admission_dt,
							DATE_FORMAT(ipd_patient_master.discharge_date,'%d-%m-%Y') AS discharge_date
							",FALSE)
							->from("ipd_patient_master")
							/* ->join("patients" , "patients.patient_id = ipd_patient_master.patient_id" , "LEFT")*/
							->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")
							->join("patient_type" , "patient_type.patient_type_id = patients.patient_type_id" , "LEFT")
							->where($where)
							->where("ipd_patient_master.discharge_date IS NOT NULL")
							->get();
							
							//echo $this->db->last_query();
							
							if($query->num_rows()>0) {
							    $resultdata=$query->result();
							}
							return $resultdata;
	}
	
	
	public function getIpdDetailInfoByID ($ipdadmissionid,$hospital_id){
		$patient_data = [];
		$where = [
			"ipd_patient_master.admission_id" => $ipdadmissionid,
		];
		$query = $this->db->select("`patients`.`patient_id` as patientid,
									patients.`patient_code`,
									/*patients.`patient_name`,
									patients.`gender`,
									patients.`blood_group`,*/
									patients.`line_number`,
									patients.`division_number`,
									patients.`challan_number`,
									patients.`estate`,
									DATE_FORMAT(patients.`dob` , '%d-%m-%Y') AS dob_dt ,
									
									patients.`employee_id`,
									patients.`adhar`,
									patients.`mobile_one`,
									
									
									ipd_patient_master.discharge_flag,
									ipd_patient_master.room_no,
									ipd_patient_master.bed_no,
									/* ipd_patient_master.admission_id AS ipdID, */
									ipd_patient_master.unique_id AS ipdID,
                                    ipd_patient_master.`discharge_date` AS dischargeDate,
                                    ipd_patient_master.`next_checkup_dt` AS nextChekUpDate,
                                    ipd_patient_master.final_digonosis,
                                    ipd_patient_master.discharge_summary,
                                    ipd_patient_master.instruction,
									ipd_patient_master.referral_id,

								
									
									patient_health_profile.`patient_health_profile_id`,
									patient_health_profile.unique_id AS health_profile_uid,
									patient_health_profile.pulse,
									patient_health_profile.temp,
									patient_health_profile.`anemia`,
									patient_health_profile.bp,
									patient_health_profile.bp_diastolic,
									patient_health_profile.`jaundice`,
									patient_health_profile.`odema`,
									patient_health_profile.`height`,
									patient_health_profile.`weight`,
									patient_health_profile.`blood_sugar_pp`,
									patient_health_profile.`blood_sugar_f`,
									patient_health_profile.`blood_sugar_random`,
									patient_health_profile.`comment` AS doctorcomment,
									patient_health_profile.`prescription_addmission_id`,
									/* added on 20.02.2018*/
									ipd_patient_master.room_no,
									ipd_patient_master.bed_no,
									ipd_patient_master.patient_name,
									ipd_patient_master.patient_age,
									ipd_patient_master.patient_gender,
									ipd_patient_master.patient_blood_grp,
									ipd_patient_master.patient_type,
									patients.patient_name as associate_permworker_name

									" , FALSE)
							 ->from("ipd_patient_master") 
							 ->join("patient_health_profile","patient_health_profile.prescription_addmission_id = ipd_patient_master.unique_id AND `patient_health_profile`.`opd_ipd_flag` = 'I' ","LEFT")
							/* ->join("patients","patients.patient_id = ipd_patient_master.patient_id","LEFT")*/
							 ->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")
							 ->where($where)
							 ->order_by("patient_health_profile.patient_health_profile_id","DESC")
							 ->limit(1)
							 ->get();
			// echo $this->db->last_query();		
		if($query->num_rows()>0){
				$patient_data = $query->row();
			}
        return $patient_data;
	}
	
	
	
	
	public function removeIPDDischareg($id,$upd_data,$hospital_id) {
	    try{
	        
	        $this->db->trans_begin();
	        
	        $health_profile_last_id = $this->getLastHealthProfileByTagID($id,"I");
	        
	        /*
	         * Delete last Health Profile ID Medicine
	         * Table : opd_ipd_medicine
	         */
	        $deleteMedicine = $this->deleteMedicineFromTbl($id,$health_profile_last_id,"I",$hospital_id);
	        
	        /*
	         * Delete last Health Profile 
	         * Table : patient_health_profile
	         */
	        
	        $deleteHealthProfile = $this->deleteHealthFromTbl($id,$health_profile_last_id,"I");
	        
	        $this->db->where('ipd_patient_master.unique_id', $id);
	        $this->db->update('ipd_patient_master', $upd_data);
	           
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
	
	
	
	public function getLastHealthProfileByTagID($id,$tag) {
	     $health_profile_uid = 0;
	     $where = [
             "patient_health_profile.prescription_addmission_id" => $id ,
	         "patient_health_profile.opd_ipd_flag" => "I"
	     ];
        
        $query = $this->db->select("*")
				->from("patient_health_profile")
				->where($where)
				->order_by("patient_health_profile.patient_health_profile_id","DESC")
				->limit(1)
				->get();
      
		if($query->num_rows() > 0) {
		    $health_profile_row = $query->row();
		    $health_profile_uid = $health_profile_row->unique_id;
		}
		
		return $health_profile_uid;
	    
	}
	
	private function deleteMedicineFromTbl($opd_ipd_id,$helathprofile_id,$tag,$hospital_id) {
	    try {
	        $this->db->trans_begin();
	        $where = [
	            "opd_ipd_medicine.prescription_admission_id" => $opd_ipd_id,
	            "opd_ipd_medicine.health_profile_id" => $helathprofile_id,
	            "opd_ipd_medicine.opd_ipd_flag" => $tag,
	            "opd_ipd_medicine.hospital_id" => $hospital_id
	        ];
	        $this->db->where($where);
	        $this->db->delete('opd_ipd_medicine');
	        if($this->db->trans_status() === FALSE) {
	            $this->db->trans_rollback();
	            return false;
	        } else {
	            $this->db->trans_commit();
	            return true;
	        }
	    }
	    catch(Exception $exc) {
	        echo $exc->getTraceAsString();
	    }
	}
	
	
	private function deleteHealthFromTbl($opd_ipd_id,$helathprofile_id,$tag) {
	    try {
	        $this->db->trans_begin();
	        $where = [
	            "patient_health_profile.prescription_addmission_id" => $opd_ipd_id,
	            "patient_health_profile.unique_id" => $helathprofile_id,
	            "patient_health_profile.opd_ipd_flag" => $tag
	        ];
	        
	        $this->db->where($where);
	        $this->db->delete('patient_health_profile');
	        
	        if($this->db->trans_status() === FALSE) {
	            $this->db->trans_rollback();
	            return false;
	        } else {
	            $this->db->trans_commit();
	            return true;
	        }
	    }
	    catch(Exception $exc) {
	        echo $exc->getTraceAsString();
	    }
	}
		
	
	public function getIpdPatientVisitHistory ($patientID,$ipdAdmId,$hospital_id){
		$patient_data = [];
		$where = [
			"ipd_patient_master.patient_id" => $patientID,
			"ipd_patient_master.unique_id" => $ipdAdmId
		];
		$query = $this->db->select("
								  `patients`.`patient_id` as patientid,
									patients.`patient_code`,
									patients.`patient_name`,
									/* ipd_patient_master.admission_id AS ipdID, */
									ipd_patient_master.unique_id AS ipdID,
									DATE_FORMAT(patient_health_profile.`date`,'%d-%m-%Y') AS healthprofileDt,
									patient_health_profile.patient_health_profile_id,
									patient_health_profile.unique_id AS health_profile_uid,
									patient_health_profile.`comment` AS doctorcomment
									" , FALSE)
							 ->from("ipd_patient_master") 
							 ->join("patient_health_profile","patient_health_profile.prescription_addmission_id = ipd_patient_master.admission_id AND  patient_health_profile.`opd_ipd_flag` = 'I' ","LEFT")
							 ->join("patients","patients.patient_id = ipd_patient_master.patient_id","LEFT")
							 ->where($where)
							 ->order_by("patient_health_profile.date","DESC")
							// ->limit(1)
							 ->get();
			// echo $this->db->last_query();		
		if($query->num_rows()>0){
				//$patient_data = $query->result();

					foreach ($query->result() as $rows)
					{
						$patient_data[] = [
							"rowResultData" => $rows,
							"patienthealthProfileData" => $this->patient->getHealthProfileData($ipdAdmId,"I",$rows->health_profile_uid),
							"medicineDatas" => $this->medicine->getLastPrescMedicines($ipdAdmId,"I",$hospital_id,$rows->health_profile_uid),
							"investigationsData" => $this->investigation->getLastPrescTestReports($ipdAdmId ,"I",$hospital_id,$rows->health_profile_uid)
						];
						
					}
			}
        return $patient_data;
	}



	public function getOpdIpdPrescPrint($opdipd_masterid,$opdipd_healthprofileid,$opdipd_type,$hospital_id) {
		$data = [];
		$where = [
			"patient_health_profile.`unique_id`" => $opdipd_healthprofileid,
			"patient_health_profile.`prescription_addmission_id`" => $opdipd_masterid,
			"patient_health_profile.`opd_ipd_flag`" => $opdipd_type
		];
		if($opdipd_type=='O'){
		$query = $this->db->select("
								  `patients`.`patient_id` as patientid,
								  patients.`patient_code`,
									patients.`patient_name`,
									opd_prescription.`symptom_list`,
									opd_prescription.`diagonised_list`,
									ipd_patient_master.instruction,
									ipd_patient_master.discharge_summary,
									ipd_patient_master.discharge_date,
									ipd_patient_master.final_digonosis,
									DATE_FORMAT(ipd_patient_master.admission_date,'%d-%m-%Y') AS admission_dt,
									DATE_FORMAT(ipd_patient_master.next_checkup_dt,'%d/%m/%Y') AS nextChkupDtDt,
									CASE 
									WHEN ipd_patient_master.`admission_id` IS NOT NULL THEN ipd_patient_master.`admission_id`
									WHEN opd_prescription.id IS NOT NULL THEN opd_prescription.`opd_prescription_id`
									END AS prescno,
									patient_health_profile.*,
									patient_health_profile.unique_id as health_profile_uid

									/*ipd_patient_master.patient_name,
									ipd_patient_master.patient_type,
									patients.patient_name as associate_permworker_name,
									patients.patient_code as parmenant_worker_code*/
									" , FALSE)
							 ->from("patient_health_profile") 
							 ->join("ipd_patient_master","patient_health_profile.prescription_addmission_id = ipd_patient_master.admission_id AND patient_health_profile.opd_ipd_flag = 'I'","LEFT")
							 ->join("opd_prescription","opd_prescription.unique_id = patient_health_profile.prescription_addmission_id AND patient_health_profile.opd_ipd_flag = 'O'","LEFT")
							 ->join("patients","patients.patient_id = patient_health_profile.patient_id","INNER")
							/* ->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")*/
							 ->where($where)
							 ->order_by("patient_health_profile.date","DESC")
							 ->limit(1)
							 ->get();

		}else{

						$query = $this->db->select("
						`patients`.`patient_id` as patientid,
						/*patients.`patient_code`,
						patients.`patient_name`,*/
						opd_prescription.`symptom_list`,
						opd_prescription.`diagonised_list`,
						ipd_patient_master.instruction,
						ipd_patient_master.discharge_summary,
						ipd_patient_master.discharge_date,
						ipd_patient_master.final_digonosis,
						DATE_FORMAT(ipd_patient_master.admission_date,'%d-%m-%Y') AS admission_dt,
						DATE_FORMAT(ipd_patient_master.next_checkup_dt,'%d/%m/%Y') AS nextChkupDtDt,
						CASE 
						WHEN ipd_patient_master.`admission_id` IS NOT NULL THEN ipd_patient_master.`admission_id`
						WHEN opd_prescription.id IS NOT NULL THEN opd_prescription.`opd_prescription_id`
						END AS prescno,
						patient_health_profile.*,
						patient_health_profile.unique_id as health_profile_uid,

						ipd_patient_master.patient_name,
						ipd_patient_master.patient_type,
						patients.patient_name as associate_permworker_name,
						patients.patient_code as parmenant_worker_code
						" , FALSE)
				->from("patient_health_profile") 
				->join("ipd_patient_master","patient_health_profile.prescription_addmission_id = ipd_patient_master.admission_id AND patient_health_profile.opd_ipd_flag = 'I'","LEFT")
				->join("opd_prescription","opd_prescription.unique_id = patient_health_profile.prescription_addmission_id AND patient_health_profile.opd_ipd_flag = 'O'","LEFT")
				/*->join("patients","patients.patient_id = patient_health_profile.patient_id","INNER")*/
				 ->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")
				->where($where)
				->order_by("patient_health_profile.date","DESC")
				->limit(1)
				->get();

		}
			echo $this->db->last_query();		
		if($query->num_rows()>0){
				//$patient_data = $query->result();
				$rows = $query->row();
					
						$data = [
							"symptoms" => $this->symptom->getSymptomsDataByIds($rows->symptom_list,$hospital_id),
							"diagnosis" => $this->disease->getDiseaseByIds($rows->diagonised_list,$hospital_id),
							"patienthealthProfileData" => $rows,
							"medicineDatas" => $this->medicine->getLastPrescMedicines($opdipd_masterid,$opdipd_type,$hospital_id,$rows->health_profile_uid),
							"investigationsData" => $this->investigation->getLastPrescTestReports($opdipd_masterid ,$opdipd_type,$hospital_id,$rows->health_profile_uid)
						];
						
					
			}
        return $data;
	}

 
	
/*-----------------------------5 march 20019 ------------------------- */


	/**
	 * @name getIPDDischargeListByDateRange
	 * @author Shankha Ghosh
	 * @return $data
	 *
	 */
	
	public function getIPDDischargeListByDateRange($request,$hospital_id) {
	    $resultdata = [];
	    
		$formData = $request->data;
	
		$from_date = $formData->searchFromDateCtrldis;
		$to_date = $formData->searchToDateCtrldis;
		
		
	    /*
	     $where = [
	     "ipd_patient_master.hospital_id" => $hospital_id,
	     "DATE_FORMAT(ipd_patient_master.admission_date,'%Y-%m-%d')" => $searchDt ,
	     "ipd_patient_master.`discharge_flag`" => FALSE,
	     "ipd_patient_master.`discharge_date`" => NULL
	     ];
	     */
	    
	    $where = [
	        "ipd_patient_master.hospital_id" => $hospital_id,
	        "ipd_patient_master.`discharge_flag`" => TRUE
	    ];
	    
	    $query = $this->db->select("
							
							/*patient_type.patient_type,
							patients.patient_name,
							patients.mobile_one , */
							patients.patient_code as associate_permworker_code,
							patients.patient_name as permworker_name,
							patients.patient_id,
							  ipd_patient_master.patient_name,
							  ipd_patient_master.patient_type,
							  ROUND(ipd_patient_master.patient_age) as patient_age,
							  ipd_patient_master.patient_gender,
							  ipd_patient_master.provision_diagnosis,
						/*	ipd_patient_master.admission_id AS ipdID, */
							ipd_patient_master.unique_id AS ipdID,
							ipd_patient_master.room_no,
							ipd_patient_master.bed_no,
							DATE_FORMAT(ipd_patient_master.admission_date,'%d-%m-%Y') AS admission_dt,
							DATE_FORMAT(ipd_patient_master.discharge_date,'%d-%m-%Y') AS discharge_date
							",FALSE)
							->from("ipd_patient_master")
							/* ->join("patients" , "patients.patient_id = ipd_patient_master.patient_id" , "LEFT")*/
							->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")
							->join("patient_type" , "patient_type.patient_type_id = patients.patient_type_id" , "LEFT")
							->where($where)
							->where("ipd_patient_master.discharge_date IS NOT NULL")
							->where('DATE_FORMAT(ipd_patient_master.discharge_date,"%Y-%m-%d") BETWEEN "'. date('Y-m-d', strtotime($from_date)). '" AND "'. date('Y-m-d', strtotime($to_date)).'"')
							->order_by("ipd_patient_master.discharge_date", "asc")
							->get();
							
							#echo $this->db->last_query();
							
							if($query->num_rows()>0) {
							    $resultdata=$query->result();
							}
							return $resultdata;
	}

/*-----------------------------5 march 20019 ------------------------- */
	/**
     * @name getIPDListByDtByDateRange
     * @author Shankha Ghosh
     * @return $data
     */
	
	public function getIPDListByDtByDateRange($request,$hospital_id) {
		$resultdata = "";

		$formData = $request->data;
	
		$from_date = $formData->searchFromDateCtrl;
		$to_date = $formData->searchToDateCtrl;
		
	
		/*
		$where = [
			"ipd_patient_master.hospital_id" => $hospital_id,
			"DATE_FORMAT(ipd_patient_master.admission_date,'%Y-%m-%d')" => $searchDt ,
			"ipd_patient_master.`discharge_flag`" => FALSE,
			"ipd_patient_master.`discharge_date`" => NULL
		]; 
		*/
		
		$where = [
			"ipd_patient_master.hospital_id" => $hospital_id,
			"ipd_patient_master.`discharge_flag`" => FALSE
		]; 
		
		$query = $this->db->select("
						  /*patient_type.patient_type,
							patients.patient_name,
							patients.mobile_one , */
							patients.patient_name as permworker_name,
							patients.patient_code as associate_permworker_code,
							patients.patient_id,
							ipd_patient_master.patient_name,
							  ipd_patient_master.patient_type,
							  ROUND(ipd_patient_master.patient_age) as patient_age,
							  ipd_patient_master.patient_gender,
							  ipd_patient_master.provision_diagnosis,
							/* ipd_patient_master.admission_id AS ipdID, */
							ipd_patient_master.unique_id AS ipdID,
							ipd_patient_master.room_no,
							ipd_patient_master.bed_no,
							DATE_FORMAT(ipd_patient_master.admission_date,'%d-%m-%Y') AS admission_dt
							",FALSE)
                          ->from("ipd_patient_master") 
						 /* ->join("patients" , "patients.patient_id = ipd_patient_master.patient_id" , "LEFT")*/
						  ->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")
						  ->join("patient_type" , "patient_type.patient_type_id = patients.patient_type_id" , "LEFT")
						  ->where($where)
						  ->where('DATE_FORMAT(ipd_patient_master.admission_date,"%Y-%m-%d") BETWEEN "'. date('Y-m-d', strtotime($from_date)). '" AND "'. date('Y-m-d', strtotime($to_date)).'"')
						  ->order_by("ipd_patient_master.discharge_date", "asc")
						  ->get();
						  
		//echo $this->db->last_query();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
	}


}// end of class
