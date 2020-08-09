import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      current: '/Production',
      loading: true,
      isMovie: pathname.includes('/movie'),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parseId = parseInt(id);
    if (isNaN(parseId)) return push('/');
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parseId));
      } else {
        ({ data: result } = await tvApi.showDetail(parseId));
      }
      console.log(result);
      this.setState({
        result,
      });
    } catch (error) {
      this.setState({
        error: `Can't find anything.`,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  tabChgEvent = current => {
    this.setState({
      current,
    });
  };

  render() {
    const { result, current, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        current={current}
        tabChgEvent={this.tabChgEvent}
        error={error}
        loading={loading}
      />
    );
  }
}
