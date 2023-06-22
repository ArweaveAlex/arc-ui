import React from 'react';

import { FALLBACK_IMAGE, getTxEndpoint } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { useFileTx } from 'hooks/useFileTx';

import * as S from './styles';
import { IProps } from './types';

export default function ImageListItem(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
	const [imageZoomed, setImageZoomed] = React.useState(false);

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

	return (
		<S.ICWrapper id={'image-ic-wrapper'}>
			<S.C1>
				<S.C1Content>{getImage()}</S.C1Content>
			</S.C1>
		</S.ICWrapper>
	);
}
