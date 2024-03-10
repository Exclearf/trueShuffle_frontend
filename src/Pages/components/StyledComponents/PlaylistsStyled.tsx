import styled from "styled-components";

const PlaylistsStyledShort = styled.div`
  --playlist-bg: #171616;
  --playlist-hover-bg: #252525;
  --scrollbar-thumb-bg: rgb(36, 36, 36);
  --description-color: #ebe1e1;
  --author-color: rgb(95, 95, 95);

  grid-area: content;
  overflow-y: auto;
  color-scheme: dark;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 35px;
  padding: 15px;

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
    min-width: 260px;
    width: 270px;
    padding: 15px;
    background-color: var(--playlist-bg);
    border-radius: 6px;
    cursor: pointer;
    transition: background-color ease 0.4s;
    position: relative;
    height: 325px;

    &:hover {
      background-color: var(--playlist-hover-bg);
    }
  }

  .playlist_cover img {
    width: 100%;
    border-radius: 6px;
  }

  .description {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .playlist_name,
  .playlist_author {
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

const PlaylistsStyledLong = styled.div`
  --playlist-bg: #171616;
  --playlist-hover-bg: #252525;
  --scrollbar-thumb-bg: rgb(36, 36, 36);
  --description-color: #ebe1e1;
  --author-color: rgb(95, 95, 95);

  grid-area: content;
  overflow-y: auto;
  color-scheme: dark;
  display: grid;
  grid-template-columns: 1fr; // Single column layout for long style
  gap: 35px;
  padding: 15px;

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

  &::-webkit-scrollbar-thumb:active {
    background-color: rgba(248, 237, 255, 0.5);
  }

  .playlist {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    padding: 15px;
    background-color: var(--playlist-bg);
    border-radius: 6px;
    cursor: pointer;
    transition: background-color ease-in-out 200ms;
    min-height: 150px;
    max-height: 200px;

    &:hover {
      background-color: var(--playlist-hover-bg);
    }
  }

  .playlist_cover {
    flex: 0 0 auto;
    width: 150px;
    height: 150px;
    margin-right: 15px;
  }

  .playlist_cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    margin-left: 15px;
  }

  .playlist_name,
  .playlist_author {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .playlist_name {
    color: var(--description-color);
    font-size: 30px;
    font-weight: bold;
    height: 35px;
  }

  .playlist_author {
    color: var(--author-color);
    font-size: 20px;
  }
`;

export { PlaylistsStyledLong, PlaylistsStyledShort };
