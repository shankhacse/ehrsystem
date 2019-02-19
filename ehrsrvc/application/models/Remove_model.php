<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Remove_model extends CI_Model{
    
	/**
     * @name softlyRemoveRecords
     * @author Mithilesh Routh
     * @return $data
     * @desc get medicine by diagnosis list
     */
	
	public function softlyRemoveRecords($tableID,$tblColumn,$tableName) {
			
			try {
				$updateWhere = [
					$tableName.".".$tblColumn => $tableID
				];
				
				$update = [
					$tableName.".is_deleted" => "Y"
				];
				
				$this->db->where($updateWhere);
				$this->db->update($tableName, $update);
				
				//echo $this->db->last_query();
				
				if($this->db->trans_status() === FALSE) {
					$this->db->trans_rollback();
					return false;
				}
				else {
					$this->db->trans_commit();
					return true;
				}
				
			}
			catch(Exception $exc) {
				echo $exc->getTraceAsString();
			}
	}



		/**
     * @name permanentlyRemoveRecords
     * @author Shankha Ghosh
     * @return $data
     * 
     */
	
	public function permanentlyRemoveRecords($tableID,$tblColumn,$tableName) {
			
		try {
			$deleteWhere = [
				$tableName.".".$tblColumn => $tableID
			];
			
		
			
			$this->db->delete($tableName, $deleteWhere); 
			
			//echo $this->db->last_query();
			
			if($this->db->trans_status() === FALSE) {
				$this->db->trans_rollback();
				return false;
			}
			else {
				$this->db->trans_commit();
				return true;
			}
			
		}
		catch(Exception $exc) {
			echo $exc->getTraceAsString();
		}
}


    
}
