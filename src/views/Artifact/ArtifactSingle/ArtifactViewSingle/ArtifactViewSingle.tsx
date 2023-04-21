import { ArtifactEnum, TAGS } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { ARTIFACT_TYPES } from 'helpers/config';

import { ArtifactDetailSingle } from '../ArtifactDetailSingle';
import { IProps } from '../types';

import { ArtifactImageSingle } from './ArtifactImageSingle';
import { ArtifactMessagingSingle } from './ArtifactMessagingSingle';
import { ArtifactNostrSingle } from './ArtifactNostrSingle';
import { ArtifactRedditSingle } from './ArtifactRedditSingle';
import { ArtifactWebpageSingle } from './ArtifactWebpageSingle';
import * as S from './styles';

export default function ArtifactViewSingle(props: IProps) {
	function getArtifactType() {
		if (props.data) {
			let artifactType = ARTIFACT_TYPES[props.data.artifactType];
			if (artifactType) {
				return artifactType;
			} else {
				return ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
			}
		} else {
			return null;
		}
	}

	function getArtifact() {
		if (props.data) {
			switch (props.data.artifactType) {
				case ArtifactEnum.Image:
					return <ArtifactImageSingle data={props.data} />;
				case ArtifactEnum.Messaging:
					return <ArtifactMessagingSingle data={props.data} />;
				case ArtifactEnum.Nostr:
					return <ArtifactNostrSingle data={props.data} />;
				case ArtifactEnum.Reddit:
					return <ArtifactRedditSingle data={props.data} />;
				case ArtifactEnum.Webpage:
					return <ArtifactWebpageSingle data={props.data} />;
				default:
					return <ArtifactDetailSingle data={props.data} type={getArtifactType()} />;
			}
		} else {
			return (
				<div className={'wrapper-600 border-container'}>
					<Loader />
				</div>
			);
		}
	}

	return <S.Wrapper>{getArtifact()}</S.Wrapper>;
}
