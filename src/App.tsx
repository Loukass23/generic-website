import React from 'react';
import './App.css';
import Footer from './components/Footer';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import TabPanel from './navigation/TabPanel'
import Hero from './components/Hero';
import { content } from './content'


const App: React.FC = () => {
  const { navbar, hero, footer } = content
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Hero content={hero} />
        <TabPanel content={navbar} />

        <Footer content={footer} />

      </MuiThemeProvider>
    </div>
  );
}

export default App;
