import styled from 'styled-components';

import { fadeIn2, open } from 'helpers/animations';

export const Wrapper = styled.div`
    height: 650px;
    width: 100%;
    animation: ${open} ${fadeIn2};
`;