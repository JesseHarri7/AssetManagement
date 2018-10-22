function validateDetails(){
	var  username = document.getElementById("username");
	var  password = document.getElementById("password");
	
	if(username.value == "" ){
			alert("Username cannot be empty");	
	}
	
	if(password.value == ""){
		alert("password cannot be empty ");
	}
}
}

function login(){
	$.ajax({
  type: "GET",
  url: "http://localhost:8080/",
  success: function(data){
  	
  },
  dataType: dataType
});