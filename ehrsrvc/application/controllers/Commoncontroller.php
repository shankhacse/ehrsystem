<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Commoncontroller extends CI_Controller{
    public function __construct() {
        parent::__construct();
      
        $this->load->model("Authorization_model", "authorisation", TRUE);
      

        
    }



    public function changeStatus()
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
       // pre($request);
		
		 $tableID = $request->rowid;
		 $tableColumn = $request->columnname;
         $tableName = $request->tablename;
         $columnvalue = $request->value;
         
         $updateWhere = [
            $tableName.".".$tableColumn => $tableID
        ];
        
        $update_array = [
            $tableName.".is_active" => $columnvalue
        ];
      
        
        
        $resultdata = $this->commondatamodel->updateSingleTableData($tableName,$update_array,$updateWhere);
     
           
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


}//end of class