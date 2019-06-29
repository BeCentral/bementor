import Interest from './Interest';

class User {
  constructor(user) {
    Object.keys(user).forEach((prop) => {
      this[prop] = user[prop];
    });
    this.id = user._id;
    this.role = user.role || 'user';
    this.interests = user.interests ? user.interests.map(int => new Interest(int)) : [];
  }

  get interestNames() {
    return this.interests.map(i => i.name);
  }

  get hasSocials() {
    return this.twitter || this.github;
  }

  get isAdmin() {
    return this.role === 'admin';
  }
}

export default User;
