import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	@media (max-width: ${STYLING.cutoffs.initial}) {
		flex-direction: column;
	}
`;

export const Content = styled.div`
	height: 100%;
	width: 100%;
	> * {
		&:not(:last-child) {
			margin: 0 0 20px 0;
		}
	}
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: 100%;
	}
`;

export const ContentLine = styled.div`
	width: 100%;
	position: relative;
`;

export const InfoData = styled.div`
	button,
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.regular};
		color: ${(props) => props.theme.colors.font.primary.alt4};
	}
	button {
		&:hover {
			color: ${(props) => props.theme.colors.font.primary.active.hover};
		}
	}
	p,
	code,
	a {
		font-size: ${(props) => props.theme.typography.size.xSmall};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font.primary.active.base};
		line-height: 22px;
	}
	span,
	p,
	a {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	svg {
		width: 25px;
		margin: 0 10px 0 0;
		fill: ${(props) => props.theme.colors.font.primary.alt5};
	}
	overflow: hidden;
	overflow-wrap: anywhere;
`;

export const BodyData = styled.p`
	margin: 15px 0 0 0;
`;

export const RawContainer = styled(InfoData)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	svg {
		width: 100%;
		margin: 0;
	}
`;

export const RawData = styled.div`
	margin: 15px 0 0 0;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 15px;
	border-radius: 5px;
	p,
	code {
		overflow: visible;
		white-space: normal;
	}
	code {
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
`;

export const RawDataCopied = styled.div`
	position: absolute;
	top: -10px;
	right: 35px;
	z-index: 3;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	padding: 6.5px 15px 5px 15px;
	p {
		font-size: 12px;
		color: ${(props) => props.theme.colors.font.primary.alt4};
		white-space: nowrap;
	}
`;

export const DataWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		flex-direction: column;
	}
`;

export const DataLine = styled.div`
	display: flex;
	align-items: center;
	margin: 0 20px 0 0;
`;

export const WrapElement = styled(DataLine)`
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		margin: 10px 0 0 0;
	}
`;

export const DataHeader = styled.p`
	font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	color: ${(props) => props.theme.colors.font.primary.alt4} !important;
`;

export const LinkWrapper = styled.div`
	width: 100%;
	padding: 17.5px 0 0 0;
	svg {
		width: 25px;
		margin: 0 17.5px 0 0;
		fill: ${(props) => props.theme.colors.font.primary.alt4};
	}
	span,
	p,
	a {
		line-height: 22px;
		text-overflow: ellipsis;
		overflow: visible;
		white-space: normal;
	}
`;

export const LinkWrapperAlt = styled(LinkWrapper)``;

export const Tags = styled.div`
	margin: 15px 0 0 0;
	display: flex;
	flex-wrap: wrap;
`;

export const Tag = styled.div`
	padding: 8px 14.5px;
	width: fit-content;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadiusWrapper};
	margin: 0 10px 10px 0;
	background: ${(props) => props.theme.colors.container.alt4.background};
	p {
		color: ${(props) => props.theme.colors.font.primary.alt1};
	}
`;

export const DataUrl = styled.a`
	overflow-wrap: anywhere;
`;

export const Title = styled.div`
	height: auto;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 0 0 20px 0;
	@media (max-width: ${STYLING.cutoffs.tablet}) {
		flex-direction: column;
		button {
			margin: 20px 0 0 0;
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

export const TP = styled.div`
	height: 60px;
	width: 100%;
`;
