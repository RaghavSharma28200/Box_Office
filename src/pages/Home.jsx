import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';
  const onSearch = () => {
    //  fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r=>r.json()).then(result=>{
    //      console.log(result)
    //      setResults(result)
    //  })
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
    //   console.log(result);
      setResults(result);
    });
  };
  const onInputChange = ev => {
    //  console.log(ev.target.value)
    setInput(ev.target.value);
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Result</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ?  <ShowGrid data={results} /> : <ActorGrid data={results}/>
    }
    return null;
  };
  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOption);
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Search For Something"
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            type="radio"
            id="shows-search"
            value="shows"
            onChange={onRadioChange}
            checked={isShowsSearch}
          />
        </label>
        <label htmlFor="shows-search">
          Actors
          <input
            type="radio"
            id="actors-search"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
