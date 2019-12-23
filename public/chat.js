// MAke connection

// var socket = io.connect('/1');
var socket = io.connect('/');

// Query DOM


var btn = $('#send');
var output = $('#output');

// emit events
// const socket = io('/my-namespace');


$(btn).on('click', function() {

    socket.emit('chat', {
        message: $('#message').val(),
        handle: $('#handle').val(),

    });
    $('#message').val('');
    $('#handle').val('');
});
$('#message').on('keypress', function() {

    socket.emit('typing', $('#handle').val());
});


// Listen for events
socket.on('chat', function(data) {
    $('#feedback').html('');
    console.log(data);
    $('#output').append('<p><strong>' + data.handle + ': </strong>' + data.message + '</p>');

})

socket.on('typing', function(data) {
    console.log(data);
    $('#feedback').html('<p><em>' + data + ' is typing a message...</em></p>');
})