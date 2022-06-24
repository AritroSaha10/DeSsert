import { Outlet } from 'react-router-dom';
import Header from './Header';

const PageLayout = () => {
	return (
		<div className="grid-rows-page">
			<Header />
			<div>
				<Outlet />
			</div>
			<footer>Some random stuff for now</footer>
		</div>
	);
};

return PageLayout;
