//
// Author: Susan R. Miller
// Course: MiU1304
// Week 3
//
//
//

// DOM load check
window.addEventListener("DOMContentLoaded", function () {

// getElementById Function
    function gE(x){
        var theElement = document.getElementById(x);
        return theElement;
    }

    // shortcut variables
    var addChore = gE("addNew"),
        addChoreTop = gE("addNewTop"),
        showChores = gE("showAll"),
        showChoresTop = gE("showAllTop"),
        resetChores = gE("resetAll"),
        resetChoresTop = gE("resetAllTop"),
        errorMsg = gE("errors"),
        choreDoer = ["Select a Person", "Mom", "Papa", "Daughter A", "Daughter B", "Anyone"],
        dateOptions = ["Select a Due Date", "Today", "Tomorrow", "Future"],
        showDoer = gE("browsedoers"),
        doneValue;

/* Create and populate browse chore doers */
/*
    function browseDoers() {
        var doerDiv = gE("browsePeople");
        for (var i = 1, j = choreDoer.length; i < j; i++) {
            var makeItem = document.createElement("div"),
            	makeLink = document.createElement("a"),
                itemText = choreDoer[i],
                linkableName = itemText.replace(" ", "_");
              if ((i == 1) || (i == 4)) {
	              makeItem.setAttribute("class", "ui-block-a");
              }  else if ((i == 2) || (i == 5)) {
	              makeItem.setAttribute("class", "ui-block-b");
              }  else if ((i == 3) || (i == 6)) {
	              makeItem.setAttribute("class", "ui-block-c");
              }

			makeItem.setAttribute("value", itemText);
            makeLink.href = "#" + linkableName + "List";
            getImage(choreDoer[i], makeItem, "center");
            makeLink.innerHTML = itemText;
            makeItem.appendChild(makeLink);
            doerDiv.appendChild(makeItem);
        }

        $(gE("browsePeople")).listview('refresh'); // No way to refresh dynamically created thumbnail grid? Boo!

    }
*/

	if (document.URL.indexOf("index") > 1) {
		eachPerson();
		allChores();
	}



/* End create and populate browse chore doers */

/* Create and populate chore doers */
    function listDoers() {
        var selectLi = gE("person"),
            makeSelect = document.createElement("select");
        makeSelect.setAttribute("id", "choredoer");
        for (var i = 0, j = choreDoer.length; i < j; i++) {
            var makeOption = document.createElement("option"),
                optText = choreDoer[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }

/* End create and populate chore doers */

/* Create and populate date options */
    function listDates() {
        var selectLi = gE("date"),
            makeSelect = document.createElement("select");
        makeSelect.setAttribute("id", "duedate");
        for (var i = 0, j = dateOptions.length; i < j; i++) {
            var makeOption = document.createElement("option"),
                optText = dateOptions[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }


if (document.URL.indexOf("additem") > 1) {
    listDoers(); // Makes the drop-down happen.
    listDates(); // Makes the drop-down happen.
    }

/* End create and populate date options */


   	var setDate = gE("duedate");


// Date function
    function chooseDate() {
	    gE("datevalue").removeAttribute("value");
        if (setDate.value === "Today") {
            var today = new Date(),
                todayMonth = (today.getMonth() + 1),
                todayDay = today.getDate(),
                todayYear = today.getFullYear(),
                todayDate = todayMonth + "/" + todayDay + "/" + todayYear;
                gE("dateselect").style.display = "none";
                gE("datevalue").setAttribute("value", todayDate);
            return todayDate;
        } else if (setDate.value === "Tomorrow") {
            var tomorrow = new Date();
            tomorrow.setDate (tomorrow.getDate () + 1);
            var tomMonth = (tomorrow.getMonth() + 1),
                tomDay = tomorrow.getDate(),
                tomYear = tomorrow.getFullYear(),
                tomDate = tomMonth + "/" + tomDay + "/" + tomYear;
                gE("dateselect").style.display = "none";
                gE("datevalue").setAttribute("value", tomDate);
            return tomDate;
        } else if (setDate.value === "Future") {
	            gE("dateselect").style.display = "block";
	            gE("future").addEventListener("change", function() {
	            	gE("datevalue").setAttribute("value", gE("future").value);
	            });
        }

    }



// Sets up function to check for value of selected radio buttons.
    function radioCheck(){
        var radios = document.forms[0].done;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked){
                doneValue = radios[i].value;
            }
        }
    }

// Toggles what shows when
    function toggleControls(n){
        switch(n){
            case "on":
                gE("choreform").style.display = "none";
                addChoreTop.style.display = "inline";
                showChoresTop.style.display = "none";
                resetChoresTop.style.display = "inline";
                gE("buttonRowBottom").style.display = "none";
                break;
            case "off":
                gE("choreform").style.display = "block";
                addChoreTop.style.display = "none";
                showChoresTop.style.display = "inline";
                resetChoresTop.style.display = "inline";
                gE("buttonRowBottom").style.display = "block";
                gE("data").style.display = "none";
                break;
            default:
                return false;
        }
    }


// Assures proper order of date
	function dateCheck() {
		var rawDate = gE("datevalue").getAttribute("value");
		if (rawDate.charAt(4) === "-") {
			var brokenDate = rawDate.split("-");
			if (brokenDate[1].length<2) {brokenDate[1] = "0" + brokenDate[1];};
			if (brokenDate[2].length<2) {brokenDate[2] = "0" + brokenDate[2];};
			var reordered = brokenDate[1] + "/" + brokenDate[2] + "/" + brokenDate[0];
			gE("datevalue").setAttribute("value", reordered);
		}
	}

// Saves chore
    function saveChore(key) {
        // Check for existing key, set one if needed
        var id;
        if(!key){
            id = Math.floor(Math.random()*1000000);
        } else {
            id = key;
        }
        // Gather and store values as object with form label and value
        radioCheck();
        dateCheck();
        var item = {};
            item.chore = ["Chore Name: ", gE("chorename").value];
            item.who = ["Person Responsible: ", gE("choredoer").value];
            item.when = ["When Due: ", gE("duedate").value];
            item.date = ["Date Due: ", gE("datevalue").getAttribute("value")];
            item.effort = ["Level of Difficulty: ", gE("difficulty").value];
            item.done = ["Is it Done? ", doneValue];

        // Save to localStorage
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your chore has been saved!");
        window.location.reload();

        }

// Validate
    function validate(e) {
        var getDoer = gE("choredoer"),
            getName = gE("chorename"),
            getTheDate = gE("duedate");


        //Error Message Reset
	        errorMsg.innerHTML = "";

	        getDoer.style.border = "1px solid black";
	        getName.style.border = "1px solid black";
//	        getDate.style.border = "1px solid black";
        //Error Messages
        var msgs = [];

        //Chore Doer Validation
        if(getDoer.value === "Select a Person"){
            var doerError = "Please select a person.";
            getDoer.style.border = "1px solid red";
            msgs.push(doerError);
        }

        //Chore Name Validation
        if(getName.value === ""){
            var nameError = "Please enter a chore name.";
            getName.style.border = "1px solid red";
            msgs.push(nameError);
        }


        //Due Date Validation mm/dd/yyyy
        if(getTheDate.value === "Select a Due Date") {
            var pickDate = "Please select a due date.";
            getTheDate.style.border = "1px solid red";
            msgs.push(pickDate);
        } else if((getTheDate.value === "Future") && !(gE("datevalue").hasAttribute("value"))) {
        	var dateError = "Please select a valid date.";
            gE("future").style.border = "1px solid red";
            msgs.push(dateError);
        }
/* Could add date validation here to handle Firefox's issues with the Date field requiring manual entry.   */


        // Display errors if present
        if (msgs.length >= 1){
            for (var i = 0, j = msgs.length; i<j; i++) {
                var text = document.createElement("li");
                text.innerHTML = msgs[i];
                errorMsg.appendChild(text);
            }
            e.preventDefault();
            return false;
        //Save Chore if all is well.  Send key value through.
        } else {
            saveChore(this.key);
        }
    }


// Assures consistent ordering of calendar values

	function dateCalVal(storedDate) {
		var brokenCalVal = storedDate.split("/"),
		    reorderedCalVal = brokenCalVal[2] + "-" + brokenCalVal[0] + "-" + brokenCalVal[1];
		    gE("datevalue").setAttribute("value", reorderedCalVal);
	}


// Adds Image

	function getImage(doerName, field, align, size) {
		var newImg = document.createElement("img"),
			setSrc = newImg.setAttribute("src", "images/" + doerName + ".png")
			setSize = newImg.setAttribute("height", size);
		newImg.setAttribute("align", align);
		field.appendChild(newImg);

	}

// Edit chore
    function editChore() {

    // Get Data from localStorage
        var value = localStorage.getItem(this.key),
            item = JSON.parse(value),
            storedDate = item.date[1],
            calVal = dateCalVal(storedDate);
    // Show form and not chore list
        toggleControls("off");
    // Shows dateSelect element
        gE("dateselect").style.display = "block";
    // Populate for with existing data
        gE("chorename").value = item.chore[1];
        gE("choredoer").value = item.who[1];
		gE("duedate").value = item.when[1];
        gE("future").value = item.date[1];
        gE("difficulty").value = item.effort[1];

    // Loop required to determine which (if any) radios were checked
        var radios = document.forms[0].done;
        for (var i = 0; i<radios.length; i++) {
            if (radios[i].value === "Not Yet" && item.done[1] === "Not Yet") {
                radios[i].setAttribute("checked", "checked");
            } else if (radios[i].value === "Yessiree!" && item.done[1] === "Yessiree!") {
                radios[i].setAttribute("checked", "checked");
            }
        }
    // Switches content and function of Add Chore button
        addChore.removeEventListener("click", saveChore);
        addChore.innerHTML = "Save Changes";
        var editSubmit = addChore;

    // Sends through validation
        editSubmit.addEventListener("click", validate);

    // Assures key gets passed through
        editSubmit.key = this.key;



    }

// Delete specific chore
    function deleteChore() {

    // Checks which radio button is selected
            var ask = confirm("Ready to delete this chore?");
            if(ask){
                localStorage.removeItem(this.key);
                window.location.reload();
            } else {
                var assure = confirm("If you're really done, you can delete it.");
                if(assure){
                    localStorage.removeItem(this.key);
                    window.location.reload();
                } else {
                    alert("That's okay.  Let me know when you're ready to delete it.");
                }
            }
    }

// Dynamically creates item links to edit and delete
    function makeItemLinks(key, itemLinks) {

    // Make Edit Chore Link
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.className = "small";
        editLink.key = key;
        var editText = "Edit This Chore";
        editLink.addEventListener("click", editChore);
        editLink.innerHTML = editText;
        itemLinks.appendChild(editLink);

    // Make Delete Chore Link
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.className = "small";
        deleteLink.key = key;
        var deleteText = "Delete This Chore";
        deleteLink.addEventListener("click", deleteChore);
        deleteLink.innerHTML = deleteText;
        itemLinks.appendChild(deleteLink);
    }

// Autofill with JSON data
	function insertJSON() {
		// store info from JSON.js
		for (var n in json) {
			var id = Math.floor(Math.random()*1000000);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

// Shows all chores
    function showAll() {
        if (localStorage.length >= 1) {
        // Replaces form with chores
            toggleControls("on");

        // Creates newContainer div id = data and appends to document
            var newContainer = document.createElement("div");
            newContainer.setAttribute("id", "data");
            document.body.appendChild(newContainer);

        // Creates ordered list and appends to newContainer
            var olList = document.createElement("ol");
            newContainer.appendChild(olList);

        // Assures the data id where chores are displayed is toggled on
            gE("data").style.display = "block";

        // Steps through each store in localStorage
            for (var i=0, j=localStorage.length; i<j; i++) {

            // Creates li for each individual chore
                var olBullet = document.createElement("li");
                olBullet.setAttribute("class", "item");
                olList.appendChild(olBullet);

            // Gets data fro localStorage back into an object
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var item = JSON.parse(value);

            // Creates new ul so each element of chore will be on own line
                var itemize = document.createElement("ul");
                olBullet.appendChild(itemize);

            // Creates li for edit and delete links for each item
                var itemLinks = document.createElement("li");

                getImage(item.who[1], itemize, "left", "80px");

                // Itemizes specific data elements of chore
                    for (var m in item) {

                    // Creates li for each element of chore
                        var newItem = document.createElement("li");
                        itemize.appendChild(newItem);

                    // Reads and fills in li with data, then appends to ul
                        var itemValue = item[m][0] + " " + item[m][1];
                        newItem.innerHTML = itemValue;
                        itemize.appendChild(itemLinks);
                    }

            // Adds edit and delete items to end of individual chore
                makeItemLinks(key, itemLinks);
            }

    // Returns alert if localStorage is empty
        } else {
            alert("There is no data in localStorage so default data was added.");
            insertJSON();
        }
    }

// Shows all chores
    function allChores() {
        if (localStorage.length >= 1) {

        // Pins down where to add the list
            var mainUL = gE("viewAll");

        // Steps through each store in localStorage
            for (var i=0, j=localStorage.length; i<j; i++) {

            // Creates li for each individual chore
                var olBullet = document.createElement("li");
                olBullet.setAttribute("class", "item");
//                newUL.appendChild(olBullet);

            // Gets data from localStorage back into an object
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var item = JSON.parse(value);

            // Creates li for edit and delete links for each item
                var itemLinks = document.createElement("li");


                getImage(item.who[1], olBullet, "left");

                // Itemizes specific data elements of chore
                    for (var m in item) {

                    // Creates li for each element of chore
                        var newItem = document.createElement("p"),
                            itemValue = item[m][0] + " " + item[m][1];
                        newItem.innerHTML = itemValue;
                        olBullet.appendChild(newItem);
                    }

                    mainUL.appendChild(olBullet);

            }


    // Returns alert if localStorage is empty
        } else {
            alert("There is no data in localStorage so default data was added.");
            insertJSON();
        }
    }



// Shows chores for specific person
    function showPerson(theDoer) {

        // Creates ordered list and appends to newContainer
            var mainUL = document.getElementById(theDoer);

        // Steps through each store in localStorage
            for (var i=0, j=localStorage.length; i<j; i++) {
            // Gets data fro localStorage back into an object
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var item = JSON.parse(value);


            if ((item.who[1] === theDoer) && (item.done[1] === "Not Yet")) {

            // Creates li for each individual chore
                var olBullet = document.createElement("li");

                // Itemizes specific data elements of chore
                    for (var m in item) {

                    // Creates li for each element of chore
                        var newItem = document.createElement("p");  // changed li to br
						var itemValue = item[m][0] + " " + item[m][1];
						newItem.innerHTML = itemValue;
                        olBullet.appendChild(newItem);

                    }
                mainUL.appendChild(olBullet);

            }
        }


    }



// Shows chores for specific person
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







// Delete all chores - empty local.storage
    function empty() {

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
    }




// Listeners

if (document.URL.indexOf("additem") > 1) {
    addChore.addEventListener("click", validate);
    resetChores.addEventListener("click", empty);
    showChoresTop.addEventListener("click", showAll);
    resetChoresTop.addEventListener("click", empty);

    setDate.addEventListener("change", chooseDate);
}

if (document.URL.indexOf("index") > 1 ) {
	// var showDoer = gE("choredoer");
//    showDoer.addEventListener("click", showPerson);
}

}); /* Closes DOM load check function */