import React from 'react';
import { Container } from './styles';
import { Layout } from '../../common/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <Container>
        <h1>About</h1>
        <p>This is the About page.</p>
      </Container>
    </Layout>
  );
};

export default About;
