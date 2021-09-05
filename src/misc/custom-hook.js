import {useEffect, useReducer, useState} from 'react';
import { apiGet } from './config';

function showReducer(prevState,action){
switch(action.type){
    case'ADD':{
        return[...prevState,action.showId];
    }
    case 'REMOVE':{
        return prevState.filter(showId => showId !== action.showId);
    }
    default: return prevState
}
}

function usePersistedReducer(reducer,initialState,key){
    const [state,dispatch] = useReducer(reducer,initialState,initial=>{
        const persisted =  localStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : initial;
    });
    useEffect(()=>{
       localStorage.setItem(key,JSON.stringify(state)); 
    },[state,key]);
    return [state,dispatch]
}

export function useShows(key = 'shows'){
    return usePersistedReducer(showReducer,[],key)
}

export function useLastQuery(key = 'lastQuery'){
    const [input,setInput] = useState(()=>{

        const persisted =  sessionStorage.getItem(key);

        return persisted ? JSON.parse(persisted) :"";
    });

const  setPersistedInput = (newState)=>{
    setInput(newState);
    sessionStorage.setItem(key,JSON.stringify(newState))
}

    return [input,setPersistedInput]
 }
//  lazy evaluation it will evaluated only once when state is initialized 
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
export function useShow(showId){
    const [state, dispatch] = useReducer(
        reducer,
        {
            show: null,
            loading: true,
            error: null,
          }
      );
    
    useEffect(() => {
        let isMounted = true;
        apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
      }, [showId]);
      return state;

}