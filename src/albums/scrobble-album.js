import _ from "lodash";
import md5 from "md5";

export const scrobbleAlbum = (album, session) => {
  let scrobbleRequest = "";
  let timestampOfScrobble = _.now();
  console.log(album);
  /*_.forEachRight(album, function(track) {
    timestampOfScrobble -= track.duration;
    scrobbleRequest +=
      `&track[${i}]=${track.name}&artist[${i}]=${track.artist.name}&timestamp[${i}]=${timestampOfScrobble}&mbid[${i}]=${track.mbid}`;
    i++
  });*/
  axios
    .get(`${lastfmScrobble(scrobbleRequest, scrobbleOptions)}`)
    .then(function(response) {
      console(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
