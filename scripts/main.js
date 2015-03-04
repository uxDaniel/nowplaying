(function ($) {
    'use strict';


    $("#tweets").nowPlaying("api/nowplaying.php");
    
    
    // Tweet submission via ajax
    $('#sendtweet').submit(function (e) {
        e.preventDefault();

        var $form = $(this),
            action = $form.attr('action'),
            data = $form.serialize();

        $.post(action,
            data,
            function (responsedata) {
                console.log(responsedata);
                if (responsedata.errors === undefined) {
                    $.toaster({
                        title : 'Good News',
                        priority : 'success',
                        message : 'Success! Your tweet was sent.',
                        settings: {timeout: 2500}
                    });
                    $form[0].reset();
                } else {
                    $.toaster({
                        title : 'Bad News',
                        priority : 'danger',
                        message : 'An unexpected error occurred. Please try again.',
                        settings: {timeout: 2500}
                    });
                }
            },
            'json'
        );
    });
})(jQuery);