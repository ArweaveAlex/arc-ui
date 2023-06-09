import React from 'react';
import { ReactSVG } from 'react-svg';
import Epub from 'epubjs';
import { useTheme } from 'styled-components';

import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { StepType } from 'helpers/types';
import * as windowUtils from 'helpers/window';
import { useFileTx } from 'hooks/useFileTx';
import { CloseHandler } from 'wrappers/CloseHandler';

import { IProps } from '../types';

import * as S from './styles';

export default function ArtifactEbookSingle(props: IProps) {
	const theme = useTheme();
	const txData = useFileTx(props.data.rawData);

	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const bookRef = React.useRef<HTMLDivElement>(null);

	const [book, setBook] = React.useState<any>(null);
	const [bookTitle, setBookTitle] = React.useState<string | null>(null);
	const [toc, setToc] = React.useState<any>([]);

	const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(1);
	const [bookStart, setBookStart] = React.useState<boolean>(true);

	const [renditionState, setRenditionState] = React.useState<any>(null);
	const [navigationOpen, setNavigationOpen] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (txData.fileUrl) {
				const response = await fetch(txData.fileUrl);
				const arrayBuffer = await response.arrayBuffer();
				const book = Epub(arrayBuffer);
				setBook(book);

				book.loaded.metadata.then((metadata) => {
					setBookTitle(metadata.title);
				});

				book.loaded.navigation.then((navigation) => {
					setToc(navigation.toc);
				});
			}
		})();
	}, [txData.fileUrl]);

	React.useEffect(() => {
		if (navigationOpen) {
			windowUtils.hideDocumentBody();
			return () => {
				windowUtils.showDocumentBody();
			};
		}
	}, [navigationOpen]);

	React.useEffect(() => {
		if (!book || !bookRef.current || !bookTitle) return;

		const rendition = book.renderTo(bookRef.current, {
			width: '100%',
			height: '100%',
		});

		const cssContent = S.epubjsGlobalStyles(theme);

		rendition.hooks.content.register((contents: any) => {
			const doc = contents.document;
			const styleEl = doc.createElement('style');
			styleEl.innerHTML = cssContent;
			doc.head.appendChild(styleEl);
		});

		setRenditionState(rendition);
		const savedLocation = window.localStorage.getItem(`epubLocation-${bookTitle}`);
		if (savedLocation) {
			rendition.display(savedLocation);
		} else {
			rendition.display();
		}

		return () => {
			rendition.destroy();
		};
	}, [book, bookTitle]);

	React.useEffect(() => {
		if (renditionState && bookTitle) {
			const savedLocation = window.localStorage.getItem(`epubLocation-${bookTitle}`);
			if (savedLocation) {
				renditionState.display(savedLocation);
			}

			const handleLocationChanged = () => {
				const updatedLocation = renditionState.location;
				const updatedPageNumber = updatedLocation ? updatedLocation.start.displayed.page : 1;

				setCurrentPageNumber(updatedPageNumber);
				setRenditionState(renditionState);

				if (updatedLocation && updatedLocation.atStart) {
					setBookStart(true);
				} else {
					setBookStart(false);
				}
				const updatedCfi = updatedLocation ? updatedLocation.start.cfi : null;
				if (updatedCfi) {
					window.localStorage.setItem(`epubLocation-${bookTitle}`, updatedCfi);
				}
			};

			renditionState.on('locationChanged', handleLocationChanged);

			return () => {
				renditionState.off('locationChanged', handleLocationChanged);
			};
		}
	}, [renditionState, bookTitle]);

	React.useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [renditionState]);

	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			if (wrapperRef.current) {
				wrapperRef.current.requestFullscreen().catch((err) => {
					console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
				});
			}
		} else {
			document.exitFullscreen().catch((err) => {
				console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
			});
		}
	}

	const handleKeyDown = (event: any) => {
		if (renditionState) {
			if (event.key === 'ArrowRight') {
				renditionState.next();
			}
			if (event.key === 'ArrowLeft') {
				renditionState.prev();
			}
		}
	};

	const handleChapterClick = (href: string) => {
		if (renditionState) {
			renditionState.display(href);
			setNavigationOpen(false);
		}
	};

	function getAction(step: StepType, clickHandler: any, disabled: boolean) {
		const Action = step === 'prev' ? S.PrevAction : S.NextAction;
		return (
			<Action onClick={() => clickHandler()} disabled={disabled}>
				<ReactSVG src={step === 'prev' ? ASSETS.arrowPrevious : ASSETS.arrowNext} />
			</Action>
		);
	}

	return (
		<>
			{/* <S.Action>
				<FileDownload fileUrl={txData.fileUrl} />
			</S.Action> */}
			<S.Wrapper ref={wrapperRef}>
				{book ? (
					<>
						{navigationOpen && (
							<S.NWrapper>
								<S.NContent>
									<CloseHandler active={navigationOpen} callback={() => setNavigationOpen(false)} disabled={false}>
										<S.NTitle>
											<p>{language.tableOfContents}</p>
										</S.NTitle>
										<S.NList>
											{toc.map((chapter: any, index: number) => (
												<S.NListItem key={index} disabled={false} onClick={() => handleChapterClick(chapter.href)}>
													{chapter.label}
												</S.NListItem>
											))}
										</S.NList>
									</CloseHandler>
								</S.NContent>
							</S.NWrapper>
						)}
						{renditionState && (
							<>
								{getAction('prev', () => renditionState.prev(), false)}
								{getAction('next', () => renditionState.next(), false)}
							</>
						)}
						<S.ViewerWrapper>
							<S.TitleAction>
								<IconButton
									type={'alt3'}
									src={ASSETS.menu}
									handlePress={() => setNavigationOpen(true)}
									tooltip={language.navigation}
									dimensions={{
										wrapper: 22.5,
										icon: 12.5,
									}}
								/>
								<p>{bookTitle ? bookTitle : `-`}</p>
								<IconButton
									type={'alt3'}
									src={ASSETS.fullScreen}
									handlePress={() => toggleFullScreen()}
									tooltip={language.enterFullScreen}
									dimensions={{
										wrapper: 22.5,
										icon: 12.5,
									}}
								/>
							</S.TitleAction>
							<S.Viewer ref={bookRef}>
								{!bookStart && (
									<>
										<S.PStart>
											<p>{currentPageNumber.toString()}</p>
										</S.PStart>
										<S.PEnd>
											<p>{(currentPageNumber + 1).toString()}</p>
										</S.PEnd>
									</>
								)}
							</S.Viewer>
						</S.ViewerWrapper>
					</>
				) : (
					<Loader />
				)}
			</S.Wrapper>
			{/* <FileMetadata metadata={txData.metadata} /> */}
		</>
	);
}
