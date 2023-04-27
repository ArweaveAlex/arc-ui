import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../types';

import * as S from './styles';

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
		console.log(props.data)
		if (!props.data) {
			return <Loader />;
		} else {
			return (
				<div>
					{/* <ArtifactCsvSingle data={props.data}></ArtifactCsvSingle> */}
					{/* <ArtifactPdfSingle data={props.data}></ArtifactPdfSingle> */}
					<ArtifactTxtSingle data={props.data}></ArtifactTxtSingle>
					{/* <ArtifactDetailSingle data={props.data} type={getArtifactType()} /> */}
				</div>
			);
		}
	}

	return (
			<div>{getDetailData()}</div>
	);
}
