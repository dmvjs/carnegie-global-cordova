var toLocal = require('./ui/getLocalizedString')
    , localStrings = require('./ui/localizedStrings')
    , useDefaultFeeds = window.__languageForCarnegie === undefined && window.__localCenter === undefined
    , useArabicUI = window.__languageForCarnegie === "ar"
    , useChineseUI = window.__languageForCarnegie === "zh"
    , useRussianUI = window.__languageForCarnegie === "ru"
    , useMoscowCenter = window.__localCenter === "moscow"
    , useBeijingCenter = window.__localCenter === "beijing"
    , useBeirutCenter = window.__localCenter === "beirut"
    , useBrusselsCenter = window.__localCenter === "brussels"
    , useNewDelhiCenter = window.__localCenter === "newDelhi";

var menus = [{
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
}];

module.exports = menus;