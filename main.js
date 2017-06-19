/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with


// 2. Create your `onSubmit` event for getting the user's search term


// 3. Create your `fetch` request that is called after a submission


// 4. Create a way to append the fetch results to your page


// 5. Create a way to listen for a click that will play the song in the audio play
function onClick(){
let userSearch = document.querySelector("#artist-search");



fetch("https://api.soundcloud.com/users?client_id=8538a1744a7fdaa59981232897501e04&q=" + userSearch.value)

.then(function(response){
      // console.log(response);

      response.json().then(function(data) {
        // console.log("Here is the data:", data);
        let info = data[0];
        // console.log("First user:",info);





          // console.log(info);
          // console.log(userSearch.value === info.full_name);

          if(userSearch.value === info.full_name) {
            // console.log("this works");
            let results = document.querySelector(".results");

            let userPage = info.uri;
            let userId = info.id;
            // console.log("userpage:", userPage);
            getUserPage(info.uri);
          }
        // }
        });
    });
    }
        function getUserPage(hi){
            fetch(hi + "/tracks?client_id=8538a1744a7fdaa59981232897501e04")
              .then(function(response) {
                  // console.log(response);

                  response.json().then(function(data) {
                    if(response.status !== 200){
                      // console.log("Response status error: ",response.status);
                      return;
                    }

                    // console.log("Here is the next data:", data);

                    for (var i = 0; i < data.length; i++) {
                      let userData = data[i];
                      let div = document.createElement("div");
                      let images = document.createElement("img");

                      let paragraph = document.createElement("p");
                      let stream = userData.stream_url;
                      paragraph.id = stream;
                      let results = document.querySelector(".results");
                      paragraph.innerHTML += " " + userData.user.username;
                      paragraph.innerHTML += ": " + '"' + userData.title + '"';
                      images.src = userData.artwork_url;
                      results.appendChild(div);
                      div.appendChild(images);

                      div.appendChild(paragraph);


                    }
                    allDivs = document.querySelectorAll("p");
                    for (var i = 0; i < allDivs.length; i++) {
                      let divListener = allDivs[i];
                      divListener.addEventListener("click", playMusic)
                    }
                  });
                });

                  function playMusic(event){
                    // console.log(event);
                          let musicPlayer = document.querySelector(".music-player");
                          musicPlayer.src = event.target.id +"?client_id=8538a1744a7fdaa59981232897501e04";
                          let songChoice = document.createElement("p");

                          songChoice.innerHTML = "";
                          songChoice.innerHTML = "Now Playing: " + event.srcElement.innerHTML;

                          let player = document.querySelector(".player");
                          player.appendChild(songChoice);


                    }
                  }
