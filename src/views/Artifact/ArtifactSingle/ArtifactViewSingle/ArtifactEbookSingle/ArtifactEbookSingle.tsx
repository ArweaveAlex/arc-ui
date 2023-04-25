import React from 'react';
import Epub from "epubjs";

import { getTxEndpoint } from 'arcframework';

import { IProps } from '../../types';

import * as S from './styles';

const EpubReader = ({ url }) => {
    console.log('!')
    const viewerRef = React.useRef(null);
  
    React.useEffect(() => {
      const book = Epub(url);
      const rendition = book.renderTo(viewerRef.current, {
        manager: "continuous",
        flow: "paginated",
        width: "100%",
        height: "100%",
      });
      const displayed = rendition.display();
  
      return () => {
        // Clean up when the component is unmounted
        rendition.destroy();
      };

    }, [url]);

    return null;
  
    // return <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />;
  };

// TODO: hook to set file data / metadata state
export default function ArtifactEbookSingle(props: IProps) {
	const [location, setLocation] = React.useState<any>(null);
	const locationChanged = (epubcifi: any) => {
		// epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
		setLocation(epubcifi);
	};

	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	const [fileUrl, setFileUrl] = React.useState<string | null>(null);

	const [metadata, setMetadata] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				const fileResponse = await fetch(getTxEndpoint(jsonData.fileTxId));
				setFileUrl(fileResponse.url);
			}
		})();
	}, [jsonData]);

	React.useEffect(() => {
		(async function () {
			if (jsonData && jsonData.metadataTxId && jsonData.metadataTxId.length > 0) {
				const metadataResponse = await fetch(getTxEndpoint(jsonData.metadataTxId));
				if (metadataResponse.status === 200) {
					setMetadata(JSON.parse(await (await fetch(metadataResponse.url)).text()));
				} else {
					setMetadata({});
				}
			}
		})();
	}, [jsonData]);

    // React.useEffect(() => {
    //     if (fileUrl) {
    //         const book = Epub("path/to/epub/file.epub");
    //         console.log(book)
    //     }
    // }, [fileUrl])

	return fileUrl ? (
		<S.Wrapper className={'border-wrapper'}>
            <EpubReader url={fileUrl} />
		</S.Wrapper>
	) : null;
}
