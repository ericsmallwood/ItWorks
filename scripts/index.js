/**
 * Created by Eric on 6/6/2015.
 */

$(document).ready(function(){

    //modal video functionality
    var videoModal = $('#video-modal').overlay({
        expose: {
            color: 'black',
            loadSpeed: 200,
            opacity: 0.85
        },
        closeOnClick: false,
        api: true
    });
    var sobj;
    $('.video-link').click(function() {
        videoModal.load();

        var videoUrl = $(this).attr('href');

        sobj = swfobject.embedSWF(videoUrl, 'video-container', '741', '600', '9.0.0');

        return false;
    });

    $('#closeBtn').click(function(){
        swfobject.removeSWF('video-container');
        //remove swf remoes the container so add it back
        $('#video-modal').append('<div id="video-container"></div>');
    });

    //email form functionality
    $('#emailFormSendBtn').click( function(){
        var sendButton = $(this);

        function showText (element, text, milliseconds){
            element.html(text);
            window.setTimeout(function(){
                element.html("");
            }, milliseconds);
        }

        function enableDisableEmailForm(disable){
            nameInput.prop('disabled', disable);
            emailInput.prop('disabled', disable);
            subjectInput.prop('disabled', disable);
            commentInput.prop('disabled', disable);
            sendButton.prop('disabled', disable);
        }

        function validateElement(element){
            if(element.val() === ""){
                element.css('background', '#ff9999');
                return false;
            }else{
                element.css('background', 'white');
                return true;
            }
        }

        var emailMessageArea = $('#emailMessageArea');

        //message area hieght should match content area
        emailMessageArea.css('height', $('#contactContent').css('height'));

        var emailArea = $('#emailArea');
        var nameInput = $('#emailFormName');
        var emailInput = $('#emailFormEmailAddress');
        var subjectInput = $('#emailFormSubject');
        var commentInput = $('#emailFormComment');

        //disable form elements while submitting
        enableDisableEmailForm(true);

        //check if form is valid
        if(validateElement(nameInput) && validateElement(emailInput) && validateElement(commentInput)){
            //set all inputs background color back to white
            nameInput.css('background', 'white');
            emailInput.css('background', 'white');
            commentInput.css('background', 'white');
        }else{
            //re enable fields and show error message
            enableDisableEmailForm(false);
            var validationHtml = "<h2 style='color: red'>Please Fill Out All Required Fields and Try Again.</h2>";
            emailMessageArea.html(validationHtml);
            return false;
        }

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "scripts/mail.php",
            success: function(data){
                enableDisableEmailForm(false);
                emailArea.html("<h2>"+data.message+"</h2>");
                nameInput.val("");
                emailInput.val("");
                subjectInput.val("");
                commentInput.val("");
                var successMessage = "<h2>Thank You! Your message has been sent!</h2>";
                showText(emailMessageArea, successMessage, 3000);
            },
            error: function(error){
                enableDisableEmailForm(false);
                var errorHtml = "<h2 style='color: red'>Server Error. The message was not sent. Please Try again.</h2>";
                showText(emailMessageArea, errorHtml, 3000);
            },
            data: {
                name: nameInput.val(),
                email: nameInput.val(),
                subject: subjectInput.val(),
                body: commentInput.val()
            }
        });
    });
});
