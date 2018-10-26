$(document).ready(function()
{
	var dataSet = [];
	
	//All data fields on start up
	findAll();
	
	//Select
	$('#emp-table tbody').on('click','tr', function()
	{
		if ( $(this).hasClass('selected') ) 
		{
            $(this).removeClass('selected');
            $('#setEmp-btn').prop('disabled', true);
		}
		else 
		{
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#setEmp-btn').prop('disabled', false);
        }
	} );
	
	//Delete
	$('#delete-btn').click(function(event) 
	{
		var table = $('#emp-table').DataTable();
		remove();
		
		table.row('.selected').remove().draw( false );
		
	});
	
	//Clear local storage
	$('#clear-btn').click( function()
	{
		localStorage.removeItem('asset');
		localStorage.removeItem('emp');
		alert("Cleared");
	})
	
	//select Employee 
	$('#setEmp-btn').click( function () 
	{	
		selectEmp();
    } );
	
	//Search
	$('#assetId').on( 'keyup', function () 
	{
		var empTable = empList(dataSet);
		empTable.search( this.value ).draw();
	} );
	
	
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
				{data: 'email'},
				{data: 'startDate'}
			]
		});
		
		return empTable;
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
	
	function remove()
	{
		var table = $('#emp-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			$.ajax({
				url:"assetManagement/employee/delete/" + rowToDelete.employeeID, 
				dataType: "json",
				type: "DELETE",
				success: alert("Asset " + rowToDelete.employeeID + " was removed")
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a asset to remove");
		}	
		
	}
	
	function selectEmp()
	{
		var empData;
		var table = $('#emp-table').DataTable();
		console.log(empData = table.row( '.selected' ).data() );
		
		if(empData)
		{
			console.log("works: " + empData.employeeID);
			
			localStorage.setItem('emp', JSON.stringify(empData));
			
			window.location = "http://localhost:8080/assetAssigned";
			
//			var asset = JSON.parse(localStorage.getItem('asset'));
			
//			localStorage.removeItem('asset');
		}
		else
		{
			alert("Please select a employee");
		}	
	}

});