var dataSet = [];

//All data fields on start up
findAll();

//Add all temp files
includeHTML();

function findAll() {
		
	$.ajax({
		url:"/assetManagement/user/findAllHistory",
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
		dom: '<f<t>lip>',
		retrieve: true,
		select: true,
		data: dataSet,
		columns: 
		[
			{data: 'userID'},
			{data: 'firstName'},
			{data: 'lastName'},
			{data: 'email'},
			{data: 'state'}
		]
	});
	return userTable;
}

function showActiveNav()
{
	$('#uNav').addClass('active');
	
	$("a[href='../pages/asset']").attr('href', '../pages/user')
	
}

function includeHTML() 
{
	  var z, i, elmnt, file, xhttp;
	  /*loop through a collection of all HTML elements:*/
	  z = document.getElementsByTagName("*");
	  for (i = 0; i < z.length; i++) 
	  {
	    elmnt = z[i];
	    /*search for elements with a certain atrribute:*/
	    file = elmnt.getAttribute("w3-include-html");
	    if (file) 
	    {
	      /*make an HTTP request using the attribute value as the file name:*/
	      xhttp = new XMLHttpRequest();
	      xhttp.onreadystatechange = function() 
	      {
	        if (this.readyState == 4) 
	        {
	          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
	          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
	          /*remove the attribute, and call this function once more:*/
	          elmnt.removeAttribute("w3-include-html");
	          includeHTML();
	        }
	      }
	      xhttp.open("GET", file, true);
	      xhttp.send();
	      /*exit the function:*/
	      return;
	    }
	  }
	  showActiveNav();
}
