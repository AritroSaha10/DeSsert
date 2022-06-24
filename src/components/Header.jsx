import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<h1>Deso-app</h1>
			<ul>
				<li>
					<NavLink>Home</NavLink>
				</li>
				<li>
					<NavLink>Something</NavLink>
				</li>
				<li>
					<NavLink>Something else</NavLink>
				</li>
			</ul>
		</header>
	);
};

export default Header;
