import React from 'react';
import { Sortable } from 'react-sortablejs';

import { Colxx } from '../../components/common/CustomBootstrap';
import RadialProgressCard from '../../components/cards/RadialProgressCard';

const SortableStaticticsRow = ({ messages }) => (
    <Sortable options={{ handle: '.handle' }} className="row">
    <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
              title={messages['dashboards.payment-status']}
              percent={64}
              isSortable
            />
        </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
              title={messages['dashboards.work-progress']}
              percent={75}
              isSortable
            />
        </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
              title={messages['dashboards.tasks-completed']}
              percent={32}
              isSortable
            />
        </Colxx>
    <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
              title={messages['dashboards.payments-done']}
              percent={45}
              isSortable
            />
        </Colxx>
  </Sortable>
);
export default SortableStaticticsRow;
