$(document).ready(function()
{
	var dataSet = [];
	findUsers();
	
	//All data fields on start up
	//findAllAssets();
	
	//Select
	$('#asset-table tbody').on('click','tr', function()
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
	
	//select asset 
	$('#setAsset-btn').click( function () 
	{
		var test;
		var table = $('#asset-table').DataTable();
		console.log(test = table.row( '.selected' ).data() );
		console.log("works: " + test.assetId);
		
		localStorage.setItem('asset', JSON.stringify(test));
		
//		var asset = JSON.parse(localStorage.getItem('asset'));
		
//		localStorage.removeItem('asset');
		
		
    } );
	
	//find all users 
	$('#findAll-btn').click( function () 
	{
		findUsers();
    } );
	
	//Search
	$('#assetId').on( 'keyup', function () 
	{
		var assetTable = assetList(dataSet);
		assetTable.search( this.value ).draw();
	} );
	
	
	function assetList(dataSet)
	{
		
		var assetTable = $("#asset-table").DataTable({
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				{data: 'assetId'},
				{data: 'name'},
				{data: 'description'},
				{data: 'brand'},
				{data: 'datePurchased'},
				{data: 'status'}
			]
		});
		
		return assetTable;
	}
	
	function empList(dataSet)
	{
		
		var empTable = $("#employee-table").DataTable({
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
	
	$('#login-btn').click(function(event) 
	{
		event.preventDefault();
		//validate();
		login();
	});
	
	
	//Delete
	$('#delete-btn').click(function(event) 
	{
		//var table = $('#data-table').DataTable();
		remove();
		
		//table.row('.selected').remove().draw( false );
		
	});
	
	$('#findId-btn').click(function(event) 
	{
		event.preventDefault();
		findById();
	});	
	
	function validate(){
		var username= $('#username').val();
		
		if(username){
			console.log("username: "+ username);
		}
	}
	
	function findUsers()
	{
		$.ajax({
			url:"user/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				$("#user-table").DataTable({
					data: data,
					columns: [
						{data: 'userID'},
						{data: 'name'},
						{data: 'username'},
						{data: 'email'}
					]
				});
			}

	
	
	function findEmployee()
	{
		$.ajax({
			url:"employee/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				$("#employee-table").DataTable({
					data: data,
					columns: [
						{data: 'employeeID'},
						{data: 'name'},
						{data: 'surname'},
						{data: 'email'},
						{data: 'startDate'}
					]
				});
			}
		});
	}
	
	
	function findAllAssets()
	{
		
		$.ajax({
			url:"assetManagement/asset/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				
				assetList(dataSet);
				
			/*	$("#data-table").DataTable({
					searching: false,
					retrieve: true,
					data: dataSet,
					columns: 
					[
						{data: 'assetId'},
						{data: 'name'},
						{data: 'description'},
						{data: 'brand'},
						{data: 'datePurchased'},
						{data: 'status'}
					]
				});*/
				
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
	
	function remove()
	{
		var table = $('#asset-table').DataTable();
//		if(!table)
//		{
//			table = $('#employee-table').DataTable();
//			var empUrl = "employee/delete/"
//		}
		var rowToDelete = table.row( '.selected' ).data()
		
		if (rowToDelete)
		{
			$.ajax({
				url:"assetManagement/asset/delete/" + assetToDelete.assetId, 
				dataType: "json",
				type: "DELETE",
				success: alert("Asset " + assetToDelete.assetId + " was removed") + findAll()
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a asset to remove");
		}	
		
	}
	
	function findById()
	{
		var assetId = $('#assetId').val();
		
		if(assetId)
		{
			$.ajax({
				url:"assetManagement/asset/" + assetId,
				dataType: "json",
				type: "GET",
				success: function(data)
				{
					dataSet[0] = data;
					
					$("#asset-table").DataTable({
						searching: false,
						data: dataSet,
						columns:
						[
							{data: 'assetId'},
							{data: 'name'},
							{data: 'description'},
							{data: 'brand'},
							{data: 'datePurchased'},
							{data: 'status'}
						]
					});
				}
//				{
//					
//						var record = "<tr><td>" + 
//										//(key+1) + "</td><td>" +
//										data.assetId + "</td><td>" +
//										data.name + "</td><td>" + 
//										data.description + "</td><td>" +
//										data.brand + "</td><td>" +
//										data.datePurchased + "</td><td>" +
//										data.status + "</td></tr>";
//						$("table").append(record);
//				}
			});
		}
		else
		{
			alert("Please input an asset ID to find");
		}
	}
	
	

	
}

});