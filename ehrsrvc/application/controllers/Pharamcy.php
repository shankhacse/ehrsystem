<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Pharamcy extends CI_Controller{
    public function __construct() {
        parent::__construct();
      
        $this->load->model("Authorization_model", "authorisation", TRUE);
        $this->load->model("Pharamcy_model", "pharamcy", TRUE); 
        $this->load->model("Patient_model", "patient", TRUE); 
	}
	
    public function getPrescriptionListPharamcy()
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
		
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		
        $resultdata = $this->pharamcy->getPrescriptionListPharamcy($request,$hospital_id);
           
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
	
	
	public function getIPDPrescriptionListPharamcy() {
		
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
		
        $resultdata = $this->pharamcy->getIPDPrescriptionListPharamcy($request,$hospital_id);
           
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
	
	public function getMedicineByPrescription()
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
		
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		
		$prescriptionID = $request->prescID;
        $reqFrom = $request->from;
        $resultdata = $this->pharamcy->getMedicineByPrescription($prescriptionID , $reqFrom, $hospital_id);
           
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
	
	
	public function insertIntoMedicineIssue() {
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
			
            
            $register = $this->pharamcy->insertIntoMedicineIssue($request,$hospital_id);
			if($register){
				$json_response = [
                    "msg_status"=>HTTP_SUCCESS,
                    "msg_data"=>"SUCCESS",
                ];
			}
			else{
				$json_response = [
                    "msg_status"=>HTTP_SUCCESS,
                    "msg_data"=>"There is some problem.Please try again",
                ];
			}
            
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
    

    public function getIssuedMedByDtAndMed() {
        
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
        
       $resultdata = $this->pharamcy->getIssuedMedByDtAndMed($request,$hospital_id);
           
		$json_response = [
                "msg_status"=>HTTP_SUCCESS,
                "msg_data"=>"SUCCESS",
                "result"=>$resultdata
        ];
		
        } else {
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
