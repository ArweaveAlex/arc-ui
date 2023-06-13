import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { getImageShadow, STYLING } from 'helpers/styling';

export const ICWrapper = styled.div`
	width: 100%;
	justify-content: space-between;
	animation: ${open} ${fadeIn2};
`;

export const C1 = styled.div`
	height: auto;
	width: 100%;
	a {
		&:hover {
			text-decoration: none;
		}
	}
`;

export const C1Content = styled.div`
	height: auto;
	width: 100%;
	text-align: left;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const Title = styled.div`
	height: auto;
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
	margin: 0 0 20px 0;
	a {
		line-height: 1.5 !important;
		color: ${(props) => props.theme.colors.font.primary.active.base} !important;
		font-weight: ${(props) => props.theme.typography.weight.bold} !important;
		font-family: ${(props) => props.theme.typography.family.alt1} !important;
		font-size: clamp(22px, 2.25vw, 28px) !important;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
	}
	a {
		&:hover {
			text-decoration: underline;
		}
	}
`;

export const NID = styled.div``;

export const Name = styled.p`
	line-height: 1.5 !important;
	color: ${(props) => props.theme.colors.font.primary.active.base} !important;
	font-weight: ${(props) => props.theme.typography.weight.bold} !important;
	font-family: ${(props) => props.theme.typography.family.alt1} !important;
	font-size: clamp(22px, 2.25vw, 28px) !important;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-word;
`;

export const ID = styled.p`
	font-size: ${(props) => props.theme.typography.size.xSmall} !important;
	font-weight: ${(props) => props.theme.typography.weight.medium} !important;
	color: ${(props) => props.theme.colors.font.primary.alt6} !important;
	margin: 10px 0 0 0 !important;
`;

export const ImageWrapper = styled.div`
	height: 550px;
	width: 100%;
	background: ${(props) => props.theme.colors.container.alt5.background};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	box-shadow: ${(props) => getImageShadow(props.theme)};
	cursor: zoom-in;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		height: 300px;
	}
`;

export const Image = styled.img<{ loaded: boolean }>`
	height: 100%;
	width: 100%;
	margin: 0;
	object-fit: contain;
	display: ${(props) => (props.loaded ? 'block' : 'none')} !important;
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
`;

export const TP = styled.div`
	height: 60px;
	width: 100%;
`;
