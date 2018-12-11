var dataSet = [];

//All data fields on start up
findAll();

function findAll() {
		
	$.ajax({
		url:"/assetManagement/user/findAll",
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
			userList(dataSet);
		}
	});
}

function userList(dataSet) {
	
	var userTable = $("#user-table").DataTable({
		retrieve: true,
		select: true,
		data: dataSet,
		columns: 
		[
			{data: 'userID'},
			{data: 'username'},
			{data: 'firstName'},
			{data: 'lastName'},
			{data: 'email'},
			{data: 'active'}
		]
	});
	return userTable;
}