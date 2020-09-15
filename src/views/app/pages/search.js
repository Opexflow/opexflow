import React, { Component } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Pagination from '../../../containers/pages/Pagination';
import { servicePath } from '../../../constants/defaultValues';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Separator, Colxx } from '../../../components/common/CustomBootstrap';

const apiUrl = `${servicePath }/cakes/paging`;

class SearchPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentPage: 1,
            totalPage: 12,
            keyword: 'Cake',
            totalItemCount: 0,
            isLoading: true,
            pageSize: 10,
        };
    }

    onChangePage(page) {
        this.setState(
            {
                currentPage: page,
            },
            () => {
                this.dataListRender();
            },
        );
    }

    componentDidMount() {
        this.dataListRender();
    }

    dataListRender() {
        const { pageSize, currentPage, keyword } = this.state;
        axios
            .get(
        `${apiUrl}?pageSize=${pageSize}&currentPage=${currentPage}&search=${keyword}`,
            )
            .then(res => res.data)
            .then(data => {
                this.setState({
                    totalPage: data.totalPage,
                    items: data.data,
                    totalItemCount: data.totalItem,
                    isLoading: false,
                });
            });
    }

    render() {
        const rowLength = this.state.items.length;
        const { isLoading } = this.state;
        return (
            <>
            <Row>
                  <Colxx xxs="12">
                      <Breadcrumb heading="menu.search" match={this.props.match} />
                      <Separator className="mb-5" />
                    </Colxx>
                </Row>
            <Row>
                  <Colxx xxs="12" className="mb-4">
                      <Card>
                          <CardBody>
                              {!isLoading ? (
                                    this.state.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className={`${rowLength !== i + 1 ? 'mb-3' : ''}`}
                                      >
                                            <NavLink to={`#${item.id}`} className="w-40 w-sm-100">
                                                <p className="list-item-heading mb-1 color-theme-1">
                                                    {item.title}
                                              </p>
                                                <p className="mb-1 text-muted text-small">
                                                Products |
                            {' '}
                                                {item.category}
                                              </p>
                                                <p className="mb-4 text-small">{item.description}</p>
                                          </NavLink>
                                            {rowLength !== i + 1 && <Separator />}
                                      </div>
                                    ))
                                ) : (
                                  <div className="loading" />
                                )}
                            </CardBody>
                        </Card>
                    </Colxx>
                  <Pagination
                      currentPage={this.state.currentPage}
                      totalPage={this.state.totalPage}
                      onChangePage={i => this.onChangePage(i)}
                    />
                </Row>
          </>
        );
    }
}
export default SearchPages;
