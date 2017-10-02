"use strict";
const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";
// Objeto que almacenará los datos obtenidos del input
const app = {
    result: {
        videos: [],
        selectedVideo: null,
        searchTerm: "",

    },
    // función que llamada al evento tiene que mostrar los videos relacionados con el valor del input
    init: function() {
        $('#buscarBTN').click(app.buscarBTN);
        $('input').keypress(app.buscarBTN)
    },
    buscarBTN: (e) => {
        console.log(e.which)
        if ((e.keyCode || e.which) == 13 || (e.keyCode || e.which) == 1) {
            app.youtubeSearch($("#buscar").val());
        }

    },
    getVideoList: function(videos) {
        return videos.map((video, index) => {
            const imageUrl = video.snippet.thumbnails.default.url;
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            return `<div><img class="media-object" src=${imageUrl} /></div>
                        <p><div>
                            <iframe class="embed-responsive-item" src=${url}> </iframe>
                        <div></p>
               `;
        });
    },
    youtubeSearch: function(searchTerm) {
        console.log(searchTerm);

        YTSearch({ key: API_KEY, term: searchTerm }, data => {
            console.log("result", data);
            app.result = {
                videos: data,
                selectedVideo: data[0],
                searchTerm: searchTerm
            };
            var list = app.getVideoList(app.result.videos);
            console.log("lis: ", list);
            $("#root").html(list);
        });
    },
    videoSearch: function(searchTerm) {
        jQuery.getJSON("list.json", data => {
            console.log("result", data.items);
            app.result = {
                videos: data.items,
                selectedVideo: data.items[0],
                searchTerm: searchTerm
            };
            var list = app.getVideoList(app.result.videos);
            console.log("lis: ", list);
            $("root").append(list);
        });
    }
};

$(document).ready(app.init);
