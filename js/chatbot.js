
$(function () {
    $('form').on('submit', function (e) {
        var query = $("#message").val();
        showUserText();
        e.preventDefault();
        ajaxCall(query)
    });
});


function showUserText() {
    var div = jQuery('<div/>', {
        text: $("#message").val(),
        'class': "rounded-div",
        tabindex: 1
    });
    $("#chat-text").append(div);
    $("#message").val('');
}

function showUserText2(item) {
    var div = jQuery('<div/>', {
        text: item,
        'class': "rounded-div",
        tabindex: 1
    });
    $("#chat-text").append(div);
    $("#message").val('');
    ajaxCall(item)
}


if (!String.linkify) {
    String.prototype.linkify = function () {

        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses
        var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

        return this
            .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
            .replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
    };
}


function ajaxCall(query) {

    $.ajax({
        type: 'post',
        url: 'process.php',
        data: { submit: true, message: query },
        success: function (response) {
            var obj = JSON.parse(response);
            var answerdiv;
            var messages = obj.result.fulfillment.messages;
            if (messages.length > 1) {
                for (i in messages) {
                    if (messages[i].type == "simple_response") {
                        console.log(" Here are messages: " + messages[i].textToSpeech)
                        answerdiv = jQuery('<div/>', {
                            html: messages[i].textToSpeech + '&nbsp;',
                            'class': "rounded-div-bot",
                            tabindex: 1
                        });
                        console.log("Answer Type 1") 
                    }
                    var list;
                    if (messages[i].type == "list_card") {
                        // var list;
                        list = $("<div></div>").append($("<ul></ul>").addClass("list-group"))
                        .addClass("col-xs-4 pull-right scrolllist");
                        for (j in messages[i].items) {
                            list.append($("<a> </a>")
                                .addClass("list-group-item list-group-item-css")
                                .text(messages[i].items[j].title)
                                .click(function () {
                                    console.log($(this).text());
                                    showUserText2($(this).text());
                                }))
                        }


                    }
                    var butDiv;
                    if(messages[i].type == "suggestion_chips") {
                       butDiv = $("<div></div>").addClass("col-xs-6 col-xs-offset-3 pull-right");
                      $.each(messages[i].suggestions , function(index , value) {

                        butDiv.append($("<button></button>")
                         .addClass("btn btn-sm btn-success")
                         .text(value.title)
                         .click(function(){
                          console.log($(this).text());
                          showUserText2($(this).text());
                           }))

                      })
                    }
                }
            }
            else {
                answerdiv = jQuery('<div/>', {
                    html: obj.result.fulfillment.speech+'&nbsp;',
                    'class': "rounded-div-bot",
                    tabindex:1
                });
            }
   
            // setTimeout(function(){
                $("#chat-text").delay(1000).append(answerdiv).append($("<br><br><br><br><br>"));
            //   },200);
             
              if(butDiv) {
                // setTimeout(function(){
                  $("#chat-text").delay(1000).append(butDiv).append($("<br><br><br><br>"));
                // },400);
              }
           
              if (list) {
                // setTimeout(function(){
                  $("#chat-text").delay(1000).append(list);
                // },400);   
              } 
            $(answerdiv).focus(); 
            $("#message").focus();
        }
    })
}