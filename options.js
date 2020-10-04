// Saves options to chrome.storage
function saveOptions() { 
    var settingsArray = [];
    var rows = document.getElementsByClassName("row");
    for (var i = 0; i < rows.length; i++){
        var entry = [];
        var rowChildren = rows[i].childNodes;
        var findValue;
        var replaceValue;
        for (var c = 0; c < rowChildren.length; c++){
            if(rowChildren[c].className == "find"){
                findValue = rowChildren[c].value;
            }
            if(rowChildren[c].className == "replace"){
                replaceValue = rowChildren[c].value
            }
        }
        entry.push(findValue, replaceValue);
        settingsArray.push(entry);
    }

    chrome.storage.sync.set({
        "textReplaceSettings": settingsArray
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 5000);
    });
}

function getOptions(){
    chrome.storage.sync.get("textReplaceSettings", function(options){
        var settings = options.textReplaceSettings;
        for(var i = 0; i < settings.length; i++){
            //For the first, insert it into the already existing input
            if (i == 0){
                document.getElementById("find0").value = settings[i][0];
                document.getElementById("replace0").value = settings[i][1];
            }
            else {
                insertRow(settings[i])
            }
        }
    });
}

function insertRow(entry) {
    var html = document.createElement('div');
    html.classList.add("row");
    html.innerHTML = [
        '<label>Find:</label><input class="find" placeholder="Text to Find..." value="' + entry[0] + '"/>',
        '<label>Replace with:</label><input class="replace" placeholder="Replace found text with..." value="' + entry[1] +'"/>',
        '<button class="btn btn-danger removeRow""></button>'].join("\n");
    var lastDiv = document.getElementById("rowContainer").lastChild;
    lastDiv.parentNode.insertBefore(html,lastDiv);

    //Now add the event listener to the new button
    html.lastChild.addEventListener('click', function(){
        removeRow(html);
    })
}

function addEmptyRow(){
    insertRow(["",""]);
}

function removeRow(row){
    row.parentElement.removeChild(row);
}

document.addEventListener('DOMContentLoaded', getOptions);
document.getElementById("addRow").addEventListener('click', addEmptyRow);
document.getElementById('save').addEventListener('click', saveOptions);