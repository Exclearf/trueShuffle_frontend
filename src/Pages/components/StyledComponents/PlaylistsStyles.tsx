import styled from "styled-components";

const PlaylistsStyled = styled.div`
grid-area: content;
overflow-y: auto;
color-scheme: dark;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); // Creates a responsive grid layout
gap: 30px; // Space between grid items
padding: 20px; // Padding around the grid container

&::-webkit-scrollbar {
  width: 8px;
}

&::-webkit-scrollbar-track {
  background: transparent;
}

&::-webkit-scrollbar-thumb {
  background: rgb(36, 36, 36);
  border-radius: 15px;
}

.playlist {
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-direction: column; // Changed to column for vertical layout of img + description
  background-color: rgb(36, 36, 36);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out; // Optional: adds a smooth transition effect on hover

  &:hover {
    transform: scale(1.05); // Optional: slightly increases size on hover for a dynamic effect
  }
}

.playlist_cover img {
  width: 100%; 
  height: 100%;
  object-fit: cover;
  border-radius: 15px 15px 0 0; 
}

.description {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%; 
}

.playlist_name {
  color: white;
  font-size: 20px; layout
  font-weight: bold; 
}

.playlist_author {
  color: rgb(95, 95, 95);
  font-size: 16px; 
}
`;

export default PlaylistsStyled;