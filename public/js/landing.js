$(document).ready(function () {
    const apiKey = "bcc2561c14a397a8ead4a93fa8ca760d";
    const tag = "pop"
    const queryURL = "https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=" + tag + "&api_key=" + apiKey + "&format=json";

    // Make an API call to get the top albums associated with that tag
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let newImgDiv = "";
        let bigImg = "";
        let title = "";
        let artist = "";
        let addTo = "";
        let stream = "";

        // Create album art circles with click functions for the top seven albums
        for (let i = 0; i <= 7; i++) {
            let imgSrc;
            let res = response.albums.album[i];
        
            if (i === 0) {
                imgSrc = res.image[3]["#text"];
            } else if (i >= 1) {
                imgSrc = res.image[2]["#text"];
            }

            newImgDiv = '<img src=' + "'" + imgSrc + "'" + '">';

            $('.n' + i).append(newImgDiv);

            // Click function for album art circles
            // Displays album info below & creates "Stream" and "Add" buttons
            $(document).on('click', '.n' + i, function (event) {
                $(".albumTitle").empty();
                $(".artist").empty();
                $(".bigImg").empty();
                $(".twobuttons").empty();
                
                title = res.name;
                artist = res.artist.name;

                // "Add" button
                addTo = $("<button>Add To My Collection</button>")
                addTo.attr("type", "button");
                addTo.attr("class", "addTo btn btn-success m-1");

                // "Stream" button
                stream = $("<button>Stream on last.fm</button>");
                stream.attr("type", "button");
                stream.attr("class", "stream btn btn-primary m-1");
               
                bigImg = $('<img src=' + "'" + imgSrc + "'" + '">');
                bigImg.attr("class","bigI")

                $(".albumTitle").append(title);
                $(".artist").append("by "+ artist);
                $(".bigImg").append(bigImg)
                $(".twobuttons").append(addTo);
                $(".twobuttons").append(stream);

                // Add button click function
                //   Creates a new album object from the data associated with this album,
                //   then makes a post request to add the album to the user's collection
                $(".addTo").click(function () {     
                    const newAlbum = {
                        name: title,
                        artist: artist,
                        streamURL: res.url,
                        imageURL: imgSrc,
                        wikiSummary: title + ' by ' + artist,
                        mbid: title,
                    }
                    
                    $.post("/api/album", newAlbum)
                    .then(function() {
                        window.location.replace("/myCollection");
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                });

                // Stream button click function
                //   Opens the last.fm streaming url in a new window
                $(".stream").on("click", function () {
                    window.open(res.url);
                });
            })
        }
    })
})