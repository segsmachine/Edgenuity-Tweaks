// ==UserScript==
// @name         Edgentweaks
// @namespace    https://github.com/segsmachine/Edgenuity-Scripts/
// @version      1.6
// @author       GW, segsmachine
// @description  Adds tweaks to edgenuity
// @source       https://github.com/segsmachine/Edgenuity-Scripts/blob/main/edgentweaks.user.js
// @updateURL    https://github.com/segsmachine/Edgenuity-Scripts/raw/main/edgentweaks.user.js
// @supportURL   https://github.com/segsmachine/Edgenuity-Scripts/issues
// @match        *://*.core.learn.edgenuity.com/*
// @grant        none
// @require      https://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// ==/UserScript==

/* CHANGELOG
        Autoadvance/Autosubmit Fixed
        Modified Hotkeys
                Removed hotkey for "Next" (Ctrl+Shift+P)
                        Reason: Rendered useless by autoadvance
                Removed hotkey for "Previous" (Ctrl+Shift+O)
                        Reason: Rendered useless by autoadvance
                Added hotkey for "Submit" (Ctrl+Enter)
                        Reason: Allows for quick submission of answers during assignments
        Cleaned Code Formatting
        Added Documentation
*/


var $, jQuery;
$ = jQuery = window.jQuery;

