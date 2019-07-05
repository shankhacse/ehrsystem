<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Opd extends CI_Controller{
    public function __construct() {
        parent::__construct();
        $this->load->model("User_model", "user", TRUE);
        $this->load->model("Authorization_model", "authorisation", TRUE);
		$this->load->model("Opd_model", "opd", TRUE);
		$this->load->model("Symptom_model", "symptom", TRUE);
		$this->load->model("Disease_model", "disease", TRUE);
		$this->load->model("Medicine_model", "medicine", TRUE);
		$this->load->model("Investigation_model", "investigation", TRUE);
		$this->load->model("Vaccination_model", "vaccination", TRUE);
		$this->load->model("Pregnancy_model", "pregnancy", TRUE);

        
	}
	

	/*
	public function getDatesByDays() {
		$a = 42;
		$date = date("Y-m-d");

		for($i=0;$i<$a;$i++) {
			
			//$date = date('Y-m-d', strtotime("+1 day"));
			echo $date;
			$date = date('Y-m-d', strtotime("+1 day", strtotime($date)));
			
			echo "<br>";
		}
		
	}
	*/


	public function insertIntoOpd()
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
				$doctor_id = $token_data->doctor_id;
			
				$postdata = file_get_contents("php://input");
				$request = json_decode($postdata);
				
				$healthPrf = $request->healthprofile;
				$registrationID = $healthPrf->hdnregistrationID;
				
				
				$whereDuplicate = [
					"registrationid" => $registrationID
				];
				
				$isAlreadyInserted = $this->commondatamodel->duplicateValueCheck('opd_prescription',$whereDuplicate);
				
				if($isAlreadyInserted === FALSE){
					
					$register = $this->opd->insertIntoOPD($request,$hospital_id,$doctor_id);
					if($register){
						$json_response = [
								"msg_status"=>HTTP_SUCCESS,
								"msg_data"=>"SUCCESS",
								"result" => $register
							];
					}
					else{
						$json_response = [
							"msg_status"=>HTTP_SUCCESS,
							"msg_data"=>"There is some problem.Please try again",
						];
					}
				}
				else{
					$json_response = [
						"msg_status"=>HTTP_DUPLICATE,
						"msg_data"=>"EXIST"
					];
				}
				

				
			}
			else{
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
	

	public function saveSickLeave()
    {
		$token_data = NULL;
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
				$doctor_id = $token_data->doctor_id;
			
				$postdata = file_get_contents("php://input");
				$request = json_decode($postdata);
				
				$opdForm =  $request->formdata;
				$registrationID = $opdForm->hdnRegID;
				$whereDuplicate = [
					"registrationid" => $registrationID
				];
				
				
				$isAlreadyInserted = $this->commondatamodel->duplicateValueCheck('opd_prescription',$whereDuplicate);
			
				if($isAlreadyInserted == FALSE){
						$register = $this->opd->saveSickLeave($request,$hospital_id,$doctor_id);
						if($register){
							$json_response = [
								"msg_status"=>HTTP_SUCCESS,
								"msg_data"=>"SUCCESS",
								"result" => $register
							];
						}
						else{
							$json_response = [
								"msg_status"=>HTTP_SUCCESS,
								"msg_data"=>"There is some problem.Please try again",
							];
						}
				}
				else {
					$json_response = [
						"msg_status"=>HTTP_DUPLICATE,
						"msg_data"=>"EXIST"
					];
				}
				
				

				
			}
			else{
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
	
	
	public function getPatientPrescInfoByCode(){
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
			$pcode = $request->pcode;
			$presdoneFrom = $request->presfrom;
			$resultdata = $this->opd->getPatientPrescInfoByCode($pcode,$presdoneFrom);
			$dateofbirth = null;
			if(isset($resultdata->dob)) {
				$dateofbirth = $resultdata->dob;
			}
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "result"=>$resultdata,
					 "age" => $this->getAge($dateofbirth),
					 "prescriptionID" => $this->opd->getLatestPrescriptionID($hospital_id),
					 "symptomsInfo" => $this->symptom->getSymptomsDataByIds($resultdata->symptom_list , $hospital_id),
					 // "diseaseInfo" => $this->disease->getDiseaseBySymptomsIds($resultdata->diagonised_list , $hospital_id), changed because not map with symptom yet
					  "diseaseInfo" => $this->disease->getDiseaseByIds($resultdata->diagonised_list , $hospital_id),
					 "medicineInfo" => $this->medicine->getLastPrescMedicines($resultdata->prescription_addmission_id , "O" ,$hospital_id,$resultdata->health_profile_uid),
					 "reportsInfo" => $this->investigation->getLastPrescTestReports($resultdata->prescription_addmission_id , "O",  $hospital_id,$resultdata->health_profile_uid),
					/* "referalHospital" */
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
	


	

	public function getPatientPrescInfoByPatientID(){
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
			$pcode = $request->pcode;
			$presdoneFrom = $request->presfrom;
			$resultdata = $this->opd->getPatientPrescInfoByPatientID($pcode,$presdoneFrom);
			$dateofbirth = null;
			if(isset($resultdata->dob)) {
				$dateofbirth = $resultdata->dob;
			}
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "result"=>$resultdata,
					 "age" => $this->getAge($dateofbirth),
					 "prescriptionID" => $this->opd->getLatestPrescriptionID($hospital_id),
					 "symptomsInfo" => $this->symptom->getSymptomsDataByIds($resultdata->symptom_list , $hospital_id),
					 // "diseaseInfo" => $this->disease->getDiseaseBySymptomsIds($resultdata->diagonised_list , $hospital_id), changed because not map with symptom yet
					  "diseaseInfo" => $this->disease->getDiseaseByIds($resultdata->diagonised_list , $hospital_id),
					 "medicineInfo" => $this->medicine->getLastPrescMedicines($resultdata->prescription_addmission_id , "O" ,$hospital_id,$resultdata->health_profile_uid),
					 "reportsInfo" => $this->investigation->getLastPrescTestReports($resultdata->prescription_addmission_id , "O",  $hospital_id,$resultdata->health_profile_uid),
					/* "referalHospital" */
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
	
	/* **************************************************************************************
	 * **************************************************************************************
	 * **************************************************************************************
	 *  VACCINATION MODULE 
     * **************************************************************************************
	 * **************************************************************************************
	 * **************************************************************************************
	 */
	
	public function insertIntoVaccination()
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
	            $doctor_id = $token_data->doctor_id;
	            
	            $postdata = file_get_contents("php://input");
	            $request = json_decode($postdata);
	            
	            
	            $register = $this->vaccination->insertIntoVaccination($request,$hospital_id,$doctor_id);
	            
	            if($register){
	                $json_response = [
	                    "msg_status"=>HTTP_SUCCESS,
						"msg_data"=>"SUCCESS",
						"result" => $register
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
	
	
	/* **************************************************************************************
	 * **************************************************************************************
	 * **************************************************************************************
	 *  PREGNANCY MODULE
	 * **************************************************************************************
	 * **************************************************************************************
	 * **************************************************************************************
	 */
	
	
	public function savePregnancyInfo()
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
	            $doctor_id = $token_data->doctor_id;
	            
	            $postdata = file_get_contents("php://input");
	            $request = json_decode($postdata);
	            
	            
				$register = $this->pregnancy->insertIntoPregnancy($request,$hospital_id,$doctor_id);
				
	            if($register){
	                $json_response = [
	                    "msg_status"=>HTTP_SUCCESS,
						"msg_data"=>"SUCCESS",
						"result" => $register
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
	

	public function getLastPregnencyInfoByCode(){
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

			$pid = $request->pid;
			$resultdata = $this->pregnancy->getLastPregnencyInfoByCode($pid);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "result"=>$resultdata,
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




	public function getOpdPatientPrescHistory() {
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
		
		$patientID = $request->pid;
		
		
        $resultdata = $this->opd->getOpdPatientPrescHistory($patientID,$hospital_id);
           
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
	
	

	
	private function getAge($dob){
		if(isset($dob)){
			$dateOfBirth = date('d-m-Y',strtotime($dob));
			$today = date("Y-m-d");
			$diff = date_diff(date_create($dateOfBirth), date_create($today));
			return $diff->format('%y');
		}
		else {
			return null;
		}
		
	}

	    
    
}
