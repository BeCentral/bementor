import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button, Icon } from 'evergreen-ui';
import { ExternalLink } from '../../UI';
import AppContainer from '../../Containers/AppContainer';
import PageContainer from '../../Containers/PageContainer';
import ProfileForm from './ProfileForm';
import { API } from '../../../constants';
import User from '../../../models/User';

import '../../../assets/css/profile.css';

Modal.setAppElement('#root');

class Profile extends Component {
  state = {
    editingProfile: false
  };

  toggleEditor = () => {
    this.setState(prevState => ({ editingProfile: !prevState.editingProfile }));
  }

  saveUpdates = (user) => {
    API.user.update(user);
  }

  render() {
    const { editingProfile } = this.state;
    const { user } = this.props;
    return (
      <AppContainer>
        <PageContainer className="profile">
          <Modal overlayClassName="modal-overlay" className="modal" isOpen={editingProfile} onRequestClose={this.toggleEditor} contentLabel="Edit profile">
            <h2 className="modal__title">Update your profile</h2>
            <ProfileForm user={user} saveUpdates={this.saveUpdates} />
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
                {user.interests.map(interest => <li key={interest}>{interest}</li>)}
              </ul>
            </article>
          </section>
        </PageContainer>
      </AppContainer>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default Profile;
