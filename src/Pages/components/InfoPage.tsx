import React, { useEffect, useState } from "react";
import { log } from "../../helpers/log";
import InfoPageStyled from "./StyledComponents/InfoPageStyled";

interface InfoPageProps {
  closeHandler: () => void;
}

const features = [
  {
    name: "categoryName1",
    features: [
      {
        name: "Lorem, ipsum dolor.",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
                    aliquid?`,
      },
    ],
  },
  {
    name: "categoryName2",
    features: [
      {
        name: "Lorem, ipsum dolor.",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
                    aliquid?`,
      },
      {
        name: "Lorem, ipsum dolor.",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
                    aliquid?`,
      },
    ],
  },
];

const renderFeatures = () => {
  return features.map((category: any) => {
    return (
      <div className="category">
        <div className="categoryName">{category.name}</div>
        {category.features.map((feature: any) => {
          return (
            <div className="feature">
              <div className="name">{feature.name}</div>
              <div className="description">{feature.description}</div>
            </div>
          );
        })}
      </div>
    );
  });
};

const renderContributions = () => {
  return features.map((category: any) => {
    return <>renderContributions</>;
  });
};

const availableViewsEnum = {
  featureInfo: Symbol("featureInfoView"),
  contributionInfo: Symbol("contributionInfoView"),
};

//@ts-ignore
availableViewsEnum["defaultView"] = availableViewsEnum.featureInfo;

const availableViewsRunners = {
  //@ts-ignore
  [availableViewsEnum.defaultView]: renderFeatures,
  [availableViewsEnum.featureInfo]: renderFeatures,
  [availableViewsEnum.contributionInfo]: renderContributions,
};

const viewsRendererRun = (view: symbol) => {
  //@ts-ignore
  if (view === availableViewsEnum[availableViewsEnum.defaultView]) {
    return availableViewsRunners[availableViewsEnum.contributionInfo]();
  }
  if (typeof availableViewsRunners[view] === "function") {
    return availableViewsRunners[view]();
  }
};

const InfoPage: React.FC<InfoPageProps> = ({ closeHandler }) => {
  const [currentView, setCurrentView] = useState<symbol>(
    //@ts-ignore
    availableViewsEnum.defaultView
  );

  useEffect(() => {
    log("Info page opened");
  }, []);

  // TODO: Reimplement so that the header buttons are generated automatically. The outcome of this can be more concise assignment of currentView class as well.
  return (
    <InfoPageStyled>
      <div className="header">
        <button className="closeButton center" onClick={closeHandler} />
        <div
          className={
            "featureInfo center " +
            (availableViewsEnum.featureInfo === currentView && " currentView")
          }
          onClick={() => setCurrentView(availableViewsEnum.featureInfo)}
        >
          Features
        </div>
        <div
          className={
            "contributionInfo center " +
            (availableViewsEnum.contributionInfo === currentView &&
              " currentView")
          }
          onClick={() => setCurrentView(availableViewsEnum.contributionInfo)}
        >
          Contributions
        </div>
      </div>

      <div className="content">{viewsRendererRun(currentView)}</div>
    </InfoPageStyled>
  );
};

export default InfoPage;
