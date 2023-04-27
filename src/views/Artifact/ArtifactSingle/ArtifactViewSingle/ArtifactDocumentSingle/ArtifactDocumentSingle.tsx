import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../types';

import ArtifactTxtSingle from './ArtifactTxtSingle/ArtifactTxtSingle';
import ArtifactCsvSingle from './ArtifactCsvSingle/ArtifactCsvSingle';
import ArtifactPdfSingle from './ArtifactPdfSingle/ArtifactPdfSingle';
import { ArtifactDetailSingle } from '../../ArtifactDetailSingle';
import { ARTIFACT_TYPES } from 'helpers/config';
import { TAGS } from 'arcframework';

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
			let r = <ArtifactDetailSingle data={props.data} type={getArtifactType()} />;
			switch(props.data.fileType){
				case('txt'):
					r = <ArtifactTxtSingle data={props.data}></ArtifactTxtSingle>;
					break;
				case('pdf'):
					r = <ArtifactPdfSingle data={props.data}></ArtifactPdfSingle>;
					break;
				case('csv'):
					r = <ArtifactCsvSingle data={props.data}></ArtifactCsvSingle>;
					break;
			}
			return r;
		}
	}

	return (
			<div>{getDetailData()}</div>
	);
}
