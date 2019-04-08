<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Prescription</title>

<style>

	.demo {
		border:1px solid #323232;
		border-collapse:collapse;
		padding:5px;
	}
	.demo th {
		border:1px solid #323232;
		padding:5px;
		background:#F0F0F0;
		/*font-family:Verdana, Geneva, sans-serif;*/
		font-size:9px;
		font-weight:bold;
	}
	.demo td {
		border:1px solid #323232;
		padding:5px;
		/*font-family:Verdana, Geneva, sans-serif;*/
		font-size:11px;		
		
	}
        .small_demo {
		border:1px solid;
		padding:2px;
	}
	.small_demo td {
		/*border:1px solid;*/
		padding:2px;
                width: auto;
               /* font-family:Verdana, Geneva, sans-serif; */
                font-size:9px; font-weight:normal;
	}
        
        
	.headerdemo {
		border:0px solid #323232;
		padding:2px;
	}
	
	.headerdemo td {
		border:1px solid #C0C0C0;
		padding:2px;
	}


	.noborder {
			border:0px solid #323232;
				padding:2px;
		}
	.noborder td{
		border:0px solid #C0C0C0;
		padding:2px;
	}

         .demo_font{
            font-family:Verdana, Geneva, sans-serif;
		font-size:11px;	
        }
        .break{
            page-break-after: always;
        }

	.sympdisCls {
		width:100%;

	}
	.sympdisCls table {
		width:100%;
		font-family:Verdana, Geneva, sans-serif; font-size:11px;

	}
	.sympdisCls table ol li{
		float: left;
		padding: 4px;
		//list-style: none;
		margin-right: 5px;
		margin-left: 15px;
		font-family:Verdana, Geneva, sans-serif; font-size:11px;
	}
	.boldstyle{
		font-weight:bold;
	}
	.smallFont {
		font-family: 'Open Sans',helvetica,arial,sans-serif;
		font-size:9px;
	}

</style>
</head>
    

