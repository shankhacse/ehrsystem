<?php
	if(!function_exists('stringToArray'))
	{
		function stringToArray($string)
		{	
		   $datas = explode(",",$string);
		   return $datas; 
		}
	}
	if(!function_exists('arrayToStringWithComaa'))
	{
		$string = "";
		function arrayToStringWithComaa($arr)
		{	
		   $string = implode(",",$arr);
		   return $string; 
		}
	}
	
	if(!function_exists('geAge')){
		function geAge($dob)
		{	
		    $dateOfBirth = date('d-m-Y',strtotime($dob));
			$today = date("Y-m-d");
			$diff = date_diff(date_create($dateOfBirth), date_create($today));
			return $diff->format('%y');
		}
	}

	if(!function_exists('pre'))
	{
		
		function pre($printarry){
			$CI =& get_instance();
			echo "<pre>";
			print_r($printarry);
			echo "</pre>";
		}
	}

if(!function_exists('q'))
	{
		
		function q(){
			$CI =& get_instance();
			$CI->load->database();
			echo $CI->db->last_query();
		}
	}


	if(!function_exists('getServerTag'))
	{
		
		function getServerTag() {
			$CI =& get_instance();
			return $CI->config->item("server_tag");
		}
	}

	if(!function_exists('generateUniqRowID'))
	{
		
		function generateUniqRowID($incrementid,$servertag,$hospitalid) {
			return $incrementid.$servertag.$hospitalid;
		}
	}
	
?>
	


