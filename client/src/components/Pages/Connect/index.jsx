import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { Button } from 'evergreen-ui';
import { withRouter } from 'react-router-dom';
import Filters from './Filters';
import PageContainer from '../../Containers/PageContainer';
import UserCard from './UserCard';
import RequestState from '../../../models/RequestState';
import { API } from '../../../constants';
import User from '../../../models/User';
import AuthContext from '../../../context/auth-context';

import '../../../assets/css/connect.css';

const Users = ({ history }) => {
  const [users, setUserState] = useState([]);
  const [filtersAreFixed, setFixedFilterState] = useState(false);
  const [mobileFiltersShown, setMobileFilterVisibility] = useState(false);
  const getUserRequest = new RequestState();

  const auth = useContext(AuthContext);
  const currentUserId = auth.user ? auth.user._id : null;

  const handleScroll = () => {
    // 180 is header height
    if (window.pageYOffset >= 180) return setFixedFilterState(true);
    return setFixedFilterState(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const setUsers = rawUsers => {
    setUserState(rawUsers.map(u => new User(u)).filter(u => u._id !== currentUserId));
  };

  const connect = userId => {
    history.push(`/inbox/${userId}`);
  };

  const filter = async filters => {
    NProgress.start();
    const rawUsers = await API.user.find(filters);
    setUsers(rawUsers);
    NProgress.done();
  };

  const $users = users.map(user => <UserCard key={user._id} connect={connect} user={user} />);
  return (
    <PageContainer className="connect">
      <Button
        onClick={() => setMobileFilterVisibility(true)}
        className={`connect__btn-filter ${filtersAreFixed ? 'connect__btn-filter--scroll' : ''}`}
        height={40}
        iconBefore="filter-list"
      >
        Filter results
      </Button>
      <Filters
        doFilter={filter}
        mobileFiltersShown={mobileFiltersShown}
        setMobileFilterVisibility={setMobileFilterVisibility}
        fixed={filtersAreFixed}
      />
      <div className={`connect__results ${filtersAreFixed ? 'connect__results--scroll' : ''}`}>
        <h2 className="center">Connect.</h2>
        <div className="connect__results__wrapper">{$users}</div>
      </div>
    </PageContainer>
  );
};

Users.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(Users);
