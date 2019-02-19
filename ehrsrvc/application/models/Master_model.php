<?php
if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Master_model extends CI_Model
{

    public function getDoctorData($doctor_id,$hospital_id) {
        $data = [];
        $where = [
            "doctormaster.doctor_id" => $doctor_id,
            "doctormaster.hospital_id" => $hospital_id
        ];

        $query = $this->db->select("*")
        ->from("doctormaster") 
        ->get();

        if($query->num_rows() > 0 ) {
            $data = $query->row();
        }

        return $data;

    }



    /**
     * @By Mithilesh
     * @date 19.01.2019
     * @desc get Master data according to table  
     */
    public function getMasterData($table) {
        /**
         * optionID = alias for common use of dropdown ID
         * optionName = alias for common use of dropdown Value
         */
      

        $data = [];
        if(isset($table)) {
            if($table=="group") {
                $query = $this->db->select("group.id AS optionID , group.name AS optionName")
                             ->from($table) 
                             ->order_by("group.name")
                             ->get();
             }
         /**
          * Make more elseif If it is required
          * elseif($table==""){ }
          */
             
            if($query->num_rows() > 0 ) {
             $data = $query->result();
            }

            return $data;
        }
        else {
            // return blank data
            return $data;
        }
        
      
        
    }


    public function saveCommonMastDatas($request,$hospital_id) {
      /*  echo "Model";
        echo "<pre>";
        print_r($request);
        echo "</pre>";
        */

        $insertDataArry = [];

        $requestParams  = $request->datas;
        $formDatas = $requestParams->formsVal;

        $tableRelInfo = $requestParams->otherInfo;
        $tablename = trim($tableRelInfo->tname);

        if($tablename == "symptoms") {
            $symptomName = NULL;
            $symptomGroup = NULL;
            if(isset($formDatas->symptomCtrl)){ $symptomName = $formDatas->symptomCtrl; }
            if(isset($formDatas->symptomGrpCtrl)){ $symptomGroup = $formDatas->symptomGrpCtrl; }
           
            $insertDataArry = [

                "symptom" => trim(htmlspecialchars($symptomName)),
                "group" => trim(htmlspecialchars($symptomGroup)),
                "hospital_id" => $hospital_id

            ];

        }
        elseif($tablename == "diagonosis") {
            $diagonosisName = NULL;
            $diagonosisIcd = NULL;
            if(isset($formDatas->diagonosisNameCtrl)){ $diagonosisName = $formDatas->diagonosisNameCtrl; }
            if(isset($formDatas->accociatedIcdCtrl)){ $diagonosisIcd = $formDatas->accociatedIcdCtrl; }
           
            $insertDataArry = [

                "diagonosis_name" => trim(htmlspecialchars($diagonosisName)),
                "accociated_icd_code" => trim(htmlspecialchars($diagonosisIcd)),
                "hospital_id" => $hospital_id

            ];
        }
        elseif($tablename == "investigation") {
            $investigationName = NULL;
            if(isset($formDatas->investigationNameCtrl)){ $investigationName = $formDatas->investigationNameCtrl; }
            $insertDataArry = [
                "investigation_name" => trim(htmlspecialchars($investigationName)),
                "hospital_master_id" => $hospital_id
            ];
        }
        else {
            // will add more else if later according to requirement
        }

        try {

           /*
            echo "Model";
            echo "<pre>";
            print_r($insertDataArry);
            echo "</pre>";
         */
            

            $this->db->insert($tablename , $insertDataArry); 
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