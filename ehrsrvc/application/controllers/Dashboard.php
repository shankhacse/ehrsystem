<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Dashboard extends CI_Controller {
   
    public function __construct() {
        parent::__construct();
        $this->load->model("User_model", "user", TRUE);
        $this->load->model("Authorization_model", "authorisation", TRUE);
        $this->load->model("Menu_model", "menu", TRUE);
    }
    
    public function index()
    {
        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
        //print_r($headers);
        
        if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
        if($client_token!=""){
            $server_token = $this->authorisation->getToken($client_token->jti);
        }
        

        if($client_token!=""){
        if($client_token->jti==$server_token ){
            $json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  
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
    
    public function getMenu(){
        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
        $role= $this->input->get('role_code');
        if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
        if($client_token!=""){
            $server_token = $this->authorisation->getToken($client_token->jti);
        }
        

        if($client_token!=""){
        if($client_token->jti==$server_token ){
            
            $menu = $this->menu->getMenuByRole($role);
             $json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "left_menu"=>$menu
                                  
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
    
}
