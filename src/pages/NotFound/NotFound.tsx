import React from 'react';
import { Layout } from '../../common/Layout';
import { Container } from './styles';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <Container>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </Container>
    </Layout>
  );
};

export default NotFound;
