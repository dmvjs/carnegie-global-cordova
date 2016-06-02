/*global module, require*/
var analyticsConfig = require('./analyticsConfig')
	, toLocal = require('./ui/getLocalizedString')
	, localStrings = require('./ui/localizedStrings');

module.exports = {
	fs: void 0
	, appName: 'Carnegie'
	, track: analyticsConfig.track
	, trackId: analyticsConfig.trackId
	, folder: 'com.ceip.carnegie'
	, storyFontSize: 1.0
	, connectionMessage: 'No network connection detected'
	, menuMessage: toLocal(localStrings.notYetDownloaded)
	, missingImage: 'http://carnegieendowment.org/app-img-not-avail.png'
	, missingImageRef: void 0
	 /*menu: makeMenu()/*[{
		title: ''
		, sub: toLocal(localStrings.readOffline)
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
			, name: toLocal(localStrings.latestAnalysis)
			, filename: 'mobile-global.json'
			, type: 'json'
			, required: useDefaultFeeds
		}, {
			url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-top5.json.txt'
			, name: toLocal(localStrings.mostPopular)
			, filename: 'top5.json'
			, type: 'json'
		}]
	}, {
		title: toLocal(localStrings.languages)
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
			, name: toLocal(localStrings.english)
			, filename: 'mobile-global.json'
			, type: 'json'
			, required: useDefaultFeeds
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ru'
			, name: 'Русский'
			, type: 'json'
			, filename: 'russian-json.json'
			, required: useRussianUI
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=zh'
			, name: '中文'
			, type: 'json'
			, filename: 'china-json.json'
			, required: useChineseUI
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ar'
			, name: 'عربي'
			, dir: 'rtl'
			, type: 'json'
			, filename: 'arabic-json.json'
			, required: useArabicUI
		}]
	}, {
		title: toLocal(localStrings.globalCenters)
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beijing'
			, name: toLocal(localStrings.beijing)
			, type: 'json'
			, filename: 'beijing-json.json'
			, required: useBeijingCenter
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beirut'
			, name: toLocal(localStrings.beirut)
			, type: 'json'
			, filename: 'beirut-json.json'
			, required: useBeirutCenter
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=brussels'
			, name: toLocal(localStrings.brussels)
			, type: 'json'
			, filename: 'brussels-json.json'
			, required: useBrusselsCenter
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=moscow'
			, name: toLocal(localStrings.moscow)
			, type: 'json'
			, filename: 'moscow-json.json'
			, required: useMoscowCenter
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=india'
			, name: toLocal(localStrings.newDelhi)
			, type: 'json'
			, filename: 'newdelhi-json.json'
			, required: useNewDelhiCenter
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
			, name: toLocal(localStrings.washingtonDC)
			, filename: 'mobile-global.json'
			, type: 'json'
			, required: useDefaultFeeds
		}]
	}]/*, {
		title: toLocal(localStrings.blogs)
		, links: [{
			url: 'http://carnegieendowment.org/sada/'
			, name: 'Sada'
		}, {
			url: 'http://carnegieeurope.eu/strategiceurope/'
			, name: 'Strategic Europe'
		}, {
			url: 'http://carnegieendowment.org/syriaincrisis/'
			, name: 'Syria in Crisis'
		}]
	}, {
		title: toLocal(localStrings.resources)
		, links: [{
			url: 'http://carnegieendowment.org/topic/'
			, name: toLocal(localStrings.issues)
		}, {
			url: 'http://carnegieendowment.org/regions/'
			, name: toLocal(localStrings.regions)
		}, {
			url: 'http://carnegieendowment.org/experts/'
			, name: toLocal(localStrings.experts)
		}, {
			url: 'http://carnegieendowment.org/publications/'
			, name: toLocal(localStrings.publications)
		}, {
			url: 'http://carnegieendowment.org/events/'
			, name: toLocal(localStrings.events)
		}, {
			url: 'http://carnegieendowment.org/programs/'
			, name: toLocal(localStrings.programs)
		}, {
			url: 'http://carnegieendowment.org/video/'
			, name: toLocal(localStrings.carnegieVideo)
		}, {
			url: 'http://carnegieendowment.org/infographics'
			, name: toLocal(localStrings.infographics)
		}]
	}, {
		title: toLocal(localStrings.explore)
		, links: [{
			url: 'http://carnegieendowment.org/resources/?fa=register'
			, name: toLocal(localStrings.subscribe)
		}, {
			url: 'http://carnegieendowment.org/about/'
			, name: toLocal(localStrings.aboutUs)
		}, {
			url: 'http://carnegieendowment.org/about/development/'
			, name: toLocal(localStrings.supportCarnegie)
		}, {
			url: 'http://carnegieendowment.org/about/?fa=contact'
			, name: toLocal(localStrings.helpDesk)
		}, {
			url: 'http://carnegieendowment.org/about/index.cfm?fa=privacy'
			, name: toLocal(localStrings.privacyStatement)
		}]
	}*/
};