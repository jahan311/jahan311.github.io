$(document).ready(function(){
    $('.img_wrap').click(function() {
        $('.pop_wrap').addClass('show');
        $('body').css('overflow', 'hidden');
    });

    $('.close_btn').click(function() {
        $('.pop_wrap').removeClass('show');
        $('body').css('overflow', '');
    });

    $('.pop_wrap').click(function(event) {
        if (!$(event.target).closest('.pop_contents').length) {
            $('.pop_wrap').removeClass('show');
            $('body').css('overflow', '');
        }
    });
});