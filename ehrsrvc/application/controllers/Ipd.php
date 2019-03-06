<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ipd extends CI_Controller{
    public function __construct() {
        parent::__construct();
        $this->load->model("User_model", "user", TRUE);
        $this->load->model("Authorization_model", "authorisation", TRUE);
		$this->load->model("Ipd_model", "ipd", TRUE);
		$this->load->model("Symptom_model", "symptom", TRUE);
		$this->load->model("Disease_model", "disease", TRUE);
		$this->load->model("Medicine_model", "medicine", TRUE);
		$this->load->model("Investigation_model", "investigation", TRUE);
		$this->load->model("Master_model", "master", TRUE);
		$this->load->model("Pregnancy_model", "pregnancy", TRUE);

        
    }

	public function registerIPD()
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
			
			
            $register = $this->ipd->insertIntoIPD($request,$hospital_id,$doctor_id);
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
	
	

	
	
	
	public function getIPDListByDt()
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
		
        $resultdata = $this->ipd->getIPDListByDt($request,$hospital_id);
           
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
    
    public function getIPDDischargeListByDt()
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
                
                $resultdata = $this->ipd->getIPDDischargeListByDt($request,$hospital_id);
                
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
	
	
	public function getIpdDetailInfoByID() {
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
		
		$ipdadmissionid = $request->ipdid;
		
        $resultdata = $this->ipd->getIpdDetailInfoByID($ipdadmissionid,$hospital_id);
           
		$json_response = [
                "msg_status"=>HTTP_SUCCESS,
                "msg_data"=>"Authentication ok.",
                "result"=>$resultdata,
				"medicineInfo" => $this->medicine->getLastPrescMedicines($resultdata->ipdID,"I",$hospital_id,$resultdata->health_profile_uid),
				"reportsInfo" => $this->investigation->getLastPrescTestReports($resultdata->prescription_addmission_id,"I",$hospital_id,$resultdata->health_profile_uid)
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
	
	
	public function saveIPDRegularVisit()
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
			
			
            $register = $this->ipd->saveIPDRegularVisit($request,$hospital_id,$doctor_id);
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
    
    
    /**
     * @author Mithilesh
     * @date   19.12.2018
     * @desc   Save dischareg data against ipd
     */
    
    public function saveIPDDischarge()
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
                
                
                $register = $this->ipd->saveIPDDischarge($request,$hospital_id,$doctor_id);
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
    
    
    
    
    /**
     * @author Mithilesh
     * @date   19.12.2018
     * @desc   Save dischareg data against ipd
     */
    
    public function removeIPDDischarge()
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
            if($client_token->jti==$server_token ) {
                
                $token_data = $client_token->data;
                $hospital_id = $token_data->hospital_id;
                $doctor_id = $token_data->doctor_id;
                
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $ipdRow_ID =  $request->id;
                
                $update_data = [
                    "discharge_date" => NULL , 
                    "final_digonosis" => NULL , 
                    "discharge_flag" => FALSE , 
                    "referral_id" => NULL , 
                    "next_checkup_dt" => NULL , 
                    "instruction" => NULL  ,
                    "discharge_summary" => NULL  
                ];
                
                $updated = $this->ipd->removeIPDDischareg($ipdRow_ID,$update_data,$hospital_id);
                
                if($updated){
                    $json_response = [
                        "msg_status"=>HTTP_SUCCESS,
                        "msg_data"=>"SUCCESS",
                    ];
                }
                else{
                    $json_response = [
                        "msg_status"=>HTTP_FAIL,
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



    public function getIpdPatientVisitHistory() {
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
		$ipdAdmID = $request->admid;
		
        $resultdata = $this->ipd->getIpdPatientVisitHistory($patientID,$ipdAdmID,$hospital_id);
           
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
    
    
    /*
    public function getOpdIpdPrescPrint() {
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
            /*
        echo "<pre>";
        print_r($request);
        echo "</pre>";
          
		//$patientID = $request->pid;
//		$ipdAdmID = $request->admid;

       // print_r($request);
        $Params = $request->params;
        $opdipd_masterid = $Params->opdipd;
        $opdipd_healthprofileid = $Params->healthprofile;
        $opdipd_type = $Params->type;
		
        $resultdata = $this->ipd->getOpdIpdPrescPrint($opdipd_masterid,$opdipd_healthprofileid,$opdipd_type,$hospital_id);
           
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
    */
    
	
	private function getAge($dob){
		$dateOfBirth = date('d-m-Y',strtotime($dob));
		$today = date("Y-m-d");
		$diff = date_diff(date_create($dateOfBirth), date_create($today));
		return $diff->format('%y');
    }
    

    public function getOpdIpdPrescPrint() {

            CUSTOMHEADER::getCustomHeader();
            $secreat_key =config_item('enc_secrete_key');
          

            $this->load->library('Pdf');
            $pdf = $this->pdf->load();
            
            if($this->uri->segment(3)!="" AND $this->uri->segment(4)!="" AND $this->uri->segment(5)!="" AND $this->uri->segment(6)!="") {
                $client_token = $this->uri->segment(3);
                $token = JWT::decode($client_token, $secreat_key, array('HS512'));

                $opdipd_masterid =  $this->uri->segment(4);
                $opdipd_healthprofileid =  $this->uri->segment(5);
                $opdipd_type = $this->uri->segment(6);
                $calling_from = $this->uri->segment(7);
                $hospital_id = $token->data->hospital_id;
                $doctor_id = $token->data->doctor_id;
                $server_token = $this->authorisation->getToken($token->jti)->web_token;
                /*
                echo "Segment 3 ".$this->uri->segment(3)."<br>";
                echo "Segment 4 ".$this->uri->segment(4)."<br>";
                echo "Segment 5 ".$this->uri->segment(5)."<br>";
                echo "Segment 6 ".$this->uri->segment(6)."<br>";
                echo "Segment 7 ".$this->uri->segment(7)."<br>";
                */
                

                if($server_token == $token->jti) {
                    $result['prescData'] = $this->ipd->getOpdIpdPrescPrint($opdipd_masterid,$opdipd_healthprofileid,$opdipd_type,$hospital_id);
                    $result['doctorname'] = $this->master->getDoctorData($doctor_id,$hospital_id)->doctor_name;

                    if($calling_from == "CONSULTATION"){
                       $page = 'prescription/presc_pdf';
                    }
                    elseif($calling_from == "PREGNANCY" || $calling_from == "VACCINATION") {
                        $result['vaccinData'] =  $this->pregnancy->getGivenVaccinListByPrescID($result['prescData']['patienthealthProfileData']->prescription_addmission_id,$result['prescData']['patienthealthProfileData']->opd_ipd_flag,$hospital_id);
                        $result['pregnancyInfo'] =  $this->pregnancy->getPatientPregnancyInfoByPres($result['prescData']['patienthealthProfileData']->prescription_addmission_id,$result['prescData']['patienthealthProfileData']->opd_ipd_flag,$hospital_id);
                        $page = 'prescription/presc_pregnancy_pdf';

                    }
                    elseif($calling_from == "DISCHARGE") {
                        $result['vaccinData'] =  $this->pregnancy->getGivenVaccinListByPrescID($result['prescData']['patienthealthProfileData']->prescription_addmission_id,$result['prescData']['patienthealthProfileData']->opd_ipd_flag,$hospital_id);
                        $page = 'prescription/pres_discharge_pdf';
                    }
                    else{
                        $page = 'prescription/presc_pdf';
                    }
                   


                     $html = $this->load->view($page, $result,TRUE);
                   
                    $pdf->WriteHTML($html); 
                    $output = 'prescription' . date('Y_m_d_H_i_s') . '_.pdf'; 
                    $pdf->Output("$output", 'I');
                    
                    exit();
                   
                }
                else{
                    $html = "<h2>Token Mismatch</h>";
                    $pdf->WriteHTML($html); 
                    $output = 'prescription' . date('Y_m_d_H_i_s') . '_.pdf'; 
                    $pdf->Output("$output", 'I');
                    exit();
                }
            }
            else {
                $html = "<h2>Invalid URL</h>";
                $pdf->WriteHTML($html); 
                $output = 'prescription' . date('Y_m_d_H_i_s') . '_.pdf'; 
                $pdf->Output("$output", 'I');
                exit();
            }
            

           


           
    }


    
    /*------------------------------5 march 2019 -------------------------- */

    public function getIPDDischargeListByDateRange()
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
                
                $resultdata = $this->ipd->getIPDDischargeListByDateRange($request,$hospital_id);
                
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


 /*------------------------------5 march 2019 -------------------------- */   
	public function getIPDListByDtByDateRange()
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
		
        $resultdata = $this->ipd->getIPDListByDtByDateRange($request,$hospital_id);
           
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
    
}// end of class
