<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Reportupload extends CI_Controller{
    public function __construct() {
        parent::__construct();
        $this->load->model("User_model", "user", TRUE);
        $this->load->model("Authorization_model", "authorisation", TRUE);

		$this->load->model("Reportupload_model", "report_upload", TRUE);
        $this->load->library('excel');//load PHPExcel library
        
        ini_set('memory_limit', '960M');
        ini_set('post_max_size', '640M');
        ini_set('upload_max_filesize', '640M');
        ini_set('max_execution_time', 0);


        
    }
    public function index()
    {
      echo "string";
    }


    public function uploadReport(){

        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
        //pre($headers);
        
        $patient_id=$this->input->post('pidlval');
        $prescr_type= $this->input->post('prescrCtrlval');
        $testid=$this->input->post('testCtrlval');
        /* for local*/ 
        //$dir1 = $_SERVER['DOCUMENT_ROOT'].'/devehrsystem/ehrsrvc/uploadfiles/report_upload/';
        $dir1 = $_SERVER['DOCUMENT_ROOT'].'/ehr/ehrsrvc/uploadfiles/report_upload/';

        $config = array(
			'upload_path' => $dir1,
			//'allowed_types' => 'docx|doc|pdf|jpg|png|txt|xls|xlsx',
			'allowed_types' => '*',
			'max_size' => '5120', // Can be set to particular file size , here it is 2 MB(2048 Kb)
			'max_filename' => '255',
			'encrypt_name' => TRUE,
			);

        $this->load->library('upload', $config);
        $reportfile = array();
        $detail_array = array();
          
          /*  $_FILES['reportfile']['name']= $_FILES['file']['name'];
            $_FILES['reportfile']['type']= $_FILES['file']['type'];
            $_FILES['reportfile']['tmp_name']= $_FILES['file']['tmp_name'];
            $_FILES['reportfile']['error']= $_FILES['file']['error'];
            $_FILES['reportfile']['size']= $_FILES['file']['size']; */

          //  pre($_FILES);
      
        $this->upload->initialize($config);
       // $this->upload->do_upload('file');
       
        

       
       // $this->upload->do_upload('file');
       // pre($this->upload->display_errors());

        if ($this->upload->do_upload('file'))
		{ 
            
            $file_detail = $this->upload->data();
            $file_name = $file_detail['file_name']; 

            $insert_fileDetails = $this->report_upload->insertIntoReportUpload($file_detail,$patient_id,$prescr_type,$testid);

        }

        $inrerted_fileList = $this->report_upload->getReportUploadDetails($patient_id);

            $json_response = [
                "msg_status" => HTTP_SUCCESS,
                "msg_data" => "Authentication ok.",
                "result" => $inrerted_fileList
            ];

            header('Content-Type: application/json');
            echo json_encode($json_response);
            exit();

      

      

        

    }


    
    public function getReportList()
    {
        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
        if (CUSTOMHEADER::getAuthotoken($headers)) {
            $client_token = CUSTOMHEADER::getAuthotoken($headers);
        } else {
            $client_token = "";
        }

        $server_token = "";
        if ($client_token != "") {
            $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
        }
        if ($client_token != "") {
            if ($client_token->jti == $server_token) {

                $token_data = $client_token->data;
                $hospital_id = $token_data->hospital_id;

                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);

               $patient_id=$request->data;

              //  $patient_id=$request->data->diagonosis_id;

                $resultdata = $this->report_upload->getReportUploadDetails($patient_id);

                $json_response = [
                    "msg_status" => HTTP_SUCCESS,
                    "msg_data" => "Authentication ok.",
                    "result" => $resultdata
                ];
            } else {
                $json_response = [
                    "msg_status" => HTTP_AUTH_FAIL,
                    "msg_data" => "Authentication fail."
                ];
            }
        } else {
            $json_response = [
                "msg_status" => HTTP_AUTH_FAIL,
                "msg_data" => "Authentication fail."
            ];
        }
        header('Content-Type: application/json');
        echo json_encode($json_response);
        exit();
    }
    

    public function deleteReport()
    {
        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
        if (CUSTOMHEADER::getAuthotoken($headers)) {
            $client_token = CUSTOMHEADER::getAuthotoken($headers);
        } else {
            $client_token = "";
        }

        $server_token = "";
        if ($client_token != "") {
            $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
        }
        if ($client_token != "") {
            if ($client_token->jti == $server_token) {

                $token_data = $client_token->data;
                $hospital_id = $token_data->hospital_id;

                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);

               $reportuploadid=$request->data;

              //  $patient_id=$request->data->diagonosis_id;
              $where = array('report_upload.report_upload_id' => $reportuploadid );

                $resultdata = $this->commondatamodel->deleteTableData('report_upload',$where);

                $json_response = [
                    "msg_status" => HTTP_SUCCESS,
                    "msg_data" => "Authentication ok.",
                    "result" => $resultdata
                ];
            } else {
                $json_response = [
                    "msg_status" => HTTP_AUTH_FAIL,
                    "msg_data" => "Authentication fail."
                ];
            }
        } else {
            $json_response = [
                "msg_status" => HTTP_AUTH_FAIL,
                "msg_data" => "Authentication fail."
            ];
        }
        header('Content-Type: application/json');
        echo json_encode($json_response);
        exit();
    }


    public function testSearchByQry(){
		CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
        
        if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
        
		$server_token="";
        if($client_token!=""){
            $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
        }
       
        if($client_token!=""){
        if($client_token->jti==$server_token ){
			$token_data = $client_token->data;
			$hospital_id = $token_data->hospital_id;
			
            $postdata = file_get_contents("php://input");
			$request = json_decode($postdata);
			$qry = $request->pcode;
			$resultdata = $this->report_upload->testSearchByQry($qry);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "test"=>$resultdata
					
            ];
            
        }else{
            $json_response = [
                                "msg_status"=>HTTP_AUTH_FAIL,
                                "msg_data"=>"Authentication fail."
            ];
        }
        }else{
             $json_response = [
                                "msg_status"=>HTTP_AUTH_FAIL,
                                "msg_data"=>"Authentication fail."
            ];

        }
        header('Content-Type: application/json');
		echo json_encode( $json_response );
		exit;
	}

}//end of class