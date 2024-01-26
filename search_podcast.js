document.addEventListener("DOMContentLoaded", function() {
    const resultPodcast = document.getElementById("result-podcast");
    const playlistContainer = document.getElementById("result-playlists");
    const searchInput = document.getElementById("search-input");
  
    function requestApi(searchTerm) {
      fetch(`http://localhost:4000/podcasts?name_like=${searchTerm}`)
        .then((response) => response.json())
        .then((results) => displayResults(results));
    }
  
    function displayResults(results) {
      hidePlaylists();
      const podcastImage = document.getElementById("podcast-img");
      const podcastName = document.getElementById("podcast-name");
    
      results.forEach((element) => {
        podcastImage.src = element.urlImg;
        podcastName.innerText = element.name;
      });
      resultPodcast.classList.remove("hidden");
    }
    
  
    function hidePlaylists() {
      if (playlistContainer) {
        playlistContainer.classList.add("hidden");
      }
    }
  
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm === "") {
        resultPodcast.classList.add("hidden");
        if (playlistContainer) {
          playlistContainer.classList.remove("hidden");
        }
        return;
      }
      requestApi(searchTerm);
    });
  });