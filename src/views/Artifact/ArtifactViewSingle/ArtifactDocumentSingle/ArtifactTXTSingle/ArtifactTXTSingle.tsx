import React from 'react';

import { Loader } from 'components/atoms/Loader';
import { useFileTx } from 'hooks/useFileTx';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactTXTSingle(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	const [txtData, setTxtData] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (txData.fileUrl) {
				const txtResponse = await fetch(txData.fileUrl);
				const txtData = await txtResponse.text();
				setTxtData(txtData);
			}
		})();
	}, [txData.fileUrl]);

	function getDetailData() {
		if (!props.data) {
			return <Loader />;
		} else {
			return <S.Pre>{txtData}</S.Pre>;
		}
	}

	return (
		<div className={'border-wrapper'}>
			<S.Wrapper>
				<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
			</S.Wrapper>
		</div>
	);
}
