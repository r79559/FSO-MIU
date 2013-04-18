//
// Author: Susan R. Miller
// Course: MiU1304
// Week 2
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

     var choreDoer = ["Select a Person", "Mom", "Papa", "Daughter A", "Daughter B", "Anyone"];


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

// Autofill with JSON data
	function insertJSON() {
		// store info from JSON.js
		for (var n in json) {
			var id = Math.floor(Math.random()*1000000);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

// Shows chores for specific person
    function showPerson() {
	    var theDoer = gE("choredoer").value;

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
            // Gets data fro localStorage back into an object
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var item = JSON.parse(value);


            if (item.who[1] === theDoer) {


            // Creates li for each individual chore
                var olBullet = document.createElement("li");
                olBullet.setAttribute("class", "item");
                olList.appendChild(olBullet);


            // Creates new ul so each element of chore will be on own line

                var itemize = document.createElement("ul");
                olBullet.appendChild(itemize);



            // Creates li for edit and delete links for each item
                var itemLinks = document.createElement("li");


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

        }
    }



/* Create and populate browse chore doers */
    function browseDoers() {
        var doerDiv = gE("browsePeople");
        for (var i = 1, j = choreDoer.length; i < j; i++) {
            var makeItem = document.createElement("li"),
            	makeLink = document.createElement("a"),
                itemText = choreDoer[i]
                linkableName = itemText.replace(" ", "_");
			makeItem.setAttribute("value", itemText);
            makeLink.href = "#" + linkableName;
            makeLink.innerHTML = itemText;
            makeItem.appendChild(makeLink);
            doerDiv.appendChild(makeItem);
        }

        $(gE("browsePeople")).listview('refresh');

    }



	if (document.URL.indexOf("index") > 1) {
	browseDoers();

	}





}); /*Closes DOM load check function */