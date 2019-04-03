import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button, Icon, Badge } from 'evergreen-ui';
import { ExternalLink, Modal } from '../../UI';
import { API } from '../../../constants';
import AppContainer from '../../Containers/AppContainer';
import PageContainer from '../../Containers/PageContainer';
import ProfileForm from './ProfileForm';
import User from '../../../models/User';
import RequestState from '../../../models/RequestState';

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

  toggleEditor = () => {
    this.setState(prevState => ({ editingProfile: !prevState.editingProfile }));
  }

  updateUser = (user) => {
    this.setState({ user, editingProfile: false });
  }

  renderInterest = interest => (
    <li key={interest}>
      <Badge color="neutral">{interest}</Badge>
    </li>
  );

  render() {
    const { editingProfile, user, getUserRequest } = this.state;
    if (getUserRequest.isLoading) return <AppContainer />;

    const $interests = user.interests.map(this.renderInterest);
    return (
      <AppContainer>
        <PageContainer className="profile">
          <Modal title="Update your profile" isOpen={editingProfile} onRequestClose={this.toggleEditor} contentLabel="Edit profile">
            <ProfileForm user={user} handleUserUpdated={this.updateUser} />
          </Modal>
          <Button iconBefore="edit" className="profile__edit" onClick={this.toggleEditor}>
            Edit your profile
          </Button>
          <div className="profile__subject">
            <div className="profile__subject__avatar-wrapper">
              <img src={user.picture} alt={`Avatar of ${user.firstName}`} />
            </div>
            <div className="profile__subject__title">
              <h2>{user.firstName} {user.lastName}</h2>
              <h3>{user.tagline}</h3>
              <h4><Icon icon="map-marker" /> {user.location}</h4>
            </div>
          </div>
          <section>
            <h2 className="profile__about__title">About {user.firstName}</h2>
            <div className="profile__about">
              <p className="profile__about__bio">{user.bio}</p>
              <ul className="profile__about__socials">
                <li>
                  <ExternalLink href={`https://twitter.com/${user.twitter}`} className="twitter">
                    <i><FontAwesomeIcon icon={faTwitter} /></i>
                    {user.twitter}
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href={`https://github.com/${user.github}`} className="github">
                    <i><FontAwesomeIcon icon={faGithub} /></i>
                    {user.github}
                  </ExternalLink>
                </li>
              </ul>
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

Profile.propTypes = {
  // eslint-disable-next-line
  match: PropTypes.object.isRequired
};

export default Profile;
