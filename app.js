const express = require('express');
const cheerio = require('cheerio');
const request = require('request');

const app = express();

const port = 3001;

app.get('/', function (req, res) {
  res
    .status(200)
    .send(
      `Go to ${req.headers.host}/holders/{tokenAddress} to get the wallet holders`
    );
});

app.get('/supply/:id', function (req, res) {
  request(
    {
      method: 'GET',
      url: `https://etherscan.io/token/${req.params.id}`,
    },
    (err, response, body) => {
      if (err) return res.status(500).error(err);

      let $ = cheerio.load(body);

      //   let title = $('title');

      let holder = $('#ContentPlaceHolder1_tr_tokenHolders .col-md-8');

      let supply = $('.hash-tag')[0].children[0].data;

      console.log('****************************************************');
      console.log(supply);

      res.status(200).send(supply);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
