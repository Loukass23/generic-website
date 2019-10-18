import React, { useContext } from 'react';
import './App.css';
import Footer from './layout/Footer';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import TabPanel from './layout/TabPanel'
import Hero from './layout/Hero';
import AuthContextProvider from './context/AuthContext';
import ContentContextProvider, { ContentContext } from './context/ContentContext';


const RenderWebsite: React.FC<Props> = () => {
  const { content } = useContext(ContentContext)
  const { panel, hero, footer } = content

  return (
    <React.Fragment>
      <Hero hero={hero} />
      <TabPanel panel={panel} />
      <Footer footer={footer} />
    </React.Fragment>
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <MuiThemeProvider theme={theme}>
          <ContentContextProvider>
            <RenderWebsite />
          </ContentContextProvider>
        </MuiThemeProvider>
      </AuthContextProvider>

    </div>
  );
}

export default App;


interface Props {

}




