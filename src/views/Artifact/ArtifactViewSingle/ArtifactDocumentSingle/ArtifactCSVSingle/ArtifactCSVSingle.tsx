import React from 'react';

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
								<S.Th key={getRandomInt()}>{header}</S.Th>
							))}
						</tr>
					</thead>
					<S.Tbody>
						{data.map((row: string) => {
							return (
								<S.Tr key={getRandomInt()}>
									{row.split(',').map((cell: string) => (
										<S.Td key={getRandomInt()}>{cell}</S.Td>
									))}
								</S.Tr>
							);
						})}
					</S.Tbody>
				</S.Table>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}
