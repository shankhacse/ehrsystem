<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Challan_model extends CI_Model{


	/**
     * @name insertIntoChallan
     * @author Shankha ghosh
     * @desc insert challan
     * @date 07.02.2019
     */

	public function insertIntoChallan($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
			$challanForm = $request->fdata;
             
			$challanArry = [
				"estate_code" => $challanForm->estateCtrl, 
				"challan_code" => $challanForm->chalanCodeCtrl, 
				"name" => $challanForm->chalanNameCtrl, 
				
				
			];
			
			$this->db->insert('challan_master', $challanArry); 
			
		
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


	/**
     * @name updateChallan
     * @author Shankha ghosh
     * @desc update Challan master
     * @date 07.02.2019
     */

	public function updateChallan($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
            $challanForm = $request->fdata;
             
			$challanUpdateArry = [
				"estate_code" => $challanForm->estateCtrl, 
				"challan_code" => $challanForm->chalanCodeCtrl, 
				"name" => $challanForm->chalanNameCtrl, 
				
				
			];
			
			$this->db->where("id", $challanForm->chalanIdCtrl);
            $this->db->update("challan_master",$challanUpdateArry);

		
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


	/**
     * @name getChallanListByHospital
     * @author Shankha Ghosh
     * @return $data
     * @desc get Division list
     * @date 07.02.2019
     */
	
	public function getChallanListByHospital($hospital_id){
		$data = "";
		
		$query = $this->db->select("challan_master.*,estate.name as estate_name")
                ->from("challan_master")
                ->join("estate", "estate.code = challan_master.estate_code", "Left")
                ->order_by('challan_master.challan_code')->get();
                #q();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}

    
}
