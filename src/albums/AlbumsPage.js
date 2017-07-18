import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlbums } from "../artists/search-actions.js";
import AlbumTile from "./AlbumTile";
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
// linijka przerwy pomiedzy importami
class AlbumsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false
    };
  }
  fetchAlbums = e => {
    // a
    console.log("a");
    this.props.dispatch(
      getAlbums({
        // nazwa zmiennej z małej litery
        data: this.props.params.AritstName
      })
    );
  };
  componentDidMount() {
    this.fetchAlbums();
    // dopiero chyba startuje fetch? nic jeszcze nie jest "fetched" w tym momencie
    this.setState({
      fetched: true
    });
  }
  renderTiles() {
    // zbedny komentarz
    console.log(this.props);
    // co tu się dzieje? jakoś nie tak poszło z tymi zagniezdzeniami
    if (this.props.albums.albums.album) {
      return this.props.albums.albums.album.map((album, i) => {
        if (!(album.name == "(null)")) {
          return (
            <AlbumTile
              key={i}
              {/* czemu akurat ten obrazek? */}
              image={album.image[2]["#text"]}
              title={album.name}
              artist={album.artist.name}
            />
          );
        }
      });
    } else {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }
  }
  // jak potrzebujemy jeden element z kolekcji to 'find'
  // warunek w 'if' nie powinien byc tak duzy, wydziel do metody albo do zmiennej
  // plus tutaj dwa razy wolasz ta sama petle
  artistImageCheck = () => {
    if (
      this.props.results.filter(
        artist => artist.name == this.props.params.AritstName
      )[0]
    ) {
      return this.props.results.filter(
        artist => artist.name == this.props.params.AritstName
      )[0].image[2]["#text"];
    }
  };
  render() {
    return (
      <div className="container">
        <h2>
          {this.props.params.AritstName}
        </h2>
        <Avatar
          src={this.artistImageCheck()}
          alt={`${this.props.params.AritstName} foto`}
          size={200}
        />
        <SearchResultsContainer>
          {this.renderTiles()}
        </SearchResultsContainer>
      </div>
    );
  }
}
const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  float: none;
  margin: 0 auto;
  padding: 20px 0;
`;
const mapStateToProps = state => {
  return {
    results: state.search.artistsSimilar,
    albums: state.albums
  };
};
export default connect(mapStateToProps)(AlbumsPage);
