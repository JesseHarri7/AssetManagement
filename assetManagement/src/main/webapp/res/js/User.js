$(document).ready(function() {
	
	$('#change-btn').hide();
	var dataSet = [];
	
	//All data fields on start up
	showActive();
	
	//Add temps html files
	includeHTML();
	
	function showActive(){
		$.ajax({
			url:"/assetManagement/user/findActivated/active", 
			dataType: "json",
			type: "GET",
			success: function(data) {
				
				dataSet = data;
				userList(dataSet);
			}
			});
	}
	//do to example template
	
	$('#form-create-btn').click(function(event) {
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
		var active = "Active";
		
		if ( firstName=="" || lastName=="" || email=="" || password ==""){
			alert("Please fill in the blanks");
			return false;
		}
		else
		{
			return true;
		}	
	}
	
	
	
	$('#showActive-btn').click(function(event) {
		var status = $('#showActive-btn').val();
		findActivated(status);
	});
	

	function create()
	{
		dataSet = [];
		//dataSet = data;
		var table = $('#user-table').DataTable();
		table.draw();
        var table = $('#user-table').DataTable();
		var firstName = $('#firstname').val();
		var lastName = $('#lastname').val();
		var email = $('#email').val();
		var password = $('#password').val();
		var password = $('#username').val();
		var active = "Active";
		
		var user = {firstName, lastName,email,password ,active,username};
		var user_json = JSON.stringify(user);
		var condition = Existance();
		
		if(condition)
		{
			alert("Email exists");
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
				success: function(response){
					console.log(response)
					success(response);
				},
				error: function(error){
				alert("ERROR "+JSON.stringify(error));	
				}
			});
			
			function success(user)
			{
			//var user = Existance();
//			table.row.add(user).draw()
			alert("User is created");	
			}
		}
	}
	function Existance()
    {
    	var email = $('#email').val();
    	
    	var dataSet;
    	
    	$.ajax({
			url:"/assetManagement/user/email/"+email, 
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data) 
			{
//				dataSet = data;
				dataSet = true;
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
	
	

function findActivated(status){ //activated or deactivated
	
	
	if(status == 'Show Active'){
		$.ajax({
			url:"/assetManagement/user/findActivated/active", 
			dataType: "json",
			type: "GET",
			success: function(data) {
				dataSet = data;
				var table = $('#user-table').DataTable();
				table.clear();
				table.rows.add(dataSet);
				table.rows(dataSet).draw();
				table.draw();
				$('#showActive-btn').prop('value', 'Show Not Active');
			}
		});
	}
	else{
		//deactive
		$.ajax({
			url:"/assetManagement/user/findActivated/Deactivated", 
			dataType: "json",
			type: "GET",
			success: function(data) {
				dataSet = data;
				var table = $('#user-table').DataTable();
				table.clear();
				table.rows.add(dataSet);
				table.rows(dataSet).draw();
				table.draw();
				$('#showActive-btn').prop('value', 'Show Active');
			}
		});
	}
}

function userList(dataSet) {
		
	var userTable = $("#user-table").DataTable({
		retrieve: true,
		dom: '<f<t>lip>',
		select: true,
		data: dataSet,
		columns: 
		[
			{data: 'userID'},
			{data: 'email'},
			{data: 'firstName'},
			{data: 'lastName'},
			{data: 'username'}
			//{data: 'active'}
		]
	});
	return userTable;
}
	//select
    
    $('#user-table tbody').on( 'click', 'tr', function () {
    	
    	var table = $('#user-table').DataTable();
    	var selectedUser = table.row(this).data();
    	
    	if(selectedUser && selectedUser.active == 'Active'){
    		$('#change-btn').show();
    		$('#change-btn').prop('value', 'Deactivate');
    		
    		
    	}else{
    		$('#change-btn').show();
    		$('#change-btn').prop('value', 'Activate');
    		
    	}if(selectedUser && selectedUser.active == ' '){
    		selectedUser && selectedUser.active == 'Active';
    	}
        
    	if ( $(this).hasClass('selected') ) {
        	
            $(this).removeClass('selected');
            $('#change-btn').prop('disabled', true);
       
        }else {
       	table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#change-btn').prop('disabled', false);

        }    
    });
    
    
 //activation button
    $('#change-btn').click( function () {
    	var table = $('#user-table').DataTable();
    	remove();       
    });
    
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
    function findHistory() {
		
    	$.ajax({
    		url:"/assetManagement/user/findHistory",
    		dataType: "json",
    		type: "GET",
    		success: function(data) {
    			dataSet = data;
    			userList(dataSet);
    		}
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