import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import  routes from './Route'
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/configureStore';
import { Provider } from 'react-redux';
import { loadUser } from './store/actions/auth';
import  {BrowserRouter}  from  'react-router-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';




const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}


const theme = createMuiTheme();

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const history = createBrowserHistory();

    return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter  >
              <Router history={history}>
                <Fragment >
                  {renderRoutes(routes)}
                </Fragment>
              </Router>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));