<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Relation_model extends CI_Model{
    
	/**
     * @name getRelations
     * @author Mithilesh Routh
     * @return $data
     * @desc get relations list
     */
	
	public function getRelations(){
		$data = "";
		$query = $this->db->select("*")->from("relationship_master")->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}
	
	
	/**
     * @name getRelationsByType
     * @author Mithilesh Routh
     * @return $data
     * @desc get relations list
     */
	
	public function getRelationsByType($ptype){
		$data = "";
		$query = $this->db->select("*")
						  ->from("relationship_master")
						  ->where("relationship_master.patient_type",$ptype)
						  ->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}
	
	/**
     * @name getRelationsByType
     * @author Mithilesh Routh
     * @return $data
     * @desc get relations list
     */
	
	public function getRelationById($relationid){
		$data = "";
		$query = $this->db->select("*")
						  ->from("relationship_master")
						  ->where("relationship_master.id",$relationid)
						  ->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}
	
	public function getRelationCodeById($relationid){
		$relationcode = "";
		$query = $this->db->select("*")
						  ->from("relationship_master")
						  ->where("relationship_master.id",$relationid)
						  ->get();
		if($query->num_rows()>0){
            $data = $query->row();
			$relationcode = $data->relation_code;
        }
        return $relationcode;
	}

    
}
