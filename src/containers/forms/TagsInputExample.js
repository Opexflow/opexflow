import React, { Component } from "react";
import { injectIntl } from "react-intl";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";


class TagsInputExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }
  handleTagChange = tags => {
    this.setState({ tags });
  };
  render() {
    const { messages } = this.props.intl;

    return (
      <TagsInput
        value={this.state.tags}
        onChange={this.handleTagChange}
        inputProps={{ placeholder: messages["form-components.tags"] }}
      />
    );
  }
}
export default injectIntl(TagsInputExample);
