// Common
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// Screens
import { Login, Dashboard, Landing, Ticket } from 'screens/layout';
// Components
import { Home, Users } from 'screens';
import { isLoggedIn } from 'utils';

function App() {

	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<PublicRoute path="/" exact component={Landing} />
					<PublicRoute path="/login" exact restricted component={Login} />
					<PublicRoute path="/ticket/id/:id" exact component={Ticket} />
					<PrivateRoute path="/home" exact component={Home} />
					<PrivateRoute path="/users" exact component={Users} />
					<Redirect path="/**" to="/" />
				</Switch>
			</div>
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
