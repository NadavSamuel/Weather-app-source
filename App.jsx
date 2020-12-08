import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch,useSelector } from 'react-redux';
import { loadFavoriteCities } from './actions/weatherActions';
import { toggleInitialLoad } from './actions/systemActions'
import { MainApp } from './pages/MainApp';
import { Favorites } from './pages/Favorites';
import { Navbar } from './cmps/Navbar';
import { About } from './pages/About';
import {LoaderContainer} from './cmps/LoaderContainer'



function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.systemReducer)


  useEffect(() => {
    dispatch(toggleInitialLoad())
    dispatch(loadFavoriteCities());
    return () => {
      dispatch(toggleInitialLoad())
    }


  }, [])

  return (
    <div className="App">

      <Router>
        <Navbar />
        <AnimatePresence >
          <Switch location={location} key={location.pathname}>
            <Route path="/favorites" component={Favorites} />
            <Route path="/about" component={About} />
            <Route path="/" component={MainApp} />
          </Switch>
        </AnimatePresence>
      </Router>
      {isLoading && <LoaderContainer/>}
    </div>
  );
}

export default App;
