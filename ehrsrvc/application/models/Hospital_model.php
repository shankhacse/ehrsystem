<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Hospital_model extends CI_Model{
    
	/**
     * @name getHospital
     * @author Mithilesh Routh
     * @return $data
     * @desc get hospital list
     */
	/* commented on 06.02.2019
	public function getHospital(){
		$data = "";
		$query = $this->db->select("*")->from("hospitals")->order_by('hospitals.hospital_name')->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
     }
     */


    public function getHospital(){
     $data = "";
     $query = $this->db->select("*")->from("referral_hospital")->order_by('referral_hospital.hospital_name')->get();
     if($query->num_rows()>0){
       $data=$query->result();
      }
      return $data;
     }

    
}
