import React from 'react';
import parse from 'html-react-parser';

import { getTxEndpoint } from 'arcframework';

import { DOM } from 'helpers/config';
import { language } from 'helpers/language';

import { IProps } from '../types';

import * as S from './styles';

export default function ArtifactNewsSingle(props: IProps) {
	const [jsonData, setJsonData] = React.useState<any>(null);
	const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);

	const imageRef = React.useRef<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	React.useEffect(() => {
		if (imageLoaded) {
			if (imageRef && imageRef.current) {
				window.parent.postMessage(
					{
						frameHeight: document.body.scrollHeight + 40,
						frameId: DOM.renderer,
					},
					'*'
				);
			}
		}
	}, [imageLoaded]);

	function getImage() {
		if (props.data && props.data.mediaIds) {
			const jsonIds = JSON.parse(props.data.mediaIds);
			const imageKey = Object.keys(jsonIds)[0];
			if (imageKey) return getTxEndpoint(jsonIds[imageKey].id);
			else return null;
		} else {
			return null;
		}
	}

	return jsonData ? (
		<S.Wrapper>
			<S.HWrapper>
				<S.HWrapper>
					{jsonData.description && (
						<S.HDescription className={'border-wrapper'}>
							<span>{jsonData.description}</span>
						</S.HDescription>
					)}
					{getImage() !== null && (
						<img ref={imageRef} className={'border-wrapper'} src={getImage()} onLoad={() => setImageLoaded(true)} />
					)}
					<S.HData>
						{jsonData.author && (
							<S.HLine>
								<p>{`${language.author}:`}</p>
								&nbsp;
								<span>{jsonData.author}</span>
							</S.HLine>
						)}
						{jsonData.source && jsonData.source.name && (
							<S.HLine>
								<p>{`${language.source}:`}</p>
								&nbsp;
								<span>{jsonData.source.name}</span>
							</S.HLine>
						)}
						{jsonData.publishedAt && (
							<S.HDate>
								<p>{`${language.datePublished}:`}</p>
								&nbsp;
								<span>
									{new Date(jsonData.publishedAt).toLocaleDateString('en-US', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit',
										timeZoneName: 'short',
									})}
								</span>
							</S.HDate>
						)}
					</S.HData>
				</S.HWrapper>
				<S.AContent>{parse(jsonData.content)}</S.AContent>
			</S.HWrapper>
		</S.Wrapper>
	) : null;
}
