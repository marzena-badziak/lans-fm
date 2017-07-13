var LastfmAPI = require("lastfmapi");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/getSimilar", function(req, res) {
  var artistName = req.body.artist;

  var lfm = new LastfmAPI({
    api_key: "5df8d91bac81fb9ea65ca73b43ecec62",
    secret: "1186a5beaa848cba51f710c4685be2e9"
  });

  var mySimilar = [];

  lfm.artist.getSimilar(
    {
      artist: artistName,
      limit: 50
    },
    function(err, artists) {
      if (err) {
        console.log(err);
      }
      var matches = artists.artist.filter(a => {
        return a.match > 0.1 && a.match < 0.3;
      });
      matches.forEach(matchedArtist => {
        lfm.artist.getTopTracks(
          {
            artist: matchedArtist.name,
            limit: 5
          },
          function(err, best) {
            if (err) {
              console.log(err);
            }
            var bestArr = best.track;
            var listeners = 0;
            for (var i = 0; i < bestArr.length; i++) {
              listeners += parseInt(bestArr[i].listeners);
            }

            mySimilar.push({ name: matchedArtist.name, listeners: listeners });

            if (mySimilar.length === matches.length) {
              mySimilar.sort((a, b) => {
                return a.listeners - b.listeners;
              });
              res.end(JSON.stringify(mySimilar));
            }
          }
        );
      });
    }
  );

});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
});
