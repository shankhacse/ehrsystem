<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Menu_model extends CI_Model {
    public function getMenuByRole($role_code)
    {
        $data =[];
        $sql = "SELECT menu.* FROM menu
                INNER JOIN authorisation ON menu.menu_id =  authorisation.menu_id
                INNER JOIN user_role ON authorisation.role_id = user_role.id
                WHERE user_role.user_role_code='".$role_code."' AND menu.is_active ='Y'
                AND menu.parent_id IS NULL";
        $query  = $this->db->query($sql);
        if($query->num_rows()>0){
            foreach ($query->result() as $rows) {
                $data[]=[
                    "menu_id"=>$rows->menu_id,
                    "menu_name"=>$rows->menu_name,
                    "menu_link"=>$rows->menu_link,
                    "parent_id"=>$rows->parent_id,
                    "is_active"=>$rows->is_active,
                    "menu_serial"=>$rows->menu_serial,
                    "menu_code"=>$rows->menu_code,
                    "Submenu"=> $this->getSubmenu($rows->menu_id)    
                ];
            }
        
        }
        
        return $data;
    }
    
    private function getSubmenu($menuId)
    {
       $data = []; 
       $sql=" SELECT menu.* FROM menu
                INNER JOIN authorisation ON menu.menu_id =  authorisation.menu_id
                INNER JOIN user_role ON authorisation.role_id = user_role.id
                WHERE menu.is_active ='Y'
                AND menu.parent_id =".(int)$menuId;
       
       $query  = $this->db->query($sql);
        if($query->num_rows()>0){
            foreach ($query->result() as $rows) {
                $data[]=[
                    "menu_id"=>$rows->menu_id,
                    "menu_name"=>$rows->menu_name,
                    "menu_link"=>$rows->menu_link,
                    "parent_id"=>$rows->parent_id,
                    "is_active"=>$rows->is_active,
                    "menu_serial"=>$rows->menu_serial,
                    "menu_code"=>$rows->menu_code,
                    
                ];
            }
        
        }
        return $data;
       
       
    }
    
}
