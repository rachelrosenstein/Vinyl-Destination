let searchResults = [];

$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      })
        .then(function() {
          window.location.replace("/myCollection");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
});

// Search for an album
$('#searchBtn').on('click', function (event) {
    event.preventDefault();
    
    // Reset the search results, empty the div & hide it
    searchResults = [];
    $('#searchResults').empty();
    $('#searchResults').removeClass('hide');

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
        
        let limit = 10;
        if (searchResults.length < 10) limit = searchResults.length;

        $('#searchResults').append($('<h2>Results from last.fm:</h2>'));

        for (let i = 0; i < limit; i++) {
            let nameDiv = $('<h5 class="text-bold">' + searchResults[i].name + '</h5>');
            $('#searchResults').append(nameDiv);
            let artistDiv = $('<div>by ' + searchResults[i].artist + '</div>');
            $('#searchResults').append(artistDiv);
            if (searchResults[i].imageURL) {
                let albumArt = $('<img src ="' + searchResults[i].imageURL + '" alt="album cover">')
                $("#searchResults").append(albumArt);
            }
            $('#searchResults').append($('<div class="divider"></div>'));
        }

        $('#searchResults').removeClass('hide');
    });
});