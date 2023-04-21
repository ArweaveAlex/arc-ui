import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';
import { STYLING } from 'helpers/styling';

export const ArtifactWrapper = styled.div`
	height: 100%;
	width: 100%;
	animation: ${open} ${fadeIn2};
`;

export const MessageContainer = styled.div`
	max-width: ${STYLING.cutoffs.max};
	margin: 0 auto;
	position: relative;
	p {
		position: absolute;
		top: 20px;
		left: 20px;
	}
`;
