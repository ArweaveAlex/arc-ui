import React from 'react';

import { FALLBACK_IMAGE, getTxEndpoint } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { DOM } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function ImageListItem(props: IProps) {
	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
	const [imageZoomed, setImageZoomed] = React.useState(false);

	const [metadata, setMetadata] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				const imageResponse = await fetch(
					getTxEndpoint(jsonData.fileTxId.length > 0 ? jsonData.fileTxId : FALLBACK_IMAGE)
				);
				setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
			}
		})();
	}, [jsonData]);

	React.useEffect(() => {
		(async function () {
			if (jsonData && jsonData.metadataTxId && jsonData.metadataTxId.length > 0) {
				const metadataResponse = await fetch(getTxEndpoint(jsonData.metadataTxId));
				if (metadataResponse.status === 200) {
					setMetadata(JSON.parse(await (await fetch(metadataResponse.url)).text()));
				}
			}
		})();
	}, [jsonData]);

	function handleImageZoom() {
		if (imageLoaded) {
			setImageZoomed(!imageZoomed);
		}
	}

	function getColumnDisplay() {
		if (document.getElementById(DOM.preview)) {
			return true;
		} else {
			return false;
		}
	}

	function getTitle() {
		if (props.data) {
			return <p>{props.data.artifactName}</p>;
		} else {
			return (
				<S.TP>
					<Loader placeholder />
				</S.TP>
			);
		}
	}

	function handleImageLoaded() {
		setImageLoaded(true);
	}

	function getImage() {
		if (!imageZoomed) {
			return (
				<S.ImageWrapper column={getColumnDisplay()} onClick={() => handleImageZoom()}>
					{(!imageUrl || !imageLoaded) && <Loader placeholder />}
					<S.Image src={imageUrl} onLoad={handleImageLoaded} loaded={imageLoaded} column={getColumnDisplay()} />
				</S.ImageWrapper>
			);
		} else {
			return (
				<Modal header={null} handleClose={() => setImageZoomed(false)} noContainer zoom>
					{(!imageUrl || !imageLoaded) && <Loader placeholder />}
					<S.Image src={imageUrl} onLoad={handleImageLoaded} loaded={imageLoaded} column={getColumnDisplay()} />
				</Modal>
			);
		}
	}

	function getBody() {
		if (metadata) {
			return (
				<>
					{Object.keys(metadata).map((key) => {
						return (
							<S.ContentLine key={key}>
								<S.InfoData>
									<span>{key}</span>
									<S.BodyData>{metadata[key]}</S.BodyData>
								</S.InfoData>
							</S.ContentLine>
						);
					})}
				</>
			);
		} else {
			return (
				<>
					{Array.from({ length: 10 }, (_, i) => i + 1).map((element: number) => {
						return (
							<S.BP key={element}>
								<Loader placeholder />
							</S.BP>
						);
					})}
				</>
			);
		}
	}

	return (
		<S.ICWrapper column={getColumnDisplay()}>
			<S.C1 column={getColumnDisplay()}>
				<S.C1Content column={getColumnDisplay()}>
					<S.Title column={getColumnDisplay()}>{getTitle()}</S.Title>
					{getImage()}
				</S.C1Content>
			</S.C1>
			<S.C2 column={getColumnDisplay()}>
				<S.C2Header>
					<p>{LANGUAGE.artifactDetails}</p>
				</S.C2Header>
				<S.C2Body column={getColumnDisplay()}>{getBody()}</S.C2Body>
			</S.C2>
		</S.ICWrapper>
	);
}
