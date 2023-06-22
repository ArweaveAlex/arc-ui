import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { getImageShadow } from 'helpers/styling';

export const ICWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: stretch;
	animation: ${open} ${fadeIn2};
`;

export const C1 = styled.div`
	flex-grow: 1;
	width: 100%;
	a {
		&:hover {
			text-decoration: none;
		}
	}
`;

export const C1Content = styled.div`
	height: 100%;
	width: 100%;
	text-align: left;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ImageWrapper = styled.div`
	height: 100%;
	width: 100%;
	background: ${(props) => props.theme.colors.container.alt5.background};
	box-shadow: ${(props) => getImageShadow(props.theme)};
	cursor: pointer;
`;

export const Image = styled.img<{ loaded: boolean }>`
	height: 100%;
	width: 100%;
	margin: 0;
	object-fit: contain;
	display: ${(props) => (props.loaded ? 'block' : 'none')} !important;
`;

export const TP = styled.div`
	height: 60px;
	width: 100%;
`;
