<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Remove extends CI_Controller{
    public function __construct() {
        parent::__construct();
      
        $this->load->model("Authorization_model", "authorisation", TRUE);
        $this->load->model("Remove_model", "remove", TRUE); 
	}
	
    public function removeRecord()
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
				
				$tableID = $request->tid;
				$tableColumn = $request->tc;
				$tableName = $request->from;
				
				
				$whereDuplicate = ["registrationid" => $tableID];
					
				$isAlreadyInserted = $this->commondatamodel->duplicateValueCheck('opd_prescription',$whereDuplicate);
				
				if($isAlreadyInserted == FALSE) {
					$resultdata = $this->remove->softlyRemoveRecords($tableID,$tableColumn,$tableName);
					
					$json_response = [
						"msg_status"=>HTTP_SUCCESS,
						"msg_data"=>"Authentication ok.",
						"result"=>$resultdata
					];
					
				}
				else{
					$json_response = [
						"msg_status"=>HTTP_DUPLICATE,
						"msg_data"=>"EXIST",
						
					];
				}
			}
			else {
				$json_response = [
					"msg_status"=>HTTP_AUTH_FAIL,
					"msg_data"=>"Authentication fail."
				];
			}
        } 
		else{
            $json_response = [
                "msg_status"=>HTTP_AUTH_FAIL,
                "msg_data"=>"Authentication fail."
            ];

        }
        header('Content-Type: application/json');
		echo json_encode( $json_response );
		exit;
    }


    public function removeRowRecord()
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
		
		$tableID = $request->tid;
		$tableColumn = $request->tc;
		$tableName = $request->from;
		
        $resultdata = $this->remove->permanentlyRemoveRecords($tableID,$tableColumn,$tableName);
           
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
