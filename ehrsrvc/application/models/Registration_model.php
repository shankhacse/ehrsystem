<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Registration_model extends CI_Model{
    
	public function __construct() {
        parent::__construct();
		$this->load->model("Patient_model", "patient", TRUE);

        
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
			"registration.hospital_id" => $hospitalid,
			"registration.is_deleted" => "N"
		];
	
		$query = $this->db->select("
									registration.registration_id,
									DATE_FORMAT(registration.`date_of_registration`,'%d-%m-%Y') As date_of_registration,
									patients.patient_code,
									patients.patient_name,
									DATE_FORMAT(patients.`dob`,'%d-%m-%Y') As birthdate,
									patients.gender,
									patients.division_number,
									patients.challan_number,
									patients.line_number,
									patients.mobile_one,
									patients.adhar,
									IF(opd_prescription.id IS NULL, 'Y', 'N') AS allowdelete,
									registration.registration_type as regtype
								",FALSE)
                         ->from("registration") 
						 ->join("patients","patients.patient_id = registration.patient_id","INNER")
						 ->join("opd_prescription","opd_prescription.registrationid = registration.registration_id","LEFT")
						 ->where($where)
						 ->order_by('registration.date_of_registration','DESC')
                         ->get();
			//echo $this->db->last_query();			
		
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
			$regdate = date("Y-m-d H:i:s");
			
			/*
			echo "<pre>";
			print_r($request);
			echo "</pre>";
			exit;
			*/
			
			$formvalue = $request->values;
			//$pcode = $formvalue->regpcodeCtrl;
			$patientid = $formvalue->regpcodeCtrl;
			$regType = $formvalue->registrationTypeCtrl;

		
				
			// $patientid = $this->patient->getPatientByCode($pcode)->patient_id;
			
			$reg_data = [
					"hospital_id" => $hospital_id,
					"date_of_registration" => $regdate,
					"patient_id" => (trim(htmlspecialchars($patientid))),
					"registration_type" => trim(htmlspecialchars($regType)),
					"served_flag" => "N",
					"servertag" => getServerTag()
				];
			
			$this->db->insert('registration', $reg_data);
			$inserted_id = $this->db->insert_id();
	


			// Update Table 
			$where = [
				"registration_id" => $inserted_id,
				"servertag" => getServerTag(),
				"hospital_id" => $hospital_id
			];
			$upda_data = [
				"unique_id" => generateUniqRowID($inserted_id,getServerTag(),$hospital_id)
			];
			$this->commondatamodel->updateSingleTableData('registration',$upda_data,$where);

			
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
		/* Closed on 17.01.2019 =   ================================= Because single field serach enable
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
				"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $regdate,
				"registration.is_deleted" => "N"
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
				"patients.mobile_one" => $patientMobile,
				"registration.is_deleted" => "N"
			];
			
			$query = $this->db
						 ->select("*")
                         ->from("registration") 
						 ->join("patients","patients.patient_id = registration.patient_id" , "INNER")
                         ->where($where)
                         ->get();
		}
		
		*/

		
		$patientid = $formValue->patientAdvSearchCtrl;

		$where = [
			"registration.hospital_id" => $hospital_id,
			"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $regdate,
			"patients.patient_id" => $patientid,
			"registration.is_deleted" => "N"
		];

		$query = $this->db
						 ->select("*")
                         ->from("registration") 
						 ->join("patients","patients.patient_id = registration.patient_id" , "INNER")
                         ->where($where)
						 ->get();
						 
		
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
			"registration.hospital_id" => $hospitalid,
			"registration.is_deleted" => 'N'
		];
	
		$query = $this->db->select("
									/* registration.registration_id,*/
									registration.unique_id AS registration_id,
									registration.registration_type AS reg_type,
									patients.patient_code,
                                    patients.patient_id,
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
						 
						// echo $this->db->last_query();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
    }
	


	/**
     * @name todaysRegByRegType
     * @author Mithilesh Routh
     * @return $data
     * @desc get all todays registration data for doctors
     */

    public function todaysRegByRegType($hospitalid,$request)
    {
        $resultdata = [];
		$today = date("Y-m-d");
		
		$type = $request->type;
		$serve = $request->serve;
		$serachDate=date('Y-m-d', strtotime($request->serachDate));
		
		$conditional_where = [];

		$conditional_where = [
			"registration.served_flag" => $serve,
			"registration.registration_type" => $type
		];


		
		/* commented on 25.02.2019 */
		/* $where = [
			"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $today,
			"registration.hospital_id" => $hospitalid,
			"registration.is_deleted" => 'N'
		]; */

		$where = [
			"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $serachDate,
			"registration.hospital_id" => $hospitalid,
			"registration.is_deleted" => 'N'
		];
	
		$query = $this->db->select("
									/* registration.registration_id,*/
									registration.unique_id AS registration_id,
									DATE_FORMAT(registration.`date_of_registration`,'%d-%m-%Y') As date_of_registration,
									registration.registration_type AS reg_type,
									patients.patient_code,
                                    patients.patient_id,
									patients.patient_name,
									DATE_FORMAT(patients.`dob`,'%d-%m-%Y') As birthdate,
									patients.gender,
									patients.division_number,
									patients.challan_number,
									patients.line_number,
									patients.mobile_one,
									patients.adhar,
									patients.age,
									patient_type.patient_type
								",FALSE)
                         ->from("registration") 
						 ->join("patients","patients.patient_id = registration.patient_id","INNER")
						 ->join("patient_type","patient_type.patient_type_id = patients.patient_type_id","INNER")
						 ->where($where)
						 ->where($conditional_where)
						 ->order_by('registration.date_of_registration')
                         ->get();
						 
						// echo $this->db->last_query();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
    }

   

/*---------------------------------------25 February 2019----------------------- */


  /**
     * get list of sick leave register list
     *
     * @author Shankha
     * @date 22/02/2019
     */
    public function getRegListByDateRange($request, $hospital_id)
    {
        $resultdata = [];
        $formData = $request->data;
	
		 $from_date = $request->fromdate;
         $to_date = $request->todate;
         $regTypeCtrl = $formData->regTypeCtrl;
         $patTypeCtrl = $formData->patTypeCtrl;
        
        //pre($formData);
     // exit;
            if($regTypeCtrl!='' && $patTypeCtrl!=''){

				$where = [
					"registration.is_deleted" => 'N',
					"patients.patient_type_id" => $patTypeCtrl,
					"registration.registration_type" => $regTypeCtrl,
                ];
                 
               
            }else if($patTypeCtrl!=''){
                $where = [
					"registration.is_deleted" => 'N',
					"patients.patient_type_id" => $patTypeCtrl,
                ];
               

            }else if($regTypeCtrl!=''){
				$where = [
                    "registration.is_deleted" => 'N',
                    "registration.registration_type" => $regTypeCtrl,
                   
                ];


			}else{
				$where = [
                    "registration.is_deleted" => 'N',
                ];

			}

       

		$query = $this->db->select("
							DATE_FORMAT(registration.`date_of_registration`,'%d-%m-%Y') As date_of_registration,
							registration.registration_type,
							patient_type.patient_type,
							patients.patient_code,
							patients.division_number,
							patients.challan_number,
						
							patients.line_number

                        
                        ")
            ->from("registration")
			->join("patients","patients.patient_id = registration.patient_id","INNER")
			->join("patient_type","patient_type.patient_type_id = patients.patient_type_id","INNER")
            ->where('DATE_FORMAT(registration.date_of_registration,"%Y-%m-%d") BETWEEN "'. date('Y-m-d', strtotime($from_date)). '" AND "'. date('Y-m-d', strtotime($to_date)).'"')
            ->where($where)
            ->get();
#q();

        if ($query->num_rows() > 0) {
            $resultdata = $query->result();
        }
        return $resultdata;
    }


	
	  /**
     * @name getRegistrationBydate
     * @author Shankha Ghosh
     * @return $data
     * @desc get all todays registration data
     */
    public function getRegistrationBydate($request,$hospitalid)
    {  
		//pre($request->data->searchFromDateCtrl);
		$searchdate=date('Y-m-d', strtotime($request->data->searchFromDateCtrl));
        $resultdata = "";
		
		$where = [
			"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $searchdate,
			"registration.hospital_id" => $hospitalid,
			"registration.is_deleted" => "N"
		];
	
		$query = $this->db->select("
									registration.registration_id,
									DATE_FORMAT(registration.`date_of_registration`,'%d-%m-%Y') As date_of_registration,
									patients.patient_code,
									patients.patient_name,
									DATE_FORMAT(patients.`dob`,'%d-%m-%Y') As birthdate,
									patients.gender,
									patients.division_number,
									patients.challan_number,
									patients.line_number,
									patients.mobile_one,
									patients.adhar,
									IF(opd_prescription.id IS NULL, 'Y', 'N') AS allowdelete,
									registration.registration_type as regtype
								",FALSE)
                         ->from("registration") 
						 ->join("patients","patients.patient_id = registration.patient_id","INNER")
						 ->join("opd_prescription","opd_prescription.registrationid = registration.registration_id","LEFT")
						 ->where($where)
						 ->order_by('registration.date_of_registration','DESC')
                         ->get();
			#echo $this->db->last_query();			
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
    }
    
	


}// end of class
