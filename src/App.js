import React from 'react';
import { Switch , Route } from 'react-router-dom'
import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';

function App() {
  return (
    <div>
    
      <Switch>
      <Route exact path = "/">
       <Home/>
      </Route>
      <Route exact path = "/starred">
       <Starred/>
      </Route>
      <Route exact path = '/show/:id'>
       <Show/>
      </Route>
      <Route>
        404 not found
      </Route>
    </Switch>
    </div>
  );
}

export default App;
// useEffect(()=>{
// console.log(render)
// return ()=>{
//   // it return before the comonent will unmount and update 
//   console.log(exit)
// }
// },[array])
