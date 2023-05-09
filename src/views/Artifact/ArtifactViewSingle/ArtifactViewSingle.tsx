import { ArtifactEnum } from 'arcframework';

import { Loader } from 'components/atoms/Loader';

import { ArtifactAudioSingle } from './ArtifactAudioSingle';
import { ArtifactDocumentSingle } from './ArtifactDocumentSingle';
import { ArtifactEbookSingle } from './ArtifactEbookSingle';
import { ArtifactFallbackSingle } from './ArtifactFallbackSingle';
import { ArtifactImageSingle } from './ArtifactImageSingle';
import { ArtifactMessagingSingle } from './ArtifactMessagingSingle';
import { ArtifactNostrSingle } from './ArtifactNostrSingle';
import { ArtifactRedditSingle } from './ArtifactRedditSingle';
import { ArtifactVideoSingle } from './ArtifactVideoSingle';
import { ArtifactWebpageSingle } from './ArtifactWebpageSingle';
import * as S from './styles';
import { IProps } from './types';

export default function ArtifactViewSingle(props: IProps) {
	function getArtifact() {
		if (props.data) {
			switch (props.data.artifactType) {
				case ArtifactEnum.Audio:
					return <ArtifactAudioSingle data={props.data} />;
				case ArtifactEnum.Document:
					return <ArtifactDocumentSingle data={props.data} />;
				case ArtifactEnum.Ebook:
					return <ArtifactEbookSingle data={props.data} />;
				case ArtifactEnum.Image:
					return <ArtifactImageSingle data={props.data} />;
				case ArtifactEnum.Messaging:
					return <ArtifactMessagingSingle data={props.data} />;
				case ArtifactEnum.Nostr:
					return <ArtifactNostrSingle data={props.data} />;
				case ArtifactEnum.Reddit:
					return <ArtifactRedditSingle data={props.data} />;
				case ArtifactEnum.Video:
					return <ArtifactVideoSingle data={props.data} />;
				case ArtifactEnum.Webpage:
					return <ArtifactWebpageSingle data={props.data} />;
				default:
					return <ArtifactFallbackSingle data={props.data} />;
			}
		} else {
			return (
				<div className={'wrapper-600'}>
					<Loader />
				</div>
			);
		}
	}

	return <S.Wrapper>{getArtifact()}</S.Wrapper>;
}
