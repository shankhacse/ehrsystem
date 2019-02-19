<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Fileimport extends CI_Controller{
    public function __construct() {
        parent::__construct();
        $this->load->model("User_model", "user", TRUE);
        $this->load->model("Authorization_model", "authorisation", TRUE);
		$this->load->model("Medicine_model", "medicine", TRUE);
		$this->load->model("Diagonosis_model", "diagonosis", TRUE);
		$this->load->model("Fileimport_model", "fileimport", TRUE);
        $this->load->library('excel');//load PHPExcel library
       
        
        ini_set('memory_limit', '960M');
        ini_set('post_max_size', '640M');
        ini_set('upload_max_filesize', '640M');
        ini_set('max_execution_time', 0);


        
    }
    public function index()
    {
      echo "string";
    }
// patient Excel file

/* -------------------------------------------------modified on 08.02.2019-------------------------------*/ 
  public function insertIntoTemp(){

    CUSTOMHEADER::getCustomHeader();
    $json_response = [];
    $headers = $this->input->request_headers();
    //pre($headers);


    if($_FILES['file']['error']!=4)
	{
        

            $tempFile = $_FILES['file']['tmp_name'];
            //$extension = ".xls";
        
            $array = explode('.', $_FILES['file']['name']);
            $extension = end($array);

                
                if($extension=="xls")
                {
                    $objReader= PHPExcel_IOFactory::createReader('Excel5');	// For excel 2007 	  
                }
                else
                {           	
                    $objReader= PHPExcel_IOFactory::createReader('Excel2007');	// For excel 2007 	  
                }

                $filename =  $tempFile;
				
				$objReader->setReadDataOnly(true); 		
				$objPHPExcel=$objReader->load($filename);
		        $totalrows=$objPHPExcel->setActiveSheetIndex(0)->getHighestRow();   //Count Numbe of rows avalable in excel      	 
		        $objWorksheet=$objPHPExcel->setActiveSheetIndex(0); 
                $totalcolumn = $objPHPExcel->setActiveSheetIndex(0)->getHighestDataColumn();
                

                for($i=2;$i<=$totalrows;$i++)
		        { 
                   
                    $garden_code[] = array(
                        "error" =>  $this->isValidGardenCodeStatus($objWorksheet->getCellByColumnAndRow(0,$i)->getValue()),
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(0,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(0,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(0,$i)->getValue()  ),
                    );

                    $employee_code[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(1,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(1,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(1,$i)->getValue()  ),
                    );
                    $employee_name[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(2,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(2,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(2,$i)->getValue()  ),
                    );

                    $type[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(3,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(3,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(3,$i)->getValue()  ),
                    );
                    $dr_type[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(4,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(4,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(4,$i)->getValue()  ),
                    );

                    $sex[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(5,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(5,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(5,$i)->getValue()  ),
                    );

                    $phno[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(6,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(6,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(6,$i)->getValue()  ),
                    );

                    
                    $mobilephno[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(7,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(7,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(7,$i)->getValue()  ),
                    );

                    $challan[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(8,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(8,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(8,$i)->getValue()  ),
                    );

                    $current_status[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(9,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(9,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(9,$i)->getValue()  ),
                    );

                    $date_of_birth=htmlspecialchars(trim($objWorksheet->getCellByColumnAndRow(10,$i)->getValue()));          			         //Excel Column 10
                    //echo $objWorksheet->getCellByColumnAndRow(10,$i)->getValue();
                    if (strpos($date_of_birth, '-') == true) 
                    {   // echo $objWorksheet->getCellByColumnAndRow(10,$i)->getValue();
                          $date_of_birth=str_replace(['/'], '-', $objWorksheet->getCellByColumnAndRow(10,$i)->getValue());  
                          $date_of_birth = date("d-m-Y",strtotime($date_of_birth));
                        
                    }
                    else
                    {
                            $date_of_birth = $objWorksheet->getCellByColumnAndRow(10,$i)->getValue();
                            $date_of_birth= ($date_of_birth == "" ? NULL : date('d-m-Y', PHPExcel_Shared_Date::ExcelToPHP($date_of_birth)) );
      
                            
                    }

                    $dob[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(10,$i)->getColumn().$i,
                        "value" => $date_of_birth ,
                    );

                    $division[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(11,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(11,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(11,$i)->getValue()  ),
                    );

                    $line[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(12,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(12,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(12,$i)->getValue()  ),
                    );



                    $houseno[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(13,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(13,$i)->getValue() == "" ? "" :$objWorksheet->getCellByColumnAndRow(13,$i)->getValue()  ),
                    );

                 

                    

                 
                   

                  
                  
                    

                   
                   


                }//end of row for loop 

                $json_response= [
                    "msg_status" => HTTP_SUCCESS,
                    "msg_data" => "Authentication ok.",
                    "garden_code" => $garden_code,
                    "employee_code" => $employee_code,
                    "employee_name" => $employee_name,
                    "type" => $type,
                    "dr_type" => $dr_type,
                    "sex" => $sex,
                    "phno" => $phno,
                    "mobilephno" => $mobilephno,
                    "challan" => $challan,
                    "current_status" => $current_status,
                    "dob" => $dob,
                    "division" => $division,
                    "line" => $line,
                    "houseno" => $houseno,
                    
                   
                    
                    
                ];
    }//end of file check


    


//exit;
   


header('Content-Type: application/json');
echo json_encode( $json_response );
exit;

    }



    public function insertIntoEmployee()
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
          
        
            $register = $this->fileimport->insertIntoEmployee($request,$hospital_id);
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



/*
	@return type boolean
	@method isValidPreTrainingStatus(pretrainingstatus)
    @date  26.03.2018
    @modified on 08.02.2019
*/
private function isValidGardenCodeStatus($code)
{
   


        if($code!="")
        {
            $where = array("estate.code"=>trim($code));
            $isexist = $this->commondatamodel->checkExistanceData('estate',$where);
            if($isexist>=1)
            {
                return 0;
            }
            else
            {
                return 1;
            }


        }
        else
        {
            return 0;
        }
            
    
   
}



public function verifyGrnFile()
    {
        CUSTOMHEADER::getCustomHeader();
        $json_response = [];
        $headers = $this->input->request_headers();

        if($_FILES['file']['error']!=4)
        { 
            $tempFile = $_FILES['file']['tmp_name'];
            //$extension = ".xls";
        
            $array = explode('.', $_FILES['file']['name']);
            $extension = end($array);

                
                if($extension=="xls")
                {
                    $objReader= PHPExcel_IOFactory::createReader('Excel5');	// For excel 2007 	  
                }
                else
                {           	
                    $objReader= PHPExcel_IOFactory::createReader('Excel2007');	// For excel 2007 	  
                }

                $filename =  $tempFile;
				
				$objReader->setReadDataOnly(true); 		
				$objPHPExcel=$objReader->load($filename);
		        $totalrows=$objPHPExcel->setActiveSheetIndex(0)->getHighestRow();   //Count Numbe of rows avalable in excel      	 
		        $objWorksheet=$objPHPExcel->setActiveSheetIndex(0); 
                $totalcolumn = $objPHPExcel->setActiveSheetIndex(0)->getHighestDataColumn();

                for($i=2;$i<=$totalrows;$i++)
		        { 
                    $dateinfo=htmlspecialchars(trim($objWorksheet->getCellByColumnAndRow(0,$i)->getValue()));          			         //Excel Column 8

                    if (strpos($dateinfo, '/') !== false) 
                    {
                        $dateinfo=str_replace(['/'], '-', $objWorksheet->getCellByColumnAndRow(0,$i)->getValue());  
                        $dateinfo = date("d-m-Y",strtotime($dateinfo));
                        
                    }
                    else
                    {
                            $dateinfo = $objWorksheet->getCellByColumnAndRow(0,$i)->getValue();
                            $dateinfo= ($dateinfo == "" ? NULL : date('d-m-Y', PHPExcel_Shared_Date::ExcelToPHP($dateinfo)) );

                            
                    }
                    $date[] = array(
                        "error" =>  0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(0,$i)->getColumn().$i,
                        "value" => $dateinfo,
                    );

                    $supplier[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(1,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(1,$i)->getValue() == "" ?
                                     "" :$objWorksheet->getCellByColumnAndRow(1,$i)->getValue()  ),
                    );

                    $medicine[] = array(
                        "error" => $this->isValidMedicine($objWorksheet->getCellByColumnAndRow(2,$i)->getValue()),
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(2,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(2,$i)->getValue() == "" ?
                                 "" :$objWorksheet->getCellByColumnAndRow(2,$i)->getValue()  ),
                    );

                    $batch[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(3,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(3,$i)->getValue() == "" ?
                                 "" :$objWorksheet->getCellByColumnAndRow(3,$i)->getValue()  ),
                    );

                    $expiryinfo=htmlspecialchars(trim($objWorksheet->getCellByColumnAndRow(4,$i)->getValue()));
                    if (strpos($expiryinfo, '/') !== false) 
                    {
                        $expiryinfo=str_replace(['/'], '-', $objWorksheet->getCellByColumnAndRow(4,$i)->getValue());  
                        $expiryinfo = date("d-m-Y",strtotime($expiryinfo));
                        
                    }
                    else
                    {
                            $expiryinfo = $objWorksheet->getCellByColumnAndRow(4,$i)->getValue();
                            $expiryinfo= ($expiryinfo == "" ? NULL : date('d-m-Y', PHPExcel_Shared_Date::ExcelToPHP($expiryinfo)) );

                            
                    }
                    
                    $expiry[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(4,$i)->getColumn().$i,
                        "value" => $expiryinfo,
                    );

                    $quantity[] = array(
                        "error" => 0,
                        "cell" =>  $objWorksheet->getCellByColumnAndRow(5,$i)->getColumn().$i,
                        "value" =>  ($objWorksheet->getCellByColumnAndRow(5,$i)->getValue() == "" ?
                                 "" :$objWorksheet->getCellByColumnAndRow(5,$i)->getValue()  ),
                    );

                }
                


                $json_response= [
                    
                    "date" => $date,
                    "supplier" => $supplier,
                    "medicine" => $medicine,
                    "batch" => $batch,
                    "expiry" => $expiry,
                    "quantity" => $quantity
                    
                ];
            
        }//end of file check
        
       
        header('Content-Type: application/json');
	echo json_encode( $json_response );
	exit;
        
      
    }


    /*
	@return type boolean
	@method isValidPreTrainingStatus(pretrainingstatus)
	@date  26.03.2018
*/
private function isValidMedicine($medicine)
{
   
     $medicine=strtoupper($medicine);

        if($medicine!="")
        {
            $where = array("medicine.medicine_name"=>trim($medicine));
            $isexist = $this->commondatamodel->checkExistanceData('medicine',$where);
            if($isexist>=1)
            {
                return 0;
            }
            else
            {
                return 1;
            }


        }
        else
        {
            return 0;
        }
            
    
   
}



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
      
    
        $register = $this->fileimport->insertIntoMedicine($request,$hospital_id);
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



}//end of class