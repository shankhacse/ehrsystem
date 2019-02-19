<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Opd_model extends CI_Model{
    
	public function __construct() {
        parent::__construct();
		$this->load->model("Patient_model", "patient", TRUE);
	}
	
	/**
	 * $presdoneFrom = "CONSULTATION"  OR "PREGNANCY" OR "VACCINATION"
	 * $pcode = Patient Code  For EX: E031047
	 */
	public function getPatientPrescInfoByCode($pcode,$presdoneFrom) {
		$patient_data = [];
		$where = [
			"patients.patient_code" => $pcode
			
		];
		$query = $this->db->select("`patients`.`patient_id` as patientid,
									patients.`patient_code`,
									patients.`patient_name`,
									patients.`line_number`,
									patients.`division_number`,
									patients.`challan_number`,
									patients.`estate`,
									patients.`dob`,
									patients.`gender`,
									patients.`employee_id`,
									patients.`adhar`,
									patients.`mobile_one`,
                                    patients.`blood_group`,
                                    patient_type.`patient_type`,
									patient_health_profile.`patient_health_profile_id`,
									patient_health_profile.pulse,
									patient_health_profile.temp,
									patient_health_profile.`anemia`,
									patient_health_profile.bp,
									patient_health_profile.`jaundice`,
									patient_health_profile.`odema`,
									patient_health_profile.`height`,
									patient_health_profile.`weight`,
									patient_health_profile.`prescription_addmission_id`,
									patient_health_profile.unique_id AS health_profile_uid,
									opd_prescription.*,
									hospitals.hospital_name
									")
							 ->from("patients") 
							 ->join("patient_type","patients.patient_type_id = patient_type.patient_type_id","LEFT")
							 ->join("patient_health_profile","patient_health_profile.patient_id = patients.patient_id","LEFT")
							 ->join("opd_prescription","opd_prescription.unique_id = patient_health_profile.prescription_addmission_id AND opd_prescription.prescription_from='".$presdoneFrom."'","LEFT")
							 ->join("hospitals","opd_prescription.referal_hospital_id = hospitals.hospital_id","LEFT")
							 ->where($where)
							 ->order_by('patient_health_profile.patient_health_profile_id','DESC')
							 ->limit(1)
							 ->get();
			// echo $this->db->last_query();		
		if($query->num_rows()>0){
				$patient_data = $query->row();
			}
        return $patient_data;
	}
	

	

	/**
	 * $presdoneFrom = "CONSULTATION"  OR "PREGNANCY" OR "VACCINATION"
	 * $pcode = Patient Code  For EX: E031047
	 */
	public function getPatientPrescInfoByPatientID($pcode,$presdoneFrom) {
		$patient_data = [];
		$where = [
			"patients.patient_id" => $pcode
			
		];
		$query = $this->db->select("`patients`.`patient_id` as patientid,
									patients.`patient_code`,
									patients.`patient_name`,
									patients.`line_number`,
									patients.`division_number`,
									patients.`challan_number`,
									patients.`estate`,
									patients.`dob`,
									patients.`age`,
									patients.`gender`,
									patients.`employee_id`,
									patients.`adhar`,
									patients.`mobile_one`,
                                    patients.`blood_group`,
                                    patient_type.`patient_type`,
									patient_health_profile.`patient_health_profile_id`,
									patient_health_profile.pulse,
									patient_health_profile.temp,
									patient_health_profile.`anemia`,
									patient_health_profile.bp,
									patient_health_profile.`jaundice`,
									patient_health_profile.`odema`,
									patient_health_profile.`height`,
									patient_health_profile.`weight`,
									patient_health_profile.`prescription_addmission_id`,
									patient_health_profile.unique_id AS health_profile_uid,
									opd_prescription.*,
									hospitals.hospital_name
									")
							 ->from("patients") 
							 ->join("patient_type","patients.patient_type_id = patient_type.patient_type_id","LEFT")
							 ->join("patient_health_profile","patient_health_profile.patient_id = patients.patient_id","LEFT")
							 ->join("opd_prescription","opd_prescription.unique_id = patient_health_profile.prescription_addmission_id AND opd_prescription.prescription_from='".$presdoneFrom."'","LEFT")
							 ->join("hospitals","opd_prescription.referal_hospital_id = hospitals.hospital_id","LEFT")
							 ->where($where)
							 ->order_by('patient_health_profile.patient_health_profile_id','DESC')
							 ->limit(1)
							 ->get();
			// echo $this->db->last_query();		
		if($query->num_rows()>0){
				$patient_data = $query->row();
			}
        return $patient_data;
	}
	
	
	
	
	
	public function insertIntoOPD($request,$hospital_id,$doctor_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
			$healthProfileArry = [];
			$opdPrescriptionArry = [];
			$todaydt = date("Y-m-d H:i:s");
			
			$opdPrecesptionID = $this->getLatestPrescriptionID($hospital_id);
			
			$healthPrf = $request->healthprofile;
			$pcode = $healthPrf->hdnpatientID;
			$registrationID = $healthPrf->hdnregistrationID;
			
			//$patientid = $this->patient->getPatientByCode($pcode)->patient_id;
			$patientid = $healthPrf->hdnpatientID;
			$pulse = $healthPrf->pulse;
			$tempratute = $healthPrf->tempratute;
			$anaemia = $healthPrf->anaemia;
			$bp = $healthPrf->bp;
			$jaundice = $healthPrf->jaundice;
			$odema = $healthPrf->odema;
			$height = $healthPrf->height;
			$weight = $healthPrf->weight;
			
			
			
			
			$opdForm = $request->opdform;
			
			$symptoms = $opdForm->symptomsMultiCtrl;
			$diagnosis = $opdForm->diagnosisMultiCtrl;
			
			$symptomList = $this->getArrayIDAsString($symptoms);
			$diagnosisList = $this->getArrayIDAsString($diagnosis);
			
			$sickDays = NULL;
			if(isset($opdForm->sickdaysCtrl)){$sickDays = $opdForm->sickdaysCtrl;}
			
			$acc_approval = $opdForm->approvalCtrl == 1 ? 'Y' : 'N';
			$sickFlag = $opdForm->sickCtrl == 1 ? 'Y' : 'N';
			$noofdaysSick = $sickDays;
			$ipd_reco = $opdForm->admitCtrl == 1 ? 'R' : 'S';
			$hospital_reco = $opdForm->observCtrl == 1 ? true : false; 
			$referal_hospital = $opdForm->isReffHospital == 1 ? true : false;
			$keep_in_observation = $opdForm->observCtrl == 1 ? true : false;
			$comments = $opdForm->finalsummryCtrl;
			
			$referalhospital_id = NULL;
			if($referal_hospital){
				$referalHospital = $opdForm->reffHospitalCtrl;
				$referalhospital_id = $referalHospital->id;
			}
			
			$opdPrescriptionArry = [
				"opd_prescription_id" => $opdPrecesptionID, 
				"registrationid" => $registrationID,
				"hospital_id" => $hospital_id,
				"date" => $todaydt,
				"patient_id" => $patientid,
				"doctor_id" => $doctor_id,
				"accidental_approval" => $acc_approval,
				"symptom_list" => $symptomList,
				"diagonised_list" => $diagnosisList,
				"sick_flag" => $sickFlag,
				"no_of_days_sick" => $noofdaysSick,
				"ipd_reco_flag" => $ipd_reco,
				"hospital_rec_flag" => $referal_hospital,
				"referal_hospital_id" => $referalhospital_id,
				"keep_in_observation" => $keep_in_observation,
				"comments" => $comments,
				"prescription_from" => "CONSULTATION",
				"servertag" => getServerTag()
			];
			
			$this->db->insert('opd_prescription', $opdPrescriptionArry); 
			$opd_precp_id = $this->db->insert_id();
			$opd_uniq_id = generateUniqRowID($opd_precp_id,getServerTag(),$hospital_id);

			// Update Table 
			$whereOpdPresc = [
				"id" => $opd_precp_id,
				"servertag" => getServerTag(),
				"hospital_id" => $hospital_id
			];
			$upda_OpdPresc = [
				"unique_id" => $opd_uniq_id
			];

			$this->commondatamodel->updateSingleTableData('opd_prescription',$upda_OpdPresc,$whereOpdPresc);

		
			$healthProfileArry = [
				"patient_id" => $patientid,
				"date" => $todaydt,
				"prescription_addmission_id" => $opd_uniq_id,
				"opd_ipd_flag" => 'O',
				"pulse" => $pulse,
				"temp" => $tempratute,
				"anemia" => $anaemia,
				"bp" => $bp,
				"jaundice" => $jaundice,
				"odema" => $odema,
				"height" => $height,
				"weight" => $weight,
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

			
			
			$medInsert = $this->insertIntoMedicines($hospital_id,$opd_uniq_id,$health_profile_uniq_id,$request->medicines);
			$testReportinsert = $this->insertIntoTestReports($hospital_id,$opd_uniq_id,$health_profile_uniq_id,$request->reports);
			


			// Insert Into Sick Leav Approval if sick leave apply
			if(isset($sickFlag) && $sickFlag=="Y" && $noofdaysSick > 0 ) {

				$insert_patient_sickleave_detail = [];
				$apply_date = date("Y-m-d");
					for($i=0;$i<$noofdaysSick;$i++) {
						
						$insert_patient_sickleave_detail = [
							"opd_ipd__id" => $opd_uniq_id,
							"opd_ipd_flag" => "O",
							"patient_id" => $patientid,
							"applied_for_date" => $apply_date,
							"is_approved" => "N",
							"approved_by" => NULL,
							"approved_on" => NULL,
							"servertag" => getServerTag(),
							"hospital_id" => $hospital_id
						];

						$this->db->insert('patient_sickleave_detail', $insert_patient_sickleave_detail); 
						$sick_inserted_id = $this->db->insert_id();

						$apply_date = date('Y-m-d', strtotime("+1 day", strtotime($apply_date)));

						// Update Table 
						$whereSick = [
							"id" => $sick_inserted_id,
							"servertag" => getServerTag(),
							"hospital_id" => $hospital_id
						];
						$upda_SickLeave = [
							"unique_id" => generateUniqRowID($sick_inserted_id,getServerTag(),$hospital_id)
						];
						$this->commondatamodel->updateSingleTableData('patient_sickleave_detail',$upda_SickLeave,$whereSick);
					

					}

			}



			
			$updArry = [
				"registration.served_flag" => 'Y',
			];
			
			$whereReg = [
				"registration.unique_id" => $registrationID,
				"registration.hospital_id" => $hospital_id,
			];
			
			$this->db->where($whereReg);
			$this->db->update('registration', $updArry); 
			
		
			if($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
				return false;
            } else {
				
				$this->db->trans_commit();
				$returnData = [];
				$returnData = [
					"prescription" => $opd_uniq_id,
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
	
	private function insertIntoMedicines($hospital_id,$opd_precp_id,$healthprofile_inserted_id,$medicineData){
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
					"prescription_admission_id" => $opd_precp_id,
					"opd_ipd_flag" => 'O',
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
	
	private function insertIntoTestReports($hospital_id,$opd_precp_id,$healthprofile_inserted_id,$reportsData){
		if(isset($reportsData)){
			$len = count($reportsData);
			$insert_arry = [];
			for($i=0; $i<$len; $i++){
				
				$testsrow = $reportsData[$i]->reports;
				
				$insert_arry = [
					"hospital_id" => $hospital_id,
					"prescription_addmission_id" => $opd_precp_id,
					"opd_ipd_flag" => 'O',
					"test_id" => $testsrow->id,
				//	"date" => date('Y-m-d',strtotime($reportsData[$i]->invdate)),
					"date" => date('Y-m-d'),
					"health_profile_id" => $healthprofile_inserted_id,
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
	
	/*
	 * @used in model (Opd_model.php,Vaccination_model.php)
	 * using this method at various models . In order to modify consider above models.
	 */
	
	public function getLatestPrescriptionID($hospital_id){
		$lastnumber = 0;
		$nextPrescptionID = 0;
		
		$where = [
			"opd_prescription.hospital_id" => $hospital_id
		];
		
		$query = $this->db
						 ->select("*")
                         ->from("opd_prescription") 
						 ->where($where)
						 ->limit(1)
						 ->order_by('opd_prescription.id','DESC')
                         ->get();
		if($query->num_rows()>0)
		{
			$row = $query->row();
			$lastnumber = $row->id;
        }
		else {
			$lastnumber = 1;
		}
		
		$digit = (int)(log($lastnumber,10)+1) ;  
		//echo "Digit is ".$digit;
        if($digit==5){
            $nextPrescptionID = $lastnumber;
        }
		elseif ($digit==4) {
            $nextPrescptionID = "0".$lastnumber;
        }
		elseif($digit==3){
            $nextPrescptionID = "00".$lastnumber;
        }
		elseif($digit==2){
            $nextPrescptionID = "000".$lastnumber;
        }
		elseif($digit==1){
            $nextPrescptionID = "0000".$lastnumber;
        }
		return $nextPrescptionID;
		
	}
	
	private function getArrayIDAsString($datas){
		$ids = "";
		$ids_expl = "";
		if($datas){
			$len = count($datas);
			for($i=0;$i<$len; $i++){
				$ids .= $datas[$i]->id.",";
			}
			$ids_expl = rtrim($ids,',');
		}
		return $ids_expl;
	}
	
    /**
     * @name getTodayRegistration
     * @author Mithilesh Routh
     * @return $data
     * @desc get all todays registration data
     */
    public function getTodayRegistration($hospitalid)
    {
        $resultdata = "";
		$today = date("Y-m-d");
		$where = [
			"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $today,
			"registration.hospital_id" => $hospitalid
		];
	
		$query = $this->db->select("
									patients.patient_code,
									patients.patient_name,
									DATE_FORMAT(patients.`dob`,'%d-%m-%Y') As birthdate,
									patients.gender,
									patients.division_number,
									patients.challan_number,
									patients.line_number,
									patients.mobile_one,
									patients.adhar
								",FALSE)
                         ->from("registration") 
						 ->join("patients","patients.patient_id = registration.patient_id","INNER")
						 ->where($where)
						 ->order_by('registration.date_of_registration','DESC')
                         ->get();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
    }
    
	
	/**
     * @name registerPatient
     * @author Mithilesh Routh
     * @return $patient_data
     * @desc register patient datas
     */
	 
    public function registerPatient($request,$hospital_id)
    {
       		try {
		
            $this->db->trans_begin();
			$reg_data = [];
				$pcode = $request->values;
				
				$regdate = date("Y-m-d H:i:s");
				
			$patientid = $this->patient->getPatientByCode($pcode)->patient_id;
			
			$reg_data = [
					"hospital_id" => $hospital_id,
					"date_of_registration" => $regdate,
					"patient_id" => (trim(htmlspecialchars($patientid))),
					"served_flag" => "N"
				];
			
			$this->db->insert('registration', $reg_data);
			
			if($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
				return false;
            } else {
				$this->db->trans_commit();
                return true;
            }
        } 
		catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
	
	public function searchPatient($request){
		$patient_data="";
		$searchType = $request->stype;
		$formValue = $request->values;
		if($searchType=="BASIC"){
			
			$patientID = $formValue->patientID;
			$patientAadhar = $formValue->patientAadhar;
			
			 $query = $this->db->select("patients.*,patient_type.*")
                         ->from("patients") 
                         ->join("patient_type","patients.patient_type_id = patient_type.patient_type_id","LEFT")
						 ->where("(patients.patient_code = '$patientID' OR patients.adhar = '$patientAadhar')")
                         ->get();
		}
		else if($searchType=="ADV"){
			$patientName = $formValue->patientNameCtrl;
			$patientDOB = $formValue->patientDOBCtrl;
			$patientMobile = $formValue->patientMobileCtrl;
			
			$where = [
				"patients.patient_name" => $patientName,
				"patients.dob" => $patientDOB,
				"patients.mobile_one" => $patientMobile
			];
			
			 $query = $this->db->select("patients.*,patient_type.*")
                         ->from("patients") 
                         ->join("patient_type","patients.patient_type_id = patient_type.patient_type_id","LEFT")
						 ->where($where)
                         ->get();
		}
		//echo $this->db->last_query();
		if($query->num_rows()>0){
				$patient_data = $query->row();
            }
        return $patient_data;
	}
	
	
	public function isRegisteredToday($request,$hospital_id){
		$isAlreadyReg = false;
		
		$regdate = date("Y-m-d");
		$searchType = $request->stype;
		$formValue = $request->values;
		
	
		
		if($searchType=="BASIC"){
			$pdetail = $formValue->patientID;
			$padhardtl = $formValue->patientAadhar;
		
			$patient_id = NULL ; 
			if($padhardtl){
				 $patient_id = $padhardtl->id;
			}
			if($pdetail){
				$patient_id = $pdetail->id;
			}
			$where = [
				"registration.hospital_id" => $hospital_id,
				"registration.patient_id" => $patient_id,
				"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $regdate
			];
			$query = $this->db
						 ->select("*")
                         ->from("registration") 
                         ->where($where)
                         ->get();
			
				//echo $this->db->last_query();
		}
		else if($searchType=="ADV"){
			$patientName = $formValue->patientNameCtrl;
			$patientDOB = $formValue->patientDOBCtrl;
			$patientMobile = $formValue->patientMobileCtrl;
			
			
			
			
			$where = [
				"registration.hospital_id" => $hospital_id,
				"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $regdate,
				"patients.patient_name" => $patientName,
				"DATE_FORMAT(`patients`.`dob`,'%Y-%m-%d')" => date('Y-m-d', strtotime($patientDOB)),
				"patients.mobile_one" => $patientMobile
			];
			
			$query = $this->db
						 ->select("*")
                         ->from("registration") 
						 ->join("patients","patients.patient_id = registration.patient_id" , "INNER")
                         ->where($where)
                         ->get();
		}
		//echo $this->db->last_query();
		if($query->num_rows()>0)
		{
			$isAlreadyReg = true;
        }
        return $isAlreadyReg;
	}
	
	
	/**
     * @name getTodaysRegDoct
     * @author Mithilesh Routh
     * @return $data
     * @desc get all todays registration data for doctors
     */
    public function getTodaysRegDoct($hospitalid,$request)
    {
        $resultdata = "";
		$today = date("Y-m-d");
		
		$type = $request->type;
		$serve = $request->serve;
		
		$conditional_where = [];
		
		if($type == "P/W" || $type == "T/W" || $type == "N/W" || $type == "Dep"){
			$conditional_where = [
					"registration.served_flag" => $serve,
					"patient_type.alias_code" => $type
				];
		}
		else if($type == "ALL"){
			$conditional_where = [
					"registration.served_flag" => $serve
				];
		}
		else if($type == "VISITED"){
			$conditional_where = [
					"registration.served_flag" => $serve
				];
		}
		else {
			$conditional_where = [];
		}
		
		
		$where = [
			"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $today,
			"registration.hospital_id" => $hospitalid
		];
	
		$query = $this->db->select("
									patients.patient_code,
									patients.patient_name,
									DATE_FORMAT(patients.`dob`,'%d-%m-%Y') As birthdate,
									patients.gender,
									patients.division_number,
									patients.challan_number,
									patients.line_number,
									patients.mobile_one,
									patients.adhar
								",FALSE)
                         ->from("registration") 
						 ->join("patients","patients.patient_id = registration.patient_id","INNER")
						 ->join("patient_type","patient_type.patient_type_id = patients.patient_type_id","INNER")
						 ->where($where)
						 ->where($conditional_where)
						 ->order_by('registration.date_of_registration')
                         ->get();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
    }
	
	
	public function getPrescriptionDataByPrescCode($presccode) {
		$row_data="";
		$where = [
			"opd_prescription.opd_prescription_id" => $presccode
		];
		$query = $this->db->select("opd_prescription.*")
                         ->from("opd_prescription") 
                         ->where($where)
                         ->get();
						
		if($query->num_rows()>0){
				$row_data = $query->row();
            }
        return $row_data;
	}


	public function getOpdPatientPrescHistory($patientID,$hospital_id) {
		$patient_data = [];
		$where = [
			"patient_health_profile.patient_id" => $patientID,
			"patient_health_profile.opd_ipd_flag" => "O"
		];
		$query = $this->db->select("
								  `patients`.`patient_id` as patientid,
									patients.`patient_code`,
									patients.`patient_name`,
									DATE_FORMAT(patient_health_profile.`date`,'%d-%m-%Y') AS healthprofileDt,
									patient_health_profile.patient_health_profile_id,
									patient_health_profile.unique_id AS health_profile_uid,
									patient_health_profile.`prescription_addmission_id`
									" , FALSE)
							 ->from("patient_health_profile") 
							 ->join("patients","patients.patient_id = patient_health_profile.patient_id","LEFT")
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
							"patienthealthProfileData" => $this->patient->getHealthProfileData($rows->prescription_addmission_id,"O",$rows->health_profile_uid),
							"medicineDatas" => $this->medicine->getLastPrescMedicines($rows->prescription_addmission_id,"O",$hospital_id,$rows->health_profile_uid),
							"investigationsData" => $this->investigation->getLastPrescTestReports($rows->prescription_addmission_id ,"O",$hospital_id,$rows->health_profile_uid)
						];
						
					}
			}
        return $patient_data;
	}

    
}
