import React from 'react';
import './App.css';
import Footer from './layout/Footer';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import TabPanel from './layout/TabPanel'
import Hero from './layout/Hero';
import { content } from './content'


const App: React.FC = () => {
  const { panel, hero, footer } = content
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Hero hero={hero} />
        <TabPanel panel={panel} />
        <Footer footer={footer} />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
