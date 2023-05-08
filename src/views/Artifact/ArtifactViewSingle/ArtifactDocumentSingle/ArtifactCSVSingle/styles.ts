import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    @media(max-width: ${STYLING.dimensions.rendererWrapper}) {
        width: auto;
    }
`;

export const DetailWrapper = styled.div`
	height: 100%;
	min-height: 141.5px;
	width: 100%;
	position: relative;
	animation: ${open} ${fadeIn2};
	z-index: 3;
`;

export const Table = styled.table`
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.borderRadius};
	@media (max-width: ${STYLING.cutoffs.initial}) {
		width: ${STYLING.cutoffs.initial};
	}
`;

export const Th = styled.th`
	font-weight: bold;
	padding: 8px;
	text-align: left;
`;

export const Td = styled.td`
	padding: 8px;
	text-align: left;
`;

export const Tr = styled.tr``;

export const Tbody = styled.tbody``;

export const Title = styled.div`
	height: auto;
	width: 100%;
	max-width: 800px;
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