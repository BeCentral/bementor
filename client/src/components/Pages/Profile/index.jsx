import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import {
  Button,
  Icon,
  Badge,
  CornerDialog
} from 'evergreen-ui';
import { API } from '../../../constants';
import AppContainer from '../../Containers/AppContainer';
import PageContainer from '../../Containers/PageContainer';
import ProfileForm from './ProfileForm';
import Socials from './Socials';
import User from '../../../models/User';
import RequestState from '../../../models/RequestState';
import AuthContext from '../../../context/auth-context';

import '../../../assets/css/profile.css';

class Profile extends Component {
  state = {
    user: null,
    editingProfile: false,
    getUserRequest: new RequestState(true)
  };

  constructor(props) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    const { getUserRequest } = this.state;

    API.user.getOne(userId)
      .then((rawUser) => {
        const user = new User(rawUser);
        document.title = `${user.firstName} ${user.lastName} | BeMentor`;
        this.setState({ user, getUserRequest: getUserRequest.finish() });
      })
      .catch((reason) => {
        this.setState({ getUserRequest: getUserRequest.error(reason) });
      })
      .finally(() => NProgress.done());
  }

  openEditor = () => this.setState({ editingProfile: true });

  cancelProfileUpdate = () => this.setState({ editingProfile: false });

  updateUser = (user) => {
    this.setState({ user, editingProfile: false });
    this.context.setAuthenticatedUser(user);
  }

  maybeRenderInterests = (user) => {
    if (!user.interests || user.interests.length === 0) return `${user.firstName} hasn't added any interests yet.`;
    return user.interests.map(interest => (
      <li key={interest._id}>
        <Badge color="neutral">{interest.name}</Badge>
      </li>
    ));
  }

  maybeRenderEditButton = (user) => {
    const loggedInUser = this.context.user;

    if (!loggedInUser || user._id !== loggedInUser._id) return null;
    return (
      <Button iconBefore="edit" className="profile__edit" onClick={this.openEditor}>
        Edit your profile
      </Button>
    );
  }

  maybeRenderSocials = (user) => {
    if (!user.hasSocials) return null;
    return <Socials {...user} />;
  }

  render() {
    const { editingProfile, user, getUserRequest } = this.state;

    if (getUserRequest.isLoading) return <AppContainer />;

    const $editButton = this.maybeRenderEditButton(user);
    const $socials = this.maybeRenderSocials(user);
    const $interests = this.maybeRenderInterests(user);
    return (
      <AppContainer>
        <PageContainer className="profile">
          <ProfileForm
            isShown={editingProfile}
            user={user}
            handleUserUpdated={this.updateUser}
            cancelProfileUpdate={this.cancelProfileUpdate}
          />
          {$editButton}
          <CornerDialog
            title="Welcome to your profile"
            confirmLabel="Get started"
            isShown={user.profileFtue}
            onConfirm={this.openEditor}
            onCloseComplete={() => { }}
          >
            <p>
              This is where you can let people know what you&#39;re interested in and what
              you&#39;re looking for.
              The information you add, makes it easier for people to find you on the Connect page.
            </p>
          </CornerDialog>
          <div className="profile__subject">
            {user.picture && (
              <div className="profile__subject__avatar-wrapper">
                <img src={user.picture} alt={`Avatar of ${user.firstName}`} />
              </div>
            )}
            <div className="profile__subject__title">
              <h2>{user.firstName} {user.lastName}</h2>
              {user.tagline ? <h3>{user.tagline}</h3> : null}
              {user.location ? <h4><Icon icon="map-marker" /> {user.location}</h4> : null}
            </div>
          </div>
          <section>
            <h2 className="profile__about__title">About {user.firstName}</h2>
            <div className="profile__about">
              <p className={`profile__about__bio ${user.hasSocials ? 'profile__about__bio--divider' : ''}`}>
                {user.bio || `${user.firstName} hasn't set up their profile yet.`}
              </p>
              {$socials}
            </div>
            <article className="profile__interests">
              <h2>Interests</h2>
              <ul>
                {$interests}
              </ul>
            </article>
          </section>
        </PageContainer>
      </AppContainer>
    );
  }
}

Profile.contextType = AuthContext;
Profile.propTypes = {
  // eslint-disable-next-line
  match: PropTypes.object.isRequired
};

export default Profile;
