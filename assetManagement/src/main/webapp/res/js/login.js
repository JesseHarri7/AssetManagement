$(document).ready(function()
{
	
	$('#login-btn').click(function(event) {
		var input = $('.validate-input .input100');
		
		hideValidate(input);
		hideNoAccount();
		
		var username = $('#username').val();
		var password = $('#password').val();

		if(validateDetails(username, password)) {
			
			$.ajax({
				/*headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				},*/
		  		url: "/assetManagement/login/" + username + "/" + password,
		  		async: false,
		  		type: "GET",
		  		dataType: "json",
		  		success: function(response) {
			  		if(response.status == "true") {
						document.getElementById("loginForm").submit();
					}else {
						for (x of response.result) {
							notifyError(x);
						}
					}
		  		},
		  		error: function(e) {
					console.log("ERROR: ", e);
					$.notify("Status 405", "error");
		  		}
			});
		}
		
	});
	
	function validateDetails(username, password) {
		if(username == "" || password == "") {
			loginError();
			return false;
		}else {
			return true;
		}
	}
	
	function loginError() {
		var username = $('#username').val();
		var password = $('#password').val();
		
		var input = $('.validate-input .input100');
		
		hideValidate(input);
		
		if(!username && !password) {
			showValidate(input[0]);
			showValidate(input[1]);
		}else if(!password) {
			showValidate(input[1]);
		}else if(!username) {
			showValidate(input[0]);
		}
	}
	
	function showValidate(input) {
		var thisAlert = $(input).parent();
		$(thisAlert).addClass('alert-validate');
	}
	
	function hideValidate(input) {
		var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
	}	
	
	function hideNoAccount() {
		var input = $('.login-error');
		var thisAlert = $(input);
		$(thisAlert).removeClass('alert-account');
		
		var div = document.getElementById('test');
		
		div.innerHTML = '';
		
	}
	
	function notifyError(msg) {
		var input = $('.login-error');
		var thisAlert = $(input);
		$(thisAlert).addClass('alert-account');
		
		var div = document.getElementById('test');
		
		div.innerHTML = msg;
	}

});