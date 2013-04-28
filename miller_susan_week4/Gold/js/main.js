//
// Author: Susan R. Miller
// Course: MiU1304
// Week 3
//
//
//


// Home Page Code Start


$('#home').on('pageinit', function(){

var choreDoer = ["Mom", "Papa", "Daughter A", "Daughter B", "Anyone"];

// Adds Image - used with JQM

	function getImage(doerName, field, align, size) {
		var newImg = document.createElement("img"),
			setSrc = newImg.setAttribute("src", "images/" + doerName + ".png"),
			setSize = newImg.setAttribute("height", size);
		newImg.setAttribute("align", align);
		field.appendChild(newImg);

	}

// Create and populate browse chore doers - used with JQM
    function browseDoers() {
        var doerDiv = document.getElementById("browsePeople");
        for (var i = 0, j = choreDoer.length; i < j; i++) {
            var makeItem = document.createElement("li"),
            	makeLink = document.createElement("a"),
                itemText = choreDoer[i],
                linkableName = itemText.replace(" ", "_");
			makeItem.setAttribute("value", itemText);
            makeLink.href = "#" + linkableName + "List";
            getImage(choreDoer[i], makeItem, "left", "30px");
            makeLink.innerHTML = itemText;
            makeItem.appendChild(makeLink);
            doerDiv.appendChild(makeItem);
        }

        $(document.getElementById("browsePeople")).listview('refresh');

    }


// Shows chores for specific person

    function showPerson(theDoer) {

        // Pins down where to add the list
            var mainUL = document.getElementById(theDoer),
            	mainDiv = document.createElement("div");
	            mainDiv.setAttribute("data-role", "collapsible-set");
	            mainDiv.setAttribute("data-inset", "false");


        // Steps through each store in localStorage
            for (var i=0, j=localStorage.length; i<j; i++) {
            // Gets data fro localStorage back into an object
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var item = JSON.parse(value);

            if ((item.who[1] === theDoer) && (item.done[1] === "Not Yet")) {

            // Creates li for each individual chore
                var choreDiv = document.createElement("div");
                choreDiv.setAttribute("data-role", "collapsible");


                // Itemizes specific data elements of chore
                    for (var m in item) {
	                    var itemValue;
                    // Creates li for each element of chore
                          // changed li to br

                        if (item[m][0] === "Chore Name: ") {
	                        var headerItem = document.createElement("h4");
	                    itemValue = item[m][1];
	                    headerItem.innerHTML = itemValue;
	                    choreDiv.appendChild(headerItem);
                        } else {
                        var newItem = document.createElement("p");
						itemValue = item[m][0] + " " + item[m][1];
						newItem.innerHTML = itemValue;
                        choreDiv.appendChild(newItem);
                        }

                    }
                mainDiv.appendChild(choreDiv);
            }

            mainUL.appendChild(mainDiv);

        }

        $(document.getElementById("theDoer")).listview('refresh');

    }

// Finds ULs with IDs associated with choreDoer

    function eachPerson() {

		var stepOne = document.getElementsByTagName("ul");

			for (var a=0, b=stepOne.length; a<b; a++) {
				var theDoer = stepOne[a].getAttribute("id");
					for (var c=0, d=choreDoer.length; c<d; c++) {

 						if (theDoer == choreDoer[c]) {

	 						showPerson(theDoer);

	 					}

					}

			}

	}

	browseDoers();
	eachPerson();

});

// End Home Page Code

// Start Add Chore Page Code


