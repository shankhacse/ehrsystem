<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Estate extends CI_Controller{
    public function __construct() {
        parent::__construct();
      
        $this->load->model("Authorization_model", "authorisation", TRUE);
        $this->load->model("Estate_model", "estate", TRUE); 
    }
	
    public function getEstate()
    {
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
            
            //$resultdata = $this->estate->getEstate();
            $resultdata = $this->estate->getEstateByHospital($hospital_id);
           
			$json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "result"=>$resultdata
                                  
            ];
        }else {
            $json_response = [
                                "msg_status"=>HTTP_AUTH_FAIL,
                                "msg_data"=>"Authentication fail."
            ];
        }
        } else{
             $json_response = [
                                "msg_status"=>HTTP_AUTH_FAIL,
                                "msg_data"=>"Authentication fail."
            ];

        }
        header('Content-Type: application/json');
		echo json_encode( $json_response );
		exit;
    }
	
	
	public function getEstateByEmpl()
    {
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
			$postdata = file_get_contents("php://input");
			$request = json_decode($postdata);
			$emplcode = $request->empcode;
            $resultdata = $this->estate->getEstateByEmpl($emplcode);
           
			$json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "result"=>$resultdata
                                  
            ];
        }else {
            $json_response = [
                                "msg_status"=>HTTP_AUTH_FAIL,
                                "msg_data"=>"Authentication fail."
            ];
        }
        } else{
             $json_response = [
                                "msg_status"=>HTTP_AUTH_FAIL,
                                "msg_data"=>"Authentication fail."
            ];

        }
        header('Content-Type: application/json');
		echo json_encode( $json_response );
		exit;
    }
		
}
