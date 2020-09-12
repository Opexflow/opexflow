import React from 'react';

import ReactSiemaCarousel from '../../components/ReactSiema/ReactSiemaCarousel';
import IconCard from '../../components/cards/IconCard';

import data from '../../data/iconCards';

const IconCardsCarousel = ({ className = 'icon-cards-row' }) => {
    const sliderPerPage = {
        '0': 1,
        '320': 2,
        '576': 3,
        '1800': 4,
    };

    return (
        <div className={className}>
            <ReactSiemaCarousel perPage={sliderPerPage} controls={false} loop={false}>
                {data.map((item, index) => (
                <div key={`icon_card_${index}`}>
                      <IconCard {...item} className="mb-4" />
                    </div>
                ))}
          </ReactSiemaCarousel>
      </div>
    );
};
export default IconCardsCarousel;
