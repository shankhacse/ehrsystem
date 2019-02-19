<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Medicine extends CI_Controller{
    public function __construct() {
        parent::__construct();
      
        $this->load->model("Authorization_model", "authorisation", TRUE);
        $this->load->model("Medicine_model", "medicine", TRUE); 
	}
	
    public function getMedicineBySymptoms()
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
		
        $resultdata = $this->medicine->getMedicineBySymptoms($request);
           
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
	
	public function getMedicineByName()
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
		
		$medname = $request->medicine;
		
        $resultdata = $this->medicine->getMedicineByName($medname);
           
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


    public function getAllMedicineList()
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
		$resultdata = $this->medicine->getAllMedicines();
           
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
	
	
	public function getDosageByMedicine(){
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
		
        $resultdata = $this->medicine->getDosageByMedicine($request);
           
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
	
	
	
	public function getFrequencyByMedicine(){
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
		
        $resultdata = $this->medicine->getFrequencyByMedicine($request);
           
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
	
	public function getMedicineBatchInfoAccordingtoStock (){
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
		
		
		$medicine_id = $request->medid;
		$required_qty = $request->issue;
		 
		
        $resultdata = $this->medicine->getMedicineBatchInfoAccordingtoStock($medicine_id,$required_qty,$hospital_id);
           
		$json_response = [
                "msg_status"=>HTTP_SUCCESS,
                "msg_data"=>"Authentication ok.",
                "result"=>$resultdata,
				"batchnos" => $this->convertArrayToString($resultdata['batchinfo'])
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
	

	private function convertArrayToString($batchArray) {
		$string = "";
		$batchnos = "";
		if(isset($batchArray)){
			for($i=0; $i<count($batchArray); $i++ ) {
				//$string.= "<p class='batchinfo'>".$batchArray[$i]['batchno']." - <span>".abs($batchArray[$i]['qty'])."</span><span> - ".$batchArray[$i]['exp']."</span></p>";
				$string.= $batchArray[$i]['batchno']." - ".abs($batchArray[$i]['qty'])." - ".$batchArray[$i]['exp']."\n";
			}
		}
		//$batchnos = rtrim($string,',');
		
		return $string;
    }
    

    /**
     * insert into medicine table
     */

    public function insertIntoMedicine()
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
          //  pre($request);
          // echo  $request->fdata->medicineCtrl;
         //  echo  $request->fdata->medTypeCtrl;
           $whereMedecine = array(
                        'medicine.medicine_name' => trim($request->fdata->medicineCtrl),
                        'medicine.medicine_type' => trim($request->fdata->medTypeCtrl)
                        );

           $checkDuplicate=$this->commondatamodel->checkExistanceData('medicine',$whereMedecine);
        
          

           if($checkDuplicate){
                   
            
                    $json_response = [
                                "msg_status"=>HTTP_DUPLICATE,
                                "msg_data"=>"FAIL",
                            ];


           }else{

                       
              $register = $this->medicine->insertIntoMedicine($request,$hospital_id);
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



    public function updateMedicine()
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

            $medicine=$request->fdata->medicineCtrl;
            $oldmedicine=$request->fdata->oldmedicineCtrl;
            $medTypeCtrl=$request->fdata->medTypeCtrl;

            if($medicine!=$oldmedicine){
                        $whereMedecine = array(
                            'medicine.medicine_name' => trim($request->fdata->medicineCtrl),
                            'medicine.medicine_type' => trim($request->fdata->medTypeCtrl)
                            );

                        $checkDuplicate=$this->commondatamodel->checkExistanceData('medicine',$whereMedecine);

                        if($checkDuplicate){
                                        $json_response = [
                                                    "msg_status"=>HTTP_DUPLICATE,
                                                    "msg_data"=>"FAIL",
                                                ];
                        }else{

                                $result = $this->medicine->updateMed($request,$hospital_id);
                                        if($result){
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


                        }

            }else{

                      $result = $this->medicine->updateMed($request,$hospital_id);
                        if($result){
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

	
}
