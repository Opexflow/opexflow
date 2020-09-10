import React from "react";
import ReactAutoSuggest from "../../components/common/ReactAutoSuggest";
import { injectIntl } from "react-intl";
import cakes from "../../data/cakes";
const ReactAutoSugegstExample = (props) => {
  const { messages } = props.intl;
  const data = cakes.map(item => {
      return {name: item.title}
  });
  return (
    <ReactAutoSuggest
      placeholder={messages["form-components.type-a-cake"]}
      data={data}
      onChange={value => {}}
    />
  );
};

export default injectIntl(ReactAutoSugegstExample);
