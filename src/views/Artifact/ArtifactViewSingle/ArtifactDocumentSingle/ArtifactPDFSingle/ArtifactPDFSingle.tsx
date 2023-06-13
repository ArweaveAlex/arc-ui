import React from 'react';

import { formatAddress } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { FileDownload } from 'global/FileDownload';
import { useFileTx } from 'hooks/useFileTx';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactPDFSingle(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	const [pdfUrl, setPdfUrl] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (txData.fileUrl) {
				setPdfUrl(txData.fileUrl);
			}
		})();
	}, [txData.fileUrl]);

	function getTitle() {
		if (props.data) {
			return (
				<>
					<S.NID>
						<S.Name>{props.data.artifactName}</S.Name>
						<S.ID>{formatAddress(props.data.artifactId, true)}</S.ID>
					</S.NID>
					<FileDownload fileUrl={txData.fileUrl} />
				</>
			);
		} else {
			return (
				<S.TP>
					<Loader placeholder />
				</S.TP>
			);
		}
	}

	function getDetailData() {
		if (!props.data || !pdfUrl) {
			return <Loader />;
		} else {
			return <S.Object data={pdfUrl} type={'application/pdf'} />;
		}
	}

	return (
		<S.Wrapper>
			<S.Title>{getTitle()}</S.Title>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}
