import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    Button,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    setContainerClassnames,
    clickOnMobileMenu,
    logoutUser,
    changeLocale,
} from '../../redux/actions';

import {
    menuHiddenBreakpoint,
    searchPath,
} from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavEasyAccess from './Topnav.EasyAccess';
import TopnavNotifications from './Topnav.Notifications';

import { getDirection, setDirection } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';

class TopNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInFullScreen: false,
            searchKeyword: '',
        };
    }

  handleChangeLocale = (locale, direction) => {
      this.props.changeLocale(locale);

      const currentDirection = getDirection().direction;
      if (direction !== currentDirection) {
          setDirection(direction);
          setTimeout(() => {
              window.location.reload();
          }, 500);
      }
  };

  isInFullScreen = () => (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
  );

  handleSearchIconClick = e => {
      if (window.innerWidth < menuHiddenBreakpoint) {
          let elem = e.target;
          if (!e.target.classList.contains('search')) {
              if (e.target.parentElement.classList.contains('search')) {
                  elem = e.target.parentElement;
              } else if (
                  e.target.parentElement.parentElement.classList.contains('search')
              ) {
                  elem = e.target.parentElement.parentElement;
              }
          }

          if (elem.classList.contains('mobile-view')) {
              this.search();
              elem.classList.remove('mobile-view');
              this.removeEventsSearch();
          } else {
              elem.classList.add('mobile-view');
              this.addEventsSearch();
          }
      } else {
          this.search();
      }
  };

  addEventsSearch = () => {
      document.addEventListener('click', this.handleDocumentClickSearch, true);
  };

  removeEventsSearch = () => {
      document.removeEventListener('click', this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
      let isSearchClick = false;
      if (
          e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
      ) {
          isSearchClick = true;
          if (e.target.classList.contains('simple-icon-magnifier')) {
              this.search();
          }
      } else if (
          e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
      ) {
          isSearchClick = true;
      }

      if (!isSearchClick) {
          const input = document.querySelector('.mobile-view');
          if (input && input.classList) input.classList.remove('mobile-view');
          this.removeEventsSearch();
          this.setState({
              searchKeyword: '',
          });
      }
  };

  handleSearchInputChange = e => {
      this.setState({
          searchKeyword: e.target.value,
      });
  };

  handleSearchInputKeyPress = e => {
      if (e.key === 'Enter') {
          this.search();
      }
  };

  search = () => {
      this.props.history.push(`${searchPath }/${ this.state.searchKeyword}`);
      this.setState({
          searchKeyword: '',
      });
  };

  toggleFullScreen = () => {
      const isInFullScreen = this.isInFullScreen();

      const docElm = document.documentElement;
      if (!isInFullScreen) {
          if (docElm.requestFullscreen) {
              docElm.requestFullscreen();
          } else if (docElm.mozRequestFullScreen) {
              docElm.mozRequestFullScreen();
          } else if (docElm.webkitRequestFullScreen) {
              docElm.webkitRequestFullScreen();
          } else if (docElm.msRequestFullscreen) {
              docElm.msRequestFullscreen();
          }
      } else if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
      this.setState({
          isInFullScreen: !isInFullScreen,
      });
  };

  handleLogout = () => {
      this.props.logoutUser(this.props.history, this.props.authUser?.user?.id);
  };

  handleLogin = () => {
      this.props.history.push('/user/login');
  }

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
      e.preventDefault();

      setTimeout(() => {
          const event = document.createEvent('HTMLEvents');
          event.initEvent('resize', false, false);
          window.dispatchEvent(event);
      }, 350);
      this.props.setContainerClassnames(
          ++menuClickCount,
          containerClassnames,
          this.props.selectedMenuHasSubItems,
      );
  };

  mobileMenuButtonClick = (e, containerClassnames) => {
      e.preventDefault();
      this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
      const { containerClassnames, menuClickCount } = this.props;
      const { user, finance } = this.props.authUser;

      return (
          <nav className="navbar fixed-top">
              <div className="d-flex align-items-center navbar-left">
                  <NavLink
                      to="#"
                  location={{}}
                      className="menu-button d-none d-md-block"
                      onClick={e => this.menuButtonClick(e, menuClickCount, containerClassnames)}
                >
                      <MenuIcon />
                </NavLink>
                  <NavLink
                      to="#"
                  location={{}}
                      className="menu-button-mobile d-xs-block d-sm-block d-md-none"
                      onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
                >
                      <MobileMenuIcon />
                </NavLink>
                  {
                      //   <div className="search" data-search-path="/app/pages/search">
                      //       <Input
                      //           name="searchKeyword"
                      //           id="searchKeyword"
                      //           placeholder={messages['menu.search']}
                      //           value={this.state.searchKeyword}
                      //           onChange={e => this.handleSearchInputChange(e)}
                      //           onKeyPress={e => this.handleSearchInputKeyPress(e)}
                      //     />
                      //       <span
                      //           className="search-icon"
                      //           onClick={e => this.handleSearchIconClick(e)}
                      //     >
                      //           <i className="simple-icon-magnifier" />
                      //     </span>
                      // </div>
                  }
                  {
                      //   <div className="d-inline-block">
                      //       <UncontrolledDropdown className="ml-2">
                      //           <DropdownToggle
                      //               caret
                      //               color="light"
                      //               size="sm"
                      //               className="language-button"
                      //         >
                      //               <span className="name">{locale.toUpperCase()}</span>
                      //         </DropdownToggle>
                      //           <DropdownMenu className="mt-3" right>
                      //               {localeOptions.map(l => (
                      //               <DropdownItem
                      //                     onClick={() => this.handleChangeLocale(l.id, l.direction)}
                      //                     key={l.id}
                      //                   >
                      //                     {l.name}
                      //                   </DropdownItem>
                      //               ))}
                      //         </DropdownMenu>
                      //     </UncontrolledDropdown>
                      // </div>
                  }
                  {
                      //   <div className="position-relative d-none d-none d-lg-inline-block">
                      //       <a
                      //           className="btn btn-outline-primary btn-sm ml-2"
                      //           target="_top"
                      //           href="https://themeforest.net/cart/configure_before_adding/22544383?license=regular&ref=ColoredStrategies&size=source"
                      //     >
                      //           <IntlMessages id="user.buy" />
                      //     </a>
                      // </div>
                  }
            </div>
              <a className="navbar-logo" href="/">
                  <span className="logo d-none d-xs-block" />
                  <span className="logo-mobile d-block d-xs-none" />
            </a>
              <div className="navbar-right">
                  { /* isDarkSwitchActive && <TopnavDarkSwitch /> */ }

                  <div className="header-icons d-inline-block align-middle">

                      <TopnavEasyAccess />
                      <TopnavNotifications />
                      {
                          //   <button
                          //       className="header-icon btn btn-empty d-none d-sm-inline-block"
                          //       type="button"
                          //       id="fullScreenButton"
                          //       onClick={this.toggleFullScreen}
                          // >
                          //       {this.state.isInFullScreen ? (
                          //           <i className="simple-icon-size-actual d-block" />
                          //       ) : (
                          //           <i className="simple-icon-size-fullscreen d-block" />
                          //       )}
                          // </button>
                      }
                </div>
                  <div className="user d-inline-block">
                  {
                  user && user.name ? (
                      <UncontrolledDropdown className="dropdown-menu-right">
                          <DropdownToggle className="p-0" color="empty">
                          <span className="name mr-1">
                                {user.name}
                                  <br />
                                <IntlMessages id="Balance" />
                                  {finance.balance}
                                {' '}
                                ₽
</span>
                              <span>
                                  <img alt="Profile" src={user.picture.data.url} />
                            </span>
                        </DropdownToggle>
                          <DropdownMenu className="mt-3" right>
                              <DropdownItem>Account</DropdownItem>
                              <DropdownItem>Features</DropdownItem>
                              <DropdownItem>History</DropdownItem>
                              <DropdownItem>Support</DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem onClick={() => this.handleLogout()}>
                              Sign out
                              </DropdownItem>
                        </DropdownMenu> 
                    </UncontrolledDropdown>
                    ) : (
                      <Button 
                        onClick={() => this.handleLogin()}>
                          Sign In
                      </Button>
                    )
                  }
                </div>
            </div>
        </nav>
      );
  }
}

const mapStateToProps = ({
    menu, settings, auth, authUser,
}) => {
    const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
    const { locale } = settings;

    return {
        containerClassnames,
        menuClickCount,
        selectedMenuHasSubItems,
        locale,
        authUser,
    };
};
export default injectIntl(
    connect(
        mapStateToProps,
        {
            setContainerClassnames, clickOnMobileMenu, logoutUser, changeLocale,
        },
    )(TopNav),
);
