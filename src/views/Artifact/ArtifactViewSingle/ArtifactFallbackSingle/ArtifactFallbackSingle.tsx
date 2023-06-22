import { ReactSVG } from 'react-svg';

import { formatArtifactType, formatDataSize } from 'arcframework';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { useFileTx } from 'hooks/useFileTx';

import { IProps } from '../types';

import * as S from './styles';

export default function ArtifactFallbackSingle(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	return props.data && txData.fileUrl ? (
		<>
			{/* <S.Title>{getTitle()}</S.Title> */}
			<S.Wrapper>
				<S.Content>
					<S.ContentLine>
						<S.InfoData>
							<S.DataWrapper>
								<S.DataLine>
									<S.DataHeader>{language.artifactType}:&nbsp;</S.DataHeader>
									<p>{formatArtifactType(props.data.artifactType)}</p>
								</S.DataLine>
							</S.DataWrapper>
						</S.InfoData>
					</S.ContentLine>
					<S.ContentLine>
						<S.InfoData>
							<span>{language.artifactDetail.fileInformation}</span>
							<S.LinkWrapper>
								<S.DataLine>
									<ReactSVG src={ASSETS.artifact} />
									<p>{props.data.artifactName}</p>
								</S.DataLine>
							</S.LinkWrapper>
							<S.LinkWrapperAlt>
								<S.DataLine>
									<ReactSVG src={ASSETS.logoAlt2} />
									<S.DataUrl target={'_blank'} rel={'noreferrer'} href={txData.fileUrl!}>
										{txData.fileUrl}
									</S.DataUrl>
								</S.DataLine>
							</S.LinkWrapperAlt>
							<S.LinkWrapper>
								<S.DataLine>
									<ReactSVG src={ASSETS.data} />
									<p>{formatDataSize(props.data.dataSize!)}</p>
								</S.DataLine>
							</S.LinkWrapper>
						</S.InfoData>
					</S.ContentLine>
				</S.Content>
			</S.Wrapper>
		</>
	) : null;
}
