const search = document.getElementById('search');
const matchList = document.getElementById('matched-list');

//Search the data and filter it
const searchStates = async searchText => {
    const res = await fetch('../data/states.json');
    const states = await res.json();

    //check match to current input text
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    })
    if(searchText.length === 0) {
        matches = []
    }
    outputHtml(matches);
}

//Show result in DOM
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) 
                <span class="primary-text">
                     ${match.capital}
                </span> 
            </h4>
            <small> Lat: ${match.lat} / Long: ${match.long} </small>
        </div>
        `);

        console.log(html)
    }
}

search.addEventListener('input', () => searchStates(search.value));

