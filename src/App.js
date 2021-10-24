// Common
import { useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// Screens
import { Login, Dashboard, Landing, Ticket, Activate } from 'screens/layout';
// Components
import { Home, Users, Tickets, TicketsDone } from 'screens';
import { isLoggedIn, isTokenValid, prefersDarkMode } from 'utils';
// Others
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const htmlClasses = document.documentElement.classList;

	useEffect(() => {
		prefersDarkMode() ?
			htmlClasses.add('dark') :
			htmlClasses.remove('dark');
	}, [htmlClasses]);

	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<PublicRoute path="/" exact component={Landing} />
					<PublicRoute path="/login" exact restricted component={Login} />
					<PublicRoute path="/ticket/tracking" exact component={Ticket} />
					<PublicRoute path="/activate/id/:id/token/:token" exact component={Activate} />
					<PrivateRoute path="/home" exact component={Home} />
					<PrivateRoute path="/users" exact component={Users} />
					<PrivateRoute path="/tickets" exact component={Tickets} />
					<PrivateRoute path="/tickets/inactive" exact component={TicketsDone} />
					<Redirect path="/**" to="/" />
				</Switch>
			</div>
			<ToastContainer />
		</BrowserRouter>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	return isLoggedIn() ? (
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
const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
	// TODO: handle token
	// isTokenValid();
	return (
		<Route {...rest}
			render={(props) =>
				isLoggedIn() && restricted ? (
					<Redirect to="/home" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};


export default App;
