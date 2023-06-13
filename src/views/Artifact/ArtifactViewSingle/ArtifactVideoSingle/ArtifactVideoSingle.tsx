import React from 'react';

import { formatAddress } from 'arcframework';

import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { FileDownload } from 'global/FileDownload';
import { FileMetadata } from 'global/FileMetadata';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { useFileTx } from 'hooks/useFileTx';

import { ArtifactFallbackSingle } from '../ArtifactFallbackSingle';
import { IProps } from '../types';

import * as S from './styles';

function Video(props: IProps & { type: string }) {
	const txData = useFileTx(props.data.rawData);

	const videoRef = React.useRef(null);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [volume, setVolume] = React.useState(1);
	const [currentTime, setCurrentTime] = React.useState(0);
	const [duration, setDuration] = React.useState(0);

	const [elapsedTime, setElapsedTime] = React.useState('00:00');
	const [remainingTime, setRemainingTime] = React.useState('00:00');

	const [isDurationAvailable, setIsDurationAvailable] = React.useState(false);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	const updateTime = () => {
		if (videoRef.current) {
			const duration = videoRef.current.duration;
			setCurrentTime(videoRef.current.currentTime);
			if (duration && !isNaN(duration) && duration > 0) {
				setElapsedTime(formatTime(videoRef.current.currentTime));
				setRemainingTime(formatTime(duration - videoRef.current.currentTime));
			} else {
				setElapsedTime(formatTime(videoRef.current.currentTime));
				setRemainingTime('--:--');
			}
		}
	};

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleVolumeChange = (e: any) => {
		setVolume(e.target.value);
	};

	const handleProgressChange = (e: any) => {
		if (videoRef.current) {
			videoRef.current.currentTime = (duration / 100) * e.target.value;
		}
	};

	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	};

	React.useEffect(() => {
		if (videoRef.current) {
			videoRef.current.volume = volume;
		}
	}, [volume]);

	React.useEffect(() => {
		if (videoRef.current) {
			const handleMetadataLoaded = () => {
				setIsDurationAvailable(true);
			};
			videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
			return () => {
				videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
			};
		}
	}, [videoRef.current]);

	React.useEffect(() => {
		if (isDurationAvailable) {
			const duration = videoRef.current.duration;
			setRemainingTime(formatTime(duration - videoRef.current.currentTime));
		}
	}, [isDurationAvailable, videoRef.current, formatTime]);

	return props.data && txData.fileUrl ? (
		<S.VideoWrapper className={'border-wrapper'}>
			<S.Video ref={videoRef} onLoadedMetadata={handleLoadedMetadata} onTimeUpdate={updateTime}>
				<S.VideoSource type={props.type} src={txData.fileUrl} />
			</S.Video>
			<S.DisplayWrapper playing={isPlaying}>
				<S.NID>
					<S.Name>{props.data.artifactName}</S.Name>
					<S.ID>{formatAddress(props.data.artifactId, true)}</S.ID>
				</S.NID>
			</S.DisplayWrapper>
			<S.Content>
				<S.PlayWrapper playing={!isPlaying}>
					<IconButton
						type={'alt1'}
						src={isPlaying ? ASSETS.mediaPause : ASSETS.mediaPlay}
						handlePress={togglePlayPause}
						tooltip={isPlaying ? language.pause : language.play}
						dimensions={{
							wrapper: 35,
							icon: 20.5,
						}}
					/>
				</S.PlayWrapper>
				<S.ProgressWrapper>
					<S.TimeWrapper>
						<p>{`${elapsedTime} / ${remainingTime}`}</p>
					</S.TimeWrapper>
					<S.ProgressBar
						type={'range'}
						className={'custom-range'}
						min={'0'}
						max={'100'}
						step={'1'}
						value={((currentTime / duration) * 100).toString()}
						onChange={handleProgressChange}
					/>
				</S.ProgressWrapper>
				<S.VolumeWrapper>
					<S.V1>
						<p>{`${language.volume}:`}</p>
					</S.V1>
					<S.VolumeBar
						type={'range'}
						className={'custom-range'}
						min={'0'}
						max={'1'}
						step={'0.1'}
						value={volume.toString()}
						onChange={handleVolumeChange}
					/>
				</S.VolumeWrapper>
			</S.Content>
		</S.VideoWrapper>
	) : null;
}

export default function ArtifactVideoSingle(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	function getDetailData() {
		if (!props.data) {
			return <Loader />;
		} else {
			let renderer = <ArtifactFallbackSingle data={props.data} />;
			switch (props.data.fileType) {
				case 'mp4':
					renderer = <Video data={props.data} type={'video/mp4'} />;
					break;
			}
			return renderer;
		}
	}

	return (
		<S.Wrapper>
			<S.Action>
				<FileDownload fileUrl={txData.fileUrl} />
			</S.Action>
			{getDetailData()}
			<FileMetadata metadata={txData.metadata} />
		</S.Wrapper>
	);
}
