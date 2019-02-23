<?php
if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Patient_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model("Relation_model", "relation", TRUE);
    }

    /**
     *
     * @name getPatientList
     * @author Abhik Ghosh<amiabhik@gmail.com>
     * @return $patient_data get all patient and their type
     */
    public function getPatientList()
    {
        $patient_data = "";
        /*
         * $query = $this->db->select("patients.*,patient_type.*")
         * ->from("patients")
         * ->join("patient_type","patients.patient_type_id = patient_type.patient_type_id","LEFT")
         * ->get();
         */

        $query = $this->db->select("patients.patient_id,patients.patient_code,patients.patient_name,patients.mobile_one,patients.employee_id,patients.adhar")
            ->from("patients")
            ->limit(50)
            ->get();

        if ($query->num_rows() > 0) {
            $patient_data = $query->result();
        }
        return $patient_data;
    }

    /**
     *
     * @name getPatientList
     * @return $patient_data get all patient and their type
     */
    public function patientSearchByCode($pcode)
    {
        $patient_data = "";
        $query = $this->db->select("patients.patient_id,patients.patient_code,patients.patient_name,patients.mobile_one,patients.employee_id,patients.adhar")
            ->from("patients")
            ->like('patients.patient_code', $pcode)
            ->limit(20)
            ->get();

        if ($query->num_rows() > 0) {
            $patient_data = $query->result();
        }
        return $patient_data;
    }

    /**
     *
     * @name getPatientList
     * @return $patient_data get all patient and their type
     */
    public function patientSearchByQry($qry,$hospital_id)
    {
        $patient_data = "";
        $query = $this->db->select("
                patients.patient_id,
                patients.patient_code,
                patients.patient_name,
                patients.mobile_one,
                patients.employee_id,
                patients.adhar,
                patients.line_number,
                patients.division_number,
                patients.challan_number,
                patients.house_no
                ")
            ->from("patients")
            ->like('patients.patient_code', $qry)
            ->or_like('patients.patient_name', $qry)
            ->or_like('patients.mobile_one', $qry)
            ->or_like('patients.adhar', $qry)
            ->where('patients.hospital_id',$hospital_id)
            ->order_by('patients.patient_name', 'ASC')
            ->limit(20)
            ->get();
        //echo $this->db->last_query();
        if ($query->num_rows() > 0) {
            $patient_data = $query->result();
        }
        return $patient_data;
    }

    /**
     *
     * @name getPatientList
     * @return $patient_data get all patient and their type
     */
    public function associateEmpByCode($pcode,$hospital_id)
    {
        $patient_data = "";
        $query = $this->db->select("patients.patient_id,
                            patients.patient_code,
                            patients.patient_name,
                            patients.mobile_one,
                            patients.employee_id,
                            patients.adhar,
                            patients.line_number,
                            patients.division_number,
                            patients.challan_number,
                            patients.house_no
                            ")
            ->from("patients")
            ->where(array(
            'patients.employee_id' => NULL
        ))
            ->where('patients.hospital_id',$hospital_id)
            ->like('patients.patient_code', $pcode)
            ->or_like('patients.patient_name', $pcode)
            ->limit(20)
            ->get();

        if ($query->num_rows() > 0) {
            $patient_data = $query->result();
        }
        return $patient_data;
    }

    /**
     *
     * @name getPatientList
     * @return $patient_data get all patient and their type
     */
    public function patientSearchByAadhar($aadhar)
    {
        $patient_data = "";
        $query = $this->db->select("patients.patient_id,patients.patient_code,patients.patient_name,patients.mobile_one,patients.employee_id,patients.adhar")
            ->from("patients")
            ->like('patients.adhar', $aadhar)
            ->limit(20)
            ->where('patients.adhar IS NOT NULL')
            ->get();
        // echo $this->db->last_query();
        if ($query->num_rows() > 0) {
            $patient_data = $query->result();
        }
        return $patient_data;
    }

    /**
     *
     * @name getPatientListIPDByEmp
     * @return $patient_data
     */
    public function getPatientListIPDByEmp($empcode)
    {
        $where = [
            "patients.patient_code" => $empcode
        ];
        $patient_data = [];
        $query = $this->db->select("patients.patient_id,patients.patient_code,patients.patient_name,patients.mobile_one,patients.employee_id,patients.adhar,patients.blood_group")
            ->from("patients")
            ->where($where)
            ->get();
        // echo $this->db->last_query();
        if ($query->num_rows() > 0) {
            $patient_data = $query->result();
        }
        return $patient_data;
    }

    /**
     *
     * @name getPatientListIPDByEmpNRel
     * @return $patient_data
     */
    public function getPatientListIPDByEmpNRel($empcode, $rel)
    {
        $where = [
            "patients.employee_id" => $empcode,
            "patients.relation_id" => $rel
        ];
        $patient_data = [];
        $query = $this->db->select("patients.patient_id,patients.patient_code,patients.patient_name,patients.mobile_one,patients.employee_id,patients.adhar,patients.blood_group")
            ->from("patients")
            ->where($where)
            ->get();
        // echo $this->db->last_query();
        if ($query->num_rows() > 0) {
            $patient_data = $query->result();
        }
        return $patient_data;
    }

    /**
     *
     * @name registerPatient
     * @author Mithilesh Routh
     * @return $patient_data register patient datas
     */
    public function registerPatient($request)
    {
        try {

            $this->db->trans_begin();
            $reg_data = [];
            $hospital_id = $request->hospital_id;
            $regdata = $request->values;

            $formatedate = new DateTime($regdata->regdate);
            $reg_date = $formatedate->format('Y-m-d H:i:s');

            $patient_id = $regdata->hdnPatientID;

            $reg_data = [
                "hospital_id" => (trim(htmlspecialchars($hospital_id))),
                "date_of_registration" => trim(htmlspecialchars($reg_date)),
                "patient_id" => (trim(htmlspecialchars($patient_id))),
                "served_flag" => "N"
            ];

            // $this->db->insert('registration', $reg_data);

            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                return false;
            } else {
                $this->db->trans_commit();
                return true;
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    /**
     *
     * @name addNewPatient
     * @author Mithilesh Routh
     * @return $patient_data register patient datas
     */
    public function addNewPatient($request,$hospital_id)
    {
        try {

            $this->db->trans_begin();
            $patient_data = [];

            /* Commented on 06.02.2019 ...do not remove thiscode for future use ....
            $patientdata = $request->values;
            $associateEmpl = $patientdata->associateEmplCtrl;
            $patienttypCtrl = $patientdata->patienttypeCtrl;

            $relationID = $patientdata->relationCtrl;
            $employee = $associateEmpl->code;

            $srl_no = $this->getEmployeeSerialCode($associateEmpl->code);
            $relation_code = $this->relation->getRelationCodeById($relationID);

            $employeGenCode = $this->generateEmployeeCode($employee, $relation_code, $srl_no);

            $formatedate = new DateTime($patientdata->dobCtrl);
            $pcode = $employeGenCode;
            $pname = $patientdata->pnameCtrl;
            $ptypeid = $patienttypCtrl->patient_type_id;
            $lineno = $patientdata->linenoCtrl;
            $divisionno = $patientdata->divisionCtrl;
            $challanno = $patientdata->challannoCtrl;
            $estate = $patientdata->estateCtrl;
            $dob = $formatedate->format('Y-m-d');
            $gender = $patientdata->gender;

            $employeeid = NULL;
            if (isset($associateEmpl->code)) {
                $employeeid = $associateEmpl->code;
            }
            $aadhar = $patientdata->aadharCtrl;
            $mobile = $patientdata->mobileCtrl;
            $alternatembl = $patientdata->alternatemblCtrl;

            $bloodgrp = NULL;
            if(!empty($patientdata->bldgrpCtrl) && isset($patientdata->bldgrpCtrl)) {
                $bloodgrp = $patientdata->bldgrpCtrl;
            }
            

          

            $patient_data = [
                "patients.patient_code" => trim(htmlspecialchars($pcode)),
                "patients.patient_name" => trim(htmlspecialchars($pname)),
                "patients.patient_type_id" => $ptypeid,
                "patients.line_number" => trim(htmlspecialchars($lineno)),
                "patients.division_number" => trim(htmlspecialchars($divisionno)),
                "patients.challan_number" => trim(htmlspecialchars($challanno)),
                "patients.estate" => $estate,
                "patients.dob" => $dob,
                "patients.gender" => trim(htmlspecialchars($gender)),
                "patients.employee_id" => $employeeid,
                "patients.adhar" => trim(htmlspecialchars($aadhar)),
                "patients.mobile_one" => trim(htmlspecialchars($mobile)),
                "patients.mobile_two" => trim(htmlspecialchars($alternatembl)),
                "patients.blood_group" => $bloodgrp,
                "patients.relation_id" => $relationID
            ];

            

            $this->db->insert('patients', $patient_data);

            $updateArr = [
                "patients.last_srl_code" => $srl_no
            ];

            $this->db->where('patients.patient_id', $associateEmpl->id);
            $this->db->update('patients', $updateArr);
            // echo $this->db->last_query();

            */

            $patientdata = $request->values;

            //pre($request->dob);
            $patienttypCtrl = $patientdata->patienttypeCtrl;

            $pname = $patientdata->pnameCtrl;
            $ptypeid = $patienttypCtrl->patient_type_id;
            $lineno = $patientdata->linenoCtrl;
            $divisionno = $patientdata->divisionCtrl;
            $challanno = $patientdata->challannoCtrl;
           
            // $dob = $formatedate->format('Y-m-d');
            $gender = $patientdata->gender;

            

            $estate = NULL;
            if(!empty($patientdata->estateCtrl) && isset($patientdata->estateCtrl)) {
                $estate = $patientdata->estateCtrl;
            }

            /*
            $employeeid = NULL;
            if (isset($patientdata->associateEmplCtrl) && !empty($patientdata->associateEmplCtrl)) {
                $associateEmpl = $patientdata->associateEmplCtrl;
                $employeeid = $associateEmpl->code;
            }
            */

            $employeeid = NULL;
            if(!empty($patientdata->patientAdvSearchCtrl) && isset($patientdata->patientAdvSearchCtrl)) {
                $patientrow = $this->getPatientByPatientID($patientdata->patientAdvSearchCtrl);
                $employeeid = $patientrow->patient_code;
            }
           
            
            $aadhar = NULL;
            if(!empty(trim($patientdata->aadharCtrl)) && isset( $patientdata->aadharCtrl)) {
                $aadhar = $patientdata->aadharCtrl;
            }

            
            $mobile = NULL;
            if(!empty($patientdata->mobileCtrl) && isset($patientdata->mobileCtrl)) {
                $mobile = $patientdata->mobileCtrl;
            }

            
            $alternatembl = NULL;
            if(!empty($patientdata->alternatemblCtrl) && isset($patientdata->alternatemblCtrl)) {
                $alternatembl =$patientdata->alternatemblCtrl;
            }


            $bloodgrp = NULL;
            if(!empty($patientdata->bldgrpCtrl) && isset($patientdata->bldgrpCtrl)) {
                $bloodgrp = $patientdata->bldgrpCtrl;
            }
            
            $relationID = NULL;
            if(!empty($patientdata->relationCtrl) && isset($patientdata->relationCtrl)) {
                $relationID = $patientdata->relationCtrl;
            }

            $patient_code=NULL;
            if($request->dob!='' &&  $employeeid!=''){
               // echo date("d-m-Y", strtotime($request->dob));
               // echo "T".$employeeid;

                $patient_code=$employeeid."/".date("d-m-Y", strtotime($request->dob));
            }

            $pdob  = NULL;
            if(isset($request->dob)){
                $pdob =  $request->dob;
            }
           

            $patient_data = [
                "patients.patient_code" => $patient_code,
                "patients.patient_name" => trim(htmlspecialchars($pname)),
                "patients.patient_type_id" => $ptypeid,
                "patients.line_number" => trim(htmlspecialchars($lineno)),
                "patients.division_number" => trim(htmlspecialchars($divisionno)),
                "patients.challan_number" => trim(htmlspecialchars($challanno)),
                "patients.estate" => $estate,
                "patients.dob" => trim(htmlspecialchars($pdob)), 
                "patients.age" => trim(htmlspecialchars($patientdata->ageCtrl)), 
                "patients.gender" => trim(htmlspecialchars($gender)),
                "patients.employee_id" => $employeeid,
                "patients.adhar" => trim(htmlspecialchars($aadhar)),
                "patients.mobile_one" => trim(htmlspecialchars($mobile)),
                "patients.mobile_two" => trim(htmlspecialchars($alternatembl)),
                "patients.blood_group" => $bloodgrp,
                "patients.relation_id" => $relationID,
                "patients.entry_from" => "MANUAL",
                "patients.currant_status" => "Active",
                "patients.reason" => trim(htmlspecialchars($patientdata->reasonCtrl)),
                "patients.hospital_id" => $hospital_id
            ];

           $this->db->insert('patients', $patient_data);
           $last_insert_id = $this->db->insert_id();


            // echo $this->db->last_query();

            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                return false;
            } else {
                $this->db->trans_commit();
                /**
                 * return $pcode;
                 */
                return $last_insert_id;
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    private function getEmployeeSerialCode($employee_code)
    {
        $last_srl = (int) (0);
        $srl = (int) (0);
        $query = $this->db->select("*")
            ->from("patients")
            ->where("patients.patient_code", $employee_code)
            ->get();
        if ($query->num_rows() > 0) {
            $data = $query->row();
            $last_srl = $data->last_srl_code;
            $srl = $last_srl + 1;
        }
        return $srl;
    }

    private function generateEmployeeCode($emplcode, $relationcode, $srl)
    {
        $generated_code = "";

        $generated_code = $emplcode . "/" . $relationcode . "/" . $srl;
        return $generated_code;
    }

    public function searchPatient($request,$hospital_id)
    {
        /*
        echo "<pre>";
        print_r($request);
        echo "</pre>";
        */

        $patient_data = "";
        $searchType = $request->stype;
        $formValue = $request->values;

        
        
        /*
        closed on 17.01.2019 ======================================= Because one field searching enabled
        if ($searchType == "BASIC") {
            $pdetail = $formValue->patientID;
            $padhardtl = trim($formValue->patientAadhar);

            $pAadharNo = NULL;
            $pId = NULL;

            if (strlen(trim($padhardtl)) > 0) {
                $pAadharNo = trim($padhardtl->aadhar);
            }
            if ($pdetail) {
                $pId = trim($pdetail->code);
            }

            if ($pId != "" &&  empty($padhardtl)) {
                $query = $this->db->select("patients.*,DATE_FORMAT(patients.dob,'%d-%m-%Y') AS pdob,patient_type.*", FALSE)
                    ->from("patients")
                    ->join("patient_type", "patients.patient_type_id = patient_type.patient_type_id", "LEFT")
                    ->where("(patients.patient_code = '$pId')")
                    ->get();

            }
            else if(empty($pId) &&  $padhardtl!= ""){
                $query = $this->db->select("patients.*,DATE_FORMAT(patients.dob,'%d-%m-%Y') AS pdob,patient_type.*", FALSE)
                ->from("patients")
                ->join("patient_type", "patients.patient_type_id = patient_type.patient_type_id", "LEFT")
                ->where("(patients.adhar = '$pAadharNo')")
                ->get();
            }
            else{
                 $query = $this->db->select("patients.*,DATE_FORMAT(patients.dob,'%d-%m-%Y') AS pdob,patient_type.*", FALSE)
                ->from("patients")
                ->join("patient_type", "patients.patient_type_id = patient_type.patient_type_id", "LEFT")
                ->where("(patients.patient_code = '$pId' OR patients.adhar = '$pAadharNo')")
                ->get();
            }
            //echo $this->db->last_query();
            if ($query->num_rows() > 0) {
                $patient_data = $query->row();
            }

        } else if ($searchType == "ADV") {
            $patientName = $formValue->patientNameCtrl;
            $patientDOB = $formValue->patientDOBCtrl;
            $patientMobile = $formValue->patientMobileCtrl;

            $where = [
                "patients.patient_name" => $patientName,
                "DATE_FORMAT(patients.dob,'%Y-%m-%d')" => date('Y-m-d', strtotime($patientDOB)),
                "patients.mobile_one" => $patientMobile
            ];

            if ($patientName != "" && $patientDOB != "" && $patientMobile != "") {

                $query = $this->db->select("patients.*,
										DATE_FORMAT(patients.dob,'%d-%m-%Y') AS pdob,
										patient_type.*", FALSE)
                    ->from("patients")
                    ->join("patient_type", "patients.patient_type_id = patient_type.patient_type_id", "LEFT")
                    ->where($where)
                    ->get();

                if ($query->num_rows() > 0) {
                    $patient_data = $query->row();
                }
            }
        }

        */

        $patientid = $formValue->patientAdvSearchCtrl;

        $query = $this->db->select("patients.*,DATE_FORMAT(patients.dob,'%d-%m-%Y') AS pdob,patient_type.*", FALSE)
        ->from("patients")
        ->join("patient_type", "patients.patient_type_id = patient_type.patient_type_id", "LEFT")
        ->where("patients.patient_id",$patientid)
        ->where("patients.hospital_id",$hospital_id)
        ->get();
        
        if ($query->num_rows() > 0) {
            $patient_data = $query->row();
        }

        return $patient_data;
    }

    public function getPatientByCode($pcode)
    {
        $patient_data = "";
        $where = [
            "patients.patient_code" => $pcode
        ];
        $query = $this->db->select("patients.*,patient_type.*,relationship_master.relation")
            ->from("patients")
            ->join("patient_type", "patients.patient_type_id = patient_type.patient_type_id", "LEFT")
            ->join("relationship_master", "patients.relation_id = relationship_master.id", "LEFT")
            ->where($where)
            ->get();
        //  echo $this->db->last_query();

        if ($query->num_rows() > 0) {
            $patient_data = $query->row();
        }
        return $patient_data;
    }


    public function getPatientByPatientID($pid)
    {
        $patient_data = "";
        $where = [
            "patients.patient_id" => $pid
        ];
        $query = $this->db->select("patients.*,patient_type.*,relationship_master.relation")
            ->from("patients")
            ->join("patient_type", "patients.patient_type_id = patient_type.patient_type_id", "LEFT")
            ->join("relationship_master", "patients.relation_id = relationship_master.id", "LEFT")
            ->where($where)
            ->get();
          #echo $this->db->last_query();

        if ($query->num_rows() > 0) {
            $patient_data = $query->row();
        }
        return $patient_data;
    }

    /**
     * get list of sick approved patient
     *
     * @author Abhik
     * @date 22/10/2018
     */
    public function getSickApprovedList()
    {
        $resultdata = [];
        $today = date("Y-m-d");
        
        /*
        $where = [
            "opd_prescription.sick_flag" => "Y",
            "DATE_FORMAT(`opd_prescription`.`date`,'%Y-%m-%d')" => date("Y-m-d")
        ];

        $query = $this->db->select("opd_prescription.*,patients.*")
            ->from("opd_prescription")
            ->join("patients", "opd_prescription.patient_id=patients.patient_id")
            ->where($where)
            ->get();

        */


        $where = [
            
             "DATE_FORMAT(`patient_sickleave_detail`.`applied_for_date`,'%Y-%m-%d')" => $today
        ];

        $query = $this->db->select("
                        patient_sickleave_detail.*,
                        patients.*")
            ->from("patient_sickleave_detail")
            ->join("patients", "patient_sickleave_detail.patient_id=patients.patient_id")
            ->where($where)
            ->get();


        if ($query->num_rows() > 0) {
            $resultdata = $query->result();
        }
        return $resultdata;
    }

    /**
     *
     * @param type $request
     */
    public function updateSickApprovalStatus($id, $status ,$userid)
    {
        $rsltSt = FALSE;
        try {
            $this->db->trans_begin();

            $updAry = [

                "patient_sickleave_detail.is_approved" => $status,
                "patient_sickleave_detail.approved_by" => $userid,
                "patient_sickleave_detail.approved_on" => date("Y-m-d H:i:s")
            ];
            $this->db->where("patient_sickleave_detail.id", $id);
            $this->db->update("patient_sickleave_detail", $updAry);

            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $rsltSt = FALSE;
            } else {
                $this->db->trans_commit();
                $rsltSt = TRUE;
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $rsltSt;
    }

    public function getCountTotalRegister($currentDate)
    {
        $totalRegister = 0;
        $searchDate = "";
        if ($currentDate != "") {
            $searchDate = $currentDate;
        } else {
            $searchDate = date("Y-m-d");
        }

        $where = [
            "DATE_FORMAT(`patient_sickleave_detail`.`applied_for_date`,'%Y-%m-%d')" => $searchDate
        ];
        $query = $this->db->select("COUNT(*)as cnt")
            ->from("patient_sickleave_detail")
            ->where($where)
            ->get();
        // echo($this->db->last_query());
        if ($query->num_rows() > 0) {
            $row = $query->row();
            $totalRegister = $row->cnt;
        }
        // echo($totalRegister);
        return $totalRegister;
    }

    public function getCountSickApprove($currentDate)
    {
        $totalSickApproved = 0;
        $searchDate = "";
        if ($currentDate != "") {
            $searchDate = $currentDate;
        } else {
            $searchDate = date("Y-m-d");
        }

        $where = [
            "DATE_FORMAT(`patient_sickleave_detail`.`applied_for_date`,'%Y-%m-%d')" => $searchDate,
            "patient_sickleave_detail.is_approved" => 'Y'
        ];
        $query = $this->db->select("COUNT(*)as cnt")
            ->from("patient_sickleave_detail")
            ->where($where)
            ->get();
        // echo($this->db->last_query());
        if ($query->num_rows() > 0) {
            $row = $query->row();
            $totalSickApproved = $row->cnt;
        }
        // echo($totalSickApproved);
        return $totalSickApproved;
    }



    public function getHealthProfileData($adms_pres_id,$flag,$healthprofile_id) {
		$resultdata = "";
		$where = [
			"patient_health_profile.prescription_addmission_id" => $adms_pres_id , 
			"patient_health_profile.opd_ipd_flag" => $flag,
			//"patient_health_profile.patient_health_profile_id" => $healthprofile_id
			"patient_health_profile.unique_id" => $healthprofile_id
		];
	
		$query = $this->db->select("*")
                         ->from("patient_health_profile") 
						 ->where($where)
						 ->get();
		
        if($query->num_rows()>0) {
            $resultdata=$query->result();
        }
        return $resultdata;
	}
	
	
	/* -----------------------------------8 Feb 2019------------------------------------- */
    public function getPatientListbyDrType($request)
    {  
         $dr_type=$request->datas;
       
        $patient_data = "";
        $where = array('patients.patient_type_id' => $dr_type , );
        $query = $this->db->select("patients.*,patient_type.dr_type,DATE_FORMAT(patients.dob,'%d-%m-%Y') as dateofbirth")
            ->from("patients")
            ->join("patient_type", "patient_type.patient_type_id = patients.patient_type_id", "LEFT")
            ->where($where)
            ->get();

        if ($query->num_rows() > 0) {
            $patient_data = $query->result();
        }
        return $patient_data;
    }

/* -----------------------------------21 Feb 2019------------------------------------- */

    public function getIPDPatientByUniqueID($uniqueid)
    {
        $patient_data = "";
        $where = [
            "ipd_patient_master.unique_id" => $uniqueid
        ];
        $query = $this->db->select(
                                    "ipd_patient_master.*,
                                     patients.patient_name as associate_permworker_name,
                                     patients.patient_code as associate_permworker_code,
                                    ")
            ->from("ipd_patient_master")
           
            ->join("patients" , "patients.patient_id = ipd_patient_master.associate_permworker_id" , "LEFT")
            ->where($where)
            ->get();
         # echo $this->db->last_query();

        if ($query->num_rows() > 0) {
            $patient_data = $query->row();
        }
        return $patient_data;
    }





     /**
     * get list of sick leave register list
     *
     * @author Shankha
     * @date 22/02/2019
     */
    public function getSickleaveregisterList($request, $hospital_id)
    {
        $resultdata = [];
        $formData = $request->data;
	
		 $from_date = $formData->searchFromDateCtrl;
         $to_date = $formData->searchToDateCtrl;
        
      


        $where = [
            
             "patient_sickleave_detail.is_approved" => 'Y'
        ]; 

        $query = $this->db->select("
                       
                        DATE_FORMAT(patient_sickleave_detail.applied_for_date,'%d-%m-%Y') as Apply_Date,
                        DATE_FORMAT(patient_sickleave_detail.approved_on,'%d-%m-%Y') as Approve_Date,
                        patients.patient_code as Patient_Code,
                        patients.patient_name as Patient_Name,
                        patients.challan_number as Challan_Number, 
                        patients.division_number as Division_Number,
                        patients.line_number as Line_Number
                        
                        ")
            ->from("patient_sickleave_detail")
            ->join("patients", "patient_sickleave_detail.patient_id=patients.patient_id", "LEFT")
            ->where('DATE_FORMAT(patient_sickleave_detail.applied_for_date,"%Y-%m-%d") BETWEEN "'. date('Y-m-d', strtotime($from_date)). '" AND "'. date('Y-m-d', strtotime($to_date)).'"')
            ->where($where)
            ->get();
#q();

        if ($query->num_rows() > 0) {
            $resultdata = $query->result();
        }
        return $resultdata;
    }

}// ens of class
