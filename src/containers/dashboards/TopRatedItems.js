import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";

import ReactSiemaCarousel from "../../components/ReactSiema/ReactSiemaCarousel";
import Rating from "../../components/common/Rating";
import data from "../../data/topRatedItems";

const TopRatedItem = ({ image, order, title, rate, rateCount }) => (
  <div className="pr-2 pl-2">
    <img src={image} alt={title} className="mb-4" />
    <h6 className="mb-1">
      <span className="mr-2">{order}.</span>
      {title}
    </h6>
    <Rating total={5} rating={rate} interactive={false} />
    <p className="text-small text-muted mb-0 d-inline-block">({rateCount})</p>
  </div>
);

const TopRatedItems = () => {
  const sliderPerPage = {
    0: 1,
    480: 2,
    992: 1
  };

  return (
    <Card className="dashboard-top-rated">
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.top-rated-items" />
        </CardTitle>
        <ReactSiemaCarousel
          perPage={sliderPerPage}
          controls={false}
          loop={false}
        >
          {data &&
            data.map((item, index) => (
              <div key={index}>
                <TopRatedItem {...item} />
              </div>
            ))}
        </ReactSiemaCarousel>
      </CardBody>
    </Card>
  );
};

export default TopRatedItems;
