<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Patient extends CI_Controller{
    public function __construct() {
        parent::__construct();
        $this->load->model("User_model", "user", TRUE);
        $this->load->model("Authorization_model", "authorisation", TRUE);
        $this->load->model("Menu_model", "menu", TRUE);
        $this->load->model("Patient_model", "patient", TRUE);
        $this->load->model("Opd_model", "opd", TRUE);
        $this->load->model("Relation_model", "relation", TRUE);
      

        ini_set('memory_limit', '960M');
        ini_set('post_max_size', '640M');
        ini_set('upload_max_filesize', '640M');
        ini_set('max_execution_time', 0);

        
    }

    public function pcodeUpdate(){
        echo "pcode stop";

      exit;
        echo "pcode running";
      $where = array(
                        'patients.patient_type_id' =>3,
                      /*  'patients.employee_id' =>'E1111013',*/
                    );

      $patientData = $this->commondatamodel->getAllRecordWhere('patients',$where);

    //  pre($patientData);
        $sl=1;
      foreach ($patientData as $patientdata) {

         echo "<br>".'SL: '.$sl++;
         echo "<br>".$patientdata->patient_id;
         echo "<br>".$patientdata->patient_code;
         echo "<br>".$patientdata->employee_id;
         echo "<br>".$patientdata->relation_id;

         $employee=$patientdata->employee_id;
         $relationID=$patientdata->relation_id;
         $srl_no = $this->patient->getEmployeeSerialCode($employee);
         $relation_code = $this->relation->getRelationCodeById($relationID);

         echo "<br>".$employeGenCode = $this->patient->generateEmployeeCode($employee, $relation_code, $srl_no);
         echo "<br>-----------------------------------<br>";

         // update dependent code
         $dependentWhere = array('patients.patient_id' =>$patientdata->patient_id);
         $updt_dpendentcode_ar = array('patients.patient_code' =>$employeGenCode);
         $this->commondatamodel->updateSingleTableData('patients',$updt_dpendentcode_ar,$dependentWhere);

       // update last serial no
         $updateArr = [
            "patients.last_srl_code" => $srl_no
        ];
        $employeeWhere = array('patients.patient_code' =>$employee );
        $this->commondatamodel->updateSingleTableData('patients',$updateArr,$employeeWhere);
      }


    }
    public function getAllPatient()
    {
        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
        
        if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
        
        //var_dump($client_token);
        $server_token="";
        if($client_token!=""){
            $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
           
        }
//        echo("client:".$client_token);
//        echo("serve:".$server_token);
//        
        if($client_token!=""){
        if($client_token->jti==$server_token ){
            
            $patient = $this->patient->getPatientList();
             $json_response = [
                                  "msg_status"=>HTTP_SUCCESS,
                                  "msg_data"=>"Authentication ok.",
                                  "patient"=>$patient
                                  
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

            $token_data = $client_token->data;
            $hospital_id = $token_data->hospital_id;
            
            $postdata = file_get_contents("php://input");
			$request = json_decode($postdata);
			
			$patientData = $this->patient->searchPatient($request,$hospital_id);
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
	
	public function addNewPatient(){
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
			
				$newPatientCode = $this->patient->addNewPatient($request,$hospital_id);
				
				if($newPatientCode == false) {
					
					$json_response = [
						"msg_status" => HTTP_SUCCESS,
						"msg_data" => "There is some problem",
						"pcode" => NULL
					];
					
				}
				else {
					$json_response = [
						"msg_status" => HTTP_SUCCESS,
						"msg_data" => "Patient added successfully",
						"pcode" => $newPatientCode
					];
				}
				
			} else{
				$json_response = [
									"msg_status"=>HTTP_AUTH_FAIL,
									"msg_data"=>"Authentication fail."
				];
			}
        } 
		else {
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
	public function getPatientByCode(){
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
			$resultdata = $this->patient->getPatientPrescInfoByCode($pcode);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "result"=>$resultdata,
					 "age" => $this->getAge($resultdata->dob),
					 "prescriptionID" => $this->opd->getLatestPrescriptionID($hospital_id)
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
	*/
	
	
	
	public function getPatientInfoByCode(){
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
			$resultdata = $this->patient->getPatientByCode($pcode);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "result"=>$resultdata,
					 "age" => $this->getAge($resultdata->dob)
					
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
    

    public function getPatientInfoByPatientID(){
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
			$pid = $request->pcode;
			$resultdata = $this->patient->getPatientByPatientID($pid);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "result"=>$resultdata,
					 "age" => $this->getAge($resultdata->dob)
					
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
    
	
	
	public function patientSearchByCode(){
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
			$resultdata = $this->patient->patientSearchByCode($pcode);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "patient"=>$resultdata
					
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
    

    public function patientSearchByQry(){
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
            $qry = $request->pcode;
            
			$resultdata = $this->patient->patientSearchByQry($qry,$hospital_id);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "patient"=>$resultdata
					
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
	
	public function associateEmpByCode(){
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
			$resultdata = $this->patient->associateEmpByCode($pcode,$hospital_id);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "patient"=>$resultdata
					
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
	
	public function patientSearchByAadhar(){
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
			$aadhar = $request->aadhar;
			$resultdata = $this->patient->patientSearchByAadhar($aadhar);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "patient"=>$resultdata
					
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
	
	public function getPatientListIPD(){
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
			
			$empcode = $request->empcode;
			$rel = $request->rel;
			
			$relationcode = $this->relation->getRelationCodeById($rel);
			
			if($relationcode == "SF" ){
				$resultdata = $this->patient->getPatientListIPDByEmp($empcode);
			}
			else {
				$resultdata = $this->patient->getPatientListIPDByEmpNRel($empcode,$rel);
			}
			
			
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
	
	    
	private function getAge($dob){
		$dateOfBirth = date('d-m-Y',strtotime($dob));
		$today = date("Y-m-d");
		$diff = date_diff(date_create($dateOfBirth), date_create($today));
		return $diff->format('%y');
	}
        
        public function getSickApprovedList(){
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
            
                   $resultdata = $this->patient->getSickApprovedList();
			
		    $json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "sickleaveList"=>$resultdata,
		
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

        public function getSickApprovedListByDateRange(){
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
                
                       $resultdata = $this->patient->getSickApprovedListByDateRange($request,$hospital_id);
                
                $json_response = [
                         "msg_status"=>HTTP_SUCCESS,
                         "msg_data"=>"Authentication ok.",
                         "sickleaveList"=>$resultdata,
            
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
        
        
        public function getSickLeaveApproveCount()
        {
            CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
		
        if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
		
        $server_token = "";
        if ($client_token != "") {
            $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
        }

        if ($client_token != "") {
            if ($client_token->jti == $server_token) {

               // $postdata = file_get_contents("php://input");
               // $request = json_decode($postdata);
               
				//$currentDate = $request->current_date;
				$currentDate="";
				
				$totalRegister =	$this->patient->getCountTotalRegister($currentDate);
				$totalRegisterSickApprove = $this->patient->getCountSickApprove($currentDate);


                //$updateData = $this->patient->updateSickApprovalStatus($opdid, $status);
				
				$response_arr =["totalApproved"=>$totalRegisterSickApprove,"totalRegister"=>$totalRegister];

				$json_response =[
						"msg_status" => HTTP_SUCCESS,
                                                "msg_data" => "",
                                                "result" => $response_arr
				
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
        exit;
    
   }

   public function getSickLeaveApproveCountByDateRange()
   {
       CUSTOMHEADER::getCustomHeader();
   $json_response = [];
   $headers = $this->input->request_headers();
   
   if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
   
   $server_token = "";
   if ($client_token != "") {
       $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
   }

   if ($client_token != "") {
       if ($client_token->jti == $server_token) {

           $postdata = file_get_contents("php://input");
           $request = json_decode($postdata);
          
           //$currentDate = $request->current_date;
           $currentDate="";
           
           $totalRegister =	$this->patient->getCountTotalRegisterByDateRange($request);
           $totalRegisterSickApprove = $this->patient->getCountSickApproveByDateRange($request);


           //$updateData = $this->patient->updateSickApprovalStatus($opdid, $status);
           
           $response_arr =["totalApproved"=>$totalRegisterSickApprove,"totalRegister"=>$totalRegister];

           $json_response =[
                   "msg_status" => HTTP_SUCCESS,
                                           "msg_data" => "",
                                           "result" => $response_arr
           
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
   exit;

}
        
        
        public function updateSickLeaveApprovalStatus()
        {

        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();
        if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
        $server_token = "";
        if ($client_token != "") {
            $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
        }

        if ($client_token != "") {
            if ($client_token->jti == $server_token) {


                $token_data = $client_token->data;
			    $hospital_id = $token_data->hospital_id;
			    $doctor_id = $token_data->doctor_id;
			    $userid = $token_data->user_id;

                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $id = $request->rowid;
                $status = $request->sick_leave_apprv;
                $updateData = $this->patient->updateSickApprovalStatus($id, $status ,$userid);



                if ($updateData) {
                    $json_response = [
                        "msg_status" => HTTP_SUCCESS,
                        "msg_data" => "Update success",
                        "result" => 1
                    ];
                } else {
                    $json_response = [
                        "msg_status" => HTTP_FAIL,
                        "msg_data" => "Update error",
                        "result" => 0
                    ];
                }
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
        exit;
    }
	
	
/* -----------------------------------8 Feb 2019------------------------------------- */

public function getAllPatientByDrType()
{
    CUSTOMHEADER::getCustomHeader();
    $json_response = [];
    $headers = $this->input->request_headers();
    
    if(CUSTOMHEADER::getAuthotoken($headers)){$client_token = CUSTOMHEADER::getAuthotoken($headers);}else{$client_token = "";}
    
    //var_dump($client_token);
    $server_token="";
    if($client_token!=""){
        $server_token = $this->authorisation->getToken($client_token->jti)->web_token;
       
    }
//        echo("client:".$client_token);
//        echo("serve:".$server_token);
//        
    if($client_token!=""){
    if($client_token->jti==$server_token ){

        $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
        
        $patient = $this->patient->getPatientListbyDrType($request);
         $json_response = [
                              "msg_status"=>HTTP_SUCCESS,
                              "msg_data"=>"Authentication ok.",
                              "result"=>$patient
                              
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

/*---------------------------------- 21 Feb 2019 ---------------------------- */

public function getPatientIPDInfoByUniqueID(){
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
        $pid = $request->pcode;
        $resultdata = $this->patient->getIPDPatientByUniqueID($pid);
        
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


/*---------------------------------- 22 February 2019 ------------------------------------ */
  
public function getSickleaveregisterList(){
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
        
               $resultdata = $this->patient->getSickleaveregisterList($request,$hospital_id);
        
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
    

/*------------------------------------ 23 Feb 2019 -------------------------- */

public function patientSickLeaveRegSearchByQry(){
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
        $qry = $request->pcode;
        
        $resultdata = $this->patient->patientSickLeaveRegSearchByQry($qry,$hospital_id);
        
        $json_response = [
                 "msg_status"=>HTTP_SUCCESS,
                 "msg_data"=>"Authentication ok.",
                 "patient"=>$resultdata
                
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

// added on 06.04.2019
public function getSickApprovedListcountgrpDate(){
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
        
               $resultdata = $this->patient->getSickApprovedListcountgrpDate($request,$hospital_id);
        
        $json_response = [
                 "msg_status"=>HTTP_SUCCESS,
                 "msg_data"=>"Authentication ok.",
                 "approvedsickleaveList"=>$resultdata,
    
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



    
    public function approvedsickleavedetailsbydate(){
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
			$searchdate = $request->searchdate;
			$resultdata = $this->patient->approvedsickleavedetailsbydate($searchdate);
			
			$json_response = [
                     "msg_status"=>HTTP_SUCCESS,
                     "msg_data"=>"Authentication ok.",
                     "resultdata"=>$resultdata
					
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
    


    

}// end of class
