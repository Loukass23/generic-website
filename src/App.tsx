import React, { useContext } from 'react';
import './App.css';
import Footer from './layout/Footer';
import { MuiThemeProvider } from '@material-ui/core';
import TabPanel from './layout/TabPanel'
import Hero from './layout/Hero';
import AuthContextProvider from './context/AuthContext';
import { ContentContext } from './context/ContentContext';
import ContentContextProvider from './context/ContentContext';
import ThemeContextProvider, { ThemeContext } from './context/ThemeContext';



const RenderWebsite: React.FC<Props> = () => {
  const { content } = useContext(ContentContext)
  const {
    theme,
  } = useContext(ThemeContext)
  const { panel, hero, footer } = content

  return (
    <MuiThemeProvider theme={theme}>
      <Hero hero={hero} />
      <TabPanel panel={panel} />
      <Footer footer={footer} />
    </MuiThemeProvider>)
}

interface Props {

}

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <ContentContextProvider>
          <ThemeContextProvider>
            <RenderWebsite />
          </ThemeContextProvider>
        </ContentContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;





