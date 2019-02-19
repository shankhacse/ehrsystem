<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class api extends CI_Controller{
public function __construct()
 {
   parent::__construct();

	$this->load->library('session');
	//$this->load->model('apimodel','apimodel',TRUE);

 }

 public function testjwt(){
	   $tokenId    = base64_encode(random_bytes(32));
	   echo $tokenId;
	    $issuedAt   = time();
		$notBefore  = $issuedAt + 10;             //Adding 10 seconds
		$expire     = $notBefore + 60;            // Adding 60 seconds
		$serverName = $_SERVER['HTTP_HOST'];


		$data = [
        'iat'  => $issuedAt,         // Issued at: time when the token was generated
        'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
        'iss'  => $serverName,       // Issuer
        'nbf'  => $notBefore,        // Not before
        'exp'  => $expire,           // Expire
        'data' => [                  // Data related to the signer user
            'userId'   => 5, // userid from the users table
            'userName' => "mithi", // User name
        ]
    ];

	  $secretKey = "7lglzCn9kVcGfckWf6jZBJuLGAPwPm3rnti5nxhfDy0=";

	$jwt = JWT::encode(
        $data,      //Data to be encoded in the JWT
        $secretKey, // The signing key
        'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
        );

    $unencodedArray = ['jwt' => $jwt];
    echo json_encode($unencodedArray);


	 $token = JWT::decode($jwt, $secretKey, array('HS512'));
	var_dump($token);

	echo "<pre>";
	print_r($token);
	echo "<pre>";

 }


 public function signInVerification(){
	CUSTOMHEADER::getCustomHeader();
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$requestApiKey = CUSTOMHEADER::getHeaderX_API_Token();
	//$serverAPI = $this->apimodel->getAPIkey();
	$serverAPI = "testtoken";

	if(!empty($serverAPI) && $serverAPI === trim($requestApiKey)){
		
		print_r($request);
		/*$data = $request->data;
		$result = $this->apimodel->verifyUserLogin($data);
		if(sizeof($result)>0){
			$userdata = $this->apimodel->getSignedInUserData($result->user_id);
		}
		*/
	}
	else{

		header('HTTP/1.0 401 Unauthorized');
	}


 }

 public function userSignUp(){
	CUSTOMHEADER::getCustomHeader();
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$requestApiKey = CUSTOMHEADER::getHeaderX_API_Token();
	//$serverAPI = $this->apimodel->getAPIkey();

	if(!empty($serverAPI) && $serverAPI === trim($requestApiKey)){
		$data = $request->data;
		// Insert Into Patient // Registration Of New patient
		//$register = $this->apimodel->registerNewUser($data);
		if($register){
			$result = [
			"status"=>200,
            "statuscode"=>"SUCCESS",
			"data"=> NULL
			];
		}
		else{
			$result = [
			"status"=>200,
            "statuscode"=>"ERROR",
			"data"=> NULL
			];
		}

	}
	else{
		$result = [
			"status"=>403,
            "statuscode"=>"KEY_MISSING",
			"data"=> NULL,
			"token"=>NULL
			];
	}

	$resultdata = json_encode($result);
	echo $resultdata;
	exit;


 }

}
