class User {
  constructor(user) {
    Object.keys(user).forEach((prop) => {
      this[prop] = user[prop];
    });
    this.id = user._id;
    this.role = user.role || 'user';
  }

  get hasSocials() {
    return this.twitter || this.github;
  }

  get isAdmin() {
    return this.role === 'admin';
  }
}

export default User;
