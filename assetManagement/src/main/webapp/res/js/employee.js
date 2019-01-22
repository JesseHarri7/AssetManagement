/*$(document).ready(function()
{*/
	var dataSet = [];
	var count = 0;
	
	//Active data fields on start up
//	showActive();
	findAll();
	
	//Add temps html files
	includeHTML();
	
	//Show button if there is data in the local storage
	showBtn();
	
	//Show button to assign if reassign is selected
	showAssignBtn();
	
	//Create button
	$('#create-btn').click(function(event) 
	{
		//Clear form red border css
		clearFormBorder();
		
		//Clear form content if any
		document.getElementById("create").reset();
		$('.notifyjs-corner').remove();
	});
	
	//Modal form close button
	$('#form-close-btn').click(function(event) 
	{
		//Clear form red border css
		clearFormBorder();
		//Clear modal form data
		document.getElementById("create").reset();
	});
	
	//Clear local storage to cancel assign 
	$('#cancel-btn').click(function(event) 
	{
		$('.notifyjs-corner').remove();
		resetLocal();		
	});
	
	//Modal create button
	$('#form-create-btn').click(function(event) 
	{
		//Clear form red border css
		clearFormBorder();
		$('.notifyjs-corner').remove();
		
		event.preventDefault();
		var data = validation();
		
		if(data)
		{
			create();
		}
		
	});
	
	function validation()
	{
		var id = document.forms["create"]["id"].value;
		var name = document.forms["create"]["name"].value;
		var surname = document.forms["create"]["surname"].value;
		var email = document.forms["create"]["email"].value;
		var date = document.forms["create"]["dateStart"].value;
		
		if (id == "" || name == "" || surname == "" || email == "" || date == "")
		{
			displayFormBorder(id, name, surname, email, date);
			$.notify("Heads up! All fields must be filled out.", "error");
			return false;
		}
		else
		{
			//Only allow numbers for the ID
			if(validateId(id))
			{
				return true;
			}
			else
			{
				return false;
			}
		}	
	}
	
	function create()
	{
        var table = $('#emp-table').DataTable();
        
		var employeeID = $('#id').val();
		var name = $('#name').val();
		var surname = $('#surname').val();
		var email = $('#email').val();
		var startDate = $('#dateStart').val();
	
		var emp = {employeeID, name, surname, email, startDate};
		
		var emp_json = JSON.stringify(emp)
		
		var exists = findById(employeeID);
		
		if(exists.length == 0)
		{
			$.ajax(
			{
				headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
			    url:'/assetManagement/employee/create',
			    dataType: 'json',	
				data: emp_json,
			    type:'POST',
				success: function(data)
				{
					table.row.add(emp).draw()
					$.notify("Success! Employee " + employeeID + " has been created.", "success");
					
					//Clear data from the modal form
					document.getElementById("create").reset();
					$('#createModal').modal('hide');
				},
				error: function(error)
				{
					$.notify("ERROR " + JSON.stringify(error), "error");	
				}
			});
		}
		else
		{
			$.notify("Error! The Employee " + employeeID + " you're trying to create already exists.", "error");
		}
	}
	
	function findById(id)
    {
		var dataSet = [];
    	
    	$.ajax({
			url:"/assetManagement/employee/id/" + id, 
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data) 
			{
				dataSet = data;
			},
			error: function(data)
			{
				dataSet = [];
			}
		});
    	
    	return dataSet;
    }
		
	//select
    $('#emp-table tbody').on( 'click', 'tr', function () 
    {
    	$(this).toggleClass('selected');
    });
    
  //delete button
	$('#remove-btn').click( function () 
	{
		var table = $('#emp-table').DataTable();

		//Returns an array of the selected rows
		var rowToDelete = table.rows( '.selected' ).data();
		
		$('.notifyjs-corner').remove();
		
		if (rowToDelete.length == 0)
		{
			$.notify("Heads up! Please select an employee to remove.", "error");
		}
		else if (rowToDelete.length >= 2)
		{
			$.notify("Heads up! Please only select one employee to remove.", "error");
		}
		else
		{
			createNotifyD();
			
			$.notify({
				  title: 'Are you sure you want to delete?',
				  button: 'Confirm'
				}, {
				  style: 'foo',
				  className: 'info',
				  autoHide: false,
				  clickToHide: false
				});
		}
	});
	
	//listen for click events from this style
	//If no
	$(document).on('click', '.notifyjs-foo-base .noD', function() 
	{
		//programmatically trigger propogating hide event
		$(this).trigger('notify-hide');
		
	});

	//if Yes
	$(document).on('click', '.notifyjs-foo-base .yesD', function() 
	{	
		//Function
		checkRemove();
		//hide notification
		$(this).trigger('notify-hide');
		
	});
	
	//Soft delete
	function checkRemove()
	{
		var table = $('#emp-table').DataTable();

		//Returns an array of the selected rows
		var rowToDelete = table.rows( '.selected' ).data();

		var items = rowToDelete.length;
		$('.notifyjs-corner').remove();
		//For each row selected, delete
		for (i = 0; i < items; i++)
		{
			//Check to see if the Emp is already assigned
			var empSet = alreadySet(rowToDelete[i].employeeID);
			
			if(empSet.length != 0)
			{
				createNotify(empSet[i].employees.employeeID, i);
				
				$.notify({
					  title: "Employee " + empSet[i].employees.employeeID + " is already assigned. This will unassign the employee from the asset, are you sure you want to delete?",
					  button: 'Confirm'
					}, {
					  style: 'foo',
					  autoHide: false,
					  clickToHide: false
					});
			}
			else
			{
				remove(rowToDelete[i].employeeID);
			}
		}
	}
	
	function alreadySet(id)
	{
		var dataSet = [];

		$.ajax({
			url:"/assetManagement/assetAssigned/findAllEmp/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data
			},
			error: dataSet = null
		});
		
		return dataSet;
	}
    
    function createNotify(code, i, id)
	{
		//add a new style 'foo'

		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<button onclick='chkNo("+code+","+i+")' class='btn btn-secondary no"+i+"'>Cancel</button> " +
		          "<button onclick='chkYes("+code+","+i+","+id+")' class='btn btn-secondary yes"+i+"'>Confirm</button>" +
		        "</div>" +
		      "</div>" +
		    "</div>"
		});
	}
	
	//toast Cancel button
	function chkNo(code, i) 
	{
		$.notify("Success! Action was cancelled.", "success");
		//programmatically trigger propogating hide event
		$('.no'+i).trigger('notify-hide');
	}

	//Toast confirm button
	function chkYes(code, i, id) 
	{
		//Get assigned emp data
		var empSet = alreadySet(code);
		
		//remove items assigned to the emp
		assignedRemove(empSet);
		
		remove(code);
		
		//hide notification
		$('.yes'+i).trigger('notify-hide');
	}
	
	function assignedRemove(assign)
	{
		var total = assign.length;
		
		for(i = 0; i < total; i++)
		{
			$.ajax({
				url:"/assetManagement/assetAssigned/delete/" + assign[i].id,
				dataType: "json",
				type: "DELETE",
				success: 
					$.notify("Success! Employee " + assign[i].employees.employeeID + " and asset " + assign[i].assets.assetCode + " is now unassigned.", "success")
			});
		}
		
	}
	
	function remove(empId) 
    {
		var table = $('#emp-table').DataTable();

		$.ajax({
			url:"/assetManagement/employee/delete/" + empId, 
			dataType: "json",
			type: "DELETE",
			success: success(empId)
			/*,
			error: function(error)
			{
				$.notify("Error! " + error, "error");
//				console.log(error);
			}*/
			
		});
		
		function success()
		{
			var table = $('#emp-table').DataTable();
			
			$.notify("Success! Employee " + empId + " was removed.", "success");
			table.row("#"+empId).remove().draw( false );
		}
    }

	$('#setEmp-btn').click( function () 
	{
		$('.notifyjs-corner').remove();
		
		var table = $('#emp-table').DataTable();
		var empData = table.rows( '.selected' ).data();
		if(empData.length == 0)
		{
			$.notify("Heads up! Please select an employee to assign to an asset.", "error");
//			alert("Please select an employee to assign to an asset");
			
		}
		else if(empData.length >= 2)
		{
			$.notify("Heads up! Please only select one employee.", "error");
//			alert("Please only select one employee");
		}
		else
		{
			asset = JSON.parse(localStorage.getItem('asset0'));
			if(asset)
			{
				//Create asset assigned table if there is asset data
				selectEmp();
				assign();
			}
			else
			{
				//Send to asset table if there is no asset data
				clearLocal();
				selectEmp();
				window.location = "/assetManagement/pages/asset";
				//alert("Please select an asset to assign to the selected employee");
			}
		}		
    });
	
	function selectEmp()
	{
		var table = $('#emp-table').DataTable();
		var empData = table.row( '.selected' ).data();
		
		if(empData)
		{
			localStorage.setItem('emp', JSON.stringify(empData));
			
//			var asset = JSON.parse(localStorage.getItem('asset'));
			
//			localStorage.removeItem('asset');
		}
		else
		{
			$.notify("Heads up! Please select a employee.", "error");
//			alert("Please select a employee");
		}
	}
	
	function assign()
	{
		createTable();
		if(count > 0)
		{
			$.notify("Success! Data successfully assigned.", "success");
			window.location = "/assetManagement/pages/assetAssigned";
		}

		clearLocal();
		$('#cancel-btn').hide();
	}
	
	function clearLocal()
	{
		if(asset)
		{
			var assetStorage = localStorage.length - 1;
		}
		else
		{
			var assetStorage = localStorage.length;
		}
		
		for(i = 0; i < assetStorage; i++)
		{
			localStorage.removeItem('asset' + [i]);
		}
		
		localStorage.removeItem('emp');
	}
	
	function clearFormBorder()
	{
		//create form
		$('#id').removeClass("form-fill-error");
		$('#name').removeClass("form-fill-error");
		$('#surname').removeClass("form-fill-error");
		$('#email').removeClass("form-fill-error");
		$('#dateStart').removeClass("form-fill-error");
		
		//Update form
		$('#uId').removeClass("form-fill-error");
		$('#uName').removeClass("form-fill-error");
		$('#uSurname').removeClass("form-fill-error");
		$('#uEmail').removeClass("form-fill-error");
		$('#uDateStart').removeClass("form-fill-error");
	}
	
	function displayFormBorder(id, name, surname, email, date)
	{
		if(!id)
		{
			$('#id').addClass("form-fill-error");
			$('#uId').addClass("form-fill-error");
		}	
		
		if(!name)
		{
			$('#name').addClass("form-fill-error");
			$('#uName').addClass("form-fill-error");
		}
		
		if(!surname)
		{
			$('#surname').addClass("form-fill-error");
			$('#uSurname').addClass("form-fill-error");
		}
		
		if(!email)
		{
			$('#email').addClass("form-fill-error");
			$('#uEmail').addClass("form-fill-error");
		}
		
		if(!date)
		{
			$('#dateStart').addClass("form-fill-error");
			$('#uDateStart').addClass("form-fill-error");
		}
	}
	
	function findAll()
	{
		
		$.ajax({
			url:"/assetManagement/employee/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				empList(dataSet);
			}
		});
	}

	function empList(dataSet) {
		
		var empTable = $("#emp-table").DataTable({
			retrieve: true,
			dom: '<f<t>lip>',
			responsive: true,
			rowId: 'employeeID',
			select: true,
			data: dataSet,
			columns: 
			[
				{data: 'employeeID'},
				{data: 'name'},
				{data: 'surname'},
				{data: 'email'}
				//{data: 'active'}
			]
		});
		return empTable;
	}
	
	function validateId(id)
	{
		var numbers = /^[0-9]+$/;
		
		if(id.match(numbers))
		{
			return true;
		}
		else
		{
			$.notify("Heads up! Please input numeric characters only.", "error");
			$('#id').addClass("form-fill-error");
			return false;
		}
	}
	
	function resetLocal()
	{
		localStorage.clear();
		
		$.notify("Success! Assigning successfully cancelled", "success");
		
		$('#cancel-btn').removeClass('visible');
	}
	
	//Notify class
	function createNotifyD()
	{
		//add a new style 'foo'
		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<button class='btn btn-secondary noD'>Cancel</button>" +
		          "<button class='btn btn-secondary yesD' data-notify-text='button'></button>" +
		        "</div>" +
		      "</div>" +
		    "</div>"
		});
	}
	
	//Make cancel button visible
	function showBtn()
	{
		if(localStorage.length > 0)
		{
			$('#cancel-btn').addClass('visible');
		}
	}
	
	function showAssignBtn()
	{
		var assign = JSON.parse(localStorage.getItem('assign'));
		
		if(assign)
		{
			$('#reassign-btn').addClass('visible-r');
		}
	}
		
	function showActiveNav()
	{
		$('#eNav').addClass('active');
		
		$("a[href='../pages/asset-history']").attr('href', '../pages/employee-history')
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
	
/*	function showActive()
	{
		$.ajax({
			url:"/assetManagement/employee/findActivated/active", 
			dataType: "json",
			type: "GET",
			success: function(data) {
				console.log(JSON.stringify(data));
				dataSet = data;
				empList(dataSet);
			}
			});
	}*/
	
/*	function findActivated(status){ //activated or Deactivated
    	if(status == 'Show Active'){
    		$.ajax({
    			url:"/assetManagement/employee/findActivated/active", 
    			dataType: "json",
    			type: "GET",
    			success: function(data) {
    				dataSet = data;
    				var table = $('#emp-table').DataTable();
    				table.clear();
    				table.rows.add(dataSet);
    				table.rows(dataSet).draw();
    				table.draw();
    				$('#showActive-btn').prop('value', 'Show Not Active');
    			}
    		});
    	}
    	else{
    		//Deactivated
    		$.ajax({
    			url:"/assetManagement/employee/findActivated/Deactivated", 
    			dataType: "json",
    			type: "GET",
    			success: function(data) {
    				dataSet = data;
    				var table = $('#emp-table').DataTable();
    				table.clear();
    				table.rows.add(dataSet);
    				table.rows(dataSet).draw();
    				table.draw();
    				$('#showActive-btn').prop('value', 'Show Active');
    			}
    		});
    	}
    }*/

//});