import React from 'react';
import {
    Card, CardBody, Badge, CustomInput,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { Colxx } from '../common/CustomBootstrap';

const MarketPlaceItem = ({ item, handleCheckChange, isSelected }) => (
    <Colxx xxs="12">
      <NavLink
        to={`/app/applications/marketplace/${item._id}`}
        id={`toggler${item._id}`}
      >
      <Card className="card d-flex mb-3">
            <div className="d-flex flex-grow-1 min-width-zero">
                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <i
                      className={`${
                        item.status === 'COMPLETED' ?
                        'simple-icon-check heading-icon' :
                        'simple-icon-refresh heading-icon'
                      }`}
                    />
                    <span className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1 align-middle d-inline-block">{item.title}</span>
                    <p className="mb-1 text-muted text-small w-15 w-xs-100">
                        {item.projectType}
                      </p>
                    <p className="mb-1 text-muted text-small w-15 w-xs-100">
                        {item.createDate}
                      </p>
                    {item.hasBudget ? 
                      <p className="mb-1 text-small w-15 w-xs-100">
                        <i className={'iconsminds-dollar-sign-2'} />
                          {item.budget}
                        </p> : null
                      }
                    <div className="w-15 w-xs-100">
                        <Badge color={item.labelColor || 'primary'} pill>
                            {item.category}
                          </Badge>
                      </div>
                  </CardBody>
                {/* <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <CustomInput
                        className="itemCheck mb-0"
                        type="checkbox"
                        id={`check_${item.id}`}
                        checked={isSelected}
                        onChange={event => handleCheckChange(event, item.id)}
                        label=""
                      />
                  </div> */}
              </div>
            <div className="card-body pt-1">
                <p className="mb-0">{item.detail}</p>
              </div>
          </Card>
        </NavLink>
    </Colxx>
);

export default React.memo(MarketPlaceItem);
