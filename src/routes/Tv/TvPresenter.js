import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'components/Section';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Poster from 'components/Poster';

const Container = styled.div`
  padding: 20px;
`;

const TvPresenter = ({ airingToday, topRated, popular, loading, error }) => (
  <>
    <Helmet>
      <title>TV | nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {topRated && topRated.length > 0 && (
          <Section title="Top Rate Shows">
            {topRated.map(show => (
              <Poster
                title={show.original_name}
                imageUrl={show.poster_path}
                key={show.id}
                id={show.id}
                isMovie={false}
                rating={show.vote_average}
                year={show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular Shows">
            {popular.map(show => (
              <Poster
                title={show.original_name}
                imageUrl={show.poster_path}
                key={show.id}
                id={show.id}
                isMovie={false}
                rating={show.vote_average}
                year={show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="AiringToday Shows">
            {airingToday.map(show => (
              <Poster
                title={show.original_name}
                imageUrl={show.poster_path}
                key={show.id}
                id={show.id}
                isMovie={false}
                rating={show.vote_average}
                year={show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {error && <Message color={'#e73c3c'} text={error} />}
      </Container>
    )}
  </>
);

TvPresenter.propTypes = {
  airingToday: PropTypes.array,
  topRated: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TvPresenter;
