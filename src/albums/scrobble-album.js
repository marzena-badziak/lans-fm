import _ from "lodash"

export const scrobbleAlbum = (album) => {
  let scrobbleRequest = "";
  let timestampOfScrobble = _.now();
  _.forEachRight(album, function(track) {
    timestampOfScrobble -= track.duration;
    scrobbleRequest +=
      `&track[${track.rank - 1}]=${track.name}&artist[${track.rank - 1}]=${track.artist.name}&timestamp[${track.rank - 1}]=${timestampOfScrobble}&mbid[${track.rank - 1}]=${track.mbid}`;
    });
}
