import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Screens
import { Login } from 'screens/layout';

const html = document.getElementsByTagName('html')[0];

function App() {
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('scheme-dark');
        } else {
            html.classList.remove('scheme-dark');
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
