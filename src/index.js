import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import CounterContainer from './counter/Counter';
import counterReducer from './counter/Counter.reducer';
import GalleryContainer from './gallery/Gallery';
import galleryReducer from './gallery/Gallery.reducer';
import DragonGameContainer from './dragon/Dragon';
import dragonGameReducer from './dragon/Dragon.reducer';
import WeatherContainer from './weather/Weather';
import weatherReducer from './weather/Weather.reducer';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
import * as Handlebars from 'handlebars';

const reducer = Redux.combineReducers({
  theCount: counterReducer,
  galleryInfo: galleryReducer,
  dragonGame: dragonGameReducer,
  weather: weatherReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

const HomePage = () =>
  <div>
    <h1>Welcome to my portfolio!</h1>
    <p>Have a look around!
    See what this is <Link to="/about">all about</Link>
    </p>
  </div>;

const AboutPage = () =>
  <div>
    <h1>About</h1>
    <p>I am a full-stack web developer.</p>
  </div>;

const ContactPage = () =>
  <div>
    <h1>Contact</h1>
    <p>Contact me at this email address: <a
    href="mailto:myemail@gmail.com">myemail@gmail.com</a></p>
  </div>;

const AppLayout = ({ children }) =>
  <div>
    <ul className="nav nav-tabs">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/counter">Counter</Link></li>
      <li><Link to="/dragon">Dragon</Link></li>
      <li><Link to="/gallery">Gallery</Link></li>
      <li><Link to="/weather/atlanta">Atlanta Weather</Link></li>
      <li><Link to="/weather/phoenix">Phoenix Weather</Link></li>
      <li><Link to="/weather/memphis">Memphis Weather</Link></li>
    </ul>
    <div>
      {children}
    </div>
  </div>;

ReactDOM.render(
  <ReactRedux.Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={AppLayout}>
          <IndexRoute component={HomePage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/counter" component={CounterContainer}/>
          <Route path="/gallery" component={GalleryContainer}/>
          <Route path="/dragon" component={DragonGameContainer}/>
          <Route path="/weather/:name" component={WeatherContainer}/>
        </Route>
      </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
