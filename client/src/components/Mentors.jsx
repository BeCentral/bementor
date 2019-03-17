import React, {Component, Fragment} from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';
import SearchBar from './SearchBar';
import {getMentors, findMentors} from "../api/mentors";
import MiniMentor from "./MiniMentor";
import Wrapper from "./Wrapper";

class Mentors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mentors: []
    }
  }

  async componentDidMount() {
    const mentors = await getMentors();

    this.setState({
      mentors: mentors
    })
  }

  search = async (query) => {
    const mentors = await findMentors(query);
    this.setState({
      mentors: mentors
    })
  };

  render() {

    const mentors = this.state.mentors.map((mentor, index) => {
      return <MiniMentor key={mentor._id} {...mentor} />
    });

    return (
      <Fragment>
        <Header/>
        <Container>
          <h2>Find your Guru</h2>

          <SearchBar onSearch={this.search}/>
          <Wrapper>
            {mentors}
          </Wrapper>
        </Container>
        <Footer/>
      </Fragment>
    )
  }
}

export default Mentors;