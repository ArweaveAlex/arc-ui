import React from 'react';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { formatAddress, formatDate, STORAGE } from 'arcframework';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function NostrListItem(props: IProps) {
	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	function getProfileImage() {
		if (props.data && props.data.profileImagePath && props.data.profileImagePath !== STORAGE.none) {
			return (
				<S.ProfileImage>
					<img src={props.data.profileImagePath} alt={''} />
				</S.ProfileImage>
			);
		} else {
			return null;
		}
	}

	return props.data && jsonData ? (
		<S.LIWrapper isListItem={props.isListItem} active={props.active}>
			<S.LIContent>
				<S.LIHeader>
					<S.ProfileWrapper>
						{getProfileImage()}
						<S.NUContainer>
							<S.Name>
								{jsonData.profile && jsonData.profile.name
									? jsonData.profile.name
									: jsonData.profile.slice(0, 7) + '..' + jsonData.profile.slice(-3)}
							</S.Name>
							<S.Username>
								{jsonData.profile && jsonData.profile.name
									? jsonData.profile.name
									: jsonData.profile.slice(0, 7) + '..' + jsonData.profile.slice(-3)}
							</S.Username>
						</S.NUContainer>
					</S.ProfileWrapper>
					<S.AInfoWrapper>
						<S.ALinkWrapper>
							{props.active && (
								<S.ActiveContainer>
									<ReactSVG src={ASSETS.star} />
								</S.ActiveContainer>
							)}
							{props.showArtifactLink && (
								<>
									<S.ALink>
										<span>{`${language.artifact}:`}&nbsp;</span>
										<p>{props.data ? formatAddress(props.data.artifactId, false) : null}</p>
									</S.ALink>
								</>
							)}
						</S.ALinkWrapper>
						<S.ALinkWrapper>
							{props.showOwnerLink && (
								<>
									<S.ALink>
										<span>{`${language.owner}:`}&nbsp;</span>
										<p>{props.data ? formatAddress(props.data.owner, false) : null}</p>
									</S.ALink>
								</>
							)}
						</S.ALinkWrapper>
					</S.AInfoWrapper>
				</S.LIHeader>
				<S.LIBody>
					<S.Message>
						<p>{parse(formatNostrData(jsonData))}</p>
					</S.Message>
					{jsonData.post.created_at && <S.PostDate>{formatDate(jsonData.post.created_at * 1000, 'iso')}</S.PostDate>}
				</S.LIBody>
			</S.LIContent>
		</S.LIWrapper>
	) : null;
}

function formatNostrData(data: any) {
	if (data && (data.post || data.post.content)) {
		return data.post.content;
	} else {
		return STORAGE.none;
	}
}
