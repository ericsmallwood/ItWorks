/**
 * Created by Eric on 6/6/2015.
 */

$(document).ready(function(){


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
});
