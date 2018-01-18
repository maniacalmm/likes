var click = 0;
$('#like-btn').click(function(e) {
    let url = '/likes/' + $(this).val() + "/like";
    $.post(url, {turn: click}, function(like){
        $('.num-likes').text(like);
        if (click === 0) {
            $('#heart').css('color', 'red');
        } else {
            $('#heart').css('color', 'black');
        }
        click = click ^ 1;
    });
});