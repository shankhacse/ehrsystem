<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Reportupload_model extends CI_Model{


    /**
     * @name insertIntoReportUpload
     * @author Shankha ghosh
     * @desc insert ReportUpload details
     */

	public function insertIntoReportUpload($file_detail,$patient_id,$prescr_type,$testid){
		
		try{
			
			$this->db->trans_begin();
			$insert_data = [];
		
			$todaydt = date("Y-m-d H:i:s");
       
			$reportUploadArry = [
				"upload_dt" => $todaydt, 
				"patient_id" => $patient_id, 
				"prescription_type" => $prescr_type, 
				"test_id" => $testid, 
				"user_file_name" => $file_detail['orig_name'], 
				"random_file_name" => $file_detail['file_name'], 
				"file_ext" => $file_detail['file_ext'], 
				
				
			];
			
			$this->db->insert('report_upload', $reportUploadArry); 
		
		
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
     * @name getReportUpload
     * @author Shankha Ghosh
     * @return $data
     * @desc get report Upload list
     */
	
	public function getReportUploadDetails($patient_id){
        $data = "";
        $where = array('report_upload.patient_id' =>$patient_id );
        $query = $this->db->select("
                                    report_upload.user_file_name as fileName,
                                    report_upload.report_upload_id as reportuploadid,
                                    DATE_FORMAT(report_upload.upload_dt, '%d-%m-%Y') as testdt,
                                    investigation.investigation_name as testName,
                                    ")
        ->from("report_upload")
        ->join("investigation","investigation.investigation_id=report_upload.test_id",'INNER')
        ->where($where)
        ->order_by('report_upload.report_upload_id')->get();

		if($query->num_rows()>0){
            $data=$query->result();
        }
        return $data;
	}

     /**
     *
     * @name getTestList
     * @return Test data
     */
    public function testSearchByQry($qry)
    {
        $test_data = "";
        $query = $this->db->select("*")
            ->from("investigation")
            ->like('investigation.investigation_name', $qry)
            ->order_by('investigation.investigation_name', 'ASC')
            ->limit(20)
            ->get();
        #echo $this->db->last_query();
        if ($query->num_rows() > 0) {
            $test_data = $query->result();
        }
        return $test_data;
    }

}//end of class