$("#addCollection").on("click", function (event) {
    event.preventDefault()

    const name = $("#albumInput").val();
    const artist = $("#artist").val();
    const summary = $("#summary").val();
    const imageURL = $("#coverArt").val();
    const newRecord = $("<li>" + name + " by " + artist + " has been added to your collection" + "</li>");

    const newAlbum = {
        name: name,
        artist: artist,
        streamURL: null,
        imageURL: imageURL,
        wikiSummary: summary,
        mbid: null
    };
    addAlbum(newAlbum);
});

function addAlbum(album) {
    console.log(album);
    $.post("/api/album", album)
        .then(function () {
            window.location.replace("/myCollection");
        })
        // If there's an error, log the error
        .catch(function (err) {
            console.log(err);
        });
}