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
			//{data: 'active'}
		]
	});
	return userTable;
}

