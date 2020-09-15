import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactTable from 'react-table';
import classnames from 'classnames';
import IntlMessages from '../../helpers/IntlMessages';
import DataTablePagination from '../../components/DatatablePagination';

import data from '../../data/products';

const CustomTbodyComponent = props => (
    <div {...props} className={classnames('rt-tbody', props.className || [])}>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
            {props.children}
      </PerfectScrollbar>
  </div>
);

const dataTableColumns = [
    {
        Header: 'Name',
        accessor: 'title',
        Cell: props => <p className="list-item-heading">{props.value}</p>,
    },
    {
        Header: 'Sales',
        accessor: 'sales',
        Cell: props => <p className="text-muted">{props.value}</p>,
    },
    {
        Header: 'Stock',
        accessor: 'stock',
        Cell: props => <p className="text-muted">{props.value}</p>,
    },
    {
        Header: 'Category',
        accessor: 'category',
        Cell: props => <p className="text-muted">{props.value}</p>,
    },
];

export const ReactTableWithPaginationCard = props => (
    <Card className="mb-4">
    <CardBody>
          <CardTitle>
              <IntlMessages id="table.react-pagination" />
            </CardTitle>
          <ReactTable
              data={data}
              columns={dataTableColumns}
              defaultPageSize={5}
              showPageJump={false}
              showPageSizeOptions={false}
              PaginationComponent={DataTablePagination}
              className="react-table-fixed-height"
            />
        </CardBody>
  </Card>
);
export const ReactTableWithScrollableCard = props => (
    <Card className="mb-4">
    <CardBody>
          <CardTitle>
              <IntlMessages id="table.react-scrollable" />
            </CardTitle>
          <ReactTable
              data={data}
              TbodyComponent={CustomTbodyComponent}
              columns={dataTableColumns}
              defaultPageSize={20}
              showPageJump={false}
              showPageSizeOptions={false}
              showPagination={false}
              className="react-table-fixed-height"
            />
        </CardBody>
  </Card>
);
export const ReactTableAdvancedCard = props => (
    <Card className="mb-4">
    <CardBody>
          <CardTitle>
              <IntlMessages id="table.react-advanced" />
            </CardTitle>
          <ReactTable
              data={data}
              columns={dataTableColumns}
              defaultPageSize={5}
              filterable
              showPageJump
              PaginationComponent={DataTablePagination}
              showPageSizeOptions
            />
        </CardBody>
  </Card>
);
