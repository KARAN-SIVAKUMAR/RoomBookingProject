<?php

include 'roomBookingModel.php';

class roomBookingAPI 
{ 
private $finalDetails;  
function __construct() {
  $this->finalDetails = new roomBookingModel();
  if ($_SERVER["REQUEST_METHOD"] == "POST"){
      $info = json_decode(file_get_contents("php://input"));
      if($info->endpoint == "insertCustomerDatas"){      
        $this->insertCustomerDatas($info);
      }else if($info->endpoint == "updateCustomerDatas"){       
          $this->updateCustomerDatas($info);                         
       };
  }
  if ($_SERVER["REQUEST_METHOD"] == "GET"){
    $this->getCustomerDatas();   
  } 
}
private $_code;
public function json($data) {
  if (is_array($data)) {
      return json_encode($data);
  }
}
public function response($data, $status) {
  $data = json_decode($data,true);
  $data = $this->json($data); 
  $this->_code = ($status) ? $status : 200;  
  echo $data;
  echo $status[$this->_code];  
}
public function  insertCustomerDatas($info){ 
$customerName = $customerEmail = $customerRooms = $customerAge = $customerGender = $customerPurpose = 
$customerProof = $customerIdno = $customerCheckInDate = $customerExpCheckOutDate = $customerRsize = $customerCtype = $customerLtype = $customerTax1 = $customerTotal = '';
if (isset($info -> customerName)){
  $customerName = $info -> customerName;
};
if (isset($info -> customerEmail)){
  $customerEmail =$info -> customerEmail;
};
if (isset($info -> customerRooms)){
  $customerRooms = $info -> customerRooms;
};
if (isset($info -> customerAge)){ 
  $customerAge = $info -> customerAge;
};
if (isset($info -> customerGender)){
  $customerGender = $info -> customerGender;
};
if (isset($info -> customerPurpose)){
  $customerPurpose = $info -> customerPurpose;
};
if (isset($info -> customerProof)){
  $customerProof = $info -> customerProof;
};
if (isset($info -> customerIdno)){
  $customerIdno = $info -> customerIdno;
};
if (isset($info -> customerCheckInDate)){
  $customerCheckInDate = $info -> customerCheckInDate;
};
if (isset($info -> customerExpCheckOutDate)){
  $customerExpCheckOutDate = $info -> customerExpCheckOutDate;
};
if (isset($info -> customerRsize)){
  $customerRsize = $info -> customerRsize;
};
if (isset($info -> customerCtype)){
  $customerCtype = $info -> customerCtype;
};
if (isset($info -> customerLtype)){
  $customerLtype = $info -> customerLtype;
};
if (isset($info -> customerTax1)){
  $customerTax1 = $info -> customerTax1;
};
if (isset($info -> customerTotal)){
  $customerTotal = $info -> customerTotal;
};
if(empty($customerName) || empty($customerEmail) || empty($customerRooms) || empty($customerAge) || empty($customerGender) || empty($customerPurpose) || empty($customerProof) 
 || empty($customerIdno) || empty($customerCheckInDate) || empty($customerExpCheckOutDate) || empty($customerRsize) || empty($customerTax1) || empty($customerTotal))
  {
    $error = array('status' => "failed", "msg" => "values are empty");
    $this->response($this->json($error), 200);
  }
else
  {
      $this->finalDetails->insertCustomerDatadb($customerName,$customerEmail,$customerRooms,$customerAge,$customerGender,$customerPurpose,$customerProof,$customerIdno,$customerCheckInDate,
      $customerExpCheckOutDate,$customerRsize,$customerCtype,$customerLtype,$customerTax1,$customerTotal);     
  };
}

public function updateCustomerDatas($info){

  $customerId = $customerName = $customerEmail = $customerRooms = $customerAge = $customerGender = $customerPurpose = 
  $customerProof = $customerIdno = $customerCheckInDate = $customerExpCheckOutDate = $customerRsize = $customerCtype = $customerLtype = $customerTax1 = $customerTotal = '';

if (isset($info -> customerId)){
  $customerId = $info -> customerId;
};
if (isset($info -> customerName)){
  $customerName = $info -> customerName;
};
if (isset($info -> customerEmail)){
  $customerEmail =$info -> customerEmail;
};
if (isset($info -> customerRooms)){
  $customerRooms = $info -> customerRooms;
};
if (isset($info -> customerAge)){ 
  $customerAge = $info -> customerAge;
};
if (isset($info -> customerGender)){
  $customerGender = $info -> customerGender;
};
if (isset($info -> customerPurpose)){
  $customerPurpose = $info -> customerPurpose;
};
if (isset($info -> customerProof)){
  $customerProof = $info -> customerProof;
};
if (isset($info -> customerIdno)){
  $customerIdno = $info -> customerIdno;
};
if (isset($info -> customerCheckInDate)){
  $customerCheckInDate = $info -> customerCheckInDate;
};
if (isset($info -> customerExpCheckOutDate)){
  $customerExpCheckOutDate = $info -> customerExpCheckOutDate;
};
if (isset($info -> customerRsize)){
  $customerRsize = $info -> customerRsize;
};
if (isset($info -> customerCtype)){
  $customerCtype = $info -> customerCtype;
};
if (isset($info -> customerLtype)){
  $customerLtype =$info -> customerLtype;
};
if (isset($info -> customerTax1)){
  $customerTax1 = $info -> customerTax1;
};
if (isset($info -> customerTotal)){
  $customerTotal = $info -> customerTotal;
};
if(empty($customerId) || empty($customerName) || empty($customerEmail) || empty($customerRooms) || empty($customerAge) || empty($customerGender) || empty($customerPurpose) || empty($customerProof) 
 || empty($customerIdno) || empty($customerCheckInDate) || empty($customerExpCheckOutDate) || empty($customerRsize) || empty($customerTax1) || empty($customerTotal)){
  $error = array('status' => "failed", "msg" => "values are empty");
  $this->response($this->json($error), 200);  
} 
else
  {    
  $this->finalDetails->updateCustomerDatadb($customerId,$customerName,$customerEmail,$customerRooms,$customerAge,$customerGender,$customerPurpose,$customerProof,$customerIdno,$customerCheckInDate,
  $customerExpCheckOutDate,$customerRsize,$customerCtype,$customerLtype,$customerTax1,$customerTotal);   
  };
}
public function getCustomerDatas() {
  $this->finalDetails->fetchCustomerDataDb();
  
}
}
$customerData = new roomBookingAPI();
?>