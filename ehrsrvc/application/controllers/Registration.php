<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Registration extends CI_Controller{
    public function __construct() {
        parent::__construct();
        $this->load->model("User_model", "user", TRUE);
        $this->load->model("Authorization_model", "authorisation", TRUE);
		$this->load->model("Registration_model", "registration", TRUE);
		$this->load->model("Patient_model", "patient", TRUE);

        
    }
    public function getTodaysRegistration()
    {
        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
		//if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
		if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
		
		$server_token="";
        if($client_token!=""){
            $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
        } 
        if($client_token!= ""){
        if($client_token->jti==$server_token ){
        
		$token_data = $client_token->data;
		$hospital_id = $token_data->hospital_id;
		
            $resultdata = $this->registration->getTodayRegistration($hospital_id);
           
			$json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "todaysreg_data"=>$resultdata
                                  
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
//            $patient = $this->patient->getPatientList();
//             $json_response = [
//                                  "msg_status"=>HTTP_SUCCESS,
//                                  "msg_data"=>"Authentication ok.",
//                                  "patient"=>$patient
//                                  
//            ];
        }
    header('Content-Type: application/json');
	echo json_encode( $json_response );
	exit;
        
      
    }
	
	public function isRegisteredToday()
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
			
			
            $register = $this->registration->isRegisteredToday($request,$hospital_id);
			if($register){
				$json_response = [
                    "msg_status"=>HTTP_SUCCESS,
                    "msg_data"=>"EXIST",
                    "isexist"=> true
                ];
			}
			else{
				$json_response = [
                    "msg_status"=>HTTP_SUCCESS,
                    "msg_data"=>"NOTEXIST",
					"isexist"=> false
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
	
	public function registerPatient()
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
			
			
            $register = $this->registration->registerPatient($request,$hospital_id);
			if($register){
				$json_response = [
                    "msg_status"=>HTTP_SUCCESS,
                    "msg_data"=>"Registration has been done successfully",
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
	
	
	public function searchPatient(){
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
			
			$patientData = $this->patient->searchPatient($request);
			$json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "patient"=>$patientData
                                  
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
	
	
	public function getTodaysRegDoct()
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
		
        $resultdata = $this->registration->getTodaysRegDoct($hospital_id,$request);
           
			$json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "todaysreg_data"=>$resultdata
                                  
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




    public function todaysRegByRegType()
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
		
        $resultdata = $this->registration->todaysRegByRegType($hospital_id,$request);
           
			$json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "todaysreg_data"=>$resultdata
                                  
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

    

    /* -------------------------------- 25 February 2019-------------------- */

    public function RegListByDateRange()
    {
        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
		//if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
		if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
		
		$server_token="";
        if($client_token!=""){
            $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
        } 
        if($client_token!= ""){
        if($client_token->jti==$server_token ){
        
		$token_data = $client_token->data;
        $hospital_id = $token_data->hospital_id;
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
		
            $resultdata = $this->registration->getRegListByDateRange($request, $hospital_id);
           
			$json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "result"=>$resultdata
                                  
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
    
/*------------------------------------- 25 February 2019-------------------------------- */

public function getRegistrationByDate()
{
    CUSTOMHEADER::getCustomHeader();
    $json_response = [];
    $headers = $this->input->request_headers();
    //if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
    if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
    
    $server_token="";
    if($client_token!=""){
        $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
    } 
    if($client_token!= ""){
    if($client_token->jti==$server_token ){
    
    $token_data = $client_token->data;
    $hospital_id = $token_data->hospital_id;
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
        $resultdata = $this->registration->getRegistrationBydate($request,$hospital_id);
       
        $json_response = [
                              "msg_status"=>HTTP_SUCCESS,
                              "msg_data"=>"Authentication ok.",
                              "todaysreg_data"=>$resultdata
                              
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

    /* -------------------------------- 05 March 2019-------------------- */

    public function AttendentListByDate()
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
		
        $resultdata = $this->registration->AttendentListByDate($hospital_id,$request);
           
			$json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "todaysreg_data"=>$resultdata
                                  
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
	
	
	
	public function verifyAndRegisterPatient()
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
			
			$formRequest = $request->values;
			$patient_code = $formRequest->patientCode;
			
			$wherePatient = [
				"patients.patient_code" => $patient_code,
				"patients.currant_status" => "Active"
			];
			
			
			$isDataPatientCodeExist = $this->commondatamodel->checkExistanceData('patients',$wherePatient);
			
			if($isDataPatientCodeExist > 0){
					
					$regdate = date("Y-m-d");
					$patientid = $this->patient->getPatientByCode($patient_code)->patient_id;
					
					$whereReg = [
						"registration.hospital_id" => $hospital_id,
						"DATE_FORMAT(registration.date_of_registration,'%Y-%m-%d')" => $regdate,
						"registration.patient_id" => $patientid,
						"registration.is_deleted" => "N"
					];
				
					$isAlreadyRegistered = $this->commondatamodel->checkExistanceData('registration',$whereReg);
					
					if($isAlreadyRegistered>0){
						$json_response = [
							"msg_status"=>HTTP_DUPLICATE,
							"msg_data"=>"Patient already registered for today",
						];
					}
					else{
								$register = $this->registration->registerPatientByBarCode($request,$hospital_id);
								if($register){
									$json_response = [
										"msg_status"=>HTTP_SUCCESS,
										"msg_data"=>"Registration has been done successfully",
										"patientdata"=>$this->patient->getPatientByCode($patient_code)
									];
								}
								else{
									$json_response = [
										"msg_status"=>HTTP_SUCCESS,
										"msg_data"=>"There is some problem.Please try again",
									];
								}
					}
					
					
				

			}
			else{
				// Patient Does not Exist
				$json_response = [
							"msg_status"=>HTTP_ERROR,
							"msg_data"=>"Patient doesn't exist or Terminated",
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


}// end of class
