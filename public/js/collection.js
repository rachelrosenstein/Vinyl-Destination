$(document).ready(function() {
    const streamButton = $('.stream');   
    const favoriteButton = $('.favorite');   
    const unfavoriteButton = $('.unfavorite');   
    const deleteButton = $('.delete');   
    
    streamButton.on('click', function(event) {
        window.open($(this).data('url'));
    });

    favoriteButton.on('click', function(event) {
        $.ajax('/api/album', {
            type: 'PUT',
            data: {
                id: $(this).data('id'),
                isFavorite: true
            }
        }).then(function(data) {
            window.location.reload();
        });
    });

    unfavoriteButton.on('click', function(event) {
        $.ajax('/api/album', {
            type: 'PUT',
            data: {
                id: $(this).data('id'),
                isFavorite: false
            }
        }).then(function(data) {
            window.location.reload();
        });
    });

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