$('#addChore').on('pageinit', function(){

		var formData = $('#choreForm'),
			formErrors = $("#choreErrorLink");

		    formData.validate({
			invalidHandler: function(form, validator) {
				formErrors.click();
				var html = "To err is human, to fill in complete data divine.<p>";
				for (var key in validator.submitted) {
					var label = $("label[for^='"+ key +"']").not("[generated]");
					var legend = label.closest("fieldset").find("ui-controlgroup-label");
					var fieldName = legend.length ? legend.text() : label.text();
					html += "<li>" + fieldName +"</li>";
				};
				$("#addChoreErrors ul").html(html);
			},
			submitHandler: function() {
				var data = formData.serializeArray();
				storeData(data);

			}
		});






var choreDoer = ["Mom", "Papa", "Daughter A", "Daughter B", "Anyone"],
	dateOptions = ["Today", "Tomorrow", "Future"];

/* Create and populate chore doers */
    function listDoers() {
        var selectEl = document.getElementById("choredoer");

        for (var i = 0, j = choreDoer.length; i < j; i++) {
            var makeOption = document.createElement("option"),
                optText = choreDoer[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            selectEl.appendChild(makeOption);
        }
    }

/* End create and populate chore doers */

   	var setDate = document.getElementById("datevalue");


/*
// Date function
    function chooseDate() {
	    document.getElementById("datevalue").removeAttribute("value");
        if (setDate.value === "Today") {
            var today = new Date(),
                todayMonth = (today.getMonth() + 1),
                todayDay = today.getDate(),
                todayYear = today.getFullYear(),
                todayDate = todayMonth + "/" + todayDay + "/" + todayYear;
                document.getElementById("dateselect").style.display = "none";
                document.getElementById("datevalue").setAttribute("value", todayDate);
                document.getElementById("future").setAttribute("placeholder", todayDate);
            return todayDate;
        } else if (setDate.value === "Tomorrow") {
            var tomorrow = new Date();
            tomorrow.setDate (tomorrow.getDate () + 1);
            var tomMonth = (tomorrow.getMonth() + 1),
                tomDay = tomorrow.getDate(),
                tomYear = tomorrow.getFullYear(),
                tomDate = tomMonth + "/" + tomDay + "/" + tomYear;
                document.getElementById("dateselect").style.display = "none";
                document.getElementById("datevalue").setAttribute("value", tomDate);
                document.getElementById("future").setAttribute("placeholder", tomDate);
            return tomDate;
        } else if (setDate.value === "Future") {
	            document.getElementById("dateselect").style.display = "block";
	            document.getElementById("future").addEventListener("change", function() {
	            document.getElementById("datevalue").setAttribute("value", document.getElementById("future").value);
	            document.getElementById("future").setAttribute("placeholder", "Select a Date");
	            });
        }

    }
*/

// End Date Function


listDoers();
//setDate.addEventListener("click", chooseDate);

});

// End Add Chore Page Code

// Start All Chores Newsstream Page

$('#allChores').on('pageinit', function(){


    // Autofill with JSON data - used with JQM
	function insertJSON() {
		// store info from JSON.js
		for (var n in json) {
			var id = Math.floor(Math.random()*1000000);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	// Adds Image - used with JQM

	function getImage(doerName, field, align, size) {
		var newImg = document.createElement("img"),
			setSrc = newImg.setAttribute("src", "images/" + doerName + ".png"),
			setSize = newImg.setAttribute("height", size);
		newImg.setAttribute("align", align);
		field.appendChild(newImg);

	}

	function sortByDate() {
		var sortArray = [];
		for (var a=0, b=localStorage.length; a<b; a++) {

			var key = localStorage.key(a),
				value = localStorage.getItem(key),
				item = JSON.parse(value);
			sortArray.push(item);

		}	// Closes localStorage For Loop

			sortArray.sort(function(c,d){
				if (c.date[1] < d.date[1]) {return -1;}
				if (c.date[1] > d.date[1]) {return 1;}
				return 0;
			});  // Closes Sort Loop

		return sortArray;
	}


	// Sorted Newsfeed
	function sortStorage() {

		if (localStorage.length >= 1) {

		var mainUL = document.getElementById("viewAll"),
			sortArray = sortByDate(),
		    mainDiv = document.createElement("div");
	        mainDiv.setAttribute("data-role", "listview");
	        mainDiv.setAttribute("data-inset", "false");


	 // Loops through Sorted Array

		for (var c = 0, d = sortArray.length; c < d; c++) {
			var	obj = sortArray[c],
			 	choreDiv = document.createElement("li");
//                choreDiv.setAttribute("data-role", "collapsible");


                // Itemizes specific data elements of chore
                    for (var f in obj) {
                    	var objValue; // added


                    // Creates li for each element of chore
                    	if (obj[f][0] === "Chore Name: ") {
	                    	var headerObj = document.createElement("h4");



	                    getImage(obj.who[1], choreDiv, "left", "80px");

	                    objValue = obj[f][1];
	                    headerObj.innerHTML = objValue;
	                    choreDiv.appendChild(headerObj);
                    	} else {
	                    	var newObj = document.createElement("p");
	                    	objValue = obj[f][0] + " " + obj[f][1];
	                    	newObj.innerHTML = objValue;
	                    	choreDiv.appendChild(newObj);
                    	}


                    } // Closes Each Item For Loop
            mainDiv.appendChild(choreDiv);

            } // Closes newItem For Loop

            mainUL.appendChild(mainDiv);


        } else {
            alert("There is no data in localStorage so default data was added.");
            insertJSON();
        }

        $(document.getElementById("viewAll")).listview('refresh');
	}


sortStorage();

	});

// End All Chores Newsstream Page

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){

};

var getData = function(){

};

var storeData = function(data){


// Begin Store Data Function
		var item = {};


		// Check for existing key and set one if needed
		var id;
		if ((data[0].name) != "key") {
			id = Math.floor(Math.random()*1000000);

		} else {
			id = key;
		}


		// Gather and store values as object with form label and value

			item.chore = ["Chore Name: ", data[0].value];
			item.who = ["Person Responsible: ", data[1].value];
			item.details = ["Further Details: ", data[2].value];
			item.date = ["Due Date: ", data[3].value];
			item.time = ["Time Required: ", data[4].value];
			item.done = ["Is it Done? ", data[5].value];


		// Save to localStorage
		localStorage.setItem(id, JSON.stringify(item));
		$("#saveSuccessLink").click();

/* 		$.mobile.changePage("#allChores"); */




// End Store Data Function

};

var	deleteItem = function (){

};

var clearLocal = function(){

    // Insistent confirmation of chore deletion
        var check = confirm("Are you sure you want to clear all chores?");
        if (check) {
            var again = confirm("Are you REALLY sure you want to clear all chores?");
            if (again) {
                var certain = confirm("Mom knows if you're deleting them without finishing.  You know this, right?");
                if (certain) {
                    localStorage.clear();
                    window.location.reload();

    // Responses to not chosing to delete
                } else {
                    alert("Smart move.");
                }
            } else {
                alert("I thought so.");
            }
        } else {
            alert("Good job!");
        }
    };


document.getElementById("resetAll").addEventListener("click", clearLocal);
