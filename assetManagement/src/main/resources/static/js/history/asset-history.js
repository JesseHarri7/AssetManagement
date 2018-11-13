$(document).ready(function()
{		
	//All data fields on start up
	findAllHistory();
	
	function findAllHistory()
	{
		var dataSetHistory = [];
		
		$.ajax({
			url:"assetManagement/asset/findAllHistory",
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetHistory = data;
				
				assetList(dataSetHistory);
				
			}
		});
	}
	
	//Create dataTable with JSON data
	function assetList(dataSet)
	{
		
		var assetTable = $("#asset-table").DataTable({
			dom: '<f<t>lip>',
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				{data: 'assetCode'},
				{data: 'name'},
				{data: 'description'},
				{data: 'brand'},
				{data: 'datePurchased'},
				{data: 'status'},
				{data: 'state'}
			]
		});
		
		return assetTable;
	}
});