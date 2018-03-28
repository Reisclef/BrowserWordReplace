//Grab the settings from Chrome Storage
chrome.storage.sync.get("textReplaceSettings", function(settings){
    if (settings.textReplaceSettings){
        replaceText(settings.textReplaceSettings);
    }
})

//Test if the node is Text, and then find and replace all instances from settings 
function replaceText(settings){

    var elements = document.getElementsByTagName('BODY')[0].getElementsByTagName('*');
    
    //Blacklist certain element tags to avoid breaking the page
    var elementsToSkip = ["META", "SCRIPT", "LINK", "STYLE", "NOSCRIPT"]

    for (var thisElement = 0; thisElement < elements.length; thisElement++) {
        var element = elements[thisElement];
        if (elementsToSkip.indexOf(element.tagName) == -1){
            for (var thisNode = 0; thisNode < element.childNodes.length; thisNode++) {
                var node = element.childNodes[thisNode];
                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    var replacedText;
                    for (var i = 0; i < settings.length; i++) {
                        if (i == 0) {
                            replacedText = text.replace(new RegExp(settings[i][0], "gi"), settings[i][1])
                        }
                        else {
                            replacedText = replacedText.replace(new RegExp(settings[i][0], "gi"), settings[i][1])
                        }
                    }
                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }
    }
}