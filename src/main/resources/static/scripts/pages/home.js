$(document).ready(function() {
    $('header a').on('click', function() {
        $('#loadingOverlay').fadeIn();
    });

    $(window).on('load', function() {
        $('#loadingOverlay').fadeOut();
    });
});