import { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// Screens
import { Login, Dashboard } from 'screens/layout';
// Components
import { Home } from 'screens';
const htmlClasses = document.getElementsByTagName('html')[0].classList;

function App() {
	useEffect(() => {
		htmlClasses.contains('scheme-dark') ?
			htmlClasses.remove('scheme-dark') :
			htmlClasses.add('scheme-dark');
		// console.log(typeof localStorage.getItem('darkMode'));

		// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //     htmlClasses.add('scheme-dark');
        // } else {
        //     htmlClasses.remove('scheme-dark');
        // }
		// console.log(htmlClasses);
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
