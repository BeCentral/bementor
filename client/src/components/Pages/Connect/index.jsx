import React, { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import { Button } from 'evergreen-ui';
import Filters from './Filters';
import PageContainer from '../../Containers/PageContainer';
import UserCard from './UserCard';
import RequestState from '../../../models/RequestState';
import { API } from '../../../constants';
import User from '../../../models/User';

import '../../../assets/css/connect.css';

const Users = () => {
  const [users, setUserState] = useState([]);
  const [filtersAreFixed, setFixedFilterState] = useState(false);
  const [mobileFiltersShown, setMobileFilterVisibility] = useState(false);
  const getUserRequest = new RequestState();

  const handleScroll = () => {
    // 180 is header height
    if (window.pageYOffset >= 180) return setFixedFilterState(true);
    return setFixedFilterState(false);
  };

  const setUsers = (rawUsers) => {
    setUserState(rawUsers.map(u => new User(u)));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filter = async (filters) => {
    NProgress.start();
    const rawUsers = await API.user.find(filters);
    setUsers(rawUsers);
    NProgress.done();
  };

  const $users = users.map(user => <UserCard key={user._id} user={user} />);

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
        <div className="connect__results__wrapper">
          {$users}
        </div>
      </div>
    </PageContainer>
  );
};

export default Users;
