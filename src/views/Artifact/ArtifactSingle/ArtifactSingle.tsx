import { checkNullValues } from 'arcframework';

import { Loader } from 'components/atoms/Loader';

import { ArtifactViewSingle } from './ArtifactViewSingle';
import * as S from './styles';
import { IProps } from './types';

export default function ArtifactSingle(props: IProps) {
	function getData() {
		if (!props.data) {
			return (
				<div className={'wrapper-600 border-wrapper'}>
					<Loader />
				</div>
			);
		} else {
			if (!checkNullValues(props.data)) {
				return (
					<S.ArtifactWrapper>
						<ArtifactViewSingle data={props.data} />
					</S.ArtifactWrapper>
				);
			} else {
				return null;
			}
		}
	}

	return getData();
}
