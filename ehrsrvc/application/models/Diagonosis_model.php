<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Diagonosis_model extends CI_Model{


	/**
     * @name insertIntoDiag
     * @author Shankha ghosh
     * @desc insert diagonosis
     */

	public function insertIntoDiag($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
			$diagForm = $request->fdata;

			$diagonosisArry = [
				"diagonosis_name" => $diagForm->diaNameCtrl, 
				"accociated_icd_code" => $diagForm->acdCodeNameCtrl, 
				"hospital_id" => $hospital_id
				
			];
			
			$this->db->insert('diagonosis', $diagonosisArry); 
			
		
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
     * @name updateDiag
     * @author Shankha ghosh
     * @desc update Diagonosis
     */

	public function updateDiag($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
			$diagForm = $request->fdata;

			//pre($diagForm);
			$diagonosisArry = [
				"diagonosis_name" => $diagForm->diaNameCtrl, 
				"accociated_icd_code" => $diagForm->acdCodeCtrl
			
				
			];
			
			$this->db->where("diagonosis_id", $diagForm->diagIdCtrl);
            $this->db->update("diagonosis",$diagonosisArry);

		
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
     * @name getDiagonosisListByHospital
     * @author Shankha Ghosh
     * @return $data
     * @desc get Diagonosis list
     */
	
	public function getDiagonosisListByHospital($hospital_id){
		$data = "";
		$where = array('diagonosis.hospital_id' =>$hospital_id);
		$query = $this->db->select("diagonosis.*,hospitals.hospital_name")
				->from("diagonosis")
				->where($where)
				->join("hospitals", "hospitals.hospital_id = diagonosis.hospital_id", "INNER")
				->order_by('diagonosis.diagonosis_name')->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}

    
}
