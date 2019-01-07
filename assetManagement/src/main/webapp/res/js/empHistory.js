var dataSet = [];

//All data fields on start up
findAll();

function findAll() {
		
	$.ajax({
		url:"/assetManagement/employee/findAll",
		dataType: "json",
		type: "GET",
		success: function(data) {
			dataSet = data;
			
		/*	for (var i = 0; i < dataSet.length; i++) {
				
				if (dataSet[i].active && dataSet[i].active == 'Deactivated'){
					dataSet[i].active = 'Deactivated';	
				}else{
					dataSet[i].active = 'Active';		
				}
			}*/
			empList(dataSet);
		}
	});
}

function empList(dataSet) {
	
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
			{data: 'email'},
			{data: 'active'}
		]
	});
	return empTable;
}