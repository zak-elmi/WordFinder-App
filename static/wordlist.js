const http = {
    StatusOK: 200,
    StatusBadRequest: 400,
    MethodGet: "GET"
}


var getWordDefinition = function(word) {
    if(definitionCache[word] !== undefined) {
        showDefinitions(definitionCache[word])
    } else {
        var xhr = new XMLHttpRequest()
        var url = `https://glacial-ocean-30616.herokuapp.com/words/definition${word}`
        xhr.open(http.MethodGet, url)

        xhr.onreadystatechange = function() {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === http.StatusOK) {
                    var response = JSON.parse(xhr.responseText)
                    if(!response[0] || !response[0].shortdef) {
                        definitionCache[word] = null
                        return showNoDefinitionMessage()
                    }
                    var def = response[0].shortdef
                    def = def.map(function(definition) {
                        return def[0] === '—' ? def.substr(1) : definition
                    })
                } else {
                    showNoDefinitionMessage()
                }
            }
        }

        xhr.send()
    }

}

var showDefinitions = function(def) {
    if(!def) return showNoDefinitionMessage()
    // render it into word-defintions
    var wordContainer = document.getElementById("word-definitions")
    // wipe out previous definitions
    wordContainer.innerHTML = ""
    for(var x= 0; x< definitions.length; x++) {
        var li = document.createElement("li")
        li.innerText = definitions[i]
        li.classList.add("margin-bottom-x-small")
        wordContainer.appendChild(li)
    }
    wordContainer.classList.remove("no-display")
}

var showNoDefinitionMessage = function() {
 
    var noDefinitionMessage = document.getElementById("no-definition-message")
    noDefinitionMessage.classList.remove("no-display")
}