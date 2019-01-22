$(document).ready(function() 
{	
	//All data fields on start up
	findAll();
	
	//Add temps html files
	includeHTML();
	
	//Click to select row from the table
	$('#asset-table tbody').on('click','tr', function()
	{
		$(this).toggleClass('selected');
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
		
		if ( firstName=="" || lastName=="" || email=="" || password =="")
		{
			displayFormBorder(id, name, surname, email, date);
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
		var dataSet = [];
		
		var table = $('#user-table').DataTable();
		
		var firstName = $('#firstname').val();
		var lastName = $('#lastname').val();
		var email = $('#email').val();
		var password = $('#password').val();
		
		var user = {firstName, lastName,email,password};
		var user_json = JSON.stringify(user);
		var exists = findByEmail();
		
		if(exists )
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
	
	function findByEmail()
    {
    	var email = $('#email').val();
    	
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
    
    function remove() {
		var table = $('#user-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if(rowToDelete && rowToDelete.active == "Deactivated"){
			rowToDelete.active = 'Active';
		}else{
			rowToDelete.active = 'Deactivated';
		}
		
		if (rowToDelete) {
			$.ajax({
				url:"assetManagement/user/delete/" + rowToDelete.userID + "/" + rowToDelete.active, 
				dataType: "json",
				type: "PUT",
				success: function(response) {
					
					if(response.active && response.active=='Deactivated'){
						rowToDelete.active = "Deactivated";
					}else{
						rowToDelete.active = "Active";
					}
				},
			error : function(error){
				console.log(error)
			}
			});
			
		}else{
			alert("Please select a user to remove");
		}
	
		   $('#change-btn').hide();
		   table.row( '.selected' ).data(rowToDelete).draw();
    }
    
    function clearFormBorder()
	{
		//create form
		$('#firstname').removeClass("form-fill-error");
		$('#lastname').removeClass("form-fill-error");
		$('#email').removeClass("form-fill-error");
		$('#password').removeClass("form-fill-error");
		
		//Update form
		$('#uFirstname').removeClass("form-fill-error");
		$('#uLastname').removeClass("form-fill-error");
		$('#uEmail').removeClass("form-fill-error");
		$('#uPassword').removeClass("form-fill-error");
	}
	
	function displayFormBorder(name, surname, email, password)
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