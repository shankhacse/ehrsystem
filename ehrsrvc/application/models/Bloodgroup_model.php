<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Bloodgroup_model extends CI_Model{
    
	/**
     * @name getBloodGroup
     * @author Mithilesh Routh
     * @return $data
     * @desc get blood group
     */
	
	public function getBloodGroup(){
		$data = "";
		$query = $this->db->select("*")->from("blood_group")->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}

    
}
