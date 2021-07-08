const fs = require('fs');
const cheerio = require('cheerio');
const json2csv = require('json2csv').Parser;
const axios = require('axios');

const movieUrl = "https://www.imdb.com/title/tt1457767/?ref_=hm_stp_pvs_piv_tt_i_4";

async function getMovieData(){

    // Get the html code of the web page
    const { data } = await axios.get(movieUrl);

    // Load the html to cheerio.
    const $ = cheerio.load(data);

    // Storing required data into variables.
    const title = $('h1[class="TitleHeader__TitleText-sc-1wu6n3d-0 dxSWFG"]').text();
    const rating = $('div[class="AggregateRatingButton__Rating-sc-1ll29m0-2 bmbYRW"] > span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"]').text();
    const description = $('p[class="GenresAndPlot__Plot-cum89p-6 bUyrda"] > span[class="GenresAndPlot__TextContainerBreakpointXS_TO_M-cum89p-0 dcFkRD"]').text();
    
    let idmbData = [];

    // storing the data in an array.
    idmbData.push({
        title,
        rating,
        description
    });

    write2file(idmbData);
}

// Function to write data to csv file.
function write2file(idmbData){

    // This package writes the json data to csv file
    const j2csv = new json2csv();
    const csv = j2csv.parse(idmbData);
    fs.writeFileSync('./data.csv', csv, 'utf-8');

    console.log('Your movie details are loaded!');
}

getMovieData();