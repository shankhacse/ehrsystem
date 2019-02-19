<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Challan extends CI_Controller{
    public function __construct() {
        parent::__construct();
        $this->load->model("User_model", "user", TRUE);
        $this->load->model("Authorization_model", "authorisation", TRUE);
		$this->load->model("Medicine_model", "medicine", TRUE);
		$this->load->model("Challan_model", "challan", TRUE);
		

        
    }
    public function index()
    {
      //echo "string";
    }
    public function insertIntoChallan()
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
        
            $register = $this->challan->insertIntoChallan($request,$hospital_id);
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
    
    public function updateChallan()
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
          
			
            $register = $this->challan->updateChallan($request,$hospital_id);
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

    public function getChallanList()
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

                $resultdata = $this->challan->getChallanListByHospital($hospital_id);

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



    public function getChallanDataById()
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
               
               $challan_id=$request->data->id;
                
               $where = array('challan_master.id' =>$challan_id );

                $resultdata = $this->commondatamodel->getSingleRowByWhereCls('challan_master',$where);

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


}//end of class