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



/*
		var myForm = $('#choreForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});

*/

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

/* Create and populate date options */
    function listDates() {
        var selectEl = document.getElementById("date");

        for (var i = 0, j = dateOptions.length; i < j; i++) {
            var makeOption = document.createElement("option"),
                optText = dateOptions[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            selectEl.appendChild(makeOption);

        }
    }

/* End create and populate date options */

   	var setDate = document.getElementById("duedate");


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
            return tomDate;
        } else if (setDate.value === "Future") {
	            document.getElementById("dateselect").style.display = "block";
	            document.getElementById("future").addEventListener("change", function() {
	            	document.getElementById("datevalue").setAttribute("value", document.getElementById("future").value);
	            });
        }

    }

// End Date Function

listDoers();
listDates();


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

};

var	deleteItem = function (){

};

var clearLocal = function(){

};


