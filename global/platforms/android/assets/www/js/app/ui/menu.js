/*global module, require, $*/

var config = require('../config')
	, menu = require('../config-menu')
	, notify = require('../../util/notify')
	, access = require('../access')
	, header = require('./header')
	, date = require('../../util/date')
	, storyList = require('./storyList')
	, doesFileExist = require('../../io/doesFileExist')
	, getFileContents = require('../../io/getFileContents')
	, toLocal = require('./getLocalizedString')
	, localStrings = require('./localizedStrings')
	, primary = false;

(function init() {
	var menuFragment = $('<section/>', {
		addClass: 'menu'
	});

	menu.forEach(function (obj) {
		var feed = !!obj.feeds
		, list = $('<ul/>', {
				addClass: 'menu-items'
			})
		, title = $('<span/>', {
				addClass: 'title'
				, text: obj.title || ''
			})
		, sub = $('<span/>', {
				addClass: 'sub'
				, text: obj.sub || ''
			})
		, sectionHeader = $('<div/>', {
				addClass: 'section-header'
			}).append(title).append(sub);

		if (feed) {
			obj.feeds.forEach(function (el) {
				var label = $('<div/>', {
					addClass: 'label'
					, text: el.name
				})
				, sub = $('<div/>', {
					addClass: 'sub'
					, text: toLocal(localStrings.notYetDownloaded)
					, 'data-url': el.filename || el.url.split('/').pop().split('.').shift() + '.json'
				})
				, container = $('<div/>', {
						addClass: 'menu-item-box'
					}).append(label).append(sub)
				, box = $('<div/>', {
						addClass: el.required ? 'check required' : 'check'
					})
				, link = $('<a/>', {
					addClass: 'menu-link feed'
				})
				, hairline = $('<div/>', {
					addClass: 'hairline'
				})
				, item = $('<li/>', {
					addClass: 'menu-item'
				}).append(hairline).append(link.append(container).append(box))
				, filename = access.getFilenameFromFeed(el);

				if (el.required && !primary) {
					primary = item;
					item.addClass('active')
				}
				doesFileExist(filename).then(function () {
					getFileContents(filename).then(function (contents) {
						var obj = (JSON.parse(contents.target._result));
						update(filename, toLocal(localStrings.updatedColon) + date.getFriendlyDate(obj));
						box.addClass('checked');
					}, function (e){console.log(e)});
				}, function (e){console.log(e)});

				list.append(item);
			})
		} else {
			obj.links.forEach(function (el) {
				var label = $('<div/>', {
					addClass: 'label link'
					, text: el.name
				})
				, container = $('<div/>', {
						addClass: 'menu-item-box'
					}).append(label)
				, link = $('<a/>', {
					addClass: 'menu-link link'
					, href: el.url
					, target: '_system'
				})
				, hairline = $('<div/>', {
					addClass: 'hairline'
				})
				, item = $('<li/>', {
					addClass: 'menu-item'
				}).append(hairline).append(link.append(container));

				list.append(item);
			})
		}

		menuFragment.append(sectionHeader).append(list);

	});

	$('section.menu').replaceWith(menuFragment);

	$('a.menu-link .check').on('click', function (e) {
		//download a feed
		var index = $('section.menu li').index($(this).closest('li'));
		e.stopPropagation();

		if ($(this).hasClass('checked') && $(this).hasClass('required') === false) {
			remove(index);
			if (config.track && analytics) {
				analytics.trackEvent('Menu', 'Feed', 'Delete Feed', 10);
			}
		} else {
			if (navigator.connection.type !== 'none') {
				get(index, true, $(this));
				if (config.track && analytics) {
					analytics.trackEvent('Menu', 'Feed', 'Download Feed', 10);
				}
			} else {
				notify.alert(config.connectionMessage);
			}
		}
	});

	$('a.menu-link.feed').on('click', function (e) {
		var $check = $(e.currentTarget).find('.check')
			, index = $('section.menu li').index($(this).closest('li'));
		e.preventDefault();
		if (navigator.connection.type !== 'none' || $check.hasClass('checked') || $check.hasClass('required')) {
			updateHeaderCenterImage (index);
			get(index, false, $(this));
			$('section.menu li.active').removeClass('active');
			$(e.currentTarget).closest('li').addClass('active');
		} else {
			notify.alert(config.connectionMessage);
		}
	});

	$('a.menu-link.link').on('click', function (e) {
		e.preventDefault();
		if (navigator.connection.type !== 'none') {
			var url = $(e.currentTarget).prop('href');
			window.open(encodeURI(url), '_blank', 'location=no,toolbar=yes');
			/*$('section.menu li.active').removeClass('active');
			$(e.currentTarget).closest('li').addClass('active');*/
			if (config.track && analytics) {
				analytics.trackEvent('Menu', 'Link Click ', url, 10);
			}
		} else {
			notify.alert(config.connectionMessage);
		}
	});

}());

