import React from 'react';
import Epub from 'epubjs';

import { getTxEndpoint } from 'arcframework';

import { IProps } from '../../types';

import * as S from './styles';

// TODO: hook to set file data / metadata state
export default function ArtifactEbookSingle(props: IProps) {
	const [jsonData, setJsonData] = React.useState<any>(null);
	const [fileUrl, setFileUrl] = React.useState<string | null>(null);
	const [metadata, setMetadata] = React.useState<any>(null);

	const [renditionState, setRenditionState] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				const fileResponse = await fetch(getTxEndpoint(jsonData.fileTxId));
				setFileUrl(fileResponse.url);
			}
		})();
	}, [jsonData]);

	React.useEffect(() => {
		(async function () {
			if (jsonData && jsonData.metadataTxId && jsonData.metadataTxId.length > 0) {
				const metadataResponse = await fetch(getTxEndpoint(jsonData.metadataTxId));
				if (metadataResponse.status === 200) {
					setMetadata(JSON.parse(await (await fetch(metadataResponse.url)).text()));
				} else {
					setMetadata({});
				}
			}
		})();
	}, [jsonData]);

	const viewerRef = React.useRef<HTMLDivElement>(null);
	const [book, setBook] = React.useState<any>(null);

	React.useEffect(() => {
		const fetchEpub = async () => {
			const response = await fetch(fileUrl);
			const arrayBuffer = await response.arrayBuffer();
			const book = Epub(arrayBuffer);
			setBook(book);
		};

		fetchEpub();
	}, [fileUrl]);

	const handlePrevPage = () => {
		renditionState.prev();
	};

	const handleNextPage = () => {
		renditionState.next();
	};

	React.useEffect(() => {
		if (!book || !viewerRef.current) return;

		const rendition = book.renderTo(viewerRef.current, {
			manager: 'continuous',
			flow: 'paginated',
			width: '100%',
			height: '100%',
		});

		setRenditionState(rendition);

		rendition.themes.default({
			body: {
				color: '#ff0000',
			},
		});

		rendition.display();

		return () => {
			rendition.destroy();
		};
	}, [book]);

	if (!book) {
		return <div>Loading...</div>;
	}

	return (
		<S.Wrapper className={'border-wrapper'}>
			<button onClick={handlePrevPage}>Previous</button>
			<button onClick={handleNextPage}>Next</button>
			<div ref={viewerRef} style={{ width: '100%', height: '100%' }} />
		</S.Wrapper>
	);
}
