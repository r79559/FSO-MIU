//
// Author: Susan R. Miller
// Course: MiU1304
// Week 3
//
//
//


// Home Page Code Start

// getElementById Function
    function gE(x){
        var theElement = document.getElementById(x);
        return theElement;
    }

$('#home').on('pageinit', function(){

var choreDoer = ["Mom", "Papa", "Daughter A", "Daughter B", "Anyone"];

// Create and populate browse chore doers - used with JQM
    function browseDoers() {
        var doerDiv = gE("browsePeople");
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

        $(gE("browsePeople")).listview('refresh');

    }

// Adds Image - used with JQM

	function getImage(doerName, field, align, size) {
		var newImg = document.createElement("img"),
			setSrc = newImg.setAttribute("src", "images/" + doerName + ".png")
			setSize = newImg.setAttribute("height", size);
		newImg.setAttribute("align", align);
		field.appendChild(newImg);

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
                choreDiv.setAttribute("data-role", "collapsible")


                // Itemizes specific data elements of chore
                    for (var m in item) {

                    // Creates li for each element of chore
                          // changed li to br

                        if (item[m][0] === "Chore Name: ") {
	                        var itemValue = item[m][1],
	                        	headerItem = document.createElement("h4");
	                        headerItem.innerHTML = itemValue;
	                        choreDiv.appendChild(headerItem);
                        } else {
                        var newItem = document.createElement("p"),
						 	itemValue = item[m][0] + " " + item[m][1];
						newItem.innerHTML = itemValue;
                        choreDiv.appendChild(newItem);
                        }

                    }
                mainDiv.appendChild(choreDiv);
            }

            mainUL.appendChild(mainDiv);

        }

        $(gE("theDoer")).listview('refresh');

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

$('#addItem').on('pageinit', function(){

/*
// getElementById Function
    function gE(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
*/


		var myForm = $('#choreForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});

	//any other code needed for addItem page goes here

});

// End Add Chore Page Code

// Start All Chores Newsstream Page

$('#allChores').on('pageinit', function(){

/*
// getElementById Function
    function gE(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
*/

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
			setSrc = newImg.setAttribute("src", "images/" + doerName + ".png")
			setSize = newImg.setAttribute("height", size);
		newImg.setAttribute("align", align);
		field.appendChild(newImg);

	}


	// Sorted Newsfeed
	function sortStorage() {

		if (localStorage.length >= 1) {

		var mainUL = gE("viewAll");
		var sortArray = [];
		for (var a=0, b=localStorage.length; a<b; a++) {
/*
			var olBullet = document.createElement("li");
			olBullet.setAttribute("class", "item");
*/

			var key = localStorage.key(a);
			var value = localStorage.getItem(key);
			var item = JSON.parse(value);
			sortArray.push(item);

		}	// Closes localStorage For Loop

			sortArray.sort(function(c,d){
				if (c.date[1] < d.date[1]) return -1;
				if (c.date[1] > d.date[1]) return 1;
				return 0;
			})  // Closes Sort Loop
console.log(sortArray);
		// SORTED!  Now to get it back out!

		for (c = 0, d = sortArray.length; c < d; c++) {

		// Creates li for each individual chore
	        var olBullet = document.createElement("li");
	        olBullet.setAttribute("class", "item");

			var obj = sortArray[c];

		    getImage(obj.who[1], olBullet, "left", "80px");

                // Itemizes specific data elements of chore
                    for (var f in obj) {

                    // Creates li for each element of chore
                        var newItem = document.createElement("p"),
                            itemValue = obj[f][0] + " " + obj[f][1];
                        newItem.innerHTML = itemValue;
                        olBullet.appendChild(newItem);
                    } // Closes Each Item For Loop

	                    mainUL.appendChild(olBullet);

            } // Closes newItem For Loop
        } else {
            alert("There is no data in localStorage so default data was added.");
            insertJSON();
        }
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


