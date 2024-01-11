<?php

include 'roomBookingConnect.php';

 class roomBookingModel
 { 
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
    // echo $status[$this->_code];    
  }
  public function insertCustomerDatadb($customerName,$customerEmail,$customerRooms,$customerAge,$customerGender,$customerPurpose,$customerProof,$customerIdno,$customerCheckInDate,
  $customerExpCheckOutDate,$customerRsize,$customerCtype,$customerLtype,$customerTax1,$customerTotal) {
    $query = "INSERT INTO CustomersDetails ( customerName, customerEmail, customerRooms, customerAge, customerGender, customerPurpose, customerProof, customerIdno, customerCheckInDate,
     customerExpCheckOutDate, customerRsize, customerCtype, customerLtype, customerTax1, customerTotal)
    VALUES ( '$customerName', '$customerEmail', '$customerRooms','$customerAge','$customerGender','$customerPurpose','$customerProof','$customerIdno','$customerCheckInDate',
    '$customerExpCheckOutDate','$customerRsize','$customerCtype','$customerLtype','$customerTax1','$customerTotal')";
    if(mysqli_query($GLOBALS['conn'],$query))
     {
     $success = array('status' => "success", "msg" => "Records add successfully");
     $this->response($this->json($success), 200);      
     }
     else
     {
      $errormsg = array('status' => "failed", "msg" => "Records add not successfully");
      $this->response($this->json($errormsg), 200);
     };  
    }   
    public function fetchCustomerDataDb(){ 
        $output = array();        
        $query = "SELECT * FROM CustomersDetails";
        $result = $GLOBALS['conn']->query($query);
        if(mysqli_num_rows($result) > 0)
        {             
            while ($row = mysqli_fetch_array($result))
            {
                $output[] = $row;               
            }                    
          $this->response($this->json($output),200);          
        }      
    }
    public function updateCustomerDataDb($customerId,$customerName,$customerEmail,$customerRooms,$customerAge,$customerGender,$customerPurpose,$customerProof,$customerIdno,$customerCheckInDate,
    $customerExpCheckOutDate,$customerRsize,$customerCtype,$customerLtype,$customerTax1,$customerTotal) {                    
        $sql = "UPDATE CustomersDetails SET customerName='$customerName',customerEmail='$customerEmail',customerRooms='$customerRooms',customerAge='$customerAge',
        customerGender='$customerGender',customerPurpose='$customerPurpose',customerProof='$customerProof',customerIdno='$customerIdno',customerCheckInDate='$customerCheckInDate',
        customerExpCheckOutDate= '$customerExpCheckOutDate',customerRsize='$customerRsize',customerCtype='$customerCtype',customerLtype='$customerLtype',
        customerTax1='$customerTax1',customerTotal='$customerTotal' WHERE customerId = '$customerId' ";
        if ($GLOBALS['conn']->query($sql) === TRUE) {
          $success = array('status' => "success", "msg" => "Records updated successfully");
          $this->response($this->json($success), 200);      
        } else {
          $errormsg = array('status' => "failed", "msg" => "Records updated not successfully");
          $this->response($this->json($errormsg), 200);
        }
    }
 }
$finalDetails = new roomBookingModel(); 
?>   