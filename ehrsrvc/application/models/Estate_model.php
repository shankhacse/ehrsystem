<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Estate_model extends CI_Model{
    
	/**
     * @name getEstate
     * @author Mithilesh Routh
     * @return $data
     * @desc get estate list
     */
	
	public function getEstate(){
		$data = "";
		$query = $this->db->select("*")->from("estate")->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}
	
	/**
     * @name getEstate
     * @author Mithilesh Routh
     * @return $data
     * @desc get estate list
     */
	
	public function getEstateByEmpl($empcode){
		$data = "" ;
		$where = [
			"patients.patient_code" => $empcode 
		];
		$query = $this->db->select("estate.*")
						  ->from("patients")
						  ->join("estate","`estate`.`code` = patients.`estate`","INNER")
						  ->where($where)
						  ->get();
						  
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}


	/**
     * @name getEstate
     * @author Mithilesh Routh
     * @return $data
     * @desc get estate list
     */
	
	public function getEstateByHospital($hospital_id){
		$data = "";
		$query = $this->db->select("*")
						->from("estate")
						->where("estate.hospital_id",$hospital_id)
						->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}

    
}
