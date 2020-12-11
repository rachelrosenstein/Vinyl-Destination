$(document).ready(function () {
    const apiKey = "bcc2561c14a397a8ead4a93fa8ca760d";
    const queryURL = "https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=" + apiKey + "&format=json";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        let newImgDiv = "";
        let bigImg = "";
        let title = "";
        let artist = "";
        let addTo = "";
        let stream = "";


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
            //============================================================
            $(document).on('click', '.n' + i, function (event) {
                $(".albumTitle").empty();
                $(".artist").empty();
                $(".bigImg").empty();

                console.log(response.albums.album[i].artist.name)

                title = response.albums.album[i].name;
                artist = response.albums.album[i].artist.name;

                addTo = $("<button> Add to Favorites </button>")
                addTo.attr("type", "button");
                addTo.attr("class", "addTo");
                stream = $("<button> stream </button>");
                stream.attr("type", "button")
                stream.attr("class", "stream");
                $(".btn2").attr("action", "/"+response.albums.album[i].url);
                bigImg = '<img src=' + "'" + imgSrc + "'" + '">';

                $(".albumTitle").append(title);
                $(".artist").append(artist);
                $(".bigImg").append(bigImg)
                $(".btn1").append(addTo);
                $(".btn2").append(stream);

                $(".addTo").on("click", function () {
                    window.location.replace("/login");
                });
                $(".stream").on("click", function () {
                    window.location.replace(response.albums.album[i].url);
                });
            })

        }
    })
})


