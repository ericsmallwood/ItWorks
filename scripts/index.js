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
        closeOnClick: true,
        api: true
    });

    $('.video-link').click(function() {
        videoModal.load();

        var videoUrl = $(this).attr('href');

        swfobject.embedSWF(videoUrl, 'video-container', '425', '344', '9.0.0');

        return false;
    });
});
