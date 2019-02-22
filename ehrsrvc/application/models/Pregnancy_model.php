<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Pregnancy_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Opd_model", "opd", TRUE);
        $this->load->model("Patient_model", "patient", TRUE);
    }
    
    
    public function getLastPregnencyInfoByCode($patientid) {
        $data = [];
        $where = ["patient_pregnancy_info.patient_id" => $patientid];
        $query = $this->db->select("
                            patient_pregnancy_info.lmp_date,
                            patient_pregnancy_info.estimate_delivery_date,
                            patient_pregnancy_info.next_checkup_dt,
                            patient_pregnancy_info.remarks
                            ")
							 ->from("patient_pregnancy_info") 
							 ->where($where)
							 ->order_by('patient_pregnancy_info.id','DESC')
							 ->limit(1)
                             ->get();
                             
        //echo $this->db->last_query();
        if($query->num_rows()>0){
            $data = $query->row();
			}
        return $data;
    }
    
    
    public function insertIntoPregnancy($request,$hospital_id,$doctor_id) {
        
        try{
            
            $this->db->trans_begin();
            
            /* Form Details
             * ------------------------
             * 1. healthProfileInfo    |
             * 2. estimatedPreginfo    |
             * 3. medicineInfo         |
             * 4. investigationInfo    |
             * 5. pregnancyVaccinInfo  |
             * 6. additionalInfo       |  
             * ------------------------
             */
            
            $vaccine_data = [];
            $todaydt = date("Y-m-d H:i:s");
            $opdPrescriptionArry = [];
            $pregencyInfoArr = [];
            
            /*
                 echo "<pre>";
                 print_r($request);
                 echo "</pre>";
              */ 
            
            $paramData  = $request->objParam;
            $healthPrf = $paramData->healthProfileInfo;
            $pregnencyInfo = $paramData->estimatedPreginfo;
            $medicine = $paramData->medicineInfo;
            $investigation = $paramData->investigationInfo;
            $patientvaccinInfo = $paramData->pregnancyVaccinInfo;
            $additional = $paramData->additionalInfo;


            $registrationID = $healthPrf->hdnregistrationID;
            $pcode = $healthPrf->hdnpatientID;
            
            //$patientid = $this->patient->getPatientByCode($pcode)->patient_id;
            $patientid = $healthPrf->hdnpatientID;
            $opdPrecesptionID = $this->opd->getLatestPrescriptionID($hospital_id);
            
            $pulse = $healthPrf->pulse;
            $tempratute = $healthPrf->tempratute;
            $anaemia = $healthPrf->anaemia;
            $bp = $healthPrf->bp; // used as systolic
            $jaundice = $healthPrf->jaundice;
            $odema = $healthPrf->odema;
            $height = $healthPrf->height;
            $weight = $healthPrf->weight;

            $bpdiastolic = $healthPrf->bpDiastolicCtrl; 
            $sugarFasting = $healthPrf->bldsugarFCtrl; 
            $sugarPP = $healthPrf->bldsugarPPCtrl; 
            $sugarRandom = $healthPrf->bldsugarRCtrl; 
            
            // Additional Comment
           
            $comment = $additional->pregRemarks;
            $next_chekup_dt = $additional->nextChkupDate;
            
           // $vaccineDtlData = $patientvaccinInfo->pregnancyVaccinRows;
            
           /**
            *  update patients table for blood group
            *  Blood Group Info
            */
            if(isset($pregnencyInfo->bloodGrpCtrl)) {
                $bloodGrp = $pregnencyInfo->bloodGrpCtrl;
                    $updData = ["patients.blood_group" => $bloodGrp];
                    $this->db->where('patients.patient_id', $patientid);
                    $this->db->update('patients', $updData);
            }
            

            $opdPrescriptionArry = [
                "opd_prescription_id" => $opdPrecesptionID,
                "registrationid" => $registrationID,
                "hospital_id" => $hospital_id,
                "date" => $todaydt,
                "patient_id" => $patientid,
                "doctor_id" => $doctor_id,
                "accidental_approval" => FALSE,
                "symptom_list" => NULL,
                "diagonised_list" => NULL,
                "sick_flag" => NULL,
                "no_of_days_sick" => NULL,
                "ipd_reco_flag" => "O",
                "hospital_rec_flag" => NULL,
                "referal_hospital_id" => NULL,
                "keep_in_observation" => NULL,
                "comments" => NULL ,
                "prescription_from" => "PREGNANCY" ,
                "servertag" => getServerTag()
            ];
            
            
            
             $this->db->insert('opd_prescription', $opdPrescriptionArry);
             $opd_precp_id = $this->db->insert_id();
             $opd_uniq_id = generateUniqRowID($opd_precp_id,getServerTag(),$hospital_id);

                // Update Table 
                $whereOpdPresc = ["id" => $opd_precp_id,"servertag" => getServerTag(),"hospital_id" => $hospital_id];
                $upda_OpdPresc = ["unique_id" => $opd_uniq_id];
                $this->commondatamodel->updateSingleTableData('opd_prescription',$upda_OpdPresc,$whereOpdPresc);


             // $opd_precp_id = 0;
            
            $pregencyInfoArr = [
                "patient_id" => $patientid,
                "opd_ipd_pres_id" => $opd_uniq_id,
                "opd_ipd_flag" => "O",
                "lmp_date" => date('Y-m-d H:i:s',strtotime($pregnencyInfo->lmpDateCtrl)),
                "estimate_delivery_date" =>date('Y-m-d H:i:s',strtotime($pregnencyInfo->eddDateCtrl)),
                "next_checkup_dt" => date('Y-m-d H:i:s',strtotime($next_chekup_dt)),
                "remarks" => $comment,
                "servertag" => getServerTag(),
                "hospital_id" => $hospital_id

            ];
            
             $this->db->insert('patient_pregnancy_info', $pregencyInfoArr);
             $preg_last_ins_id = $this->db->insert_id();
             
             /** 
              * Update Uniq ID Every Time 
              */
             $wherePreg = ["id" => $preg_last_ins_id,"servertag" => getServerTag(),"hospital_id" => $hospital_id];
             $upda_OpdPreg= ["unique_id" => generateUniqRowID($preg_last_ins_id,getServerTag(),$hospital_id)];
             $this->commondatamodel->updateSingleTableData('patient_pregnancy_info',$upda_OpdPreg,$wherePreg);
            
            
           /*
             echo "<pre>";
             print_r($pregencyInfoArr);
             echo "</pre>";
             */
            
            
            $healthProfileArry = [
                "patient_id" => $patientid,
                "date" => $todaydt,
                "prescription_addmission_id" => $opd_uniq_id,
                "opd_ipd_flag" => 'O',
                "pulse" => $pulse,
                "temp" => $tempratute,
                "anemia" => $anaemia,
                "bp" => $bp, //used as systolic
                "jaundice" => $jaundice,
                "odema" => $odema,
                "height" => $height,
                "weight" => $weight,
                "bp_diastolic" => $bpdiastolic,
				"blood_sugar_f" => $sugarFasting,
				"blood_sugar_pp" => $sugarPP,
				"blood_sugar_random" => $sugarRandom,
                "comment" => NULL,
                "hospital_id" => $hospital_id,
                "servertag" => getServerTag()
            ];
            
            $this->db->insert('patient_health_profile', $healthProfileArry);
            $healthprofile_inserted_id = $this->db->insert_id();
            $health_profile_uniq_id = generateUniqRowID($healthprofile_inserted_id,getServerTag(),$hospital_id);

            /** 
              * Update Uniq ID Every Time 
              */
            $whereHealth= ["patient_health_profile_id" => $healthprofile_inserted_id,"servertag" => getServerTag(),"hospital_id" => $hospital_id];
			$upda_Health = ["unique_id" => $health_profile_uniq_id];
			$this->commondatamodel->updateSingleTableData('patient_health_profile',$upda_Health,$whereHealth);
           
            //$healthprofile_inserted_id = 0;
           
            /*
             echo "<pre>";
             print_r($healthProfileArry);
             echo "</pre>";
            */
             
           
             $medInsert = $this->insertIntoMedicines($hospital_id,$opd_uniq_id,$health_profile_uniq_id,$medicine);
             $testReportinsert = $this->insertIntoTestReports($hospital_id,$opd_uniq_id,$health_profile_uniq_id,$investigation);
             $vaccininsert = $this->insertIntoVaccination($patientvaccinInfo,$patientid,"PREGNANT_WOMEN",$hospital_id,$opd_uniq_id);
            
            $updArry = [
                "registration.served_flag" => 'Y'
            ];
            
            $whereReg = [
                "registration.unique_id" => $registrationID,
                "registration.hospital_id" => $hospital_id
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
               // return true;
            }
            
        }
        catch(Exception $exc){
            echo $exc->getTraceAsString();
        }
        
    }
    
    
    private function insertIntoVaccination($vaccineDtlData,$patientid,$scheduleFor,$hospital_id,$opd_precp_id) {
        if(isset($vaccineDtlData)) {
            
            // delete patient_vaccination
            $delete = $this->deletePatientVaccin($patientid,$scheduleFor);
            
            $vaccinRows =  $vaccineDtlData->pregnancyVaccinRows;
            $len = count($vaccineDtlData->pregnancyVaccinRows);
            $insert_arry = [];
            
            
            for($i=0; $i<$len; $i++) {
                $patientID = $vaccinRows[$i]->patientHdnID;
                $vaccinMasterID = $vaccinRows[$i]->vaccinID;
                $vaccingivendtlID = $vaccinRows[$i]->vaccinGivenID;
                $vaccinGivenDt = $vaccinRows[$i]->vaccinGivenDt;
                
                $vaccine_given_date = NULL;
                if(isset($vaccinGivenDt)) {
                    $vaccine_given_date = date('Y-m-d H:i:s',strtotime($vaccinGivenDt));
                }
                
                $insert_arry = [
                    "patient_vaccination.hospital_id" => $hospital_id,
                    "patient_vaccination.patient_id" => $patientID,
                    "patient_vaccination.vaccination_master_id" => $vaccinMasterID,
                    "patient_vaccination.vaccin_given_date" => $vaccine_given_date,
                    "patient_vaccination.opd_ipd_id" => $opd_precp_id,
                    "patient_vaccination.opd_ipd_flag" => "O",
                    "patient_vaccination.servertag" => getServerTag()
                ];
                
                // insert query
                $this->db->insert('patient_vaccination', $insert_arry);
                $last_insert_id =  $this->db->insert_id(); 
            /** 
              * Update Uniq ID Every Time 
              */
              $whereHealth= ["id" => $last_insert_id,"servertag" => getServerTag(),"hospital_id" => $hospital_id];
              $upda_Health = ["unique_id" => generateUniqRowID($last_insert_id,getServerTag(),$hospital_id)];
              $this->commondatamodel->updateSingleTableData('patient_vaccination',$upda_Health,$whereHealth);

                /*
                echo "<br>";
                echo "Vaccin Data Array";
                echo "<pre>";
                print_r($insert_arry);
                echo "</pre>";
                */
                
            }
        }
    }
    
    
    
    private function insertIntoMedicines($hospital_id,$admission_id,$healthprofile_inserted_id,$medicineData) {
        if(isset($medicineData)) {
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
                    "opd_ipd_flag" => 'O',
                    "medicine_id" => $medicinerow->id,
                    "dose_id" => $doseRowID,
                    "frequeny" => $freqRowID,
                    "number_of_days_sick_leave" => $medicineData[$i]->daystd,
                    "health_profile_id" => $healthprofile_inserted_id,
                    "servertag" => getServerTag()
                ];
                
                /*echo "<br>";
                echo "Medicine Data Array";
                echo "<pre>";
                    print_r($insert_arry);
                echo "</pre>";*/
                // insert query
                $this->db->insert('opd_ipd_medicine', $insert_arry);
                $last_insert_id = $this->db->insert_id();

                // Update Table 
				$whereMedicine= ["id" => $last_insert_id,"servertag" => getServerTag(),"hospital_id" => $hospital_id];
				$upda_Medicine = ["unique_id" => generateUniqRowID($last_insert_id,getServerTag(),$hospital_id)];
				$this->commondatamodel->updateSingleTableData('opd_ipd_medicine',$upda_Medicine,$whereMedicine);
            }
            
        }
        
    }
    
    private function insertIntoTestReports($hospital_id,$admission_id,$health_profile_id,$reportsData) {
        if(isset($reportsData)){
            $len = count($reportsData);
            $insert_arry = [];
            for($i=0; $i<$len; $i++){
                
                $testsrow = $reportsData[$i]->reports;
                
                $insert_arry = [
                    "hospital_id" => $hospital_id,
                    "prescription_addmission_id" => $admission_id,
                    "opd_ipd_flag" => 'O',
                    "test_id" => $testsrow->id,
                    "date" => date('Y-m-d',strtotime($reportsData[$i]->invdate)),
                    "health_profile_id" => $health_profile_id,
                    "servertag" => getServerTag()
                ];
                
                $this->db->insert('opd_ipd_test', $insert_arry);
                $last_insert_id = $this->db->insert_id();
                /*
                echo "<br>";
                echo "Investigation Data Array";
                echo "<pre>";
                print_r($insert_arry);
                echo "</pre>";
                */

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
    
    
    
    
    private function deletePatientVaccin($patient_id,$vaccinFor) {
        
        $sql = "DELETE patient_vaccination
                FROM patient_vaccination
                INNER JOIN `vaccination_master` ON vaccination_master.`id` = patient_vaccination.`vaccination_master_id`
                WHERE
                 vaccination_master.`schedule_for` = '".$vaccinFor."' AND patient_vaccination.`patient_id` = ".$patient_id;
        
        $query = $this->db->query($sql);
        // echo $this->db->last_query();
        if( $query ){ return TRUE;}else{return FALSE;}
        
    }


    /**
     * @By Mithilesh
     * @date 23.01.2019
     * @desc get given vaccin list
     */

    public function getGivenVaccinListByPrescID($presid,$opd_ipd_flag,$hospital_id) {
        $data = [];
        $where = [
                "patient_vaccination.opd_ipd_id" => $presid,
                "patient_vaccination.opd_ipd_flag" => $opd_ipd_flag,
                "patient_vaccination.hospital_id" => $hospital_id
                
            ];
        $query = $this->db->select("
                            DATE_FORMAT(patient_vaccination.vaccin_given_date,'%d/%m/%Y') AS vaccingivenDt,
                            vaccination_master.*
                            ")
							 ->from("patient_vaccination") 
							 ->join("vaccination_master","vaccination_master.id = patient_vaccination.vaccination_master_id","INNER") 
                             ->where($where)
                             ->where("patient_vaccination.vaccin_given_date IS NOT NULL")
							 ->order_by('patient_vaccination.vaccin_given_date')
							 ->get();
                             
        //echo $this->db->last_query();
        if($query->num_rows()>0){
            $data = $query->result();
			}
        return $data;
    }


    public function getPatientPregnancyInfoByPres($presid,$opd_ipd_flag,$hospital_id) {
        $data = [];
        $where = [
                "patient_pregnancy_info.opd_ipd_pres_id" => $presid,
                "patient_pregnancy_info.opd_ipd_flag" => $opd_ipd_flag
            ];
        $query = $this->db->select("
                            DATE_FORMAT(patient_pregnancy_info.lmp_date,'%d/%m/%Y') AS lastMensurationPrdDt,
                            DATE_FORMAT( patient_pregnancy_info.estimate_delivery_date,'%d/%m/%Y') AS estimatedDelvryDt,
                            DATE_FORMAT(patient_pregnancy_info.next_checkup_dt,'%d/%m/%Y') AS nextChkupDtPrdDt,
                            patient_pregnancy_info.remarks
                            ")
							 ->from("patient_pregnancy_info") 
							 ->where($where)
                             ->get();
                             
        //echo $this->db->last_query();
        if($query->num_rows()>0){
            $data = $query->row();
			}
        return $data;
    }
    
    
    
}
?>
