import React from 'react';

import { formatAddress } from 'arcframework';

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

	function getTitle() {
		if (props.data) {
			return (
				<>
					<S.Name>{props.data.artifactName}</S.Name>
					<S.ID>{formatAddress(props.data.artifactId, true)}</S.ID>
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
		if (!props.data) {
			return <Loader />;
		} else {
			return <S.Pre>{txtData}</S.Pre>;
		}
	}

	return (
		<S.Wrapper>
			<S.Title>{getTitle()}</S.Title>
			<S.DetailWrapper className={'border-wrapper'}>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}