function updateHeaderCenterImage (id) {
	var classToAdd = access.getFilenameFromId(id).split(".").shift();
	var classes = access.getFeedsFromConfig();
	var header = $("header");

	if (!header.hasClass(classToAdd)) {
		for (var name in classes) {
			if (classes.hasOwnProperty(name)) {
				header.removeClass(classes[name].filename.split(".").shift());
			}
		}
		if (classToAdd !== "mobile-global") {
			header.addClass(classToAdd);
		}
	}
}

function update(filename, date) {
	var items = $('section.menu .menu-item-box .sub[data-url="' + filename + '"]');
	items.text(date);
	items.closest('li').find('.check').removeClass('loading').addClass('checked');
}

function get(id, loadOnly, $el) {
	var filename = access.getFilenameFromId(id);
	$el.closest('li').find('.check').addClass('loading');

	access.get(id, loadOnly).then(function (contents) {
		var obj = (JSON.parse(contents.target._result));

		update(filename, toLocal(localStrings.updatedColon) + date.getFriendlyDate(obj));
		if (!loadOnly) {
			storyList.show(obj).then(function () {
        header.showStoryList();
			});
		}
	}, function (error) {
		var filename = access.getFilenameFromId(id)
			, item = $('section.menu .menu-item-box .sub[data-url="' + filename + '"]').closest('li');

		analytics.trackEvent('Menu', 'Error', 'Feed Load Error: ' + access.getFilenameFromId(id), 10);
		remove(id);
		notify.alert(getFeedError(toLocal(access.getFeedNameFromId(id)) || access.getFeedNameFromId(id), window.__languageForCarnegie || "en"));
	});
}

function getFeedError (name, language) {
	var error = {
		"ar": name + "ثمة مشكلة في إظهار المحتوى "
		, "ru": "Ошибка загрузки " + name
		, "zh": "加载" + name + "项目出错"
		, "en": 'There was an error processing the ' + name + ' feed'
	};
	return error[language] || error["en"];
}

function cleanup(id) {
	var filename = access.getFilenameFromId(id)
		, item = $('section.menu .menu-item-box .sub[data-url="' + filename + '"]').closest('li');

	item.find('.check').removeClass('checked loading');
	item.find('.sub').text(config.menuMessage);
	if (item.hasClass('active')) {
		item.removeClass('active');
		primary.addClass('active');
		getFileContents(access.getFilenameFromId(0)).then(function (contents) {
			var obj = (JSON.parse(contents.target._result));
			storyList.show(obj);
		})
	}
}

function remove(id) {

	access.removeFeed(id).then(function () {
		cleanup(id)
	}, function () {
		cleanup(id)
	})
}

$(document).on('access.refresh', function (e, obj, filename) {
  update(filename, toLocal(localStrings.updatedColon) + date.getFriendlyDate(obj));
});

module.exports = {
	update: update
};