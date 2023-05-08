import React from 'react';

import { Loader } from 'components/atoms/Loader';
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

	function getDetailData() {
		if (!props.data || !pdfUrl) {
			return <Loader />;
		} else {
			return <S.Object data={pdfUrl} type={'application/pdf'} />;
		}
	}

	return (
		<S.Wrapper>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}
