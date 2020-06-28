import React from 'react';
import TvPresenter from './TvPresenter';
import { tvApi } from 'api';

export default class extends React.Component {
  state = {
    topRated: null,
    airingToday: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      this.setState({
        topRated,
        airingToday,
        popular,
      });
    } catch (error) {
      this.setState({
        error: `Can't find Tv information.`,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { airingToday, topRated, popular, error, loading } = this.state;
    return (
      <TvPresenter
        airingToday={airingToday}
        topRated={topRated}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
