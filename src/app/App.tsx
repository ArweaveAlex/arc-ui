import { DOM } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { Artifact } from 'views/Artifact';
export function App() {
	const query = parseQuery(window.location.search);

	return query.tx ? (
		<div className={'view-wrapper max-cutoff'}>
			<div id={DOM.modal} />
			<Artifact id={query.tx} />
		</div>
	) : (
		<div className={'wrapper-600 border-wrapper'}>
			<p>{LANGUAGE.invalidQuery}</p>
		</div>
	);
}

function parseQuery(queryString: string) {
	return (queryString[0] === '?' ? queryString.substr(1) : queryString)
		.split('&')
		.reduce((query: any, pair: string) => {
			const [key, value] = pair.split('=');
			query[decodeURIComponent(key)] = decodeURIComponent(value || '');
			return query;
		}, {});
}
