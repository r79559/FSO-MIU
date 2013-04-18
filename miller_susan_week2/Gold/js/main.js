//
// Author: Susan R. Miller
// Course: MiU1304
// Week 1
//
// NOTE:  Date populates in FireFox on Edit Chore.  Date does NOT populate in Chrome on Edit Chore.
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