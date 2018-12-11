$(document).ready(function() {
	$('#change-btn').hide();
	var dataSet = [];
	
	//All data fields on start up
	findAll();
	
	//do to example template
	
	$('#form-create-btn').click(function(event) {
		event.preventDefault();
		var data = validation();
		
		if(data)
		{
			create();
		}
	});
	
	$('#test-btn').click(function(event) 
	{
		var condition = false;
		
		if(condition == true)
		{
			alert("true");
		}
		else
		{
			alert("False");
		}
	});
	
	function validation()
	{
		var firstName = $('#firstname').val();
		var lastName = $('#lastname').val();
		var email = $('#email').val();
		var password = $('#password').val();
		var active = "Active";
		
		if ( firstName=="" && lastName=="" && email=="" && password ==""){
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
		
        var table = $('#user-table').DataTable();
        
		var firstName = $('#firstname').val();
		var lastName = $('#lastname').val();
		var email = $('#email').val();
		var password = $('#password').val();
		var active = "Active";
		
		var user = {firstName, lastName,email,password ,active};
		var user_json = JSON.stringify(user)

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
				url:'assetManagement/user/create',
				data:user_json,
				success: success(),
				
				error: function(error){
				alert("ERROR "+JSON.stringify(error));	
				}
			});
			
			function success()
			{
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
		url:"/assetManagement/user/findActivated/active",
		dataType: "json",
		type: "GET",
		success: function(data) 
		{
			dataSet = data;
			userList(dataSet);
		}
	});
}
	
	

function findActivated(status){ //activated or deactive 
	
	
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
		select: true,
		data: dataSet,
		columns: 
		[
			{data: 'userID'},
			{data: 'email'},
			{data: 'firstName'},
			{data: 'lastName'},
			{data: 'active'}
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
    
});