<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Authorization_model extends CI_Model{
  public function getToken($key){
      $authorization="";
      
      $query = $this->db->select("web_token.*")
                        ->where("web_token.web_token",$key)
                        ->get("web_token");
               // echo($this->db->last_query());
      if($query->num_rows()>0){
          $authorization = $query->row();
      }
      return $authorization;
      
  }
  public function getTokenId()
  {
      $token="";
      $query = $this->db->select("web_token.*")->get("web_token");
      if($query->num_rows()>0){
          $token = $query->row();
      }
      return $token;        
  }
  
}
