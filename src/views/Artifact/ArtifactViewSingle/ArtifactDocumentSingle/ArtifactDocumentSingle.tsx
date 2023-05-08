import { TAGS } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { ARTIFACT_TYPES } from 'helpers/config';

import { ArtifactDetailSingle } from '../ArtifactDetailSingle';
import { IProps } from '../types';

import { ArtifactCSVSingle } from './ArtifactCSVSingle';
import { ArtifactPDFSingle } from './ArtifactPDFSingle';
import { ArtifactTXTSingle } from './ArtifactTXTSingle';

export default function ArtifactDocumentSingle(props: IProps) {
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

	function getDetailData() {
		if (!props.data) {
			return <Loader />;
		} else {
			let renderer = <ArtifactDetailSingle data={props.data} type={getArtifactType()} />;
			switch (props.data.fileType) {
				case 'csv':
					renderer = <ArtifactCSVSingle data={props.data}></ArtifactCSVSingle>;
					break;
				case 'pdf':
					renderer = <ArtifactPDFSingle data={props.data}></ArtifactPDFSingle>;
					break;
				case 'txt':
					renderer = <ArtifactTXTSingle data={props.data}></ArtifactTXTSingle>;
					break;
			}
			return renderer;
		}
	}

	return <>{getDetailData()}</>;
}
