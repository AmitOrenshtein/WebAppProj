const axios = require('axios');

const pageId = '109104362255983';

const publishPostForNewSale = function (categoryAmount) {
    let message = 'Another customer bought shoes! He bought';
    for(let cat in categoryAmount) {
        message += ' ' + categoryAmount[cat] + ' ' + cat + ' shoes';
    }
    message += ".";
    axios.post("https://graph.facebook.com/"+pageId+"/feed", {
        message: message,
        access_token: process.env.facebookPageToken
    })
        .then((response) => {
            console.log("successfully post in facebook page.", response.data);
        })
        .catch((err) => console.log(err));
}

module.exports = {
    publishPostForNewSale
}