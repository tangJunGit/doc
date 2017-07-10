$(function(){
    $('#submit').on('click', function(){
        $.get('/request/get', function(data){
            var data = JSON.parse(data);
            $('#show').html(JSON.stringify(data, null, 2));
        });
    });
});