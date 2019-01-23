$(document).ready(function() 
{	
	//All data fields on start up
	findAll();
	
	//Add temps html files
	includeHTML();
	
	//Click to select row from the table
	$('#user-table tbody').on('click','tr', function()
	{
		$(this).toggleClass('selected');
	});
	
	//Create button
	$('#create-btn').click(function(event) 
	{
		$('.notifyjs-corner').remove();
		
		//Clear form red border css
		clearFormBorder();
		
		//Clear form content if any
		document.getElementById("create").reset();
	});
	
	$('#form-create-btn').click(function(event) 
	{
		//Clear form red border css
		clearFormBorder();
		$('.notifyjs-corner').remove();
		
		event.preventDefault();
		var data = validation();
		
		if(data)
		{
			create();
		}
	});
	
	function validation()
	{
		var firstName = $('#firstname').val();
		var lastName = $('#lastname').val();
		var email = $('#email').val();
		var password = $('#password').val();
		
		var adminRole = document.getElementById("adminRole");
		var userRole = document.getElementById("userRole");
		
		var checked;
		
		//If none of the radio buttons are checked
		if(adminRole.checked == false && userRole.checked == false)
		{
			notChecked = true; 
		}
		else if(adminRole.checked == true)
		{
			notChecked = false;
		}
		else
		{
			notChecked = false;
		}
		
		if ( firstName == "" || lastName == "" || email == "" || password == "" || notChecked)
		{
			displayFormBorder(firstName, lastName, email, password, notChecked);
			$.notify("Heads up! All fields must be filled out.", "error");
			return false;
		}
		else
		{
			return true;
			/*//Only allow emails for the email field
			if(validateId(id))
			{
				return true;
			}
			else
			{
				return false;
			}*/
		}	
	}	

	function create()
	{		
		var table = $('#user-table').DataTable();
		
		var firstName = $('#firstname').val();
		var lastName = $('#lastname').val();
		var email = $('#email').val();
		var password = $('#password').val();
		
		var adminRole = document.getElementById("adminRole");
		var userRole = document.getElementById("userRole");
		
		//For user_roles table
		var role;
		
		if(adminRole.checked)
		{
			role = "ROLE_ADMIN";
		}
		else
		{
			role = "ROLE_USER";
		}
		
		var user = {firstName, lastName,email,password};
		var user_json = JSON.stringify(user);
		var exists = findByEmail(email);
		
		if(exists)
		{
			$.notify("Error! The user " + email + " you're trying to create already exists.", "error");
		}
		else
		{
			$.ajax({
				headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
			    type:'POST',
				dataType: 'JSON',	
				url:'/assetManagement/user/create',
				data:user_json,
				success: function(data)
				{
					table.row.add(user).draw()
					$.notify("Success! User " + email + " has been created.", "success");
					
					//Add user to user role table
					addUserRole(email, role);
					
					//Clear data from the modal form
					document.getElementById("create").reset();
					$('#createModal').modal('hide');
				},
				error: function(error)
				{
					$.notify("ERROR " + JSON.stringify(error), "error");
				}
			});
		}
	}
	
	function findByEmail(email)
    {    	
    	var dataSet = [];
    	
    	$.ajax({
			url:"/assetManagement/user/email/" + email, 
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data) 
			{
				dataSet = data;
//				dataSet = true;
			},
			error: function(data)
			{
				dataSet = false;
			}
			
		});
    	return dataSet;
    }
	
	function addUserRole(email, role)
	{
		var user = findByEmail(email);
		
		var userRole = {email: user, role};
		
		var user_json = JSON.stringify(userRole);
		
		$.ajax({
			headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
		    url:'/assetManagement/userRole/create',
			dataType: 'JSON',
			data: user_json,
			type:'POST'
		});
	}
	
	$('#remove-btn').click(function(event) 
	{
		var table = $('#user-table').DataTable();

		//Returns an array of the selected rows
		var rowToDelete = table.rows( '.selected' ).data();
		
		$('.notifyjs-corner').remove();
		
		if (rowToDelete.length == 0)
		{
			$.notify("Heads up! Please select an user to remove.", "error");
		}
		else if (rowToDelete.length >= 2)
		{
			$.notify("Heads up! Please only select one user to remove.", "error");
		}
		else
		{
			createNotifyD();
			
			$.notify({
				  title: 'Are you sure you want to delete?',
				  button: 'Confirm'
				}, {
				  style: 'foo',
				  className: 'info',
				  autoHide: false,
				  clickToHide: false
				});
		}
	});
	
	//listen for click events from this style
	//If no
	$(document).on('click', '.notifyjs-foo-base .noD', function() 
	{
		//programmatically trigger propogating hide event
		$(this).trigger('notify-hide');
		
	});

	//if Yes
	$(document).on('click', '.notifyjs-foo-base .yesD', function() 
	{	
		//Function
		remove();
		//hide notification
		$(this).trigger('notify-hide');
		
	});
	
	function remove() 
	{
		var table = $('#user-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();

		$.ajax({
			url:"/assetManagement/user/delete/" + rowToDelete.userID, 
			dataType: "json",
			type: "DELETE",
			success: success()
		});
		
		function success()
		{
			var table = $('#user-table').DataTable();

			var rowToDelete = table.row( '.selected' ).data();
			
			$.notify("Success! User " + rowToDelete.email + " was removed.", "success");
			
			//Remove role from user_role table
			removeUserRole(rowToDelete.email);
			
			table.row( '.selected' ).remove().draw(false);
//			table.row("#"+assetCode).remove().draw( false );
		}
    }
		
	function removeUserRole(email)
	{		
		$.ajax({
			url:"/assetManagement/userRole/delete/" + email,
			dataType: "json",
			type: "DELETE"/*,
			success: success()*/
		});
	}
	
	function findAll() 
	{
		$.ajax({
			url:"/assetManagement/user/findAll",
			dataType: "json",
			type: "GET",
			success: function(data) 
			{
				dataSet = data;
				userList(dataSet);
			}
		});
	}
	
	function userList(dataSet) 
	{	
		var userTable = $("#user-table").DataTable({
			retrieve: true,
			dom: '<f<t>lip>',
			select: true,
			data: dataSet,
			columns: 
			[
//				{data: 'userID'},
				{data: 'email'},
				{data: 'firstName'},
				{data: 'lastName'},
				//{data: 'active'}
			]
		});
		return userTable;
	}
    
    function clearFormBorder()
	{
		//create form
		$('#firstname').removeClass("form-fill-error");
		$('#lastname').removeClass("form-fill-error");
		$('#email').removeClass("form-fill-error");
		$('#password').removeClass("form-fill-error");
		$('#admin-if-error').removeClass("red");
		$('#user-if-error').removeClass("red");
				
		//Update form
		$('#uFirstname').removeClass("form-fill-error");
		$('#uLastname').removeClass("form-fill-error");
		$('#uEmail').removeClass("form-fill-error");
		$('#uPassword').removeClass("form-fill-error");
		$('#u-admin-if-error').removeClass("red");
		$('#u-user-if-error').removeClass("red");
	}
	
	function displayFormBorder(name, surname, email, password, role)
	{		
		if(!name)
		{
			$('#firstname').addClass("form-fill-error");
			$('#uFirstname').addClass("form-fill-error");
		}
		
		if(!surname)
		{
			$('#lastname').addClass("form-fill-error");
			$('#uLastname').addClass("form-fill-error");
		}
		
		if(!email)
		{
			$('#email').addClass("form-fill-error");
			$('#uEmail').addClass("form-fill-error");
		}
		
		if(!password)
		{
			$('#password').addClass("form-fill-error");
			$('#uPassword').addClass("form-fill-error");
		}

		if(role)
		{
			$('#admin-if-error').addClass("red");
			$('#user-if-error').addClass("red");
			
			$('#u-admin-if-error').addClass("red");
			$('#u-user-if-error').addClass("red");
		}
	}
	
	//Notify class
	function createNotifyD()
	{
		//add a new style 'foo'
		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<button class='btn btn-secondary noD'>Cancel</button>" +
		          "<button class='btn btn-secondary yesD' data-notify-text='button'></button>" +
		        "</div>" +
		      "</div>" +
		    "</div>"
		});
	}
    
    function showActiveNav()
	{
		$('#uNav').addClass('active');
		
		$("a[href='../pages/asset-history']").attr('href', '../pages/user-history')
	}
	
	function includeHTML() 
	{
		  var z, i, elmnt, file, xhttp;
		  /*loop through a collection of all HTML elements:*/
		  z = document.getElementsByTagName("*");
		  for (i = 0; i < z.length; i++) 
		  {
		    elmnt = z[i];
		    /*search for elements with a certain atrribute:*/
		    file = elmnt.getAttribute("w3-include-html");
		    if (file) 
		    {
		      /*make an HTTP request using the attribute value as the file name:*/
		      xhttp = new XMLHttpRequest();
		      xhttp.onreadystatechange = function() 
		      {
		        if (this.readyState == 4) 
		        {
		          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
		          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
		          /*remove the attribute, and call this function once more:*/
		          elmnt.removeAttribute("w3-include-html");
		          includeHTML();
		        }
		      }
		      xhttp.open("GET", file, true);
		      xhttp.send();
		      /*exit the function:*/
		      return;
		    }
		  }
		  showActiveNav();
	}
    
});