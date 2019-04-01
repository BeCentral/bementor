class RequestState {
  constructor(initialize = true) {
    this.isLoading = initialize;
    this.hasErrored = false;
  }

  start() {
    this.isLoading = true;
  }

  finish(reason) {
    this.isLoading = false;
    this.message = reason;
  }

  error(reason) {
    this.hasErrored = true;
    this.message = reason;
  }
}

export default RequestState;
