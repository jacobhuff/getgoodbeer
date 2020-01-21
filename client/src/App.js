import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Search } from './components/layout/Search';
import { BeerList } from './components/beers/BeerList';
import UntappdState from './context/untappd/UntappdState';

import './App.css';

function App() {
  return (
    <UntappdState>
      <Router>
        <div className='App'>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <div className='container'>
                  <Search />
                </div>
              )}
            />
            <Route exact path='/:username/beers' component={BeerList} />
          </Switch>
        </div>
      </Router>
    </UntappdState>
  );
}

export default App;
