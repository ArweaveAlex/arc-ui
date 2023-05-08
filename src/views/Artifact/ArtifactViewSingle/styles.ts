import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	animation: ${open} ${fadeIn2};
`;
