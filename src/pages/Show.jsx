/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Detail from '../components/show/Detail';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCESS': {
      return { loading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, loading: false, error: action.error };
    }
    default:
      return prevState;
  }
};
const initialState = {
  show: null,
  loading: true,
  error: null,
};
const Show = () => {
  const { id } = useParams();
  const [{ show, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCESS', show: result });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  if (loading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    return <div>Error Occured :{error}</div>;
  }
  console.log(show);
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Detail
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
// https://api.tvmaze.com/shows/1?embed[]=seasons&embed[]=cast

//   const [show, setShow] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
