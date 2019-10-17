import React from 'react';
import './App.css';
import Footer from './layout/Footer';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import TabPanel from './layout/TabPanel'
import Hero from './layout/Hero';
import { content } from './content'
import AuthContextProvider from './context/AuthContext';


const App: React.FC = () => {
  const { panel, hero, footer } = content
  return (
    <div className="App">
      <AuthContextProvider>
        <MuiThemeProvider theme={theme}>
          <Hero hero={hero} />
          <TabPanel panel={panel} />
          <Footer footer={footer} />
        </MuiThemeProvider>
      </AuthContextProvider>

    </div>
  );
}

export default App;
