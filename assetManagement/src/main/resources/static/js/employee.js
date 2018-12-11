$(document).ready(function()
{
	var dataSet = [];
	
	//All data fields on start up
	findAll();
	
	//do to example template
	
	$('#form-create-btn').click(function(event){
		event.preventDefault();
		create();
	});
	
	function create(){
        var table = $('#emp-table').DataTable();
		
		
		var empID = $('#id').val();
		var firstName = $('#firstname').val();
		var lastName = $('#lastname').val();
		var email = $('#email').val();
		var password = $('#password').val();
		var empname = $('#empname').val();
		
		var emp = {empID, firstName, lastName,email,empname,password};
		var emp_json = JSON.stringify(emp)
		console.log(emp_json);
		$.ajax({
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
		    type:'POST',
			dataType: 'JSON',
			url:'assetManagement/employee/create',
			data:emp_json,
			success:function(response){
				
				table.row.add(emp).draw();
				$('#exampleModal').modal('hide');
				
			},
		error: function(error){
			alert("ERROR "+JSON.stringify(error))
			
		}
			
		});
	}
	
	function findAll()
	{
		
		$.ajax({
			url:"assetManagement/employee/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				
				empList(dataSet);
				
			}
		});
	}		

	function empList(dataSet)
	{
		
		var empTable = $("#emp-table").DataTable({
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				{data: 'employeeID'},
				{data: 'name'},
				{data: 'surname'},
				{data: 'startDate'},
				{data: 'email'}
			]
		});

		return empTable;
		}
	//select
    
    $('#emp-table tbody').on( 'click', 'tr', function () {
    	var table = $('#emp-table').DataTable();
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            $('#delete-btn').prop('disabled', true);
           
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#delete-btn').prop('disabled', false);
        }    
    });
 //delete button
    $('#delete-btn').click( function () {
    	var table = $('#emp-table').DataTable();
    	remove();
        table.row('.selected').remove().draw( false );
        
    });
    
    function remove()
	{
		var table = $('#emp-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if(rowToDelete && rowToDelete.active == "Deactivated"){
			rowToDelete.active = 'Active';
		}else{
			rowToDelete.active = 'Deactivated';
		}
		
		if (rowToDelete)
		{
			$.ajax({
				url:"assetManagement/employee/delete/" + rowToDelete.employeeID, 
				dataType: "json",
				type: "DELETE",
				
				if(response.active && response.active=='Deactivated'){
					rowToDelete.active = "Deactivated";
				}else{
					rowToDelete.active = "Active";
				}
			},
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a emp to remove");
		}	
	}
});
