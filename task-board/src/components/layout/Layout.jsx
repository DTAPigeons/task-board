import React from 'react';
import { Main } from './main/Main';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';

class Layout extends React.Component{

    render(){
        return(
            <div className="Layout">
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        );
    }
}

export default Layout;