<?php
if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Master extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();

        $this->load->model("Authorization_model", "authorisation", TRUE);
        $this->load->model("Bloodgroup_model", "bloodgroup", TRUE);
        $this->load->model("Patienttype_model", "patienttype", TRUE);
        $this->load->model("Relation_model", "relation", TRUE);
        $this->load->model("Investigation_model", "investigation", TRUE);
        $this->load->model("Hospital_model", "hospital", TRUE);
        $this->load->model("Vaccination_model", "vaccination", TRUE);
        $this->load->model("Master_model", "master", TRUE);
    }

    public function getBloodGroup()
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

                $resultdata = $this->bloodgroup->getBloodGroup();

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

    public function getPatientType()
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

                $resultdata = $this->patienttype->getPatientType();

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

    public function getDepTagEmplType()
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

                $resultdata = $this->patienttype->getDepTagEmplType();

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

    public function getRelations()
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

                $resultdata = $this->relation->getRelations();

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

    public function getRelationsByType()
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

                $type = $request->type;

                $resultdata = $this->relation->getRelationsByType($type);

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

    public function getInvestigations()
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

                $resultdata = $this->investigation->getInvestigations();

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

    public function getHospitals()
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

                $resultdata = $this->hospital->getHospital();

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

    public function getVaccinationSchedule()
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

                $resultdata = $this->vaccination->getVaccinationSchedule();

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

    
    /* @ author : Mithilesh
     * @ date   : 22.12.2018
     * @ desc   : get vaccine list by schedule for
     */
    
    public function getPatientVaccinListBySchedule()
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
                
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);
                $scheduleFor =  $request->schedule;
                $patient_id =  $request->pid;
                
                $resultdata = $this->vaccination->getPatientVaccineListByScheduleFor($scheduleFor,$patient_id);
                
                /*
                echo "<pre>";
                print_r($resultdata);
                echo "</pre>";
                */
                
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


    /* @ author : Mithilesh
     * @ date   : 19.01.2019
     * @ desc   : get Master Data according to Table Name
     */
    
    public function getMasterInfos()
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
                
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);

                $token_data = $client_token->data;
	            $hospital_id = $token_data->hospital_id;
	            $doctor_id = $token_data->doctor_id;
                $tableName = $request->datas;
                $resultdata = $this->master->getMasterData($tableName);
                
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


    /* @ author : Mithilesh
     * @ date   : 22.12.2018
     * @ desc   : get vaccine list by schedule for
     */
    
    public function saveCommonMastDatas()
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
                
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);

                $token_data = $client_token->data;
	            $hospital_id = $token_data->hospital_id;
	            $doctor_id = $token_data->doctor_id;
                
                $resultdata = $this->master->saveCommonMastDatas($request,$hospital_id);
                
              
               
             
                
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



     public function getGroup()
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

                $resultdata = $this->commondatamodel->getAllDropdownData('group');

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


       /* @ author : shankha
     * @ date   : 29.01.2019
     * @ desc   : get dropdown Data according to Table Name
     */
    
    public function getMasterDropdown()
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
                
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata);

                $token_data = $client_token->data;
	            $hospital_id = $token_data->hospital_id;
	            $doctor_id = $token_data->doctor_id;
                $tableName = $request->datas;
                $resultdata = $this->commondatamodel->getAllDropdownData($tableName);
                
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

    /**
     * Division Master
     */


    public function getDivision()
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

                $resultdata = $this->commondatamodel->getAllRecordOrderBy("division_master","division_name","ASC");

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



    /**
     * Challan Master
     */


    public function getChallanMaster()
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

                $resultdata = $this->commondatamodel->getAllRecordOrderBy("challan_master","name","ASC");

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


     /**
     * Challan Master
     */


    public function getLineMaster()
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
                $resultdata = $this->commondatamodel->getAllRecordOrderBy("line_master","lie_name","ASC");

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

}
