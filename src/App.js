import { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// Screens
import { Login, Dashboard } from 'screens/layout';
// Components
import { Home } from 'screens';
// Util


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
                    <PublicRoute path="/" exact component={Login} />
                    <PrivateRoute path="/home" exact component={Home} />
                    <Redirect path="/**" to="/" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}


const PrivateRoute = ({ component: Component, ...rest }) => {
	return true ? (
		<Route {...rest}
			render={(props) => (
				<Dashboard {...props}>
					<Component {...props} />
				</Dashboard>
			)}
		/>
	) : (<Redirect to="/" />);
};

// Restricted
// 		false meaning public route
//		true meaning restricted route
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	return (
		<Route {...rest} 
			render={(props) =>
				true && restricted ? (
					<Redirect to="/home" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};


export default App;
