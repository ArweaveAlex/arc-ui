import React from 'react';

import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import { Artifact } from 'views/Artifact';

export function App() {
	const query = parseQuery(window.location.search);

	React.useEffect(() => {
		function sendHeightToParent() {
			window.parent.postMessage(
				{
					frameHeight: document.body.scrollHeight,
					frameId: DOM.renderer,
				},
				'*'
			);
		}

		sendHeightToParent();

		const mutationObserver = new MutationObserver(() => {
			sendHeightToParent();
		});

		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: false,
			characterData: false,
		});

		return () => {
			mutationObserver.disconnect();
		};
	}, []);

	React.useEffect(() => {
		function handleMessage(event: any) {
			const mutationObserver = new MutationObserver(() => {
				if (event.data.type === 'setHeight' && event.data.height && document.getElementById(DOM.ids.imageIc)) {
					document.getElementById(DOM.ids.imageIc).style.height = event.data.height;
				}
			});

			mutationObserver.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: false,
				characterData: false,
			});

			return () => {
				mutationObserver.disconnect();
			};
		}

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	return query.tx ? (
		<div className={'view-wrapper max-cutoff'}>
			<div id={DOM.modal} />
			<Artifact id={query.tx} />
		</div>
	) : (
		<div className={'wrapper-600 border-wrapper'}>
			<p>{language.invalidQuery}</p>
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
