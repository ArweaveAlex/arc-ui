import React from 'react';

import * as ArcFramework from 'arcframework';

import { language } from 'helpers/language';

import { ArtifactSingle } from './ArtifactViewSingle';

export default function Artifact(props: { id: string }) {
	const [data, setData] = React.useState<ArcFramework.ArtifactDetailType | null>(null);
	const [error, setError] = React.useState<boolean | null>(null);

	React.useEffect(() => {
		(async function () {
			if (props.id) {
				try {
					setData(await ArcFramework.getArtifactById(props.id));
				} catch (e: any) {
					console.log(e);
					setError(true);
				}
			}
		})();
	}, [props.id]);

	return !error ? (
		<ArtifactSingle data={data} />
	) : (
		<div className={'wrapper-600'}>
			<p>{language.errorFetchingArtifact}</p>
		</div>
	);
}
