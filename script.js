// ==UserScript==
// @name         TweetDeck Column Sizer
// @version      1.0
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description  Change Tweetdeck column sizes
// @author       MattNer0
// @match        https://tweetdeck.twitter.com/
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==

function waitForKeyElements (
    selectorTxt,
    actionFunction,
    bWaitOnce,
    iframeSelector
) {
    var targetNodes, btargetsFound;
 
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);
 
    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;
 
            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }
 
    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];
 
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}

waitForKeyElements (
            "div.js-app-content"
            , createWidthSelectors
        );

var only_once = true;
function createWidthSelectors(){
    if (!only_once) return;
  
  	only_once = false;
    var columns = $(".js-column");
    for (var i = 0; i < columns.length; i++) { $(columns[i]).addClass("column_" + i) };
  
  	(async () => {
  
      try {
        var c0 = await GM.getValue("column_0");
        var c1 = await GM.getValue("column_1");
        var c2 = await GM.getValue("column_2");
        var c3 = await GM.getValue("column_3");
        var c4 = await GM.getValue("column_4");
        var c5 = await GM.getValue("column_5");
        var c6 = await GM.getValue("column_6");
        var c7 = await GM.getValue("column_7");

        if (c0 != undefined) { $(".column_0").css("width", c0); };
        if (c1 != undefined) { $(".column_1").css("width", c1); };
        if (c2 != undefined) { $(".column_2").css("width", c2); };
        if (c3 != undefined) { $(".column_3").css("width", c3); };
        if (c4 != undefined) { $(".column_4").css("width", c4); };
        if (c5 != undefined) { $(".column_5").css("width", c5); };
        if (c6 != undefined) { $(".column_6").css("width", c6); };
        if (c7 != undefined) { $(".column_7").css("width", c7); };
      } catch(e) {
        console.error(e.message);
      }
    })();
       
    $(".js-column-options").on('DOMNodeInserted', function(e) { 
      try {
        if ($(e.target).is('.facet-type-preferences')) {

          var options = $(".js-column-options");
          for (var i = 0; i < options.length; i++) { 
            if ($(".column_" + i + " .js-column-size").length == 0) {
              $(options[i]).find("fieldset:eq(0)").after('<fieldset class="js-column-size"><div class="facet-type facet-type-thumb-size"> <div class="accordion-header not-actionable link-clean block cf txt-base-medium"> <div class="obj-left facet-title"> <span class="txt-base-smallest">Width</span> </div> <div class="facet-subtitle nbfc"><input id="widthRange_' + i + '" type="range" min="250" max="750" style="width: 150px; height: 10px"></div> </div> </div></fieldset>'); 
            }
          }

          $("#widthRange_0").val($(".column_0").width());
          $("#widthRange_1").val($(".column_1").width());
          $("#widthRange_2").val($(".column_2").width());
          $("#widthRange_3").val($(".column_3").width());
          $("#widthRange_4").val($(".column_4").width());
          $("#widthRange_5").val($(".column_5").width());
          $("#widthRange_6").val($(".column_6").width());
          $("#widthRange_7").val($(".column_7").width());

          $("#widthRange_0").change(function() { $(".column_0").css("width", $(this).val() ); GM.setValue("column_0", $(this).val()) } );
          $("#widthRange_1").change(function() { $(".column_1").css("width", $(this).val() ); GM.setValue("column_1", $(this).val()) } );
          $("#widthRange_2").change(function() { $(".column_2").css("width", $(this).val() ); GM.setValue("column_2", $(this).val()) } );
          $("#widthRange_3").change(function() { $(".column_3").css("width", $(this).val() ); GM.setValue("column_3", $(this).val()) } );
          $("#widthRange_4").change(function() { $(".column_4").css("width", $(this).val() ); GM.setValue("column_4", $(this).val()) } );
          $("#widthRange_5").change(function() { $(".column_5").css("width", $(this).val() ); GM.setValue("column_5", $(this).val()) } );
          $("#widthRange_6").change(function() { $(".column_6").css("width", $(this).val() ); GM.setValue("column_6", $(this).val()) } );
          $("#widthRange_7").change(function() { $(".column_7").css("width", $(this).val() ); GM.setValue("column_7", $(this).val()) } );
        } 
      } catch(e) {
      	console.error(e.message);
    	}
    });
};
