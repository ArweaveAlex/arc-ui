import React from 'react';
import parse from 'html-react-parser';

import { getTxEndpoint } from 'arcframework';

import { language } from 'helpers/language';

import { IProps } from '../types';

import * as S from './styles';

export default function ArtifactNewsSingle(props: IProps) {
	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

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

	console.log(jsonData);

	return jsonData ? (
		<S.Wrapper>
			<S.HWrapper>
				<S.HWrapper>
					{jsonData.description && (
						<S.HDescription className={'border-wrapper'}>
							<span>{jsonData.description}</span>
						</S.HDescription>
					)}
					<img src={getImage()} />
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
					</S.HData>
				</S.HWrapper>
				<S.AContent>{parse(jsonData.content)}</S.AContent>
			</S.HWrapper>
		</S.Wrapper>
	) : null;
}
