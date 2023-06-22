import { Loader } from 'components/atoms/Loader';
import { FileMetadata } from 'global/FileMetadata';
import { useFileTx } from 'hooks/useFileTx';

import { ArtifactFallbackSingle } from '../ArtifactFallbackSingle';
import { IProps } from '../types';

import { ArtifactCSVSingle } from './ArtifactCSVSingle';
import { ArtifactPDFSingle } from './ArtifactPDFSingle';
import { ArtifactTXTSingle } from './ArtifactTXTSingle';
import * as S from './styles';

export default function ArtifactDocumentSingle(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	function getDetailData() {
		if (!props.data) {
			return <Loader />;
		} else {
			let renderer = <ArtifactFallbackSingle data={props.data} />;
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

	return (
		<S.Wrapper>
			{getDetailData()}
			{/* <FileMetadata metadata={txData.metadata} /> */}
		</S.Wrapper>
	);
}
