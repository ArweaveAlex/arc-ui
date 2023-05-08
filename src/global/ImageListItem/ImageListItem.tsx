import React from 'react';

import { FALLBACK_IMAGE, formatAddress, getTxEndpoint } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { language } from 'helpers/language';
import { useFileTx } from 'hooks/useFileTx';

import * as S from './styles';
import { IProps } from './types';

export default function ImageListItem(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
	const [imageZoomed, setImageZoomed] = React.useState(false);

	const handleFullscreenChange = () => {
		const fullscreenElement =
			document.fullscreenElement ||
			(document as any).webkitFullscreenElement ||
			(document as any).mozFullScreenElement ||
			(document as any).msFullscreenElement;

		if (!fullscreenElement) {
			setImageZoomed(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		(document as any).addEventListener('webkitfullscreenchange', handleFullscreenChange);
		(document as any).addEventListener('mozfullscreenchange', handleFullscreenChange);
		(document as any).addEventListener('MSFullscreenChange', handleFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			(document as any).removeEventListener('webkitfullscreenchange', handleFullscreenChange);
			(document as any).removeEventListener('mozfullscreenchange', handleFullscreenChange);
			(document as any).removeEventListener('MSFullscreenChange', handleFullscreenChange);
		};
	}, []);

	React.useEffect(() => {
		(async function () {
			if (txData.fileUrl) {
				const imageResponse = await fetch(txData.fileUrl);
				setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
			}
		})();
	}, [txData.fileUrl]);

	function handleImageLoaded() {
		setImageLoaded(true);
	}

	function requestFullScreen(element: any) {
		setImageZoomed(true);
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}

	function exitFullScreen() {
		setImageZoomed(false);
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if ((document as any).webkitExitFullscreen) {
			(document as any).webkitExitFullscreen();
		} else if ((document as any).mozCancelFullScreen) {
			(document as any).mozCancelFullScreen();
		} else if ((document as any).msExitFullscreen) {
			(document as any).msExitFullscreen();
		}
	}

	function getTitle() {
		if (props.data) {
			return (
				<>
					<S.Name>{props.data.artifactName}</S.Name>
					<S.ID>{formatAddress(props.data.artifactId, true)}</S.ID>
				</>
			);
		} else {
			return (
				<S.TP>
					<Loader placeholder />
				</S.TP>
			);
		}
	}

	function getImage() {
		if (!imageZoomed) {
			return (
				<S.ImageWrapper onClick={() => requestFullScreen(document.documentElement)}>
					{(!imageUrl || !imageLoaded) && <Loader placeholder />}
					<S.Image src={imageUrl} onLoad={handleImageLoaded} loaded={imageLoaded} />
				</S.ImageWrapper>
			);
		} else {
			return (
				<Modal header={null} handleClose={() => exitFullScreen()} noContainer zoom>
					{(!imageUrl || !imageLoaded) && <Loader placeholder />}
					<S.Image src={imageUrl} onLoad={handleImageLoaded} loaded={imageLoaded} />
				</Modal>
			);
		}
	}

	function getBodyWrapper(body: React.ReactNode) {
		return (
			<S.C2>
				<S.C2Header>
					<p>{language.artifactDetails}</p>
				</S.C2Header>
				<S.C2Body>{body}</S.C2Body>
			</S.C2>
		);
	}

	function getBody() {
		if (txData.metadata && Object.keys(txData.metadata).length > 0) {
			const body = Object.keys(txData.metadata).map((key) => {
				return (
					<S.ContentLine key={key}>
						<S.InfoData>
							<span>{key}</span>
							<S.BodyData>{txData.metadata[key]}</S.BodyData>
						</S.InfoData>
					</S.ContentLine>
				);
			});
			return getBodyWrapper(body);
		} else {
			if (txData.metadata && Object.keys(txData.metadata).length <= 0) {
				return null;
			} else {
				const body = Array.from({ length: 10 }, (_, i) => i + 1).map((element: number) => {
					return (
						<S.BP key={element}>
							<Loader placeholder />
						</S.BP>
					);
				});
				return getBodyWrapper(body);
			}
		}
	}

	return (
		<S.ICWrapper>
			<S.C1>
				<S.C1Content>
					<S.Title>{getTitle()}</S.Title>
					{getImage()}
				</S.C1Content>
			</S.C1>
			{getBody()}
		</S.ICWrapper>
	);
}
