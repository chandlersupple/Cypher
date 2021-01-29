function loadData() {
    $.ajax({
        type: "GET",
        url: "/api/get-questions",
        success: function(response) {
            var parsed = JSON.parse(response["result"]);

            if (parsed.length > 0 && localStorage.getItem("title1") != parsed[0]["fields"]["title"]) {
                $("#outerContainer").html("");
                $("<span>", {"id": "optionsTitle"}).html("Top Questions").appendTo("#outerContainer");
                var buttonLink = $("<a>", {"href": `${ response["url"] }`, "target": "_blank", "rel": "noopener noreferrer"});
                var button = $("<span>", {"id": "moreButton"}).html("See more")
                button.appendTo(buttonLink);
                buttonLink.appendTo("#outerContainer")

                $("#appBar").html("")
                var errorPrepend = $("<span>", {"class": "errorPrepend"}).html("Showing results for:").css({ "background-color": "#19ae53", "padding": "0 5px 0 5px", });
                var errorMessage = $("<span>").html('&nbsp;"' + parsed[0]["fields"]["error"] + '"')
                errorPrepend.appendTo("#appBar");
                errorMessage.appendTo("#appBar");
                
                parsed.forEach(function(index) {
                    var questionContainer = $("<div>", {"class": "linkContainer"});
                    var title = $("<span>", {"class": "linkTitle"});
                    var outerLink = $("<a>", {"href": `${index["fields"]["link"]}`, "target": "_blank", "rel": "noopener noreferrer"}).html(index["fields"]["title"]);
                    outerLink.appendTo(title);
                    title.appendTo(questionContainer);

                    var outerLink2 = $("<a>", {"href": `${index["fields"]["link"]}`, "target": "_blank", "rel": "noopener noreferrer"}).html(index["fields"]["link"]);
                    var link = $("<span>", {"class": "linkLink"})
                    outerLink2.appendTo(link);
                    link.appendTo(questionContainer);
                    questionContainer.appendTo("#outerContainer");
                });

                localStorage.setItem("title1", parsed[0]["fields"]["title"]);
            }
        },
        error: function(response) {
            console.log("Mission failed");
        }
    })
}

localStorage.setItem("title1", "");
$(document).ready(loadData());
var loadInterval = setInterval(loadData, 1000)