/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.5.5-10.1.31-MariaDB : Database - ehrdata
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ehrdata` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `ehrdata`;

/*Table structure for table `authorisation` */

DROP TABLE IF EXISTS `authorisation`;

CREATE TABLE `authorisation` (
  `authorisation_id` int(20) NOT NULL AUTO_INCREMENT,
  `menu_id` int(20) DEFAULT NULL,
  `role_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`authorisation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `authorisation` */

insert  into `authorisation`(`authorisation_id`,`menu_id`,`role_id`) values (1,1,4);
insert  into `authorisation`(`authorisation_id`,`menu_id`,`role_id`) values (2,2,4);
insert  into `authorisation`(`authorisation_id`,`menu_id`,`role_id`) values (3,3,4);
insert  into `authorisation`(`authorisation_id`,`menu_id`,`role_id`) values (4,4,4);
insert  into `authorisation`(`authorisation_id`,`menu_id`,`role_id`) values (5,5,4);
insert  into `authorisation`(`authorisation_id`,`menu_id`,`role_id`) values (6,6,3);

/*Table structure for table `blood_group` */

DROP TABLE IF EXISTS `blood_group`;

CREATE TABLE `blood_group` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `bld_group_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `blood_group` */

insert  into `blood_group`(`id`,`bld_group_code`) values (1,'A+');
insert  into `blood_group`(`id`,`bld_group_code`) values (2,'A-');
insert  into `blood_group`(`id`,`bld_group_code`) values (3,'B+');
insert  into `blood_group`(`id`,`bld_group_code`) values (4,'B-');
insert  into `blood_group`(`id`,`bld_group_code`) values (5,'AB+');
insert  into `blood_group`(`id`,`bld_group_code`) values (6,'AB-');
insert  into `blood_group`(`id`,`bld_group_code`) values (7,'O+');
insert  into `blood_group`(`id`,`bld_group_code`) values (8,'O-');
insert  into `blood_group`(`id`,`bld_group_code`) values (9,'UNKNOWN');

/*Table structure for table `diagonesis_medicine_map` */

DROP TABLE IF EXISTS `diagonesis_medicine_map`;

