import React, { useContext, useEffect } from 'react';
import './App.css';
import Footer from './layout/Footer';
import { MuiThemeProvider } from '@material-ui/core';
import TabPanel from './layout/TabPanel'
import Hero from './layout/Hero';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import { ContentContext } from './context/ContentContext';
import ContentContextProvider from './context/ContentContext';
import ThemeContextProvider, { ThemeContext } from './context/ThemeContext';
import AuthToolbar from './layout/AuthToolbar';



const RenderWebsite: React.FC<Props> = () => {
  const { content, firestorePull } = useContext(ContentContext)
  const { isAuthenticated } = useContext(AuthContext)
  const {
    theme,
  } = useContext(ThemeContext)
  const { panel, hero, footer } = content

  const loadUserWebsite = () => {
    firestorePull()
  }

  useEffect(() => { if (isAuthenticated) loadUserWebsite() }, [isAuthenticated])

  return (
    <MuiThemeProvider theme={theme}>
      <Hero hero={hero} />
      {isAuthenticated ? <TabPanel panel={panel} /> : <AuthToolbar />}

      <Footer footer={footer} />
    </MuiThemeProvider>)
}

interface Props {

}

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <ThemeContextProvider>
          <ContentContextProvider>
            <RenderWebsite />
          </ContentContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;





