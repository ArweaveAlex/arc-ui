import React from 'react';

import { formatAddress } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { FileDownload } from 'global/FileDownload';
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
		if (!props.data || !csvData) {
			return <Loader />;
		} else {
			const rows = csvData.split('\n');
			const headers = rows[0].split(',');
			const data = rows.slice(1);
			return (
				<S.Table>
					<S.THead>
						{headers.map((header: string, index: number) => (
							<S.THeadCell key={index}>
								<p>{header}</p>
							</S.THeadCell>
						))}
					</S.THead>

					<S.Tbody>
						{data.map((row: string, rowIndex: number) => {
							return (
								<S.TBodyRow key={rowIndex}>
									{row.split(',').map((cell: string, cellIndex: number) => (
										<S.TBodyCell key={`${rowIndex}-${cellIndex}`}>
											<p>{cell}</p>
										</S.TBodyCell>
									))}
								</S.TBodyRow>
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
