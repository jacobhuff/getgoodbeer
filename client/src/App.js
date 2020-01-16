import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Search } from './components/layout/Search';

import UntappdState from './context/untappd/UntappdState';
import { BeerList } from './components/beers/BeerList';

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
