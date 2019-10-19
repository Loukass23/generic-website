import React, { useContext } from 'react';
import './App.css';
import Footer from './layout/Footer';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import TabPanel from './layout/TabPanel'
import Hero from './layout/Hero';
import AuthContextProvider from './context/AuthContext';
import { ArticleContext } from './context/ArticleContext';


const RenderWebsite: React.FC<Props> = () => {
  const { content } = useContext(ArticleContext)
  const { panel, hero, footer } = content

  return (
    <React.Fragment>
      <Hero hero={hero} />
      <TabPanel panel={panel} />
      <Footer footer={footer} />
    </React.Fragment>
  )
}

interface Props {

}

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <MuiThemeProvider theme={theme}>
          <RenderWebsite />
        </MuiThemeProvider>
      </AuthContextProvider>

    </div>
  );
}

export default App;