<body style="margin:0;padding:0;">

    <table width="100%" border="0" class="smallFont" style="border-bottom:0px solid #000;">
        <tr>
            <td align="center" style="text-decoration:underline;padding:3px;font-size:18px;">Discharge Certificate</td>
        </tr>
    </table>

	<table width="100%" border="0" align="left" style="font-size:1.1mm !important;clear:both;" >
        <tr>
            <td width="25%"><img src="<?php echo base_url(); ?>assets/images/logo.png" width="160"></td>
			<td width="42%" align="center"> 
				<span style="font-family: sans-serif; font-size:12px; font-weight:bold;">Powai</span>
				<!--<br><span style="font-family: sans-serif; font-size:9px; font-weight:normal;">11/A ABC XYZ</span>-->
			</td>
            <td width="30%" align="right"><span style="font-family: 'Open Sans',helvetica,arial,sans-serif; font-size:9px; ">Print Date : <?php echo date("d/m/Y");?></span></td>
			
        </tr>
	</table>




	
	<table width="100%" class="noborder" border="0" align="" class="smallFont">
		<tr>
			<td width="40%"><span class="boldstyle">Doctor :</span> <?php echo $doctorname; ?></td>
			<td align="right" class="boldstyle"><i><?php echo $prescData['patienthealthProfileData']->prescno; ?></i></td>
		</tr>
		
	</table>

	<div style="border:0px solid #ececec;clear:both;"></div>

	<table width="100%" class="noborder" border="0" align="" class="smallFont" border="2">
	<tr>
			<td width="20%" class="boldstyle"></td>
			
			<td width="30%" align="right"><span style="font-family: 'Open Sans',helvetica,arial,sans-serif; font-size:9px; ">Admission Date :<?php echo date("d/m/Y", strtotime($prescData['patienthealthProfileData']->admission_dt)); ?></span></td>
			
		</tr>
		<tr>
			<td width="20%" class="boldstyle">Patient:<?php echo $prescData['patienthealthProfileData']->patient_name; ?> <?php //echo $prescData['patienthealthProfileData']->patient_code; ?></td>
			
			<td width="30%" align="right"><span style="font-family: 'Open Sans',helvetica,arial,sans-serif; font-size:9px; ">Discharge Date :<?php echo date("d/m/Y", strtotime($prescData['patienthealthProfileData']->discharge_date)); ?></span></td>
			
		</tr>

		<tr>
			<td width="20%" class="boldstyle">Patient Type:<?php echo $prescData['patienthealthProfileData']->patient_type; ?> </td>
		</tr>
		<tr>
		<td width="20%" class="boldstyle">Permament Worker:<?php echo $prescData['patienthealthProfileData']->associate_permworker_name; ?>(<?php echo $prescData['patienthealthProfileData']->parmenant_worker_code; ?>) </td>
		
		</tr>
		
        <!--
		<tr>
			<td width="20%">Male (29 Yrs.)</td>
		</tr>-->
	</table>
	<div style="padding-top:5px;"></div>

	<?php  if(!empty($prescData['symptoms'])  || !empty($prescData['diagnosis'])) { ?>
	<div id="symptomDiseasContainer">

		<?php 
			

		

		if(!empty($prescData['symptoms'])) { ?>
		<div id="symptomsList" class="sympdisCls smallFont">
			<table>
				<tr>
					<td style="width: 90px;font-weight:bold;vertical-align:middle;" >Symptoms</td>
					<td>
						<?php 
							foreach ($prescData['symptoms'] as $symptom_data) {
								echo $symptom_data->symptom.",";
							}
						?>
					</td>
				</tr>
			</table>
			
		</div>
		<?php } ?>
		
		<?php  if(!empty($prescData['diagnosis'])) { ?>
		<div id="diagnosisList" class="sympdisCls smallFont">
		<table>
				<tr>
					<td style="width: 90px;font-weight:bold;vertical-align:middle;">Diagnosis</td>
					<td>
					<?php 
							foreach ($prescData['diagnosis'] as $diagnosis_data) {
								echo $diagnosis_data->diagonosis_name.",";
							}
						?>
					</td>
				</tr>
			</table>
		</div>
		<?php } ?>
	</div>
	<?php } ?>
   
	<div style="padding-top:5px;"></div>

	<div id="medicineandTest" class="smallFont">
	<?php 
		if(!empty($prescData['medicineDatas']) || !empty($prescData['investigationsData'])) {
	?>
	<table width="100%" cellspacing="0" cellpadding="0" class="noborder" border="1" style="border:0px solid #000;font-family:Verdana, Geneva, sans-serif; font-size:9px !important;">
		<!--
		<tr style="font-size:10px;bordre:0px solid #323232;">
			<td width="50%" style="border-bottom:0px solid #323232;border-right:0px solid #323232;font-weight:bold;">Medicines</td>
			<td width="50%" style="border-bottom:0px solid #323232;border-left:0px solid #323232;font-weight:bold;">Test</td>
		</tr>-->
		<tr style="font-size:9px;font-family:Verdana, Geneva, sans-serif;">

			<?php if(!empty($prescData['medicineDatas'])) { ?>
			<td width="46%" valign="top" style="font-family:Verdana, Geneva, sans-serif;border-right:0px solid #000; ">
			
				<table width="100%" class="noborder smallFont" border="0" style="border:0px solid #000;border-right:0px solid #323232;">
					<tr>
						<td class="boldStyle">Medicine</td>
						<td class="boldStyle">Dosage</td>
						<td class="boldStyle">Freq.</td>
						<td class="boldStyle">Days</td>
					</tr>
					<?php 

						foreach ($prescData['medicineDatas'] as $medicine) { ?>
						
						<tr>
							<td><?php echo $medicine->medicine_name; ?></td>
							<td><?php echo $medicine->value; ?></td>
							<td><?php echo $medicine->frequency_name; ?></td>
							<td><?php echo $medicine->number_of_days_sick_leave; ?></td>
						</tr>
					<?php
					}
					?>
					
					
				</table>
		
			</td>
			<?php } ?>


            <!--
			<?php if(!empty($prescData['investigationsData'])) { ?>
			<td width="46%" valign="top" style="font-family:Verdana, Geneva, sans-serif; ">
			<table width="100%" class="noborder smallFont" >
					<tr>
						<td class="boldStyle">Medical Tests</td>
						
					</tr>
					<?php 
						
						if(isset($prescData['investigationsData'])){
							foreach ($prescData['investigationsData'] as $invest_data) { ?>
							<tr>
								<td><?php echo $invest_data->investigation_name; ?></td>
							</tr>	
						<?php		
							}
						}
						
					?>
			</table>
			</td>
			<?php } ?>
            -->
            

		</tr>

	</table>

	<?php } ?>

</div>

<table width="100%" cellspacing="0" cellpadding="0" class="noborder" border="0" style="border:0px solid #000;font-family:Verdana, Geneva, sans-serif; font-size:9px !important;" >
    
    <?php if(isset($prescData['patienthealthProfileData']->nextChkupDtDt)){?>
    <tr>
        <td width="120" class="boldstyle"><i>Next Checkup Date</i></td>
        <td align="left" ><?php echo $prescData['patienthealthProfileData']->nextChkupDtDt; ?></td>
    </tr>
    <?php } ?>

    <?php if(isset($prescData['patienthealthProfileData']->instruction)){?>
    <tr>
        <td width="120" class="boldstyle">Instruction</td>
        <td align="left" ><i><?php echo $prescData['patienthealthProfileData']->instruction; ?></td>
    </tr>
    <?php } ?>

    <?php if(isset($prescData['patienthealthProfileData']->discharge_summary)){?>
    <tr>
        <td width="120" class="boldstyle">Discharge Summary</td>
        <td align="left" ><i><?php echo $prescData['patienthealthProfileData']->discharge_summary; ?></td>
    </tr>
    <?php } ?>

    <?php if(isset($prescData['patienthealthProfileData']->final_digonosis)){?>
    <tr>
        <td width="120" class="boldstyle">Final Diagnosis</td>
        <td align="left" ><i><?php echo $prescData['patienthealthProfileData']->final_digonosis; ?></td>
    </tr>
    <?php } ?>
    
</table>




<table width="100%" class="noborder" border="0" style="border-top:0;font-size:9px;" cellspacing="8" cellpadding="0">
    <tr style="height:15px;">
		<td width="50%"></td>
		<td width="50%" align="right"><br>Signature</td>
	</tr>
</table>

  

 


</body>
</html>
