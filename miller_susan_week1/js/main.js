//
// Author: Susan R. Miller
// Course: VFW 1303
// Week 4
//
// NOTE:  Date populates in FireFox on Edit Chore.  Date does NOT populate in Chrome on Edit Chore.
//
//

// DOM load check
window.addEventListener("DOMContentLoaded", function () {

// getElementById Function
    function id(x){
        var theElement = document.getElementById(x);
        return theElement;
    }

    // shortcut variables
    var addChore = id("addNew"),
        addChoreTop = id("addNewTop"),
        showChores = id("showAll"),
        showChoresTop = id("showAllTop"),
        resetChores = id("resetAll"),
        resetChoresTop = id("resetAllTop"),
        errorMsg = id("errors"),
        choreDoer = ["Select a Person", "Mom", "Papa", "Daughter"],
        dateOptions = ["Select a Due Date", "Today", "Tomorrow", "Future"],
        doneValue;

/* Create and populate chore types */
    function listDoers() {
        var selectLi = id("person"),
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

    listDoers(); // Makes the drop-down happen.
/* End create and populate chore types */

/* Create and populate date options */
    function listDates() {
        var selectLi = id("date"),
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

    listDates(); // Makes the drop-down happen.
/* End create and populate date options */




// Date function
    function chooseDate() {
	    id("datevalue").removeAttribute("value");
        if (setDate.value === "Today") {
            var today = new Date(),
                todayMonth = (today.getMonth() + 1),
                todayDay = today.getDate(),
                todayYear = today.getFullYear(),
                todayDate = todayMonth + "/" + todayDay + "/" + todayYear;
                id("dateselect").style.display = "none";
                id("datevalue").setAttribute("value", todayDate);
            return todayDate;
        } else if (setDate.value === "Tomorrow") {
            var tomorrow = new Date();
            tomorrow.setDate (tomorrow.getDate () + 1);
            var tomMonth = (tomorrow.getMonth() + 1),
                tomDay = tomorrow.getDate(),
                tomYear = tomorrow.getFullYear(),
                tomDate = tomMonth + "/" + tomDay + "/" + tomYear;
                id("dateselect").style.display = "none";
                id("datevalue").setAttribute("value", tomDate);
            return tomDate;
        } else if (setDate.value === "Future") {
	            id("dateselect").style.display = "block";
	            id("future").addEventListener("change", function() {
	            	id("datevalue").setAttribute("value", id("future").value);
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
                id("choreform").style.display = "none";
                addChoreTop.style.display = "inline";
                showChoresTop.style.display = "none";
                resetChoresTop.style.display = "inline";
                id("buttonRowBottom").style.display = "none";
                break;
            case "off":
                id("choreform").style.display = "block";
                addChoreTop.style.display = "none";
                showChoresTop.style.display = "inline";
                resetChoresTop.style.display = "inline";
                id("buttonRowBottom").style.display = "block";
                id("data").style.display = "none";
                break;
            default:
                return false;
        }
    }

// Validate
    function validate(e) {
        var getDoer = id("choredoer"),
            getName = id("chorename"),
            getDate = id("duedate");


        //Error Message Reset
	        errorMsg.innerHTML = "";

	        getDoer.style.border = "1px solid black";
	        getName.style.border = "1px solid black";
	        getDate.style.border = "1px solid black";
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
        if(getDate.value === "Select a Due Date") {
            var pickDate = "Please select a due date.";
            msgs.push(pickDate);
        } else if((getDate.value === "Future") && !(id("datevalue").hasAttribute("value"))) {
        	var dateError = "Please select a valid date.";
            id("future").style.border = "1px solid red";
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

// Assures proper order of date
	function dateCheck() {
		var rawDate = id("datevalue").getAttribute("value");
		if (rawDate.charAt(4) === "-") {
			var brokenDate = rawDate.split("-");
			if (brokenDate[1].length<2) {brokenDate[1] = "0" + brokenDate[1]};
			if (brokenDate[2].length<2) {brokenDate[2] = "0" + brokenDate[2]};
			var reordered = brokenDate[1] + "/" + brokenDate[2] + "/" + brokenDate[0];
			id("datevalue").setAttribute("value", reordered);
		}
	}

	function dateCalVal(storedDate) {
		var brokenCalVal = storedDate.split("/"),
		    reorderedCalVal = brokenCalVal[2] + "-" + brokenCalVal[0] + "-" + brokenCalVal[1];
		    id("datevalue").setAttribute("value", reorderedCalVal);
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
            item.chore = ["Chore Name: ", id("chorename").value];
            item.who = ["Person Responsible: ", id("choredoer").value];
            item.date = ["Date Due: ", id("datevalue").getAttribute("value")];
            item.effort = ["Level of Difficulty: ", id("difficulty").value];
            item.done = ["Is it Done? ", doneValue];

        // Save to localStorage
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your chore has been saved!");
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
            id("data").style.display = "block";

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

                getImage(item.who[1], itemize);

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

// Adds Image

	function getImage(doerName, itemize) {
		var imgLi = document.createElement("li");
		itemize.appendChild(imgLi);
		var newImg = document.createElement("img"),
			setSrc = newImg.setAttribute("src", "images/" + doerName + ".png");
		imgLi.appendChild(newImg);

	}

// Autofill with JSON data
	function insertJSON() {
		// store info from JSON.js
		for (var n in json) {
			var id = Math.floor(Math.random()*1000000);
			localStorage.setItem(id, JSON.stringify(json[n]));
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

// Edit chore
    function editChore() {

    // Get Data from localStorage
        var value = localStorage.getItem(this.key);
            item = JSON.parse(value),
            storedDate = item.date[1],
            calVal = dateCalVal(storedDate);
    // Show form and not chore list
        toggleControls("off");
    // Shows dateSelect element
        id("dateselect").style.display = "block";
    // Populate for with existing data
        id("chorename").value = item.chore[1];
        id("choredoer").value = item.who[1];
        id("future").setAttribute("value", id("datevalue").getAttribute("value"));
        id("difficulty").value = item.effort[1];

    // Loop required to determine which (if any) radios were checked
        var radios = document.forms[0].done;
        for (var i = 0; i<radios.length; i++) {
            if (radios[i].value === "no" && item.done[1] === "no") {
                radios[i].setAttribute("checked", "checked");
            } else if (radios[i].value === "yes" && item.done[1] === "yes") {
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
        radioCheck();

    // Assures chore has been done and confirms deletion
        if (doneValue === "Yessiree!") {
            var ask = confirm("Looks like you're done!  Ready to delete this chore?");
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
    // Doesn't allow deletion if chore not marked as completed
        } else {
            alert("Oops!  Looks like you're not done with this chore yet!\nYou can't delete it quite yet.");
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
    addChore.addEventListener("click", validate);
    showChores.addEventListener("click", showAll);
    resetChores.addEventListener("click", empty);
    showChoresTop.addEventListener("click", showAll);
    resetChoresTop.addEventListener("click", empty);
    var setDate = id("duedate");
    setDate.addEventListener("change", chooseDate);

}); /* Closes DOM load check function */