setTimeout( //2 sec delay to load before trying to run
        function main() {
                console.log("HelloWorldEdgenTweaks")

                function init() {

                        window.openedWindows = [];
                        window.configElements = []; //Config infomation
                        try {
                                $(".mainfoot")[0].append(null);
                        } //stupid hack to prevent it building twice
                        catch {
                                console.log('%cIGNORE THE ERROR BELOW ME!', 'color: green; font-weight: bold;');
                                $(".mainfoot")[0].append(null);

                        }

                        //Internal Functions
                        function buildMenuButton(text, id, event, overrideid) { //puts buttons in the menu
                                var x, y;
                                y = document.createElement("li")
                                y.id = id
                                y.append(x = document.createElement("button"))
                                x.style = "display:block; padding: 0; border: 2px; background: none; height:45px; width:54px; background-color: rgb(51, 51, 51); color: rgb(12, 190, 240); opacity: 1;"
                                x.innerText = text
                                x.addEventListener("click", event);
                                if (!overrideid) {
                                        $(".toolbar")[0].append(y);
                                } else $("#" + overrideid)
                                        .append(y);
                        }

                        function RenderPane(name, id, width, height, transform) { //renders panes
                                window.pane = document.createElement("div")
                                window.pane.style = "padding:5px; z-index:1; overflow:auto; visibility: hidden; position: fixed; border: 1px solid rgb(95, 95, 95); background-color: rgb(39, 39, 39); color: rgb(12, 190, 240); text-align: center; top:50%;left:50%; transform: translate(-50%, -50%)"
                                window.pane.style.width = width
                                window.pane.style.height = "auto"
                                window.pane.style.maxHeight = height;
                                window.pane.id = id;
                                window.pane.classList.add("tweakpane")
                                x = document.createElement("header")
                                x.style = ""
                                var button = document.createElement("img");
                                button.src = "https://cdn.pixabay.com/photo/2012/04/12/20/12/x-30465_1280.png";
                                button.style = "filter: sepia(1);;position:sticky;opacity:60%;text-align:left;left:0;top:0;height:15px;width:15px";
                                button.align = "left"
                                button.onclick = function () {
                                        $("#" + id)
                                                .css("visibility", "hidden") //find my pane and close
                                        $("#" + id + "~ div[id]")
                                                .css("visibility", "hidden")
                                }; //find panes after me and close
                                x.appendChild(button);
                                var z = document.createElement("label")
                                z.style = " float: right;"
                                z.innerText = "info"
                                var y = document.createElement("input")
                                y.type = "checkbox";
                                y.checked = "true";
                                y.style = "margin: 3px; float: right";
                                y.addEventListener("click", function () {
                                        $("#" + id + " p")
                                                .fadeToggle()
                                        // $("#" +id).css("height", "auto")
                                })
                                x.appendChild(y)
                                x.appendChild(z);
                                window.panetitle = document.createElement("h1")
                                window.panetitle.innerText = "     " + name //shitty centering fix
                                x.appendChild(window.panetitle)
                                window.pane.appendChild(x);
                                $("#overlay")
                                        .append(window.pane)
                        }

                        function BuildMenuEntry(name, info, id, configpane, override, element) { //Creates tickbox element with info and optional (new) config pane (see guesspractice). in a pane
                                //Override 1 append to tweak menu
                                //Override 2 no text no check just button and append
                                //Override 3 no button
                                window.entry = document.createElement("div")
                                window.entry.margin = "5px"
                                window.tickbox = document.createElement("input")
                                window.tickbox.type = "checkbox"
                                window.tickbox.id = id
                                window.configElements.push(id)
                                window.entry.appendChild(window.tickbox)
                                window.label = document.createElement("label");
                                window.label.innerText = " " + name //spacing fix
                                window.entry.appendChild(window.label)
                                if (configpane != undefined) { //If any configpane was passed through try and create a button to open it.
                                        window.configbutton = document.createElement("button")
                                        window.configbutton.innerText = "Configure"
                                        window.configbutton.style.marginLeft = "7px"
                                        window.configbutton.style.border = "1px solid #5f5f5f"
                                        window.configbutton.style.boxShadow = "inset 0 0 5px rgba(0, 0, 0, 0.6)"
                                        window.configbutton.style.backgroundColor = "rgb(39, 39, 39)"
                                        window.configbutton.style.color = "#8266ff"
                                        /* OG color
window.configbutton.style.color = "#f9a619" */
                                        window.configbutton.style.borderRadius = "3px"
                                        window.configbutton.onclick = function () {
                                                if (document.getElementById(configpane)
                                                        .style.visibility == "hidden") { //visiblitly handler for configpane button
                                                        document.getElementById(configpane)
                                                                .style.visibility = "visible"
                                                } else {
                                                        document.getElementById(configpane)
                                                                .style.visibility = "hidden"
                                                }
                                        }
                                        window.entry.appendChild(window.configbutton)
                                }
                                if (element != null) {
                                        window.entry.appendChild(element);
                                }
                                if (info != "") {
                                        window.desc = document.createElement("p")
                                        window.desc.innerHTML = info;
                                        window.desc.style = "position: abosolute;";
                                        window.entry.appendChild(window.desc)
                                }
                                if (override == 1) { //override
                                        $("#tweaksmenu")
                                                .append(window.entry);
                                } else return window.entry;
                        }

                        function dragElement(elmnt) {
                                //drag elemments
                                //https://www.w3schools.com/howto/howto_js_draggable.asp
                                var pos1 = 0,
                                        pos2 = 0,
                                        pos3 = 0,
                                        pos4 = 0;

                                elmnt.onmousedown = dragMouseDown;


                                function dragMouseDown(e) {
                                        e = e || window.event;
                                        e.preventDefault();
                                        // get the mouse cursor position at startup:
                                        pos3 = e.clientX;
                                        pos4 = e.clientY;
                                        document.onmouseup = closeDragElement;
                                        document.onmouseleave = closeDragElement;
                                        // call a function whenever the cursor moves:
                                        document.onmousemove = elementDrag;
                                }

                                function elementDrag(e) {
                                        e = e || window.event;
                                        e.preventDefault();
                                        // calculate the new cursor position:
                                        pos1 = pos3 - e.clientX;
                                        pos2 = pos4 - e.clientY;
                                        pos3 = e.clientX;
                                        pos4 = e.clientY;
                                        // set the element's new position:
                                        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                                }

                                function closeDragElement() {
                                        // stop moving when mouse button is released:
                                        document.onmouseup = null;
                                        document.onmousemove = null;
                                }
                        }
                        /* Shortcut Hotkeys */

                        /* Keyboard Hotkeys */

                        shortcut('Ctrl+Shift+H', function (event, handler) {
                            /* Prevent the default refresh event under WINDOWS system
                            event.preventDefault(); */
                                $("#HideButton")
                                        .click();
                                $("#userconsole")
                                        .prepend("<li>stealth mode hotkey pressed " + $("#HideButton")
                                                .is(":checked"));
                        })
                        shortcut('Ctrl+Shift+G', function (event, handler) {
                            /* Prevent the default refresh event under WINDOWS system
                            event.preventDefault(); */
                                $("#GuessPractice")
                                        .click();
                                $("#userconsole")
                                        .prepend("<li>Guess hotkey pressed " + $("#GuessPractice")
                                                .is(":checked"));
                        })
                        shortcut('Ctrl+Shift+A', function () {
                            /* Prevent the default refresh event under WINDOWS system
                            event.preventDefault(); */
                                $("#AutoAdvance")
                                        .click();
                                $("#userconsole")
                                        .prepend("<li>Autoadvance hotkey pressed " + $("#AutoAdvance")
                                                .is(":checked"));
                        })
                        shortcut('Ctrl+Shift+S', function () {
                            /* Prevent the default refresh event under WINDOWS system
                            event.preventDefault(); */
                                $("#SearchButton > button")
                                        .click();
                                $("#userconsole")
                                        .prepend("<li>Search hotkey pressed ");
                        })

                        shortcut('Ctrl+Enter', function () {
                            /* Prevent the default refresh event under WINDOWS system
                            event.preventDefault(); */
                                $("#stageFrame")
                                        .contents().find(".uibtn.uibtn-blue.uibtn-arrow-next")[0].click();
                                $("#userconsole")
                                        .prepend("<li>Next hotkey pressed ");
                        })

                    /* shortcut("Ctrl+Enter", function (event, handler) {
                            //Prevent the default refresh event under WINDOWS system
                            event.preventDefault();
                                $("#stageFrame")
                                        .contents().find("#btnCheck")[0].click();
                                $("#userconsole")
                                        .prepend("<li>Done/Check hotkey pressed ");
                        }) */


                        //!!!!!!!!!!!!!!!!!!START REAL UI BUILDING !!!!!!!!!!!!!!!!!!

                        //Create base overlay
                        window.overlay = document.createElement("div")
                        window.overlay.style = "z-index:1;"
                        window.overlay.id = "overlay"
                        document.body.prepend(window.overlay)

                        //menu buttons
                        buildMenuButton("Tweaks Menu", "tweaksbutton", function () {
                                if (document.getElementById("tweaksmenu")
                                        .style.visibility == "hidden") {
                                        document.getElementById("tweaksmenu")
                                                .style.visibility = "visible"
                                } else {
                                        document.getElementById("tweaksmenu")
                                                .style.visibility = "hidden"
                                }
                        })
                        buildMenuButton("Search Selection", "SearchButton", function () {
                                var result = window.getSelection()
                                        .toString();
                                window.openedWindows.forEach(function (window) {
                                        if (window != null) {
                                                window.close();
                                        }
                                        window = null;
                                })
                                if ($("#stageFrame")[0].contentWindow.document.getSelection()
                                        .toString() != "") {
                                        result = $("#stageFrame")[0].contentWindow.document.getSelection()
                                                .toString()
                                } else if ($("#stageFrame")
                                        .contents()
                                        .find("iframe")[0].contentWindow.document.getSelection()
                                        .toString() != "") {
                                        result = $("#stageFrame")
                                                .contents()
                                                .find("iframe")[0].contentWindow.document.getSelection()
                                                .toString()
                                }
                                //console.log(result);

                                if (result != "") {
                                        $("#userconsole")
                                                .prepend("<li>Searching your selection ");
                                        if ($("#googlesearch")
                                                .is(":checked")) window.openedWindows[0] = window.open("https://www.google.com/search?q=" + result);
                                        if ($("#brainlysearch")
                                                .is(":checked")) window.openedWindows[1] = window.open("https://brainly.com/app/ask?q=" + result);
                                        if ($("#wolframsearch")
                                                .is(":checked")) window.openedWindows[2] = window.open("https://www.wolframalpha.com/input/?i=" + result);
                                        if ($("#customsearch")
                                                .is(":checked")) window.openedWindows[3] = window.open("https://google.com/search?q=site:" + $("#css")
                                                .val() + " " + result, )
                                        localStorage.setItem("csskey", $("#css")
                                                .val())
                                } else $("#userconsole")
                                        .prepend("<li>There's nothing selected! ");
                        })
                        buildMenuButton("Search Config", "scButton", function () {
                                if (document.getElementById("searchconfig")
                                        .style.visibility == "hidden") { //visiblitly handler for configpane button
                                        document.getElementById("searchconfig")
                                                .style.visibility = "visible"
                                } else {
                                        document.getElementById("searchconfig")
                                                .style.visibility = "hidden"
                                }
                        }, "SearchButton")
                        $("#SearchButton")
                                .on("mouseenter", function () {
                                        $("#scButton")
                                                .fadeIn()
                                }) //Hide / Show search config
                        $("#SearchButton")
                                .on('mouseleave', function () {
                                        $("#scButton")
                                                .fadeOut()
                                })
                        $("#scButton")
                                .hide()
                        buildMenuButton("Guess this", "guessbutton", function () {
                                try {
                                        $("iframe#stageFrame")
                                                .contents()
                                                .find("form")
                                                .find(".answer-choice-button")[Math.floor(Math.random() * Math.floor(4))].click()
                                } catch {}
                                $("#stageFrame")
                                        .contents()
                                        .find("#nextQuestion")[0].click()
                        })
                        buildMenuButton("Toggle Console", "consolebutton", function () {
                                $("#consolediv")
                                        .toggle()
                        })

                        //Panes
                        RenderPane("EdgenTweaks", "tweaksmenu", "40%", "40%", "") //make tweaksmenu base
                        RenderPane("Guess Practice Config", "practiceconfig", "35%", "35%") //Panerender for guesspractice
                        RenderPane("Search Title Config", "searchconfig", "35%", "35%", ) //serach config
                        RenderPane("Auto Advance Config", "aaconfig", "35%", "35%")
                        dragElement(document.getElementById("tweaksmenu"))
                        dragElement(document.getElementById("practiceconfig"))
                        dragElement(document.getElementById("aaconfig"))


                        //Entries
                        //SearchConfig
                        $("#searchconfig")
                                .append(BuildMenuEntry("Search in google", "", "googlesearch"))
                        $("#searchconfig")
                                .append(BuildMenuEntry("Search in brainly", "", "brainlysearch"))
                        $("#searchconfig")
                                .append(BuildMenuEntry("Search in wolfram", "", "wolframsearch"))
                        var textbox = document.createElement("input")
                        textbox.id = "css"
                        textbox.value = localStorage.getItem("csskey") ? localStorage.getItem("csskey") : "example.com" //not sure if this works
                        $("#searchconfig")
                                .append(BuildMenuEntry("CustomSearch ", "This should end in a .com to work best.", "customsearch", null, null, textbox))

                        //Autoadvance
                        BuildMenuEntry("Auto Advance", "Advance to the next portion of the course automatically when it becomes available", "AutoAdvance", "aaconfig", 1)
                        $("#aaconfig")
                                .append(BuildMenuEntry("No Skip", "Won't skip the end of videos", "aaNoSkip"))
                        $("#aaconfig")
                                .append(BuildMenuEntry("Auto Submit", "Submit elective junk automatically", "aaASubmit"))
                        $("#aaconfig")
                                .append(BuildMenuEntry("Feedback reading", "Don't autoadvance if there's a note from your teacher", "NoteReading"))
                        //GuessPractice
                        BuildMenuEntry("Guess Practice", "Automatically guesses through practice lessons (Warm-Up, Instruction, Summary)", "GuessPractice", "practiceconfig", 1)
                        $("#practiceconfig")
                                .append(BuildMenuEntry("Guess thru Assignments", "Guesses thru assignments. This is highly discouraged", "guessassignments"))

                        BuildMenuEntry("Skip intro", "Lets you interact with practices while the intro audio is playing", "SkipIntro", null, 1) //Skipintro
                        BuildMenuEntry("Show Example Response", "Displays default example response for short answer questions", "ShowColumn", null, 1) //example response
                        BuildMenuEntry("Auto Complete Vocab", "Automatically completes vocab assignments", "AutoCompleteVocabTickbox", null, 1) //Autocompletevocab
                        BuildMenuEntry("Stealth Mode", "Hides button and dialogs", "HideButton", null, 1) //StealthMode

                        //Copyright info & Other
                        $("#inActivityMessage")
                                .after('<div style=position:static; overflow-y: hidden;  visibility:visible; id=consolediv><ul style=color:gold id=userconsole></ul></div>') //console ID=userconsole
                        window.shortcutinfo = document.createElement("p")
                        window.shortcutinfo.innerHTML = "<br> <b> HOTKEYS </b> <br> CTRL+SHIFT+A = Auto Advance Toggle <br> CTRL+SHIFT+H = Stealth Mode Toggle <br> CTRL+SHIFT+G = Guess Practice toggler <br> CTRL+SHIFT+S = Search Selection <br> CTRL+SHIFT+J = Foward +K = Back <br> CTRL+SHIFT+V = AutoComplete Vocab Toggle <br> CTRL+SHIFT+E = Show Example Response toggle <br> CTRL+SHIFT+B = Skip Intro toggle <br> CTRL+SHIFT+M = Next Question"
                        window.copyright = document.createElement("p")
                        window.copyright.innerHTML = "EdgenTweaks Version 1.6 orginally by GW (<a href='https://gitlab.com/roglemorph/edgentweaks/-/issues/'>Report a bug!</a>) (<a href='https://gitlab.com/roglemorph/edgentweaks'>Gitlab</a>) <br> This is free and unencumbered software released into the public domain.Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means."


                        window.copyright.style.color = "gray"
                        window.copyright.style.width = "100%"
                        $("#tweaksmenu")
                                .append(window.shortcutinfo, window.copyright)
                        document.getElementById("tweaksmenu")
                                .children[1].onclick = easteregg
                        window.menutitleclicks = 0
                        //!!!!!!!!!!!!!!!!!!END REAL UI BUILDING !!!!!!!!!!!!!!!!!!
                } //intialization
                init();


                //!!!!!!!!!!!!!!!!!!!!!!! BEGIN TWEAKS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // Auto Advance
                function autoadvance() {
                        var increment = 0;
                        if (["Unit Test", "Unit Test Review", "Quiz"].includes(x = $("#activity-title")
                                        .text())) {
                                if ($("#HardDisable")
                                        .is(":checked")) {
                                        $("#AutoAdvance")
                                                .attr("checked", false)
                                        $("#userconsole")
                                                .prepend("<li>Auto Advance hard disabled");
                                        return;
                                } else if ($("#activity-status")
                                        .text() != "Complete") {

                                        output += "Autoadvance (disabled for  " + x + "), ";
                                        return;
                                }
                        }
                        if ($("#NoteReading")
                                .is(":checked") && document.getElementById("feedback") != undefined) {
                                output += "Autoadvance (I found a note from your teacher!), ";
                                return;
                        }
                        var x;
                        if ($("#aaNoSkip")
                                .is(":checked")) {
                                /* Getting the time position from the iframe and converting it into to a number. */
                                var temp = eval(x = $("#stageFrame")
                                        .contents()
                                        .find("#uid1_time")
                                        .text()
                                        .replace(/:/g, ".")
                                        .replace("/", '-')); ///e.g. 1:20 / 2:00 -> 1.20 - 2.00 = abs seconds left
                                /* Checking if the video is playing and if it is not, it will loop. */
                                console.log(temp, x)
                                if (temp < -.02 && temp != undefined && temp != 0 && $("#stageFrame")
                                        .contents()
                                        .find("#frame_video_controls")
                                        .css("display") != "none") { //many condition cause videos sometime get stuck one second behind,
                                        output += "Autoadvance (NoSkip is enabled),  ";
                                        return;
                                }
                        }
                        increment++;
                        //All other AA checks have succedded at this point.
                        if ($("#ASLAP")
                                .is(":checked")) {
                                console.log($("#ASLAPtext")
                                        .value)



                        }




                        /* Clicking the next button on the page. */
                        try {
                                document.getElementsByClassName("footnav goRight")[0].click()
                        } catch (TypeError) {} //Advance to next !!!!assignment!!! not redundant
                        $("#stageFrame")
                                .contents()
                                .find(".FrameRight")
                                .click()
                        if ($("#aaASubmit")
                                .is(":checked")) {
                                $("iframe")
                                        .contents()
                                        .find("#SubmitButton")
                                        .click()

                        }
                        output += ("Autoadvance, ")
                }
                //Stealth Mode
                /* Hides the console and other elements. */
                function StealthMode(a) {
                        if (a) {
                                output += ("Stealth Mode, ")
                                $("#consolediv")
                                        .css("visibility", "hidden")
                                $("#consolebutton")
                                        .css("visibility", "hidden")
                                $("#tweaksbutton")
                                        .css("opacity", "0")
                                $("#SearchButton")
                                        .css("visibility", "hidden")
                                $("#guessbutton")
                                        .css("visibility", "hidden")
                                $(".tweakpane")
                                        .css("opacity", 0.05)
                        } else {
                                $("#consolediv")
                                        .css("visibility", "visible")
                                $("#consolebutton")
                                        .css("visibility", "visible")
                                $("#tweaksbutton")
                                        .css("opacity", "1")
                                $("#SearchButton")
                                        .css("visibility", "visible")
                                $("#guessbutton")
                                        .css("visibility", "visible")
                                $(".tweakpane")
                                        .css("opacity", 1)
                                document.getElementById("HideButton")
                                        .checked = false;
                        }
                }
                // Skip intro
                function skipIntro() {
                        //if ($("#invis-o-div") == null) return; test this if you want, I can't.
                        output += ("Skip intro, ")
                        try {
                                window.frames[0].document.getElementById("invis-o-div")
                                        .remove()
                        } catch (TypeError) {}
                }
                // Guess Practice
                function GuessPractice() {
                        //Guesser (THIS IS INDEDED TO BE RESTRICTIVE, JUST LEAVE IT.)
                       /* clicks on the answer choices */
                        if (["Instruction", "Warm-Up", "Summary", "Lecture"].includes(document.getElementById("activity-title")
                                        .innerText)) {
                                var numOption
                                if ($("iframe#stageFrame")
                                        .contents()
                                        .find("form")
                                        .find(".answer-choice-button")
                                        .length = numOption > 0) {
                                        $("iframe#stageFrame")
                                                .contents()
                                                .find("form")
                                                .find(".answer-choice-button")[Math.floor(Math.random() * Math.floor(numOption))].click()
                                } else if ($("#stageFrame")
                                        .contents()
                                        .find("iframe")
                                        .contents()
                                        .find(".answer-choice-button")
                                        .length > 0) {
                                        $("#stageFrame")
                                                .contents()
                                                .find("iframe")
                                                .contents()
                                                .find(".answer-choice-button")[Math.floor(Math.random() * Math.floor(4))].click()
                                }
                                $("#stageFrame")
                                        .contents()
                                        .find("#btnCheck")[0].click()
                                output += ("Guess practice tried to click, ")
                                /* Checking if the activity is a "Guess Practice" activity. */
                        } else {
                                output += ("Guess Practice (not supported for  " + $("#activity-title")
                                        .text() + "), ")
                        }
                }

                // Unhide Right Column
                function showColumn() {
                        output += ("Show Example Response, ")
                        try {
                                window.frames[0].frames[0].document.getElementsByClassName("right-column")[0].children[0].style.display = "block"
                        } catch (TypeError) {}
                        try {
                                window.frames[0].frames[0].document.getElementsByClassName("left-column")[0].children[0].style.display = "block"
                        } catch (TypeError) {}
                }
                // Easter Egg (onclick moved to init)
                function easteregg() {
                        if (window.menutitleclicks < 10) {
                                window.menutitleclicks++;
                                if (window.menutitleclicks == 10) {
                                        alert("Easter egg activated! How'd you know?! (refresh to get rid of)")
                                        var easteregg = document.createElement("img")
                                        easteregg.src = "https://i.gifer.com/zYw.gif"
                                        easteregg.style.position = "fixed"
                                        easteregg.style.bottom = "40px";
                                        easteregg.style.marginLeft = "80%"
                                        document.body.appendChild(easteregg)
                                        window.menutitleclicks = 0;
                                }
                        }
                }
                // Auto complete vocab
                function vocabCompleter() {
                        if (document.getElementById("activity-title")
                                .innerText == "Vocabulary") {
                                var i = 0;
                                try {
                                        var txt = window.frames[0].document.getElementsByClassName("word-background")[0].value
                                        window.frames[0].document.getElementsByClassName("word-textbox")[0].value = txt;
                                        $("#stageFrame")
                                                .contents()
                                                .find(".word-textbox.word-normal")[0].dispatchEvent(new Event("keyup"));
                                } catch {
                                        return;
                                }
                                var speed = 125;
                                output += ("Vocab Completer, ")
                                $("#stageFrame")
                                        .contents()
                                        .find(".playbutton.vocab-play")[0].click()
                                $("#stageFrame")
                                        .contents()
                                        .find(".playbutton.vocab-play")[1].click()
                                $("#stageFrame")
                                        .contents()
                                        .find(".uibtn.uibtn-blue.uibtn-arrow-next")[0].click()
                        }
                }
                //!!!!!!!!!!!!!!!!!!!!! END TWEAKS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //!!!!!!!!!!!!!!! BEGIN CONFIG & INTERNAL HANDLERS !!!!!!!!!!!!!!!!!!!!!!!!!!!
                function loaditem(item, id) {
                        if (localStorage.getItem(item) != null) {
                                if (localStorage.getItem(item) == "true") { //Because LocalStorage only stores strings
                                        document.getElementById(id)
                                                .checked = true
                                } else {
                                        document.getElementById(id)
                                                .checked = false
                                }
                        }
                }
                for (var x of configElements) {
                        loaditem(x, x)
                }

                function syncConfig() { // Sync Config (save)
                        for (var x of configElements) {
                                localStorage.setItem(x, document.getElementById(x)
                                        .checked.toString())
                        }
                }
                //!!!!!!!!!!!!!!!!! END CONFIG & INTERNAL HANDLERS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //!!!!!! MASTERLOOP !!!!!!!!
                var output = "";

                /**
                 * It runs the loop function every 2 seconds, and the loop function runs the functions
                 * that are enablled in the options menu.
                 */

                function loop() {
                        output = "Active Tweaks: ";
                        StealthMode($("#HideButton")
                                .is(":checked"))
                        if ($("#AutoCompleteVocabTickbox")
                                .is(":checked")) vocabCompleter()
                        if ($("#AutoAdvance")
                                .is(":checked")) autoadvance()
                        if ($("#SkipIntro")
                                .is(":checked")) skipIntro()
                        if ($("#GuessPractice")
                                .is(":checked")) GuessPractice()
                        if ($("#ShowColumn")
                                .is(":checked")) showColumn()
                        syncConfig()
                        if ($("#userconsole li:first")
                                .text() != output) {
                                $("#userconsole")
                                        .prepend("<li>" + output)
                        }
                }
                window.masterloop = setInterval(loop, 2000);
        }, 2000); //makes this run after 2 seconds