CREATE TABLE `diagonesis_medicine_map` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `medicine_id` int(20) DEFAULT NULL,
  `diagonosis_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `diagonesis_medicine_map` */

insert  into `diagonesis_medicine_map`(`id`,`medicine_id`,`diagonosis_id`) values (1,1,1);
insert  into `diagonesis_medicine_map`(`id`,`medicine_id`,`diagonosis_id`) values (2,2,1);
insert  into `diagonesis_medicine_map`(`id`,`medicine_id`,`diagonosis_id`) values (3,3,1);
insert  into `diagonesis_medicine_map`(`id`,`medicine_id`,`diagonosis_id`) values (4,4,2);
insert  into `diagonesis_medicine_map`(`id`,`medicine_id`,`diagonosis_id`) values (5,5,2);

/*Table structure for table `diagonosis` */

DROP TABLE IF EXISTS `diagonosis`;

CREATE TABLE `diagonosis` (
  `diagonosis_id` int(20) NOT NULL AUTO_INCREMENT,
  `diagonosis_name` varchar(255) NOT NULL,
  `hospital_id` int(20) DEFAULT NULL,
  `accociated_icd_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`diagonosis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `diagonosis` */

insert  into `diagonosis`(`diagonosis_id`,`diagonosis_name`,`hospital_id`,`accociated_icd_code`) values (1,'Blood Clots',1,NULL);
insert  into `diagonosis`(`diagonosis_id`,`diagonosis_name`,`hospital_id`,`accociated_icd_code`) values (2,'Brain Concussion',1,NULL);
insert  into `diagonosis`(`diagonosis_id`,`diagonosis_name`,`hospital_id`,`accociated_icd_code`) values (3,'Burns',1,NULL);
insert  into `diagonosis`(`diagonosis_id`,`diagonosis_name`,`hospital_id`,`accociated_icd_code`) values (4,'Cholera',1,NULL);

/*Table structure for table `discharge_summary` */

DROP TABLE IF EXISTS `discharge_summary`;

CREATE TABLE `discharge_summary` (
  `discharge_id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(20) DEFAULT NULL,
  `admission_id` int(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `advise_1` varchar(255) DEFAULT NULL,
  `advise_2` varchar(255) DEFAULT NULL,
  `advise_3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`discharge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `discharge_summary` */

/*Table structure for table `doctormaster` */

DROP TABLE IF EXISTS `doctormaster`;

CREATE TABLE `doctormaster` (
  `doctor_id` int(20) NOT NULL AUTO_INCREMENT,
  `doctor_name` varchar(255) NOT NULL,
  `hospital_id` int(20) NOT NULL,
  `specialisation` varchar(255) DEFAULT NULL,
  `registration_num` varchar(255) DEFAULT NULL,
  `year_off_exp_appl` varchar(255) DEFAULT NULL,
  `year_off_exp_total` varchar(255) DEFAULT NULL,
  `is_active` enum('Y') DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `doctormaster` */

insert  into `doctormaster`(`doctor_id`,`doctor_name`,`hospital_id`,`specialisation`,`registration_num`,`year_off_exp_appl`,`year_off_exp_total`,`is_active`) values (1,'Sharma',1,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `estate` */

DROP TABLE IF EXISTS `estate`;

CREATE TABLE `estate` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `estate` */

insert  into `estate`(`id`,`name`) values (1,'Powai ');

/*Table structure for table `frequency_master` */

DROP TABLE IF EXISTS `frequency_master`;

CREATE TABLE `frequency_master` (
  `frequency_master_id` int(10) NOT NULL AUTO_INCREMENT,
  `medicine_type` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`frequency_master_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

/*Data for the table `frequency_master` */

insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (1,'Tablet','OD');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (2,'Tablet','BD');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (3,'Tablet','TDS');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (4,'Tablet','HS');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (5,'Syrup','OD');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (6,'Syrup','BD');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (7,'Syrup','TDS');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (8,'Syrup','HS');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (9,'Drop','OD');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (10,'Drop','BD');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (11,'Drop','TDS');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (12,'Drop','HS');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (13,'Injection','1 amp stat');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (14,'Injection','1 amp BD');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (15,'Ointment','1 Apply Locally');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (16,'Ointment','2 Apply Locally');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (17,'Ointment','3 Apply Locally');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (18,'Ointment','4 Apply Locally');
insert  into `frequency_master`(`frequency_master_id`,`medicine_type`,`frequency`) values (19,'Ointment','5 Apply Locally');

/*Table structure for table `grn_details` */

DROP TABLE IF EXISTS `grn_details`;

CREATE TABLE `grn_details` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `grn_master_id` int(20) DEFAULT NULL,
  `medicine_id` int(20) DEFAULT NULL,
  `batch_id` int(20) DEFAULT NULL,
  `expiray_date` datetime DEFAULT NULL,
  `qty` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `grn_details` */

/*Table structure for table `grn_master` */

DROP TABLE IF EXISTS `grn_master`;

CREATE TABLE `grn_master` (
  `grn_id` int(20) DEFAULT NULL,
  `hospital_id` int(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `supplier_details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `grn_master` */

/*Table structure for table `hospitals` */

DROP TABLE IF EXISTS `hospitals`;

CREATE TABLE `hospitals` (
  `hospital_id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(255) NOT NULL,
  `estate` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hospital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `hospitals` */

insert  into `hospitals`(`hospital_id`,`hospital_name`,`estate`,`creation_date`) values (1,'Baptist Church Hospital','Pauwi','2018-10-03 16:22:10');

/*Table structure for table `investigation` */

DROP TABLE IF EXISTS `investigation`;

CREATE TABLE `investigation` (
  `investigation_id` int(20) NOT NULL AUTO_INCREMENT,
  `investigation_name` varchar(255) NOT NULL,
  PRIMARY KEY (`investigation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `investigation` */

/*Table structure for table `ipd_patient_master` */

DROP TABLE IF EXISTS `ipd_patient_master`;

CREATE TABLE `ipd_patient_master` (
  `ipd_patient_master_id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(20) DEFAULT NULL,
  `admission_id` int(20) DEFAULT NULL,
  `patient_id` int(20) DEFAULT NULL,
  `doctor_id` int(20) DEFAULT NULL,
  `admission_date` datetime DEFAULT NULL,
  `discharge_date` datetime DEFAULT NULL,
  `opd_prescription_id` int(11) DEFAULT NULL,
  `illness_history` varchar(255) DEFAULT NULL,
  `provision_diagnosis_id` int(20) DEFAULT NULL,
  `final_digonosis_id` int(20) DEFAULT NULL,
  `discharge_flag` tinyint(1) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ipd_patient_master_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ipd_patient_master` */

/*Table structure for table `issue_medicine_detail` */

DROP TABLE IF EXISTS `issue_medicine_detail`;

CREATE TABLE `issue_medicine_detail` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `issue_master_id` int(20) DEFAULT NULL,
  `hospital_id` int(20) DEFAULT NULL,
  `medicine_id` int(20) DEFAULT NULL,
  `batch_id` int(20) DEFAULT NULL,
  `qty` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `issue_medicine_detail` */

/*Table structure for table `issue_medicine_master` */

DROP TABLE IF EXISTS `issue_medicine_master`;

CREATE TABLE `issue_medicine_master` (
  `issue_id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(20) DEFAULT NULL,
  `patient_id` int(20) DEFAULT NULL,
  `date_of_issue` datetime DEFAULT NULL,
  `opd_ipd_prescription_id` int(20) DEFAULT NULL,
  `opd_ipd_flag` enum('O','I') DEFAULT NULL,
  PRIMARY KEY (`issue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `issue_medicine_master` */

/*Table structure for table `medicine` */

DROP TABLE IF EXISTS `medicine`;

CREATE TABLE `medicine` (
  `medicine_id` int(20) NOT NULL AUTO_INCREMENT,
  `medicine_name` varchar(255) NOT NULL,
  `medicine_type` varchar(255) DEFAULT NULL,
  `brand_name` varchar(255) DEFAULT NULL,
  `generic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`medicine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Data for the table `medicine` */

insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (1,'Clomid','Tablet',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (2,'Dexamethasone','Syrup',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (3,'Gabavale-5','Drop',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (4,'Hetlioz','IV',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (5,'Otezla','Injection',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (6,'ACCLUDUS - P','Tablet',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (7,'ACCLUDUS - SP','Tablet',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (8,'ACILOC 150MG TAB','Tablet',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (9,'INJ 25% DEXTROSE','Injection',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (10,'INJ DECODRON 30ML','Injection',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (11,'AERODIL LS','Syrup',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (12,'NO-COLD SYP','Syrup',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (13,'CIPLOX D EYE DROP','Drop',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (14,'OTIFLOX EAR DR','Drop',NULL,NULL);
insert  into `medicine`(`medicine_id`,`medicine_name`,`medicine_type`,`brand_name`,`generic`) values (15,'OTRIVIN N DROP (PED)','Drop',NULL,NULL);

/*Table structure for table `medicine_dosage` */

DROP TABLE IF EXISTS `medicine_dosage`;

CREATE TABLE `medicine_dosage` (
  `dosage_id` int(20) NOT NULL AUTO_INCREMENT,
  `medicine_type_id` varchar(255) DEFAULT NULL,
  `srl` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dosage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

/*Data for the table `medicine_dosage` */

insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (1,'Tablet','1','1');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (2,'Tablet','2','2');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (3,'Tablet','3','3');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (4,'Tablet','4','4');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (5,'Tablet','5','5');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (6,'Syrup','1','0.5');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (7,'Syrup','2','1');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (8,'Syrup','3','1.5');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (9,'Syrup','4','2');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (10,'Syrup','5','2.5');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (11,'Syrup','6','5');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (12,'Syrup','7','7.5');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (13,'Syrup','8','10');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (14,'Drop','1','1');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (15,'Drop','2','2');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (16,'Drop','3','3');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (17,'Drop','4','4');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (18,'Drop','5','5');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (19,'Injection','1','1 bottle');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (20,'Injection','2','2 bottle');
insert  into `medicine_dosage`(`dosage_id`,`medicine_type_id`,`srl`,`value`) values (21,'Injection','3','3 bottle');

/*Table structure for table `medicine_stock` */

DROP TABLE IF EXISTS `medicine_stock`;

CREATE TABLE `medicine_stock` (
  `medicine_stock_id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(20) DEFAULT NULL,
  `medicine_id` int(20) DEFAULT NULL,
  `batch_id` int(20) DEFAULT NULL,
  `expairy_date` datetime DEFAULT NULL,
  `stock` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`medicine_stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `medicine_stock` */

/*Table structure for table `medicine_type` */

DROP TABLE IF EXISTS `medicine_type`;

CREATE TABLE `medicine_type` (
  `medicine_type_id` int(20) NOT NULL AUTO_INCREMENT,
  `medicine_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`medicine_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `medicine_type` */

insert  into `medicine_type`(`medicine_type_id`,`medicine_type`) values (1,'Syrup');
insert  into `medicine_type`(`medicine_type_id`,`medicine_type`) values (2,'Tablet');
insert  into `medicine_type`(`medicine_type_id`,`medicine_type`) values (3,'Capsule');

/*Table structure for table `menu` */

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `menu_id` int(20) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(255) DEFAULT NULL,
  `menu_link` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_active` enum('Y','N') DEFAULT 'Y',
  `menu_serial` int(20) DEFAULT NULL,
  `menu_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `menu` */

insert  into `menu`(`menu_id`,`menu_name`,`menu_link`,`parent_id`,`is_active`,`menu_serial`,`menu_code`) values (1,'Get Ready',NULL,NULL,'Y',0,'GET_READY');
insert  into `menu`(`menu_id`,`menu_name`,`menu_link`,`parent_id`,`is_active`,`menu_serial`,`menu_code`) values (2,'Hospital',NULL,1,'Y',1,'HSPTL');
insert  into `menu`(`menu_id`,`menu_name`,`menu_link`,`parent_id`,`is_active`,`menu_serial`,`menu_code`) values (3,'Estate',NULL,1,'Y',2,'ESTT');
insert  into `menu`(`menu_id`,`menu_name`,`menu_link`,`parent_id`,`is_active`,`menu_serial`,`menu_code`) values (4,'Doctor',NULL,1,'Y',3,'DOC');
insert  into `menu`(`menu_id`,`menu_name`,`menu_link`,`parent_id`,`is_active`,`menu_serial`,`menu_code`) values (5,'Pharmacist',NULL,1,'Y',4,'PHRM');
insert  into `menu`(`menu_id`,`menu_name`,`menu_link`,`parent_id`,`is_active`,`menu_serial`,`menu_code`) values (6,'Registration',NULL,NULL,'Y',0,'RGTR');

/*Table structure for table `mnc_detail` */

DROP TABLE IF EXISTS `mnc_detail`;

CREATE TABLE `mnc_detail` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(20) DEFAULT NULL,
  `patient_id` int(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `anemia` varchar(255) DEFAULT NULL,
  `bp` varchar(255) DEFAULT NULL,
  `pulse` varchar(255) DEFAULT NULL,
  `mnc_master_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `mnc_detail` */

/*Table structure for table `mnc_master` */

DROP TABLE IF EXISTS `mnc_master`;

CREATE TABLE `mnc_master` (
  `mnc_master_id` int(20) DEFAULT NULL,
  `hospital_id` int(20) DEFAULT NULL,
  `patient_id` int(20) DEFAULT NULL,
  `LMP` varchar(255) DEFAULT NULL,
  `EDD` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `mnc_master` */

/*Table structure for table `opd_ipd_medicine` */

DROP TABLE IF EXISTS `opd_ipd_medicine`;

CREATE TABLE `opd_ipd_medicine` (
  `hospital_id` int(20) DEFAULT NULL,
  `prescription_admission_id` int(20) DEFAULT NULL,
  `opd_ipd_flag` enum('O','I') DEFAULT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `dose_id` int(20) DEFAULT NULL,
  `frequeny` int(20) DEFAULT NULL,
  `number_of_days_sick_leave` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `opd_ipd_medicine` */

/*Table structure for table `opd_ipd_test` */

DROP TABLE IF EXISTS `opd_ipd_test`;

CREATE TABLE `opd_ipd_test` (
  `opd_ipd_test_id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(20) DEFAULT NULL,
  `prescription_addmission_id` int(20) DEFAULT NULL,
  `opd_ipd_flag` enum('I','O') DEFAULT NULL,
  `test_id` int(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`opd_ipd_test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `opd_ipd_test` */

/*Table structure for table `opd_prescription` */

DROP TABLE IF EXISTS `opd_prescription`;

CREATE TABLE `opd_prescription` (
  `opd_prescription_id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `patient_id` int(20) DEFAULT NULL,
  `doctor_id` int(20) DEFAULT NULL,
  `accidental_approval` tinyint(1) DEFAULT NULL,
  `symptom_list` varchar(255) DEFAULT NULL,
  `diagonised_list` varchar(255) DEFAULT NULL,
  `sick_flag` enum('Y','N') DEFAULT NULL,
  `no_of_days_sick` int(20) DEFAULT NULL,
  `sick_leave_apprv` enum('N','Y') DEFAULT 'N',
  `ipd_reco_flag` enum('R','S') DEFAULT NULL,
  `hospital_rec_flag` tinyint(1) DEFAULT NULL,
  `referal_hospital_id` int(20) DEFAULT NULL,
  `keep_in_observation` tinyint(1) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`opd_prescription_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `opd_prescription` */

insert  into `opd_prescription`(`opd_prescription_id`,`hospital_id`,`date`,`patient_id`,`doctor_id`,`accidental_approval`,`symptom_list`,`diagonised_list`,`sick_flag`,`no_of_days_sick`,`sick_leave_apprv`,`ipd_reco_flag`,`hospital_rec_flag`,`referal_hospital_id`,`keep_in_observation`,`comments`) values (1,1,'2018-10-22 17:46:56',3,1,NULL,NULL,NULL,'Y',10,'N',NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `parkinglot` */

DROP TABLE IF EXISTS `parkinglot`;

CREATE TABLE `parkinglot` (
  `report_upload` varchar(255) DEFAULT NULL,
  `RFID` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `parkinglot` */

/*Table structure for table `patient_health_profile` */

DROP TABLE IF EXISTS `patient_health_profile`;

CREATE TABLE `patient_health_profile` (
  `patient_health_profile_id` int(10) NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) NOT NULL,
  `date` datetime NOT NULL,
  `prescription_addmission_id` int(10) DEFAULT NULL,
  `opd_ipd_flag` enum('O','I') NOT NULL,
  `pulse` varchar(30) DEFAULT NULL,
  `temp` varchar(30) DEFAULT NULL,
  `anemia` varchar(30) DEFAULT NULL,
  `bp` varchar(30) DEFAULT NULL,
  `jaundice` varchar(30) DEFAULT NULL,
  `odema` varchar(30) DEFAULT NULL,
  `height` varchar(30) DEFAULT NULL,
  `weight` varchar(30) DEFAULT NULL,
  `comment` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`patient_health_profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `patient_health_profile` */

/*Table structure for table `patient_type` */

DROP TABLE IF EXISTS `patient_type`;

CREATE TABLE `patient_type` (
  `patient_type_id` int(20) NOT NULL AUTO_INCREMENT,
  `patient_type` varchar(255) NOT NULL,
  `ask_for_relation` tinyint(1) DEFAULT '0',
  `alias_code` varchar(20) DEFAULT NULL,
  `is_active` enum('Y','N') DEFAULT 'Y',
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`patient_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `patient_type` */

insert  into `patient_type`(`patient_type_id`,`patient_type`,`ask_for_relation`,`alias_code`,`is_active`,`creation_date`) values (1,'Permanent Worker',0,'P/W','Y','2018-10-02 13:51:58');
insert  into `patient_type`(`patient_type_id`,`patient_type`,`ask_for_relation`,`alias_code`,`is_active`,`creation_date`) values (2,'Temporary Worker',0,'T/W','Y','2018-10-02 13:52:22');
insert  into `patient_type`(`patient_type_id`,`patient_type`,`ask_for_relation`,`alias_code`,`is_active`,`creation_date`) values (3,'Dependent',1,'Dep','Y','2018-10-02 13:52:34');
insert  into `patient_type`(`patient_type_id`,`patient_type`,`ask_for_relation`,`alias_code`,`is_active`,`creation_date`) values (4,'Non-Worker',1,'N/W','Y','2018-10-02 13:53:22');

/*Table structure for table `patients` */

DROP TABLE IF EXISTS `patients`;

CREATE TABLE `patients` (
  `patient_id` int(20) NOT NULL AUTO_INCREMENT,
  `patient_code` varchar(255) NOT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `patient_type_id` int(255) DEFAULT NULL,
  `line_number` varchar(255) DEFAULT NULL,
  `division_number` varchar(255) DEFAULT NULL,
  `challan_number` varchar(255) DEFAULT NULL,
  `estate` varchar(255) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `gender` enum('M','F','O') DEFAULT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `adhar` varchar(255) DEFAULT NULL,
  `mobile_one` varchar(20) DEFAULT NULL,
  `mobile_two` varchar(20) DEFAULT NULL,
  `blood_group` int(6) DEFAULT NULL,
  `relation_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

/*Data for the table `patients` */

insert  into `patients`(`patient_id`,`patient_code`,`patient_name`,`patient_type_id`,`line_number`,`division_number`,`challan_number`,`estate`,`dob`,`gender`,`employee_id`,`adhar`,`mobile_one`,`mobile_two`,`blood_group`,`relation_id`) values (1,'P0001','Amtur Rahaman',1,'L00123','D1253',NULL,'Pawaui','1993-02-26 13:54:04','M','EMP/0123/PWI','1253 1252 123','2147483647','2147483647',0,NULL);
insert  into `patients`(`patient_id`,`patient_code`,`patient_name`,`patient_type_id`,`line_number`,`division_number`,`challan_number`,`estate`,`dob`,`gender`,`employee_id`,`adhar`,`mobile_one`,`mobile_two`,`blood_group`,`relation_id`) values (2,'P0002','Wasim Zafor',1,'L00125','D0012',NULL,'Dimna','2003-02-03 13:58:13','M','EMP/0122/PWI','45025 225 252 56','2147483647','2147483647',0,NULL);
insert  into `patients`(`patient_id`,`patient_code`,`patient_name`,`patient_type_id`,`line_number`,`division_number`,`challan_number`,`estate`,`dob`,`gender`,`employee_id`,`adhar`,`mobile_one`,`mobile_two`,`blood_group`,`relation_id`) values (3,'P0003','Mithilesh',1,'L12145','5656Mikiy','342423d','1','1993-10-15 00:00:00','M','','12345454445','9883772618','8469875985',2,4);
insert  into `patients`(`patient_id`,`patient_code`,`patient_name`,`patient_type_id`,`line_number`,`division_number`,`challan_number`,`estate`,`dob`,`gender`,`employee_id`,`adhar`,`mobile_one`,`mobile_two`,`blood_group`,`relation_id`) values (12,'P0004','Mithi',1,'1545451','D12251515','C12515145','1','1997-03-05 00:00:00','F',NULL,'844424245454','9883772618','84545521514',3,2);
insert  into `patients`(`patient_id`,`patient_code`,`patient_name`,`patient_type_id`,`line_number`,`division_number`,`challan_number`,`estate`,`dob`,`gender`,`employee_id`,`adhar`,`mobile_one`,`mobile_two`,`blood_group`,`relation_id`) values (21,'P0004','suman',0,'','','','','2018-10-06 00:00:00','','','843424245455','','',0,0);
insert  into `patients`(`patient_id`,`patient_code`,`patient_name`,`patient_type_id`,`line_number`,`division_number`,`challan_number`,`estate`,`dob`,`gender`,`employee_id`,`adhar`,`mobile_one`,`mobile_two`,`blood_group`,`relation_id`) values (22,'X001','Shib',0,'','','','','2018-10-06 00:00:00','M','','843424245458','','',0,0);
insert  into `patients`(`patient_id`,`patient_code`,`patient_name`,`patient_type_id`,`line_number`,`division_number`,`challan_number`,`estate`,`dob`,`gender`,`employee_id`,`adhar`,`mobile_one`,`mobile_two`,`blood_group`,`relation_id`) values (23,'P0004','Suman',0,'','','','','2018-10-06 00:00:00','M','','843424245459','','',0,0);

/*Table structure for table `registration` */

DROP TABLE IF EXISTS `registration`;

CREATE TABLE `registration` (
  `registration_id` int(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` int(20) DEFAULT NULL,
  `date_of_registration` datetime DEFAULT NULL,
  `patient_id` int(20) DEFAULT NULL,
  `served_flag` enum('Y','N') DEFAULT NULL,
  PRIMARY KEY (`registration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

/*Data for the table `registration` */

insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (1,1,'2018-10-06 14:30:11',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (2,1,'2018-10-06 19:25:05',19,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (3,1,'2018-10-06 19:26:03',12,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (4,1,'2018-10-06 19:27:00',22,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (5,1,'2018-10-06 19:28:07',12,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (6,1,'2018-10-08 11:47:41',3,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (7,1,'2018-10-08 11:54:03',4,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (8,1,'2018-10-10 15:29:11',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (9,1,'2018-10-11 12:27:16',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (10,1,'2018-10-11 12:29:29',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (11,1,'2018-10-12 16:21:03',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (12,1,'2018-10-12 19:31:57',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (13,1,'2018-10-12 19:35:49',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (14,1,'2018-10-12 19:36:47',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (15,1,'2018-10-12 19:42:35',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (16,1,'2018-10-12 19:47:27',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (17,1,'2018-10-22 19:49:01',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (18,1,'2018-10-22 19:56:01',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (19,1,'2018-10-22 20:01:15',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (20,1,'2018-10-22 13:36:07',2,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (21,1,'2018-10-22 13:36:15',12,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (22,1,'2018-10-22 15:42:07',2,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (23,1,'2018-10-22 15:42:14',12,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (24,1,'2018-10-22 19:16:16',2,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (25,1,'2018-10-23 11:14:34',1,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (26,1,'2018-10-23 14:07:58',3,'N');
insert  into `registration`(`registration_id`,`hospital_id`,`date_of_registration`,`patient_id`,`served_flag`) values (27,1,'2018-10-23 19:30:49',0,'N');

/*Table structure for table `relationship_master` */

DROP TABLE IF EXISTS `relationship_master`;

CREATE TABLE `relationship_master` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `relation` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

/*Data for the table `relationship_master` */

insert  into `relationship_master`(`id`,`relation`) values (1,'Father');
insert  into `relationship_master`(`id`,`relation`) values (2,'Mother');
insert  into `relationship_master`(`id`,`relation`) values (3,'Son');
insert  into `relationship_master`(`id`,`relation`) values (4,'Daughter');
insert  into `relationship_master`(`id`,`relation`) values (5,'Husband');
insert  into `relationship_master`(`id`,`relation`) values (6,'Wife');
insert  into `relationship_master`(`id`,`relation`) values (7,'Brother');
insert  into `relationship_master`(`id`,`relation`) values (8,'Sister');
insert  into `relationship_master`(`id`,`relation`) values (9,'Grandfather');
insert  into `relationship_master`(`id`,`relation`) values (10,'Grandmother');
insert  into `relationship_master`(`id`,`relation`) values (11,'Grandson');
insert  into `relationship_master`(`id`,`relation`) values (12,'Granddaughter');
insert  into `relationship_master`(`id`,`relation`) values (13,'Uncle');
insert  into `relationship_master`(`id`,`relation`) values (14,'Aunt');
insert  into `relationship_master`(`id`,`relation`) values (15,'Nephew');
insert  into `relationship_master`(`id`,`relation`) values (16,'Niece');
insert  into `relationship_master`(`id`,`relation`) values (17,'Cousin');
insert  into `relationship_master`(`id`,`relation`) values (18,'Self');

/*Table structure for table `symptoms` */

DROP TABLE IF EXISTS `symptoms`;

CREATE TABLE `symptoms` (
  `symptom_id` int(20) NOT NULL AUTO_INCREMENT,
  `symptom` varchar(255) NOT NULL,
  `hospital_id` int(20) DEFAULT NULL,
  `group` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`symptom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `symptoms` */

insert  into `symptoms`(`symptom_id`,`symptom`,`hospital_id`,`group`) values (1,'Fever',1,'M');
insert  into `symptoms`(`symptom_id`,`symptom`,`hospital_id`,`group`) values (2,'Cough',1,'M');
insert  into `symptoms`(`symptom_id`,`symptom`,`hospital_id`,`group`) values (3,'Allergy',1,'M');
insert  into `symptoms`(`symptom_id`,`symptom`,`hospital_id`,`group`) values (4,'Back Pain',1,'M');
insert  into `symptoms`(`symptom_id`,`symptom`,`hospital_id`,`group`) values (5,'Chest Pain',1,NULL);

/*Table structure for table `symptoms_diagonosis_map` */

DROP TABLE IF EXISTS `symptoms_diagonosis_map`;

CREATE TABLE `symptoms_diagonosis_map` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `symptom_id` int(20) DEFAULT NULL,
  `diagonosis_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `symptoms_diagonosis_map` */

insert  into `symptoms_diagonosis_map`(`id`,`symptom_id`,`diagonosis_id`) values (1,1,1);
insert  into `symptoms_diagonosis_map`(`id`,`symptom_id`,`diagonosis_id`) values (2,1,2);
insert  into `symptoms_diagonosis_map`(`id`,`symptom_id`,`diagonosis_id`) values (3,2,3);
insert  into `symptoms_diagonosis_map`(`id`,`symptom_id`,`diagonosis_id`) values (4,3,4);

/*Table structure for table `user_role` */

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `user_role_name` varchar(255) DEFAULT NULL,
  `user_role_code` char(6) DEFAULT NULL,
  `is_active` enum('Y') DEFAULT 'Y',
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `user_role` */

insert  into `user_role`(`id`,`user_role_name`,`user_role_code`,`is_active`,`creation_date`) values (1,'DOCTOR','DOC','Y','2018-09-25 14:26:00');
insert  into `user_role`(`id`,`user_role_name`,`user_role_code`,`is_active`,`creation_date`) values (2,'PHARMA','PHRM','Y','2018-09-25 14:26:21');
insert  into `user_role`(`id`,`user_role_name`,`user_role_code`,`is_active`,`creation_date`) values (3,'ASSITANT','ASST','Y','2018-09-25 14:26:37');
insert  into `user_role`(`id`,`user_role_name`,`user_role_code`,`is_active`,`creation_date`) values (4,'ADMIN','ADMIN','Y','2018-09-25 14:26:58');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `user_role_id` int(20) NOT NULL,
  `hospital_id` int(20) DEFAULT NULL,
  `doctor_id` int(20) DEFAULT NULL,
  `created_by` int(20) DEFAULT NULL,
  `is_active` enum('Y','N') DEFAULT 'Y',
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`user_id`,`user_name`,`password`,`first_name`,`last_name`,`user_role_id`,`hospital_id`,`doctor_id`,`created_by`,`is_active`,`creation_date`) values (1,'admin','e6e061838856bf47e1de730719fb2609','Admin','',4,1,NULL,NULL,'Y','2018-09-28 12:33:12');
insert  into `users`(`user_id`,`user_name`,`password`,`first_name`,`last_name`,`user_role_id`,`hospital_id`,`doctor_id`,`created_by`,`is_active`,`creation_date`) values (2,'E001','e6e061838856bf47e1de730719fb2609','Mithilesh','Routh',3,1,NULL,NULL,'Y','2018-10-03 14:09:17');

/*Table structure for table `web_token` */

DROP TABLE IF EXISTS `web_token`;

CREATE TABLE `web_token` (
  `web_token_id` int(20) NOT NULL AUTO_INCREMENT,
  `web_token` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`web_token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `web_token` */

insert  into `web_token`(`web_token_id`,`web_token`,`project`,`domain`) values (1,'9USkyHjBPrO2HHpHOmWweRcMBb0D9mI5','ehr','localhost:8088');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
