$(document).ready(function() {
    const streamButton = $('.stream');   
    // const favoriteButton = $('.favorite');   
    const deleteButton = $('.delete');   
    
    streamButton.on('click', function(event) {
        window.open($(this).data('url'));
    });

    // favoriteButton.on('click', function(event) {
    //     $.ajax('/api/album/' + $(this).data('id'), {
    //         type: 'PUT',
    //         data: {
    //             id: $(this).data('id')
    //         }
    //     }).then(function(data) {
    //         window.location.reload();
    //     });
    // });

    deleteButton.on('click', function(event) {
        console.log("Delete an album");
        console.log($(this).data("id"));
        $.ajax('/api/album/' + $(this).data('id'), {
            type: 'DELETE'
        }).then(function(data) {
            window.location.reload();
        });
    });
});