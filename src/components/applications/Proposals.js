import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Card, Button, CardBody } from "reactstrap";

import { Colxx } from '../common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import classnames from 'classnames';

const Proposals = (props) => {

  const [isHidden, setIsHidden] = useState(true);

  const hiddenStyle = isHidden ? {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    overflow: "hidden",
    WebkitBoxOrient: "vertical"
  } : {} ;

  console.log('owner id is ', props.job.createdById);
  console.log('user id is ', props.userId);
  return (
    <>
    { props.loading && props.proposalsList && props.proposalsList.length > 0 ?
      <Row>
        <Colxx xxs="12">
          <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
            <IntlMessages id="marketplace.proposals" /> : 
          </h5>
        </Colxx>

        {props.proposalsList.map( (proposal) => {

          const { user } = proposal;
          
          return (

          <Colxx xxs="12" key={proposal._id}>
          <Card className="d-flex mb-3" style={{borderRadius: '15px'}}>
            <div className="d-flex flex-grow-1 min-width-zero">
              <CardBody className="align-self-center flex-row flex-md-row justify-content-between min-width-zero align-items-md-center">
                
                <div className="d-flex flex-row chat-heading">
                  <div className="d-flex">
                    <img
                      alt={user?.login}
                      src={user?.photo}
                      className="img-thumbnail border-0 rounded-circle ml-0 mr-4 list-thumbnail align-self-center small"
                    />
                  </div>
                    <div className=" d-flex min-width-zero">
                        <div className="card-body pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div className="min-width-zero">
                                <div>
                                    <p className="list-item-heading mb-1 truncate ">{user?.login}</p>
                              </div>
                                <p className="mb-0 text-muted text-small">
                                    {proposal.freelancerTitle}
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="position-absolute  mr-2 pt-1 pr-2 r-0">
                    <div className="text-extra-small">
                      {proposal.bid ? <>
                        <span className="text-muted text-small mb-2">Bid Amount : </span>
                        <span className="mb-1 text-small w-100 w-xs-100">
                          <i className={'iconsminds-dollar-sign-2'} />
                            {proposal.bid}
                          </span> </> : null }
                    </div>
                    {props.userId && props.job.createdById === props.userId ?
                      <NavLink
                        to={{
                          pathname: `/app/applications/marketplace/chat`,
                          createConversation: {
                            proposalId: proposal._id,
                            title: props.job.title,
                            freelancerId: proposal.user._id
                          }
                        }}
                        id={`toggler${proposal._id}`}>
                      <Button 
                        outline
                        className="flex-grow-1"
                        size="lg"
                        color="primary" 
                        //onClick={() => props.getOrCreateChat(props.userId, proposal.user._id, proposal._id, props.job.title)}
                      >
                        Send Message
                      </Button> 
                      </NavLink> : null
                    }
                  </div>
                </div>
                <div className="separator mb-5" />
                
                <div className="flex-row pb-1">
                  <p className="ist-item-heading mb-1 truncate">
                    <IntlMessages id="marketplace.cover-letter" /> :
                  </p>
                  <p
                    className="mb-3"
                    style={hiddenStyle}
                    dangerouslySetInnerHTML={{
                          __html: proposal.coverLetter,
                      }}
                  />
                  {/* <Button size="small" onClick={() => setIsHidden(!isHidden)}>
                    {isHidden ? "⬇ More" : "⬆ Less"}
                  </Button> */}
                  <Button color="light" onClick={() => setIsHidden(!isHidden)}>
                  {
                    isHidden ?
                      <>
                        <IntlMessages id="marketplace.proposal-view-more" /> { ' '}
                        <i className="simple-icon-eye" /> 
                      </>
                     :
                     <>
                      <IntlMessages id="marketplace.proposal-view-less" /> { ' '}
                      <i className="iconsminds-arrow-up-2" /> 
                    </>
                  }
                  </Button>
                </div>

                
              </CardBody>
            </div>
            {/* <div className="card-body pt-1">
              <p className="mb-0">{item.detail}</p>
            </div> */}
          </Card>
          </Colxx> )

        })}
      </Row> : null }
    </>
  )
}

export default Proposals;