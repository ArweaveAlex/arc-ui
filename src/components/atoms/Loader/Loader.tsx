import * as S from './styles';
import { IProps } from './types';

export default function Loader(props: IProps) {
	function getLoader(size: number, height: number, width: number) {
		return (
			<S.Container>
				<S.Spinner size={size} height={height} width={width}>
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
					<S.Blade />
				</S.Spinner>
			</S.Container>
		);
	}

	if (props.placeholder) {
		return <S.Placeholder />;
	}

	return <>{getLoader(19.75, 6, 2)}</>;
}
