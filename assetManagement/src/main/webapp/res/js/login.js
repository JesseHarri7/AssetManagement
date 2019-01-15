$(document).ready(function()
{	
	
	$('#login-btn').click(function(event) 
	{
		var input = $('.validate-input .input100');
		
		hideValidate(input);
		hideNoAccount();
		
		var username = $('#username').val();
		var password = $('#password').val();

		if(validateDetails(username, password))
		{
			var find = exists(username); 
			if(find)
			{
				login(find);
			}
		}
		
	});
	
	function validateDetails(username, password)
	{
		if(username == "" || password == "")
		{
			//alert("Fields cannot be empty");
			loginError();
			return false;
		}
		else
		{
			return true;
		}
	}
	
	
	function findUser(username)
	{
		var dataSet = [];
		
		$.ajax({
		  url: "/assetManagement/user/email/" + username,
		  async: false,
		  type: "GET",
		  dataType: "json",
		  success: function(data)
		  {
			  dataSet = data;
		  },
		  error: function(data)
		  {
			dataSet = null;
		  }
		});
		return dataSet;
	}
	
	function exists(username)
	{
		var user = findUser(username);
		
		if(user)
		{
			return user;
		}
		else
		{
			showNoAccount();
			//alert("User does not exist")
			return false;
		}
	}
	
	//Successful login
	function login(user)
	{
		var userDB = user.email;
		var passDB = user.password;
		
		var username = $('#username').val();
		var password = $('#password').val();
		
		if(username && password)//(userDB == username && passDB == password)
		{

			document.getElementById("loginForm").submit();
			
			// Save data to the current session's store
			//sessionStorage.setItem("userN", username);
			
//			window.location = "http://localhost:8080/pages/asset";
		}
		else
		{
			showNoAccount();
			//alert("Username or password is incorrect");
		}
	}
	
	function loginError()
	{
		var username = $('#username').val();
		var password = $('#password').val();
		
		var input = $('.validate-input .input100');
		
		hideValidate(input);
		
		if(!username && !password)
		{
			showValidate(input[0]);
			showValidate(input[1]);
		}
		else if(!password)
		{
			showValidate(input[1]);
		}
		else if(!username)
		{
			showValidate(input[0]);
		}
		
		/*for(var i=0; i<input.length; i++) 
		{
			if(!username)
			{
				showValidate(input[i]);
			}
        }*/

	}
	
	function showValidate(input)
	{
		var thisAlert = $(input).parent();
		$(thisAlert).addClass('alert-validate');
	}
	function hideValidate(input)
	{
		var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
	}
	
	function showNoAccount()
	{
		var input = $('.login-error');
		var thisAlert = $(input);
		$(thisAlert).addClass('alert-account');
		
		var div = document.getElementById('test');
		
		div.innerHTML = 'Account not found';
		
	}
	function hideNoAccount()
	{
		var input = $('.login-error');
		var thisAlert = $(input);
		$(thisAlert).removeClass('alert-account');
		
		var div = document.getElementById('test');
		
		div.innerHTML = '';
		
	}

});