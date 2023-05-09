import React from 'react';

import { formatAddress } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { useFileTx } from 'hooks/useFileTx';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactCSVSingle(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	const [csvData, setCsvData] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (txData.fileUrl) {
				const csvResponse = await fetch(txData.fileUrl);
				const csvData = await csvResponse.text();
				setCsvData(csvData);
			}
		})();
	}, [txData.fileUrl]);

	function getRandomInt() {
		const min = Math.ceil(1);
		const max = Math.floor(10000);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

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
		if (!props.data || !csvData) {
			return <Loader />;
		} else {
			const rows = csvData.split('\n');
			const headers = rows[0].split(',');
			const data = rows.slice(1);
			return (
				<S.Table>
					<thead>
						<tr>
							{headers.map((header: string) => (
								<th key={getRandomInt()}>{header}</th>
							))}
						</tr>
					</thead>
					<S.Tbody>
						{data.map((row: string) => {
							return (
								<tr key={getRandomInt()}>
									{row.split(',').map((cell: string) => (
										<td key={getRandomInt()}>{cell}</td>
									))}
								</tr>
							);
						})}
					</S.Tbody>
				</S.Table>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.Title>{getTitle()}</S.Title>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}
