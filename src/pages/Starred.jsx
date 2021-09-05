import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hook';

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      Promise.all(promises)
      .then(apiData => apiData.map(show=>({show})))
        .then(result => {
          setShows(result);
          setloading(false);
        })
        .catch(err => {
          setError(err.message);
          setloading(false);
        });
    } else {
      setloading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {loading && <div>Shows are still loading</div>}{' '}
      {error && <div>Error Occured :{error}</div>}{' '}
      {!loading && !shows && <div>No Shows were added </div>}
      {!loading && !error && shows && <ShowGrid data = {shows}/> }
    </MainPageLayout>
  );
};

export default Starred;
