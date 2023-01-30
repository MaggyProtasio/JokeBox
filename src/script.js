//Custom circular mouse pointer
$(document).ready(function() {
    $(document).on('mousemove', function(e) {
      $('#circular-cursor').css({
        left: e.pageX,
        top: e.pageY
      });
    })
  });

//added jokes if i want them more customized, then i can use 33% chance against 66% chance from the API
/* const addedJokes = [{
        id: "1",
        joke: " "
    },{
        id: "2",
        joke: " "
    },{
        id: "3",
        joke: " "
    }
]
*/ 

//from JokeAPI 
var baseURL = "https://v2.jokeapi.dev";
var params = [
    "blacklistFlags=nsfw,religious,racist",   
    "idRange=0-100",
    //"type=single"
];
var textColor = ["rgb(149, 255, 139)", "rgb(186, 209, 255)", "rgb(255, 228, 193)" ];         //green, blue, orange
var colorIndex = 0;
var exceptionJoke = "Two C strings";

function getJoke() {
    var jokeTypeIndex = Math.floor(Math.random() * 3) + 1;      //number from 1-3
    //if (jokeTypeIndex == 1 || jokeTypeIndex == 2) {           //if joke type is from the public API (66% chance over the other type, if i add this)
        var xhr = new XMLHttpRequest();
        xhr.open("GET", baseURL + "/joke/Programming?" + params.join("&"));
        xhr.onreadystatechange = function() {
            // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
            if(xhr.readyState == 4 && xhr.status < 300) {
                console.log(this.responseText);
                var randomJoke = JSON.parse(xhr.responseText);
                if(randomJoke.type == "single"){
                    // If type == "single", the joke only has the "joke" property
                    document.getElementById("joke-box").innerHTML = randomJoke.joke;
                }else{  
                    // If type == "twopart", the joke only has two properties setup and delivery
                    var joke = randomJoke.setup + '<br><br>' + randomJoke.delivery;
                    document.getElementById("joke-box").innerHTML = joke;
                }
            }else if(xhr.readyState == 4){
                document.getElementById("joke-box").innerHTML = "Error while requesting joke.\n\nStatus code: " + xhr.status + "\nServer response: " + xhr.responseText;
            }
        };
        xhr.send();
        //randomizing generated joke text color
        if (colorIndex == 3) {
            colorIndex = 0;
        }
        var randomColor = textColor[colorIndex];              //generates number from 0-2
        document.getElementById("joke-box").style.color = randomColor;
        colorIndex++;
    //} else if (jokeTypeIndex == 3){           //if joke type is from local array
        
    //}

}
