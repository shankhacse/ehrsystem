<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Division_model extends CI_Model{


	/**
     * @name insertIntoDivi
     * @author Shankha ghosh
     * @desc insert division
     * @date 07.02.2019
     */

	public function insertIntoDivi($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
			$diviForm = $request->fdata;

			$divisionArry = [
				"division_code" => $diviForm->divCodeCtrl, 
				"division_name" => $diviForm->divNameCtrl, 
				
				
			];
			
			$this->db->insert('division_master', $divisionArry); 
			
		
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
     * @name updateDivi
     * @author Shankha ghosh
     * @desc update Division
     * @date 07.02.2019
     */

	public function updateDivi($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
            $diviForm = $request->fdata;

			$divisionUpdateArry = [
				"division_code" => $diviForm->divCodeCtrl, 
				"division_name" => $diviForm->divNameCtrl, 
				
				
			];
			
			$this->db->where("id", $diviForm->diviIdCtrl);
            $this->db->update("division_master",$divisionUpdateArry);

		
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
     * @name getDivisionListByHospital
     * @author Shankha Ghosh
     * @return $data
     * @desc get Division list
     * @date 07.02.2019
     */
	
	public function getDivisionListByHospital($hospital_id){
		$data = "";
		
		$query = $this->db->select("*")
				->from("division_master")
				->order_by('division_master.division_code')->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}

    
}
