import styled from "styled-components";

const PlaylistsStyled = styled.div`
  --playlist-bg: #171616;
  --playlist-hover-bg: #252525;
  --scrollbar-thumb-bg: rgb(36, 36, 36);
  --description-color: #ebe1e1;
  --author-color: rgb(95, 95, 95);

  grid-area: content;
  overflow-y: auto;
  color-scheme: dark;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  column-gap: 40px;
  padding: 20px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb-bg);
    border-radius: 15px;
  }

  .playlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 270px;
    padding: 15px;
    background-color: var(--playlist-bg);
    border-radius: 6px;
    cursor: pointer;
    transition: background-color ease 0.4s;
    position: relative;
    min-height: 350px;

    &:hover {
      background-color: var(--playlist-hover-bg);
    }
  }

  .playlist_cover img {
    width: 100%;
    border-radius: 6px; // Ensuring consistency in border-radius
  }

  .description {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .playlist_name, .playlist_author {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .playlist_name {
    color: var(--description-color);
    font-size: 20px;
    font-weight: bold; 
  }

  .playlist_author {
    color: var(--author-color);
    font-size: 16px; 
  }
`;

export default PlaylistsStyled;