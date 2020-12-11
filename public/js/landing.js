$(document).ready(function () {
    const apiKey = "bcc2561c14a397a8ead4a93fa8ca760d";
    const queryURL = "https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=" + apiKey + "&format=json";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        let newImgDiv = "";
        let title = "";
        let artist = "";
        for (let i = 0; i <= 7; i++) {
            // let imgSrc = response.albums.album[i].image[2]["#text"];
            let imgSrc;
            let res = response.albums.album[i]
            if (i === 0) {
                imgSrc = response.albums.album[i].image[3]["#text"];
            } else if (i >= 1) {
                imgSrc = response.albums.album[i].image[2]["#text"];
            }
            // console.log(res);
            // console.log(imgSrc);

            newImgDiv = '<img src=' + "'" + imgSrc + "'" + '">';

            $('.n' + i).append(newImgDiv);
        }
    })
})
            //=================================================

    //         $(document).on('click', '.n' + i, function (event) {
    //             const album = $('#searchBar').val();
    //             const queryURL = 'http://ws.audioscrobbler.com/2.0/?method=album.search&album=' + album + '&api_key=7a06fd430e2d699b85d6ce8f8043cc7e&format=json';

    //             $.ajax({
    //                 url: queryURL,
    //                 method: 'GET'
    //             }).then(function (response) {
    //                 let results = response.results.albummatches.album;

    //                 // Iterate through the result and build a cleaner array of objects representing each search result
    //                 for (let i = 0; i < results.length; i++) {
    //                     let newAlbum = {
    //                         name: results[i].name,
    //                         artist: results[i].artist,
    //                         imageURL: results[i].image[2]['#text'],
    //                         mbid: results[i].mbid
    //                     }
    //                     searchResults.push(newAlbum);
    //                 }

    //                 let limit = 12;
    //                 if (searchResults.length < 12) limit = searchResults.length;

    //                 $('#resultHeading').append($('<div class="col-12"><h4>Results from <a href="https://www.last.fm/home" target="blank">last.fm</a>:</h4></div>'));

    //                 for (let i = 0; i < limit; i++) {
    //                     let thisDiv = $('<div class="results col-lg-3 col-sm-4 col-xs-6"></div>');
    //                     thisDiv.attr('id', 'album');

    //                     thisDiv.append($("<hr/>"))

    //                     let nameDiv = $('<div><strong>' + searchResults[i].name + '</strong></div>');
    //                     thisDiv.append(nameDiv);

    //                     let artistDiv = $('<div><em>by ' + searchResults[i].artist + '</em></div>');
    //                     thisDiv.append(artistDiv);

    //                     let albumArt = $('<img alt="' + searchResults[i].name + ' album cover">')
    //                     if (searchResults[i].imageURL) albumArt.attr('src', searchResults[i].imageURL);
    //                     else albumArt.attr('src', 'https://via.placeholder.com/164x174/fee500?text=Cover%20Art%20Not%20Found');
    //                     albumArt.click(function () { loadAlbum(searchResults[i].mbid) });
    //                     thisDiv.append(albumArt);

    //                     $('#resultBody').append(thisDiv);
    //                 }

    //                 $('#resultHeading').removeClass('hide');
    //                 $('#resultBody').removeClass('hide');
    //             });
    //         });
    //     }
    // })
// })

//                 albumInf.empty();
//                 $(".tracks").empty();
//                 $(".tags").empty();

//                 title = "<h1>" + res.name + "</h1>";
//                 artist = "<h3>" + res.artist.name + "</h3>";
//                 addTo= "<button> Add To Your Library </button>";
//                 albumInf.append(title)
//                 albumInf.append(artist)
//                 albumInf.append(addTo)


//                 const queryURLinfo = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key="+apiKey+ "&artist="+res.artist.name+ "&album="+res.name+"&format=json";

//                 $.ajax({
//                     url: queryURLinfo,
//                     method: "GET"
//                 }).then(function(resp){
//                 summ = resp.album.url;
//                 console.log(summ);
//                 // let track = resp.album.tracks.track[i];
//                 // track = ("<li>" + resp.album.tracks.track[i].name + "</li>")
//                 moreInfo= "<button> info </button>";
//                 // moreInfo.attr("type","button");
//                 // moreInfo.addClass("btn btn-warning")
//                 // albumInf.append(addTo);
//                 for (let i = 0; i <= 10; i++){
//                     // console.log(resp.album.tags.tag[i].name);
//                     tracks = ("<ul>" + resp.album.tracks.track[i].name + "</ul>")
//                     $(".tracks").append(tracks);
//                 }
//                 for (let i = 0; i <= 3; i++){
//                     console.log(resp.album.tags.tag[i]);
//                     tags = ("<ul>" + resp.album.tags.tag[i].name + "</ul>")
//                     $(".tags").append(tags);
//                 }
//                 })
//             });
//         }
//     })
// });

