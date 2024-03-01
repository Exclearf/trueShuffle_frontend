import styled from "styled-components";

const InfoPageStyled = styled.div`
  width: 900px;
  height: 500px;

  background-color: rgb(36, 36, 36);
  box-shadow: 0px 0px 10px 0px rgba(248, 237, 255, 0.4);

  border-radius: 6px;
  position: absolute;

  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;

  display: grid;
  grid-template: 50px 1fr / 1fr;
  grid-template-areas:
    "header"
    "content";

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header {
    grid-area: header;

    display: grid;
    grid-template-columns: 1fr / 50px 1fr 1fr 50px;
    grid-template-areas: "closeButton featureInfo contributionInfo .";
    text-align: center;

    border-bottom: solid 2px #171616;
    color: rgba(235, 225, 225, 1);

    .currentView {
      background-color: rgba(235, 225, 225, 0.1);
    }

    .closeButton {
      grid-area: closeButton;
    }
    .featureInfo {
      grid-area: featureInfo;
    }
    .contributionInfo {
      grid-area: contributionInfo;
    }
  }

  .content {
    grid-area: content;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    color: rgba(235, 225, 225, 0.75);

    .category {
      width: 100%;
      margin: 20px 5px 20px 5px;

      display: flex;
      flex-direction: column;
      gap: 10px;

      .categoryName {
        text-align: center;
        font-size: 1.2rem;
        margin: 10px 0px 10px 0px;
      }

      .feature{
        display: grid;
        grid-template: 1fr / 1fr 3fr;
        height: auto;
        margin: 5px 0px 5px 0px;
        
        .name{
            font-size: 1rem;
        }

        .description{
            font-size: 1rem;
        }
      }
    }
  }
`;

export default InfoPageStyled;
