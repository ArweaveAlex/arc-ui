import { TAGS } from 'arcframework';

import arrowNextSVG from 'assets/arrow-next.svg';
import arrowPreviousSVG from 'assets/arrow-previous.svg';
import artifactSVG from 'assets/artifact.svg';
import imageArtifactTypeSVG from 'assets/artifact-types/image.svg';
import nostrEventArtifactTypeSVG from 'assets/artifact-types/nostr.svg';
import redditThreadArtifactTypeSVG from 'assets/artifact-types/reddit-thread.svg';
import messagingArtifactTypeSVG from 'assets/artifact-types/twitter.svg';
import defaultArtifactTypeSVG from 'assets/artifact-types/webpage.svg';
import webpageArtifactTypeSVG from 'assets/artifact-types/wikipedia.svg';
import closeSVG from 'assets/close.svg';
import copySVG from 'assets/copy.svg';
import dataSVG from 'assets/data.svg';
import favoriteSVG from 'assets/favorite.svg';
import impressionsSVG from 'assets/impressions.svg';
import logoAlt2SVG from 'assets/logo-alt-2.svg';
import repliesSVG from 'assets/replies.svg';
import retweetSVG from 'assets/retweet.svg';
import starSVG from 'assets/star.svg';

import { LANGUAGE } from './language';

export const ASSETS = {
	arrowNext: arrowNextSVG,
	arrowPrevious: arrowPreviousSVG,
	artifact: artifactSVG,
	artifactTypes: {
		default: defaultArtifactTypeSVG,
		image: imageArtifactTypeSVG,
		messaging: messagingArtifactTypeSVG,
		nostrEvent: nostrEventArtifactTypeSVG,
		redditThread: redditThreadArtifactTypeSVG,
		webpage: webpageArtifactTypeSVG,
	},
	close: closeSVG,
	copy: copySVG,
	data: dataSVG,
	favorite: favoriteSVG,
	impressions: impressionsSVG,
	logoAlt2: logoAlt2SVG,
	replies: repliesSVG,
	retweet: retweetSVG,
	star: starSVG,
};

export const ARTIFACT_TYPES = {
	[TAGS.values.defaultArtifactType]: {
		label: LANGUAGE.default,
		icon: ASSETS.artifactTypes.default,
	},
	[TAGS.values.imageArtifactType]: {
		label: TAGS.values.imageArtifactType,
		icon: ASSETS.artifactTypes.image,
	},
	[TAGS.values.messagingArtifactType]: {
		label: TAGS.values.messagingArtifactType,
		icon: ASSETS.artifactTypes.messaging,
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
	modal: 'modal'
};
