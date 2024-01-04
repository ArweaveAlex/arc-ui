import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 100%;
	animation: ${open} ${fadeIn2};
	padding: 20px;
`;

export const HWrapper = styled.div`
	img {
		width: 100%;
		border-radius: ${STYLING.dimensions.borderRadius};
		margin: 10px 0 20px 0;
	}
`;

export const HDescription = styled.div`
	margin: 0 0 20px 0;
	span {
		font-family: ${(props) => props.theme.typography.family.alt1};
		font-size: ${(props) => props.theme.typography.size.xLg};
		color: ${(props) => props.theme.colors.font.primary.active.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		line-height: 1.5;
	}
`;

export const HData = styled.div`
	width: fit-content;
	> * {
		&:not(:last-child) {
			margin: 0 0 10px 0;
		}
	}
`;

export const HLine = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px 0;
	p,
	span {
		font-family: ${(props) => props.theme.typography.family.primary};
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.primary.alt1};
		line-height: 1.5;
	}
	p {
		font-weight: ${(props) => props.theme.typography.weight.medium};
	}
`;

export const HDate = styled(HLine)`
	margin: 15px 0 0 0;
	padding: 15px 0 0 0;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const AContent = styled.div`
	margin: 20px 0 0 0;
	font-family: ${(props) => props.theme.typography.family.alt1} !important;
	font-size: ${(props) => props.theme.typography.size.lg} !important;
	color: ${(props) => props.theme.colors.font.primary.alt8} !important;
	font-weight: ${(props) => props.theme.typography.weight.regular} !important;
	line-height: 1.5;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: ${(props) => props.theme.typography.size.xLg} !important;
		margin: 40px 0 10px 0;
	}
	a,
	p,
	li,
	b,
	strong,
	span {
		font-family: ${(props) => props.theme.typography.family.alt1} !important;
		font-size: ${(props) => props.theme.typography.size.base} !important;
	}
	p {
		color: ${(props) => props.theme.colors.font.primary.alt8} !important;
		font-weight: ${(props) => props.theme.typography.weight.regular} !important;
		line-height: 1.5 !important;
		margin: 0 0 20px 0;
	}
	br {
		content: ' ';
		display: block;
		margin: 0 0 20px 0;
	}
	figure,
	img {
		display: none !important;
	}
	li {
		margin: 20px 0 !important;
		li {
			margin: 0 !important;
		}
	}
	td {
		width: 300px;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	svg {
		display: none !important;
	}
`;
