<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Disease_model extends CI_Model{
    
	
    /**
     * @name getDiseaseBySymptoms
     * @author Mithilesh Routh
     * @return $data
     * @desc get disease list filter by symptoms
     */
    public function getDiseaseBySymptoms($hospitalid,$request)
    {
        $resultdata = "";
		$where = [
			"diagonosis.hospital_id" => $hospitalid
		];
		
		$values = $request->symptom;
		$symptomsID = [];
		for($i = 0; $i < count($values) ; $i++){
			array_push($symptomsID , $values[$i]->id);
		}
		
	
		/* Temporary Blocked This Query on 01.12.2018  
		$query = $this->db->select("diagonosis.diagonosis_id,diagonosis.diagonosis_name")
                         ->from("symptoms_diagonosis_map") 
						  ->join("diagonosis","diagonosis.diagonosis_id = symptoms_diagonosis_map.diagonosis_id","INNER")
                         ->order_by('diagonosis.diagonosis_name')
        */                 
						 /* Temporary Blocked This Line on 01.12.2018  
							Don't remove this line
							->where_in('symptoms_diagonosis_map.symptom_id', $symptomsID)
						 */
        
        $query = $this->db->select("diagonosis.diagonosis_id,diagonosis.diagonosis_name")
                        ->from("diagonosis") 
                        ->order_by('diagonosis.diagonosis_name')
                        ->where($where)
                        ->get();

		//echo $this->db->last_query();
        if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
    }
	
	
	
	/**
     * @name getDiseaseBySymptoms
     * @author Mithilesh Routh
     * @return $data
     * @desc get disease list filter by symptoms
    */
	
    public function getDiseaseBySymptomsIds($symptoms , $hospitalid)
    {
        $resultdata = "";
		$where = [
			"diagonosis.hospital_id" => $hospitalid
		];
		
        $array = stringToArray($symptoms);
        //pre($array);
		$query = $this->db->select("diagonosis.diagonosis_id,diagonosis.diagonosis_name")
                         ->from("symptoms_diagonosis_map") 
						  ->join("diagonosis","diagonosis.diagonosis_id = symptoms_diagonosis_map.diagonosis_id","LEFT")
						 ->order_by('diagonosis.diagonosis_name')
						 ->where_in('symptoms_diagonosis_map.symptom_id', $array)
						 ->where($where)
                         ->get();
	
		if($query->num_rows()>0) {
            $resultdata=$query->result();
            }
        return $resultdata;
    }


    /**
     * @name getDiseaseByIds
     * @author Mithilesh Routh
     * @return $data
     * @desc get all symptoms list
	 * @used in controller -- opd,ipd_model
     */
	public function getDiseaseByIds($disease , $hospital_id){
		
		$data = stringToArray($disease);
		$resultdata = "";
		$where = [
			"diagonosis.hospital_id" => $hospital_id
		];
	
		$query = $this->db->select("*")
                         ->from("diagonosis") 
						  ->where($where)
						  ->where_in('diagonosis.diagonosis_id', $data)
						 ->order_by('diagonosis.diagonosis_name')
                         ->get();
	//	echo $this->db->last_query();
        if($query->num_rows()>0) {
            $resultdata=$query->result();
        }
        return $resultdata;
	}
    
	

    
}
