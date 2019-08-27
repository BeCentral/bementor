import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../Containers/PageContainer';

import imgBeCentral from '../../../assets/images/becentral-chillroom.jpeg';
import '../../../assets/css/home.css';

const Home = () => (
  <PageContainer className="home">
    <section>
      <h2>Welcome to BeMentor!</h2>
      <Link to="/register">Register now</Link> to take part in our community of Women in Tech!
      <p>
        Men who are friends of women are welcome too! BeMentor is a free, open source platform which
        aims to connect women and their men friends working in the tech industry. This project was
        born out of a desire to create a virtual space where ladies can peacefully express their
        questions and experiences.
      </p>
      <p>
        We aspire to cover all fields of professional life, from technical aspects related to
        software development to the attitude to be held in a meeting in a sector dominated by men.
        We are convinced that, at all levels of your career, you can continue to learn from your
        peers. For that reason, on BeMentor, every mentee can be someone&apos;s mentor and vice
        versa. Mentorship is crucial to make you more successful.
      </p>
      <p>As the proverb says &quot;Alone, you go faster. Together you go further.&quot;</p>
    </section>
    <aside>
      <img src={imgBeCentral} alt="BeCentral's chill room" />
    </aside>
  </PageContainer>
);

export default Home;
