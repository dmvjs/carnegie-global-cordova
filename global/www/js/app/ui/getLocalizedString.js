module.exports = function (options) {
    if (options !== undefined) {
        if (window.__languageForCarnegie === "ar" && options["ar"] !== undefined) {
            return options["ar"];
        } else if (window.__languageForCarnegie === "zh" && options["zh"] !== undefined) {
            return options["zh"];
        } else if (window.__languageForCarnegie === "ru" && options["ru"] !== undefined) {
            return options["ru"];
        } else if (options["en"] !== undefined) {
            return options["en"];
        }
    }
    return "XXXXXXXXXXXXXXXXXXXX"
};