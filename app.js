"use strict";
const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";
// Objeto que almacenará los datos obtenidos del input
let app = {
    result: {
        videos: [],
        selectedVideo: null,
<<<<<<< HEAD
        searchTerm: "",
=======
        searchTerm: undefined

>>>>>>> 6ca27d5b221e3ff5ac4e653d608bc4de9c54b9d3
    },
    // función que llamada al evento tiene que mostrar los videos relacionados con el valor del input
    init: () => {
        $('#buscarBTN').click(app.buscarBTN);
        $('input').keypress(app.buscarBTN);
        
    },
    buscarBTN: (e) => {
        console.log(e.which)
        if ((e.keyCode || e.which) == 13 || (e.keyCode || e.which) == 1) {
           
            app.youtubeSearch($("#buscar").val());
            event.preventDefault();
        }

    },
    getVideoList: (videos) => {
        return videos.map((video, index) => {
            const imageUrl = video.snippet.thumbnails.default.url;
            const title = video.snippet.title;
            const channel = video.snippet.channelTitle;
            const descripcion = video.snippet.description;
            return (`
            <div class = "row"
                <div class="col-sm-8">                     
                  <img class= "media-object" src=${imageUrl}/>
                  <h4>${title}</h4>
                  <p>${channel}</p>
                  <p>${descripcion}</p>                                      
                </div>
            </div>`);
           
            
        });
    },
  
    youtubeSearch: (searchTerm)=> {
        console.log(searchTerm);

        YTSearch({ key: API_KEY, term: searchTerm }, data => {
            console.log("result", data);
            app.result = {
                videos: data,
                selectedVideo: data[0],
                searchTerm: searchTerm
            };
            app.bigVideo(app.result.videos[0]);
            let list = app.getVideoList(app.result.videos);
            console.log("lis: ", list);
            $("#img").html(list);
            $('img').click(app.playVideo);

        });
    },
    bigVideo:(video)=>{
        const descripcion = video.snippet.description;
        const url = `https://www.youtube.com/embed/${video.id.videoId}`;
        $('#vd').html(`<div class="embed-responsive embed-responsive-16by9" > 
        <iframe class="embed-responsive-item" src=${url}> </iframe>
        <p>${descripcion}</p>
        </div>`)
    },
    playVideo:()=>{
        let src = event.target.src 
        let idx;
        app.result.videos.map((elemento, i) => {
            return (src == elemento.snippet.thumbnails.default.url) ? idx = i : '';
        });
        console.log(idx);
        app.bigVideo(app.result.videos[idx]);
    },
//     videoSearch: (searchTerm) =>{
//         jQuery.getJSON("list.json", data => {
//             console.log("result", data.items);
//             app.result = {
//                 videos: data.items,
//                 selectedVideo: data.items[0],
//                 searchTerm: searchTerm
//             };
//             var list = app.getVideoList(app.result.videos);
//             console.log("lis: ", list);
//             $("bigVideo").append(list);       
//         });
// }
      
}


$(document).ready(app.init);
