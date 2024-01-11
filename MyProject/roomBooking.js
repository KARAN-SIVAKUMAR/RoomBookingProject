var app = angular.module('roomBookingApp', [])
app.controller('roomBookingCtrl', function ($scope, $http) {
  $scope.saveDetails = function () {
    if ($scope.roomBookingDetails.$valid && $scope.roomBookingDetails.$submitted) {
      $scope.form1 = true;
      $scope.form2 = true;
    };
  };
  $scope.myvar = false;
  $scope.show = function () {
    if ($scope.myvar == true) {
      $scope.validation = true;
      return $scope.customerCtype;
    } else {
      $scope.customerCtype = null;
      $scope.validation = false;
    }
  };

  $scope.myvar1 = false;
  $scope.showFun = function () {
    if ($scope.myvar1 == true) {
      $scope.validation1 = true;
      return $scope.customerLtype;
    } else {
      $scope.customerLtype = null;
      $scope.validation1 = false;
    };
  };

  $scope.customers = [];
  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.customer_detail = $scope.pageSize;
  $scope.customer = 1;
  $scope.endCustomer = 5;

  $scope.backPosition = function(){
    $scope.currentPage = $scope.currentPage - 1 ;
    $scope.customer = $scope.customer - 5;
   $scope.endCustomer =  $scope.endCustomer  - 5;
  }
  
  $scope.pageCount = function(){
    $scope.totalRecords = $scope.customers.length;       
    return (window.Math.ceil($scope.customers.length / $scope.pageSize));     
  }

  $scope.position = function(){      
    $scope.currentPage = $scope.currentPage + 1;    
    $scope.customer = $scope.customer + 5;
    if($scope.currentPage < $scope.pageCount()){
      console.log("karan");
      $scope.endCustomer  = $scope.customer + 4 ;       
    }
    if($scope.endCustomer  >= $scope.customers.length){      
      console.log("dhruv");
      $scope.endCustomer = $scope.customers.length;          
   }
   console.log($scope.endCustomer);
    console.log($scope.customers.length);              
  }

  $scope.next = function () {
    $scope.customerTax = 18 / 100;
    if ($scope.customerRsize) {
      if ($scope.customerRooms == "AC") {
        $scope.roomPrice = $scope.customerRsize * 2;
        $scope.customerTax1 = parseInt($scope.roomPrice) * $scope.customerTax;
        $scope.customerTotal = parseInt($scope.roomPrice) + parseInt($scope.customerTax1);
      } else {
        $scope.roomPrice = $scope.customerRsize;
        $scope.customerTax1 = (parseInt($scope.roomPrice) * $scope.customerTax);
        $scope.customerTotal = parseInt($scope.roomPrice) + parseInt($scope.customerTax1);
      };
    };
    if ($scope.customerRsize && $scope.customerCtype) {
      if ($scope.customerRooms == "AC") {
        $scope.roomPrice = $scope.customerRsize * 2;
        $scope.customerTax1 = (parseInt($scope.roomPrice) + parseInt($scope.customerCtype)) * $scope.customerTax;
        $scope.customerTotal = (parseInt($scope.roomPrice) + parseInt($scope.customerCtype)) + parseInt($scope.customerTax1);
      } else {
        $scope.roomPrice = $scope.customerRsize;
        $scope.customerTax1 = (parseInt($scope.roomPrice) + parseInt($scope.customerCtype)) * $scope.customerTax;
        $scope.customerTotal = (parseInt($scope.roomPrice) + parseInt($scope.customerCtype)) + parseInt($scope.customerTax1);
      };
    };
    if ($scope.customerRsize && $scope.customerLtype) {
      if ($scope.customerRooms == "AC") {
        $scope.roomPrice = $scope.customerRsize * 2;
        $scope.customerTax1 = (parseInt($scope.roomPrice) + parseInt($scope.customerLtype)) * $scope.customerTax;
        $scope.customerTotal = (parseInt($scope.roomPrice) + parseInt($scope.customerLtype)) + parseInt($scope.customerTax1);
      } else {
        $scope.roomPrice = $scope.customerRsize;
        $scope.customerTax1 = (parseInt($scope.roomPrice) + parseInt($scope.customerLtype)) * $scope.customerTax;
        $scope.customerTotal = (parseInt($scope.roomPrice) + parseInt($scope.customerLtype)) + parseInt($scope.customerTax1);
      }
    };
    if ($scope.customerRsize && $scope.customerCtype && $scope.customerLtype) {
      if ($scope.customerRooms == "AC") {
        $scope.roomPrice = $scope.customerRsize * 2;
        $scope.customerTax1 = (parseInt($scope.roomPrice) + parseInt($scope.customerCtype) + parseInt($scope.customerLtype)) * $scope.customerTax;
        $scope.customerTotal = (parseInt($scope.roomPrice) + parseInt($scope.customerCtype) + parseInt($scope.customerLtype)) + parseInt($scope.customerTax1);
      } else {
        $scope.roomPrice = $scope.customerRsize;
        $scope.customerTax1 = (parseInt($scope.roomPrice) + parseInt($scope.customerCtype) + parseInt($scope.customerLtype)) * $scope.customerTax;
        $scope.customerTotal = (parseInt($scope.roomPrice) + parseInt($scope.customerCtype) + parseInt($scope.customerLtype)) + parseInt($scope.customerTax1);
      }
    };
  };

  $scope.submit = function () {
    $http.post('roomBookingAPI.php',
      {
        'customerName': $scope.customerName,
        'customerEmail': $scope.customerEmail,
        'customerRooms': $scope.customerRooms,
        'customerAge': $scope.customerAge,
        'customerGender': $scope.customerGender,
        'customerPurpose': $scope.customerPurpose,
        'customerProof': $scope.customerProof,
        'customerIdno': $scope.customerIdno,
        'customerCheckInDate': $scope.customerCheckInDate,
        'customerExpCheckOutDate': $scope.customerExpCheckOutDate,
        'customerRsize': $scope.customerRsize,
        'customerCtype': $scope.customerCtype,
        'customerLtype': $scope.customerLtype,
        'customerTax1': $scope.customerTax1,
        'customerTotal': $scope.customerTotal,
        'endpoint': 'insertCustomerDatas'
      })
      .then(function () {
        $scope.customersTable();
      });
    document.getElementById('additionalRequirements').style.display = "none";
    document.getElementById('roomBookingDetails').style.display = "none";
    document.getElementById('myModal1').style.display = "none";
    document.getElementById('DataTable').style.display = "block";
  };
  $scope.customersTable = function () {
    $http.get('roomBookingAPI.php',
    )
      .then(function (response) {
        $scope.customers = response.data;              
      });
  }; 

  $scope.customer_detail = {};
  $scope.editCustomerDetails = function (customer) {
    $scope.customer_detail = customer;
    // console.log(customer);         
    document.getElementById('roomBookingDetails').style.display = "none";
    document.getElementById('additionalRequirements').style.display = "none";
    document.getElementById('myModal').style.display = "none";
    document.getElementById('myModal2').style.display = "block";    
  }
  document.getElementById('myModal2').style.display = "none";
  document.getElementById('DataTable').style.display = "none";
  $scope.customersDetails = function (customer) {    
    $scope.customer_detail = customer;
    // console.log(customer);
    $scope.modal1 = $scope.DataTable;
    document.getElementById('roomBookingDetails').style.display = "none";
    document.getElementById('additionalRequirements').style.display = "none";
    document.getElementById('myModal').style.display = "none";
    document.getElementById('myModal1').style.display = "block";

  };
  $scope.resetForm = function () {
    window.location.reload();
  };
  $scope.ViewBooking = function () {
    $scope.customersTable();
    document.getElementById('myModal2').style.display = "none";
    document.getElementById('additionalRequirements').style.display = "none";
    document.getElementById('roomBookingDetails').style.display = "none";
    document.getElementById('myModal1').style.display = "none";
    document.getElementById('DataTable').style.display = "block";    
  };
  $scope.close = function () {
    document.getElementById('roomBookingDetails').style.display = "none";
    document.getElementById('additionalRequirements').style.display = "none";
    document.getElementById('myModal').style.display = "none";
    document.getElementById('myModal1').style.display = "none";
    document.getElementById('DataTable').style.display = "block";
    $scope.customersTable();  
  };


  $scope.updateCustomerDetails = function () {     
    $http.post('roomBookingAPI.php',
      {
        'customerId': $scope.customer_detail.customerId,
        'customerName': $scope.customer_detail.customerName,
        'customerEmail': $scope.customer_detail.customerEmail,
        'customerRooms': $scope.customer_detail.customerRooms,
        'customerAge': $scope.customer_detail.customerAge,
        'customerGender': $scope.customer_detail.customerGender,
        'customerPurpose': $scope.customer_detail.customerPurpose,
        'customerProof': $scope.customer_detail.customerProof,
        'customerIdno': $scope.customer_detail.customerIdno,
        'customerCheckInDate': $scope.customer_detail.customerCheckInDate,
        'customerExpCheckOutDate': $scope.customer_detail.customerExpCheckOutDate,
        'customerRsize': $scope.customer_detail.customerRsize,
        'customerCtype': $scope.customer_detail.customerCtype,
        'customerLtype': $scope.customer_detail.customerLtype,
        'customerTax1': $scope.customer_detail.customerTax1,
        'customerTotal': $scope.customer_detail.customerTotal,
        'endpoint': 'updateCustomerDatas'
      })
      .then(function () {
        $scope.customersTable();
      });
    document.getElementById('roomBookingDetails').style.display = "none";
    document.getElementById('additionalRequirements').style.display = "none";
    document.getElementById('myModal').style.display = "none";
    document.getElementById('myModal1').style.display = "none";
    document.getElementById('myModal2').style.display = "none";
    document.getElementById('DataTable').style.display = "block";
  };
  $scope.cancel = function () {
    document.getElementById('roomBookingDetails').style.display = "none";
    document.getElementById('additionalRequirements').style.display = "none";
    document.getElementById('myModal').style.display = "none";
    document.getElementById('myModal1').style.display = "none";
    document.getElementById('myModal2').style.display = "none";
    document.getElementById('DataTable').style.display = "block";
    $scope.customersTable();    
  }


  $(function () {
    var $dt1 = $("#datepicker").datepicker({
      minDate: 0,
      dateFormat: "yy-mm-dd",
      onSelect: function (dateString, instance) {
        $scope.customerCheckInDate = dateString, instance;
        let date = $dt1.datepicker('getDate');
        date.setDate(date.getDate())
        $dt2.datepicker('option', 'minDate', date);
      }
    });
    var $dt2 = $("#datepicker1").datepicker({
      dateFormat: "yy-mm-dd"
    });
  });
});

app.filter('startFrom',['$timeout',function($timeout){
   return function(input, start){
    start = +start;
    if(!input) return;
    return input.slice(start);
   }
}]);