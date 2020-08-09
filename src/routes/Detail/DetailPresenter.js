import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/Loader';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: absolute;
  padding: 15px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bdImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${props => props.bdImage});
  background-position: center center;
  background-size: cover;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 2;
  width: 50%;
`;

const Imdb = styled.div`
  margin-bottom: 15px;
`;

const ImdbLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;
const TabBar = styled.div`
  margin-top: 20px;
  margin-bottom: 0;
  display: flex;
`;
const TabBtn = styled.a`
  margin: 0;
  padding: 15px;
  letter-spacing: 2;
  font-weight: 500;
  border-bottom: 3px solid
    ${props => (props.current ? '#3498db' : 'transparent')};
  background: #000;
  cursor: pointer;
`;
const Tab = styled.div`
  padding-top: 20px;
  background: #000;
  height: 400px;
  overflow: scroll;
`;
const TabBox = styled.span`
  overflow: scroll;
`;
const Logo = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 400px;
  height: 100px;
  background: #fff;
  background-image: url(${props => props.bdImage});
  background-size: 400px 100px;
  background-position: center;
  margin: 10px 0;
`;
const Poster = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: #fff;
  background-image: url(${props => props.bdImage});
  background-size: 100px 100px;
  background-position: center;
  margin: 10px 0;
`;
const Box = styled.div`
  display: flex;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
`;

const DetailPresenter = ({ result, current, tabChgEvent, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{' '}
          | nomflix
        </title>
      </Helmet>
      <Backdrop
        bdImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bdImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterSmall.png')
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Imdb>
            <ImdbLink
              href={`https://www.imdb.com/title/${result.imdb_id}/`}
              target={`_blank`}
            >
              https://www.imdb.com/
              {result.original_title
                ? result.original_title
                : result.original_name}
            </ImdbLink>
          </Imdb>
          <Overview>{result.overview}</Overview>
          <TabBar>
            <TabBtn
              current={current === '/Production'}
              onClick={() => tabChgEvent('/Production')}
            >
              Production
            </TabBtn>
            <TabBtn
              current={current === '/Countries'}
              onClick={() => tabChgEvent('/Countries')}
            >
              Countries
            </TabBtn>
            {result.seasons && (
              <TabBtn
                current={current === '/Seasons'}
                onClick={() => tabChgEvent('/Seasons')}
              >
                Seasons
              </TabBtn>
            )}
          </TabBar>

          <Tab>
            {current === '/Production'
              ? result.production_companies.map(item => (
                  <TabBox key={item.id}>
                    <Box>
                      <Logo
                        bdImage={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                      />
                      <Contents>
                        <Item>production :{item.name}</Item>
                        <Item>country: {item.origin_country}</Item>
                      </Contents>
                    </Box>
                  </TabBox>
                ))
              : current === '/Countries'
              ? result.production_countries.map((item, i) => (
                  <TabBox key={i}>
                    <Contents>
                      <Item>iso_3166_1: {item.iso_3166_1}</Item>
                      <Item>name :{item.name}</Item>
                    </Contents>
                  </TabBox>
                ))
              : result.seasons &&
                result.seasons.map(item => (
                  <TabBox key={item.id}>
                    <Box>
                      <Poster
                        bdImage={
                          result.poster_path
                            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                            : require('../../assets/noPosterSmall.png')
                        }
                      />
                      <Contents>
                        <Item>air_date: {item.air_date}</Item>
                        <Item>episode_count :{item.episode_count}</Item>
                        <Item>name: {item.name}</Item>
                      </Contents>
                    </Box>
                  </TabBox>
                ))}
          </Tab>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
