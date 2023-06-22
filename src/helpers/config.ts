import { TAGS } from 'arcframework';

import arrowNextSVG from 'assets/arrow-next.svg';
import arrowPreviousSVG from 'assets/arrow-previous.svg';
import artifactSVG from 'assets/artifact.svg';
import fileArtifactTypeSVG from 'assets/artifact-types/file.svg';
import nostrEventArtifactTypeSVG from 'assets/artifact-types/nostr.svg';
import redditThreadArtifactTypeSVG from 'assets/artifact-types/reddit-thread.svg';
import messagingArtifactTypeSVG from 'assets/artifact-types/twitter.svg';
import defaultArtifactTypeSVG from 'assets/artifact-types/webpage.svg';
import webpageArtifactTypeSVG from 'assets/artifact-types/wikipedia.svg';
import bookmarkSVG from 'assets/bookmark.svg';
import closeSVG from 'assets/close.svg';
import copySVG from 'assets/copy.svg';
import dataSVG from 'assets/data.svg';
import favoriteSVG from 'assets/favorite.svg';
import fullScreenSVG from 'assets/full-screen.svg';
import impressionsSVG from 'assets/impressions.svg';
import logoAlt2SVG from 'assets/logo-alt-2.svg';
import mediaPauseSVG from 'assets/media-pause.svg';
import mediaPlaySVG from 'assets/media-play.svg';
import menuSVG from 'assets/menu.svg';
import repliesSVG from 'assets/replies.svg';
import retweetSVG from 'assets/retweet.svg';
import starSVG from 'assets/star.svg';

import { language } from './language';

export const ASSETS = {
	arrowNext: arrowNextSVG,
	arrowPrevious: arrowPreviousSVG,
	artifact: artifactSVG,
	artifactTypes: {
		default: defaultArtifactTypeSVG,
		file: fileArtifactTypeSVG,
		messaging: messagingArtifactTypeSVG,
		nostrEvent: nostrEventArtifactTypeSVG,
		redditThread: redditThreadArtifactTypeSVG,
		webpage: webpageArtifactTypeSVG,
	},
	bookmark: bookmarkSVG,
	close: closeSVG,
	copy: copySVG,
	data: dataSVG,
	favorite: favoriteSVG,
	fullScreen: fullScreenSVG,
	impressions: impressionsSVG,
	logoAlt2: logoAlt2SVG,
	mediaPause: mediaPauseSVG,
	mediaPlay: mediaPlaySVG,
	menu: menuSVG,
	replies: repliesSVG,
	retweet: retweetSVG,
	star: starSVG,
};

export const ARTIFACT_TYPES = {
	[TAGS.values.defaultArtifactType]: {
		label: language.default,
		icon: ASSETS.artifactTypes.default,
	},
	[TAGS.values.messagingArtifactType]: {
		label: TAGS.values.messagingArtifactType,
		icon: ASSETS.artifactTypes.messaging,
	},
	[TAGS.values.imageArtifactType]: {
		label: TAGS.values.imageArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.documentArtifactType]: {
		label: TAGS.values.documentArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.audioArtifactType]: {
		label: TAGS.values.audioArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.videoArtifactType]: {
		label: TAGS.values.videoArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.ebookArtifactType]: {
		label: TAGS.values.ebookArtifactType,
		icon: ASSETS.artifactTypes.file,
	},
	[TAGS.values.nostrEventArtifactType]: {
		label: TAGS.values.nostrEventArtifactType,
		icon: ASSETS.artifactTypes.nostrEvent,
	},
	[TAGS.values.redditThreadArtifactType]: {
		label: TAGS.values.redditThreadArtifactType,
		icon: ASSETS.artifactTypes.redditThread,
	},
	[TAGS.values.webpageArtifactType]: {
		label: TAGS.values.webpageArtifactType,
		icon: ASSETS.artifactTypes.webpage,
	},
};

export const DOM = {
	modal: 'modal',
	renderer: 'renderer',
	ids: {
		imageIc: 'image-ic-wrapper',
	},
};
