$(document).ready(()=> {
    $('#search-form').on('submit', (e)=> {
        let searchText = $('#searchText').val();
        getAnimes(searchText);
        e.preventDefault();
    });
});
function getAnimes(searchText) {
    axios.get('https://kitsu.io/api/edge/anime?filter[text]='+searchText)
    .then((response) => {
        console.log(response);
        let animes = response.data.data;
        let output = "";
        $.each(animes, (index, anime)=> {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${anime.attributes.posterImage.tiny}">
                        <h5>${anime.attributes.titles.en_jp}</h5>
                        <button type="button" class="btn btn-primary" onClick="SearchedAnime('${anime.id}')">See Details</button>
                    </div>
                </div>
            `;
        });
        $('#animes').html(output);
    })
    .catch((err) => {
        console.log(err);
    })
}

function SearchedAnime(id) {
    sessionStorage.setItem('animeId', id);
    window.location = 'animeDetails.html';
    return false;
}

function getAnime() {
    let anime = sessionStorage.getItem('animeId');
    axios.get('https://kitsu.io/api/edge/anime/'+anime)
    .then((response) => {
        console.log(response);
        let animes = response.data.data;
        let output = `
            <div class=row>
                <div class = col-md-4>
                    <img src="${animes.attributes.posterImage.small}">
                    <h5 class="animeName">${animes.attributes.titles.en_jp}</h5>
                </div>
                <div class = col-md-2>
                    <div>Started On:</div>
                    <div>Ended On:</div>
                    <div>Age Rating:</div>
                    <div>Average Rating:</div>
                    <div>Status:</div>
                    <div>About:</div>
                </div>
                <div class = col-md-6>
                    <div>${animes.attributes.startDate}</div>
                    <div>${animes.attributes.endDate}</div>
                    <div>${animes.attributes.ageRatingGuide}</div>
                    <div>${animes.attributes.averageRating}</div>
                    <div>${animes.attributes.status}</div>
                    <div class="about">${animes.attributes.synopsis}</div>
                </div>
            </div>
        `;
        $('.animeDetails').html(output);
        console.log(animes.attributes.slug);
    })
    .catch((err) => {
        console.log(err);
    })
}
