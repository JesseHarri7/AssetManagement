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
		}
		else 
		{
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
	} );
	
	//refresh
	$('#refresh-btn').click(function(event) 
	{
		var table = $('#emp-table').DataTable();
		findAll();
		table.draw( false );
	});
	
	//Delete
	$('#delete-btn').click(function(event) 
	{
		var table = $('#emp-table').DataTable();
		remove();
		
		table.row('.selected').remove().draw( false );
		
	});
	
	//select asset 
	$('#setEmp-btn').click( function () 
	{
		var empData;
		var table = $('#emp-table').DataTable();
		console.log(empData = table.row( '.selected' ).data() );
		console.log("works: " + empData.employeeID);
		
//		localStorage.setItem('asset', JSON.stringify(assetData));
		
//		var asset = JSON.parse(localStorage.getItem('asset'));
		
//		localStorage.removeItem('asset');
		
		
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
				
				assetList(dataSet);
				
			}
		});
	}
	
	function remove()
	{
		var table = $('#asset-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			$.ajax({
				url:"assetManagement/asset/delete/" + rowToDelete.assetId, 
				dataType: "json",
				type: "DELETE",
				success: alert("Asset " + rowToDelete.assetId + " was removed") + findAll()
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a asset to remove");
		}	
		
	}

});