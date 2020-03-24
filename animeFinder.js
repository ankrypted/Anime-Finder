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