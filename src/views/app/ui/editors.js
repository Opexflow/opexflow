import React, { Component } from 'react';
import {
    Row, Card, CardBody, CardTitle,
} from 'reactstrap';
import ReactQuill from 'react-quill';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../helpers/IntlMessages';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const quillModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};

const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

export default class EditorsUi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textQuillBubble: '',
            textQuillStandart: '',
        };
    }

      handleChangeQuillStandart = textQuillStandart => {
          this.setState({ textQuillStandart });
      }

      handleChangeQuillBubble = textQuillBubble => {
          this.setState({ textQuillBubble });
      }

      render() {
          return (
              <>
              <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.editors" match={this.props.match} />
                        <Separator className="mb-5" />
                      </Colxx>
                  </Row>
              <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <IntlMessages id="editors.quill-standart" />
                                  </CardTitle>
                                <ReactQuill
                                    theme="snow"
                                    value={this.state.textQuillStandart}
                                    onChange={this.handleChangeQuillStandart}
                                    modules={quillModules}
                                    formats={quillFormats}
                                  />
                              </CardBody>
                          </Card>
                      </Colxx>
                  </Row>

              <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <IntlMessages id="editors.quill-bubble" />
                                  </CardTitle>
                                <ReactQuill
                                    theme="bubble"
                                    value={this.state.textQuillBubble}
                                    onChange={this.handleChangeQuillBubble}
                                  />
                              </CardBody>
                          </Card>
                      </Colxx>
                  </Row>

            </>
          );
      }
}
