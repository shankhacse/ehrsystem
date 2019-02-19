<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Patienttype_model extends CI_Model{
    
	/**
     * @name getPatientType
     * @author Mithilesh Routh
     * @return $data
     * @desc get relations list
     */
	
	public function getPatientType(){
		$data = "";
		$query = $this->db->select("*")->from("patient_type")->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}
	
	public function getDepTagEmplType(){
		$data = "";
		$where = ['Dep' , 'N/W'];
		$query = $this->db->select("*")
						  ->from("patient_type")
						  ->where_in('patient_type.alias_code',$where)
						  ->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}

    
}
