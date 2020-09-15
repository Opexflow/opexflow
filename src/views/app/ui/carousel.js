import React, { Component } from 'react';
import {
    Row, Card, CardBody, CardTitle,
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../helpers/IntlMessages';
import ReactSiemaCarousel from '../../../components/ReactSiema/ReactSiemaCarousel';

import data from '../../../data/carouselItems';

const BasicCarouselItem = ({
    title, img, detail, badges,
}) => (
    <div className="pr-3 pl-3">
    <Card className="flex-row">
          <div className="w-50 position-relative">
              <img className="card-img-left" src={img} alt={title} />
              {badges &&
            badges.map((b, index) => (
              <span
                    key={index}
                    className={`badge badge-pill badge-${
                    b.color
                  } position-absolute ${
                    index === 0 ?
                        'badge-top-left' :
                        `badge-top-left-${ index + 1}`
                  }`}
                >
                    {b.title}
                </span>
            ))}
            </div>
          <div className="w-50">
              <CardBody>
                  <h6 className="mb-4">{title}</h6>
                  <footer>
                      <p className="text-muted text-small mb-0 font-weight-light">
                          {detail}
                        </p>
                    </footer>
                </CardBody>
            </div>
        </Card>
  </div>
);

const SingleCarouselItem = ({
    title, img, category, detail, badges,
}) => (
    <div className="pr-3 pl-3">
    <Card className="flex-row">
          <img
              className="list-thumbnail responsive border-0"
              src={img}
              alt={title}
            />

          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <CardBody className="align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <p className="list-item-heading mb-1 truncate">{title}</p>

                  <p className="mb-0 text-muted text-small">{category}</p>
                  <p className="mb-0 text-muted text-small">{detail}</p>
                  <div>
                      {badges &&
                badges.map((b, index) => (
                  <span
                        key={index}
                        className={`badge badge-pill badge-${b.color} ${index <
                        badges.length && 'mr-1'}`}
                    >
                        {b.title}
                    </span>
                ))}
                    </div>
                </CardBody>
            </div>
        </Card>
  </div>
);

const NoControlCarouselItem = ({
    title, img, detail, badges,
}) => (
    <div className="pr-3 pl-3">
    <Card>
          <div className="position-relative">
              <img className="card-img-top" src={img} alt={title} />
              {badges &&
            badges.map((b, index) => (
              <span
                    key={index}
                    className={`badge badge-pill badge-${
                    b.color
                  } position-absolute ${
                    index === 0 ?
                        'badge-top-left' :
                        `badge-top-left-${ index + 1}`
                  }`}
                >
                    {b.title}
                </span>
            ))}
            </div>
          <CardBody>
              <h6 className="mb-4">{title}</h6>
              <footer>
                  <p className="text-muted text-small mb-0 font-weight-light">
                      {detail}
                    </p>
                </footer>
            </CardBody>
        </Card>
  </div>
);

export default class CarouselUi extends Component {
    render() {
        return (
            <>
            <Row>
                  <Colxx xxs="12">
                      <Breadcrumb heading="menu.carousel" match={this.props.match} />
                      <Separator className="mb-5" />
                    </Colxx>
                </Row>
            <Row>
                  <Colxx xxs="12">
                      <CardTitle>
                          <IntlMessages id="carousel.basic" />
                        </CardTitle>
                    </Colxx>

                  <Colxx xxs="12" className="pl-0 pr-0 mb-5">
                      <ReactSiemaCarousel
                          perPage={{
                                '0': 1,
                                '1000': 2,
                                '1400': 3,
                            }}
                          loop={false}
                        >
                          {data.map(item => (
                                <div key={item.id}>
                                    <BasicCarouselItem {...item} />
                            </div>
                            ))}
                        </ReactSiemaCarousel>
                    </Colxx>
                </Row>
            <Row>
                  <Colxx xxs="12">
                      <CardTitle>
                          <IntlMessages id="carousel.single" />
                        </CardTitle>
                    </Colxx>

                  <Colxx xxs="12" className="pl-0 pr-0 mb-5">
                      <ReactSiemaCarousel
                          perPage={{
                                '0': 1,
                            }}
                          loop={false}
                        >
                          {data.map(item => (
                                <div key={item.id}>
                                    <SingleCarouselItem {...item} />
                            </div>
                            ))}
                        </ReactSiemaCarousel>
                    </Colxx>
                </Row>
            <Row>
                  <Colxx xxs="12">
                      <CardTitle>
                          <IntlMessages id="carousel.without-controls" />
                        </CardTitle>
                    </Colxx>

                  <Colxx xxs="12" className="pl-0 pr-0 mb-5">
                      <ReactSiemaCarousel
                          perPage={{
                                '0': 1,
                                '480': 2,
                                '800': 3,
                                '1200': 4,
                            }}
                          controls={false}
                          loop={false}
                        >
                          {data.map(item => (
                                <div key={item.id}>
                                    <NoControlCarouselItem {...item} />
                            </div>
                            ))}
                        </ReactSiemaCarousel>
                    </Colxx>
                </Row>
          </>
        );
    }
}
