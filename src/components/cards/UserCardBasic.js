import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
} from 'reactstrap';
import ThumbnailImage from './ThumbnailImage';

class UserCardBasic extends Component {
    render() {
        return (
          <Card className="d-flex flex-row mb-4">
              <NavLink to={this.props.link || '#'} className="d-flex">
                  <ThumbnailImage rounded small src={this.props.data.thumb} alt="profile" className="m-4" />
                </NavLink>
              <div className=" d-flex flex-grow-1 min-width-zero">
                  <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                      <div className="min-width-zero">
                          <NavLink to={this.props.link || '#'}>
                              <CardSubtitle className="truncate mb-1">{this.props.data.name}</CardSubtitle>
                            </NavLink>
                          <CardText className="text-muted text-small mb-2">{this.props.data.status}</CardText>
                        </div>
                    </CardBody>
                </div>
            </Card>
        );
    }
}

export default injectIntl(UserCardBasic);
