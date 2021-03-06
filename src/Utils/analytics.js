// utils/analytics.js
import ReactGA from 'react-ga';

export const initGA = () => {
	ReactGA.initialize('UA-156277946-2');
};
export const logPageView = page => {
	ReactGA.set({ page });
	ReactGA.pageview(page);
};
export const logEvent = (category = '', action = '') => {
	if (category && action) {
		ReactGA.event({ category, action });
	}
};
export const logException = (description = '', fatal = false) => {
	if (description) {
		ReactGA.exception({ description, fatal });
	}
};
