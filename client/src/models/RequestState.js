class RequestState {
  constructor(initialize = false) {
    this.isLoading = initialize;
    this.hasErrored = false;
  }

  start() {
    this.isLoading = true;
    return this;
  }

  finish(reason) {
    this.isLoading = false;
    this.message = reason;
    return this;
  }

  error(reason) {
    this.hasErrored = true;
    this.isLoading = false;
    this.message = reason;
    return this;
  }
}

export default RequestState;
