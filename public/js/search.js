let searchResults = [];

$(document).ready(function() {
    // SEARCH BUTTON
    // Search for an album
    $('#searchBtn').on('click', function (event) {
        event.preventDefault();
        
        // Reset the search results, empty the div & hide it
        searchResults = [];
        $('#resultHeading').empty();
        $('#resultBody').empty();
        $('#resultHeading').removeClass('hide');
        $('#resultBody').removeClass('hide');
    
        const album = $('#searchBar').val();
        const queryURL = 'http://ws.audioscrobbler.com/2.0/?method=album.search&album=' + album + '&api_key=7a06fd430e2d699b85d6ce8f8043cc7e&format=json';
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            let results = response.results.albummatches.album;
    
            // Iterate through the result and build a cleaner array of objects representing each search result
            for (let i = 0; i < results.length; i++) {
                let newAlbum = {
                    name: results[i].name,
                    artist: results[i].artist,
                    imageURL: results[i].image[2]['#text'],
                    mbid: results[i].mbid
                }
                searchResults.push(newAlbum);
            }
            
            let limit = 12;
            if (searchResults.length < 12) limit = searchResults.length;
    
            $('#resultHeading').append($('<div class="col-12"><h4>Results from <a href="https://www.last.fm/home" target="blank">last.fm</a>:</h4></div>'));
    
            for (let i = 0; i < limit; i++) {
                let thisDiv = $('<div class="results col-lg-3 col-sm-4 col-xs-6"></div>');
                thisDiv.attr('id', 'album');
                
                thisDiv.append($("<hr/>"))
    
                let nameDiv = $('<div><strong>' + searchResults[i].name + '</strong></div>');
                thisDiv.append(nameDiv);
    
                let artistDiv = $('<div><em>by ' + searchResults[i].artist + '</em></div>');
                thisDiv.append(artistDiv);
    
                let albumArt = $('<img alt="' + searchResults[i].name + ' album cover">')
                if (searchResults[i].imageURL) albumArt.attr('src', searchResults[i].imageURL);
                else  albumArt.attr('src', 'https://via.placeholder.com/164x174/fee500?text=Cover%20Art%20Not%20Found');
                albumArt.click(function() { loadAlbum(searchResults[i].mbid) });
                thisDiv.append(albumArt);
    
                $('#resultBody').append(thisDiv);
            }
    
            $('#resultHeading').removeClass('hide');
            $('#resultBody').removeClass('hide');
        });
    });
});

// Load an album's full info from the search results
// Triggered by the click function of the album art image
function loadAlbum(mbid) {
    const queryURL = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=7a06fd430e2d699b85d6ce8f8043cc7e&mbid=' + mbid + '&format=json';
        
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        $('#resultHeading').empty();
        $('#resultHeading').append($('<div class="col-12"><h4>Album Info from <a href="https://www.last.fm/home" target="blank">last.fm</a>:</h4></div>'));

        let albumDiv = $('<div id="albumDiv" class="col-12 album"></div>');

        let nameDiv = $('<div style="font-size:20px"><strong>' + response.album.name + '</strong></div>');
        albumDiv.append(nameDiv);
        let artistDiv = $('<div style="font-size:20px">' + response.album.artist + '</div>');
        albumDiv.append(artistDiv);
        if (response.album.image[2]['#text']) {
            let albumArt = $('<img class="img-fluid mb-3" src ="' + response.album.image[2]["#text"] + '" alt="' + response.album.name + ' album cover" style="width:75%">')
            albumDiv.append(albumArt);
        } else {
            let albumArt = $('<img class="img-fluid mb-3" src ="https://via.placeholder.com/164x174/fee500?text=Cover%20Art%20Not%20Found" alt="Cover Art Not Found">')
            albumDiv.append(albumArt);
        }
        let streamDiv = $('<div><a href="' + response.album.url + '">Stream this album on last.fm</a></div>');
        albumDiv.append(streamDiv);
        let summaryDiv = $('<div><p>' + response.album.wiki.summary + '</p></div>');
        albumDiv.append(summaryDiv);

        let addButton = $('<button type="button" id="addBtn" class="btn btn-warning">Add To My Collection</button>');
        addButton.click(function() {
            const newAlbum = {
                name: response.album.name,
                artist: response.album.artist,
                streamURL: response.album.url,
                imageURL: response.album.image[2]['#text'],
                wikiSummary: response.album.wiki.summary,
                mbid: response.album.mbid
            }

            addAlbum(newAlbum);
        });
        albumDiv.append(addButton);

        $('#resultBody').empty();
        $('#resultBody').append(albumDiv)
    });
}

// Triggered by the click funtion of #addBtn
function addAlbum(newAlbum) {
    console.log(newAlbum);

    $.post("/api/album", newAlbum)
    .then(function() {
        window.location.replace("/myCollection");
    })
    // If there's an error, log the error
    .catch(function(err) {
        console.log(err);
    });
}