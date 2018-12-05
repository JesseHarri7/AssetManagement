$(document).ready(function()
{		
	//All data fields on start up
	findAllHistory();
	
	function findAllHistory()
	{
		var dataSetHistory = [];
		
		$.ajax({
			url:"/assetManagement/assetAssigned/findAllHistory",
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetHistory = data;
				
				aaList(dataSetHistory);
				
			}
		});
	}
	
	//Create dataTable with JSON data
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
				{data: 'moveDate'},
				{data: 'state'}
			]
		});
		
		return aaTable;
	}
	
});