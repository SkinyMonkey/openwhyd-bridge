const Whyd = require('./whyd');

const whyd = new Whyd();

const cheerio = require('cheerio')

const express = require('express')
, cors = require('cors')
, app = express();

app.use(cors());

function serialize( obj ) {
  if (Object.keys(obj).length) {
    return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
  }
  return '';
}

// app.get('/u/:user_id/playlists/:playlist_id', function (req, res, next) {

app.get('/u/:user_id/playlists', function (req, res, next) {
  console.log('PLAYLISTS');

  req.query.format = 'list';

  console.log(req.path + serialize(req.query));

  whyd.get(req.path + serialize(req.query))
      .then((response, eh) => {
        return response.text()
      })
      .then((text) => {
        const $ = cheerio.load(text);

        const playlists = [];

        $('h2 > a').each((h, a) => {
  //        console.log(a);

          playlists.push({url: a.attribs.href,
                          name: a.children[0].data,
//                          id: a.attribs.href.split('/')[4]
                        });
        });

        res.json(playlists);
      })
      .catch((error) => {
        console.error(error);
        res.json({error: 'Internal server error'});
      });
});

app.get('*', function(req, res, next){
  console.log('OTHER');
  console.log(req.path + serialize(req.query));

  whyd.get(req.path + serialize(req.query))
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error(error);
        res.json({error: 'Internal server error'});
      });
});

app.listen(8000, function(){
  console.log('CORS-enabled openwhyd bridge listening on port 8000');
});
