<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Line_model extends CI_Model{


	/**
     * @name insertIntoLine
     * @author Shankha ghosh
     * @desc insert line_master
     * @date 07.02.2019
     */

	public function insertIntoLine($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
			$LineForm = $request->fdata;

			$lineArry = [
				"division_code" => $LineForm->divisionCtrl, 
				"line_code" => $LineForm->lineCodeCtrl, 
				"lie_name" => $LineForm->lineNameCtrl, 
				
				
            ];
            
			
			$this->db->insert('line_master', $lineArry); 
			
		
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
     * @name updateLine
     * @author Shankha ghosh
     * @desc update Line master
     * @date 07.02.2019
     */

	public function updateLine($request,$hospital_id){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
            $LineForm = $request->fdata;

			$lineUpdateArry = [
				"division_code" => $LineForm->divisionCtrl, 
				"line_code" => $LineForm->lineCodeCtrl, 
				"lie_name" => $LineForm->lineNameCtrl, 
				
				
            ];
			
			$this->db->where("id", $LineForm->lineIdCtrl);
            $this->db->update("line_master",$lineUpdateArry);

		
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
     * @name getLineListByHospital
     * @author Shankha Ghosh
     * @return $data
     * @desc get Line list
     * @date 07.02.2019
     */
	
	public function getLineListByHospital($hospital_id){
		$data = "";
		
		$query = $this->db->select("line_master.*,division_master.division_name")
                ->from("line_master")
                ->join("division_master", "division_master.division_code = line_master.division_code", "LEFT")
				->order_by('line_master.line_code')->get();
		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}

    
}
