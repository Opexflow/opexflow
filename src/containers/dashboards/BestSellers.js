import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import ReactTable from 'react-table';

import IntlMessages from '../../helpers/IntlMessages';
import Pagination from '../../components/DatatablePagination';

import data from '../../data/products';

const BestSellers = ({ title = 'dashboards.best-sellers' }) => {
    const columns = [
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
    return (
        <Card className="h-100">
            <CardBody>
                <CardTitle>
                    <IntlMessages id={title} />
              </CardTitle>
                <ReactTable
                    defaultPageSize={6}
                    data={data.slice(0, 12)}
                    columns={columns}
                    minRows={0}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    PaginationComponent={Pagination}
              />
          </CardBody>
      </Card>
    );
};
export default BestSellers;
