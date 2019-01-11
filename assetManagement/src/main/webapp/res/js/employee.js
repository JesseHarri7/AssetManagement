$(document).ready(function()
{
	var dataSet = [];
	
	//Active data fields on start up
	showActive();
	
	function showActive(){
		$.ajax({
			url:"/assetManagement/employee/findActivated/active", 
			dataType: "json",
			type: "GET",
			success: function(data) {
				
				dataSet = data;
				empList(dataSet);
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
		var name = $('#name').val();
		var surname = $('#surname').val();
		var email = $('#email').val();
		var password = $('#empname').val();
		var active = "Active";
		
		if ( name=="" || surname=="" || email=="" || password ==""){
			alert("Please fill in the blanks");
			return false;
		}
		else
		{
			return true;
		}	
	}
	
	function create()
	{
		dataSet = [];
		var table = $('#emp-table').DataTable();
		table.draw();
        var table = $('#emp-table').DataTable();
		var employeeID = $('#id').val();
		var name = $('#name').val();
		var surname = $('#surname').val();
		var email = $('#email').val();
//		var empname = $('#empname').val();
		var active = "Active";
	
		var emp = {employeeID, name, surname,email,active};
		var emp_json = JSON.stringify(emp)
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
				url:'/assetManagement/employee/create',
				data:emp_json,
				success: success(),
				error: function(error){
				alert("ERROR "+JSON.stringify(error));	
				}
			});
			
			function success()
			{
			table.row.add(emp).draw()
			alert("Employee is created");	
			
			/*var emp = Existance();
			table.row.add(emp).draw()
			alert("Employee is created");*/
			}
		}
	}
	
	function findAll()
	{
		
		$.ajax({
			url:"/assetManagement/employee/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				empList(dataSet);
			}
		});
	}
	

	
	function empList(dataSet) {
		
		var empTable = $("#emp-table").DataTable({
			retrieve: true,
			dom: '<f<t>lip>',
			select: true,
			data: dataSet,
			columns: 
			[
				{data: 'employeeID'},
				{data: 'name'},
				{data: 'surname'},
				//{data: 'startDate'},
				{data: 'email'},
				//{data: 'active'}
			]
		});
		return empTable;
	}
	


	function Existance()
    {
    	var email = $('#email').val();
    	
    	var dataSet;
    	
    	$.ajax({
			url:"/assetManagement/employee/email/"+email, 
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
		
    function findHistory() {
		
    	$.ajax({
    		url:"/assetManagement/employee/findHistory",
    		dataType: "json",
    		type: "GET",
    		success: function(data) {
    			dataSet = data;
    			empList(dataSet);
    		}
    	});
    }
	//select
    $('#emp-table tbody').on( 'click', 'tr', function () {
    	var table = $('#emp-table').DataTable();
    	var selectedEmp = table.row(this).data();
    	
    	if(selectedEmp && selectedEmp.active == 'Active'){
    		$('#change-btn').show();
    		$('#change-btn').prop('value', 'Deactivate');
    
    	}else{
    		$('#change-btn').show();
    		$('#change-btn').prop('value', 'Activate');
    		
    	}if(selectedEmp && selectedEmp.active == ' '){
    		selectedEmp && selectedEmp.active == 'Active';
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
   
    function remove() {
		var table = $('#emp-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if(rowToDelete && rowToDelete.active == "Deactivated"){
			rowToDelete.active = 'Active';
		}else{
			rowToDelete.active = 'Deactivated';
		}
		
		if (rowToDelete) {
			$.ajax({
				url:"/assetManagement/employee/delete/" + rowToDelete.employeeID + "/" + rowToDelete.active, 
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
			alert("Please select a employee to remove");
		}
	
		   $('#change-btn').hide();
		   table.row( '.selected' ).data(rowToDelete).draw();
    }

    function findActivated(status){ //activated or Deactivated
    	if(status == 'Show Active'){
    		$.ajax({
    			url:"/assetManagement/employee/findActivated/active", 
    			dataType: "json",
    			type: "GET",
    			success: function(data) {
    				dataSet = data;
    				var table = $('#emp-table').DataTable();
    				table.clear();
    				table.rows.add(dataSet);
    				table.rows(dataSet).draw();
    				table.draw();
    				$('#showActive-btn').prop('value', 'Show Not Active');
    			}
    		});
    	}
    	else{
    		//Deactivated
    		$.ajax({
    			url:"/assetManagement/employee/findActivated/Deactivated", 
    			dataType: "json",
    			type: "GET",
    			success: function(data) {
    				dataSet = data;
    				var table = $('#emp-table').DataTable();
    				table.clear();
    				table.rows.add(dataSet);
    				table.rows(dataSet).draw();
    				table.draw();
    				$('#showActive-btn').prop('value', 'Show Active');
    			}
    		});
    	}
    }

//activation button
$('#change-btn').click( function () {
	var table = $('#emp-table').DataTable();
	remove();       
});

$('#showActive-btn').click(function(event) {
	var status = $('#showActive-btn').val();
	findActivated(status);
});

});

