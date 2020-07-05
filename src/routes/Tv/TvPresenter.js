import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'components/Section';
import Loader from 'components/Loader';

const Container = styled.div`
  padding: 0px 20px;
`;

const TvPresenter = ({ airingToday, topRated, popular, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rate Shows">
          {topRated.map(show => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Shows">
          {popular.map(show => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="AiringToday Shows">
          {airingToday.map(show => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}
    </Container>
  );
TvPresenter.propTypes = {
  airingToday: PropTypes.array,
  topRated: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TvPresenter;
