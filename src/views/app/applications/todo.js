import React, { Component } from 'react';
import {
    Row,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Collapse,
    ButtonDropdown,
    CustomInput,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import {
    getTodoList,
    getTodoListWithOrder,
    getTodoListSearch,
    selectedTodoItemsChange,
} from '../../../redux/actions';
import TodoListItem from '../../../components/applications/TodoListItem';
import AddNewTodoModal from '../../../containers/applications/AddNewTodoModal';
import TodoApplicationMenu from '../../../containers/applications/TodoApplicationMenu';

class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownSplitOpen: false,
            modalOpen: false,
            lastChecked: null,

            displayOptionsIsOpen: false,
        };
    }

    componentDidMount() {
        this.props.getTodoList();
    }

  toggleDisplayOptions = () => {
      this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  };

  toggleModal = () => {
      this.setState({
          modalOpen: !this.state.modalOpen,
      });
  };

  toggleSplit = () => {
      this.setState(prevState => ({
          dropdownSplitOpen: !prevState.dropdownSplitOpen,
      }));
  };

  changeOrderBy = column => {
      this.props.getTodoListWithOrder(column);
  };

  handleKeyPress = e => {
      if (e.key === 'Enter') {
          this.props.getTodoListSearch(e.target.value);
      }
  };

  handleCheckChange = (event, id) => {
      if (this.state.lastChecked == null) {
          this.setState({
              lastChecked: id,
          });
      }

      let selectedItems = Object.assign([], this.props.todoApp.selectedItems);
      if (selectedItems.includes(id)) {
          selectedItems = selectedItems.filter(x => x !== id);
      } else {
          selectedItems.push(id);
      }
      this.props.selectedTodoItemsChange(selectedItems);

      if (event.shiftKey) {
          let items = this.props.todoApp.todoItems;
          const start = this.getIndex(id, items, 'id');
          const end = this.getIndex(this.state.lastChecked, items, 'id');
          items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
          selectedItems.push(
              ...items.map(item => item.id),
          );
          selectedItems = Array.from(new Set(selectedItems));
          this.props.selectedTodoItemsChange(selectedItems);
      }
  };

  handleChangeSelectAll = () => {
      if (this.props.todoApp.loading) {
          if (
              this.props.todoApp.selectedItems.length >=
        this.props.todoApp.todoItems.length
          ) {
              this.props.selectedTodoItemsChange([]);
          } else {
              this.props.selectedTodoItemsChange(
                  this.props.todoApp.todoItems.map(x => x.id),
              );
          }
      }
  };

  getIndex(value, arr, prop) {
      for (let i = 0; i < arr.length; i++) {
          if (arr[i][prop] === value) {
              return i;
          }
      }
      return -1;
  }

  render() {
      const {
          todoItems,
          searchKeyword,
          loading,
          orderColumn,
          orderColumns,
          selectedItems,
      } = this.props.todoApp;

      const { messages } = this.props.intl;

      const { modalOpen } = this.state;
      return (
          <>
          <Row className="app-row survey-app">
                <Colxx xxs="12">
                    <div className="mb-2">
                        <h1>
                            <IntlMessages id="menu.todo" />
                          </h1>
                        {loading && (
                          <div className="float-sm-right">
                                <Button
                                    color="primary"
                                    size="lg"
                                    className="top-right-button"
                                    onClick={this.toggleModal}
                                  >
                                    <IntlMessages id="todo.add-new" />
                                  </Button>
                                  {' '}
                                <ButtonDropdown
                                    isOpen={this.state.dropdownSplitOpen}
                                    toggle={this.toggleSplit}
                                  >
                                    <div className="btn btn-primary pl-4 pr-0 check-button check-all">
                                        <CustomInput
                                            className="custom-checkbox mb-0 d-inline-block"
                                            type="checkbox"
                                            id="checkAll"
                                            checked={
                                                  selectedItems.length >= todoItems.length
                                              }
                                            onClick={() => this.handleChangeSelectAll()}
                                            onChange={() => this.handleChangeSelectAll()}
                                            label={(
                                                <span
                                                      className={`custom-control-label ${
                              selectedItems.length > 0 &&
                              selectedItems.length < todoItems.length ?
                                  'indeterminate' :
                                  ''
                            }`}
                                                  />
                                              )}
                                          />
                                      </div>
                                    <DropdownToggle
                                        caret
                                        color="primary"
                                        className="dropdown-toggle-split pl-2 pr-2"
                                      />
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <IntlMessages id="todo.action" />
                                          </DropdownItem>
                                        <DropdownItem>
                                            <IntlMessages id="todo.another-action" />
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </ButtonDropdown>
                              </div>
                          )}
                        <Breadcrumb match={this.props.match} />
                      </div>

                    <div className="mb-2">
                        <Button
                            color="empty"
                            id="displayOptions"
                            className="pt-0 pl-0 d-inline-block d-md-none"
                            onClick={this.toggleDisplayOptions}
                          >
                            <IntlMessages id="todo.display-options" />
                              {' '}
                            <i className="simple-icon-arrow-down align-middle" />
                          </Button>
                        <Collapse
                            className="d-md-block"
                            isOpen={this.state.displayOptionsIsOpen}
                          >
                            <div className="d-block mb-2 d-md-inline-block">
                                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                                    <DropdownToggle caret color="outline-dark" size="xs">
                                        <IntlMessages id="todo.orderby" />
                                        {orderColumn ? orderColumn.label : ''}
                                      </DropdownToggle>
                                    <DropdownMenu>
                                        {orderColumns.map((o, index) => (
                                              <DropdownItem
                                                  key={index}
                                                  onClick={() => this.changeOrderBy(o.column)}
                                          >
                                                  {o.label}
                                          </DropdownItem>
                                          ))}
                                      </DropdownMenu>
                                  </UncontrolledDropdown>
                                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                    <input
                                        type="text"
                                        name="keyword"
                                        id="search"
                                        placeholder={messages['menu.search']}
                                        defaultValue={searchKeyword}
                                        onKeyPress={e => this.handleKeyPress(e)}
                                      />
                                  </div>
                              </div>
                          </Collapse>
                      </div>
                    <Separator className="mb-5" />
                    <Row>
                        {loading ? (
                              todoItems.map((item, index) => (
                                <TodoListItem
                                    key={`todo_item_${index}`}
                                    item={item}
                                    handleCheckChange={this.handleCheckChange}
                                    isSelected={
                                          loading ? selectedItems.includes(item.id) : false
                                      }
                                  />
                              ))
                          ) : (
                            <div className="loading" />
                          )}
                      </Row>
                  </Colxx>
              </Row>
          {loading && <TodoApplicationMenu />}
          <AddNewTodoModal toggleModal={this.toggleModal} modalOpen={modalOpen} />
        </>
      );
  }
}
const mapStateToProps = ({ todoApp }) => ({
    todoApp,
});
export default injectIntl(
    connect(
        mapStateToProps,
        {
            getTodoList,
            getTodoListWithOrder,
            getTodoListSearch,
            selectedTodoItemsChange,
        },
    )(TodoApp),
);
