$(document).ready(function()
{
	var dataSet = [];
	//var dataSetA = [];
	//var dataSetEmp = [];
	var asset;
	var emp;
	
	//Global div declaration for alerts
	var div = document.getElementById('boot-alert');

	//All data fields on start up
	findAll();
	
	//Select row
	$('#AA-table tbody').on('click','tr', function()
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
	
	//Get Asset info
	$('#asset-btn').click(function(event)
	{
		var table = $('#AA-table').DataTable();
		var findAssetId = table.row('.selected').data().assets.assetCode;
		var assetInfo = findAsset(findAssetId);
		if(assetInfo)
		{
			$('#assetModal').modal('show');
			displayAsset(assetInfo);
		}
		else
		{
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset Code.", "alert-warning");
			$('#boot-alert').show();
			slide();
			
			//alert("Please select an asset Code")
		}
	});	
	
	//Get Emp info
	$('#emp-btn').click(function(event)
	{
		var table = $('#AA-table').DataTable();
		var findEmpId = table.row('.selected').data().employees.employeeID;
		var empInfo = findEmp(findEmpId);
		if(empInfo)
		{
			$('#empModal').modal('show');
			displayEmp(empInfo);			
		}
		else
		{
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an Employee ID.", "alert-warning");
			$('#boot-alert').show();
			slide();
			
			//alert("Please select an Employee ID")
		}
	});
	
	//Delete
	$('#delete-btn').click(function(event)
	{
		var table = $('#AA-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			div.innerHTML = displayAlert("Are you sure you want to unassign? <a id='delYes' data-id='Yes' class='alert-link' href='#'>Yes</a>  <a id='delNo' data-id='No' href='#' class='alert-link' >No</a>.", "alert-info");
			$('#boot-alert').show();
		}
		else
		{
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select a item to unassign.", "alert-warning");
			$('#boot-alert').show();
			slide();
			
			//alert("Please select a item to remove");
		}	
		
	});
	
	//Reassign button
	$('#reassign-btn').click(function(event)
	{
		var table = $('#AA-table').DataTable();

		var data = table.row( '.selected' ).data();
		
		if(data)
		{
			selectAA();
			window.location = "http://localhost:8080/employee";
			alert("Please select an employee to reassign to this asset");
			
		}
		else
		{
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select a item to reassign.", "alert-warning");
			$('#boot-alert').show();
			slide();
			
			//alert("Please select a item to remove");
		}	
	});
	
	$('#boot-alert').on('click','a', function() 
	{
		var $el = $(this);
		
		if($el.data('id') == 'Yes')
		{
			remove();
		}
		else
		{
			$('#boot-alert').hide();
		}		
	});
	
	$('#assetT-btn').click( function()
	{
		var table = $('#AA-table').DataTable();
		var findAssetId = table.cell('.selected').data();
		var assetInfo = findAsset(findAssetId);
	})
	
	function findAll()
	{
		
		$.ajax({
			url:"assetManagement/assetAssigned/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{				
				dataSet = data;
				aaList(dataSet);
				
			}
		});
	}

	function aaList(dataSet)
	{
		
		var aaTable = $("#AA-table").DataTable({
			dom: '<f<t>lip>',
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				//{data: 'id'},
				{data: 'assets.assetCode'},
				{data: 'employees.employeeID'},
				{data: 'employees.name'},
				{data: 'moveDate'}
			]
		});
		
		return aaTable;
	}
	
	function remove()
	{
		var table = $('#AA-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			$.ajax({
				url:"assetManagement/assetAssigned/delete/" + rowToDelete.id, 
				dataType: "json",
				type: "DELETE",
				success: success()//alert("Asset " + rowToDelete.assets.assetCode + " and employee " + rowToDelete.employees.employeeID + " is now unassigned")
			});
			table.row('.selected').remove().draw( false );
			function success()
			{
				div.innerHTML = displayAlert("<strong>Success!</strong> Asset " + rowToDelete.assets.assetCode + " and employee " + rowToDelete.employees.employeeID + " is now unassigned.", "alert-success");
				$('#boot-alert').show();
				//slide();
			}
		}
		else
		{
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select a item to unassign.", "alert-warning");
			$('#boot-alert').show();
			slide();
			
			//alert("Please select a item to remove");
		}	
		
		
	}
	
	function findAsset(id)
	{
		var dataSetA = [];

		$.ajax({
			url:"assetManagement/asset/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetA = data
			},
			error: dataSetA = null
		});
		return dataSetA;
	
	}
	
	function findEmp(id)
	{
		var dataSetEmp = [];

		$.ajax({
			url:"assetManagement/employee/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetEmp = data
			},
			error: dataSetEmp = null
		});
		return dataSetEmp;

	}
	
	function displayAsset(asset)
	{
		
			document.getElementById("mAssetId").innerHTML = asset.assetCode;
			document.getElementById("mName").innerHTML = asset.name;
			document.getElementById("mDesc").innerHTML = asset.description;
			document.getElementById("mBrand").innerHTML = asset.brand;
			document.getElementById("mDate").innerHTML = asset.datePurchased;
			document.getElementById("mStatus").innerHTML = asset.status;
		
	}
	
	function displayEmp(emp)
	{
		
			document.getElementById("mEmpId").innerHTML = emp.employeeID;
			document.getElementById("mEmpName").innerHTML = emp.name;
			document.getElementById("mSur").innerHTML = emp.surname;
			document.getElementById("mEmail").innerHTML = emp.email;
			document.getElementById("mStartDate").innerHTML = emp.startDate;
		
	}
	
	function slide()
	{
		$('#boot-alert').fadeTo(5000, 900).slideUp(900, function(){
			$('#boot-alert').slideUp(900);
		});
	}
	
	function displayAlert(msg, type)
	{
		var alert = "<div class='alert " + type + " alert-dismissible fade in'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> "
						+ msg + "</div>";
		return alert;
	}
	
	function selectAA()
	{
		var table = $('#AA-table').DataTable();
		var data = table.row( '.selected' ).data();
		
		if(data)
		{
			localStorage.setItem('assign', JSON.stringify(data));
			
//			var asset = JSON.parse(localStorage.getItem('asset'));
			
//			localStorage.removeItem('asset');
		}
		else
		{
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select a item to reassign.", "alert-warning");
			$('#boot-alert').show();
			slide();
			//alert("Please select a row");
		}
	}
	
});