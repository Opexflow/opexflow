import React from 'react';
import { Row, CardTitle } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import IconCard from '../../components/cards/IconCard';

import data from '../../data/iconCards';

const IconCards = () => (
    <Row>
    <Colxx xxs="12">
          <CardTitle className="mb-4">
              <IntlMessages id="cards.icon-card" />
            </CardTitle>
          <Row className="icon-cards-row mb-2">
              {data.map((item, index) => (
                    <Colxx xxs="6" sm="4" md="3" lg="2" key={`icon_card_${index}`}>
                        <IconCard {...item} className="mb-4" />
                </Colxx>
                ))}
            </Row>
        </Colxx>
  </Row>
);

export default IconCards;
