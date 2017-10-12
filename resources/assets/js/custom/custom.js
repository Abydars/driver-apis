(function (window, document, $, undefined) {
    $(function () {

        if (typeof window.custom != "undefined") {
            window.custom.formatMoneyWithCurrency = function (n, c) {
                try {
                    n = parseFloat(n);
                    return c + n.toFixed(2).replace(/./g, function (c, i, a) {
                            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                        });
                } catch (e) {
                    console.log(e);
                    return c + '0';
                }
            };

            window.custom.formatMoneyWithoutCurrency = function (n) {
                try {
                    n = parseFloat(n);
                    return n.toFixed(2).replace(/./g, function (c, i, a) {
                        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
                    });
                } catch (e) {
                    console.log(e);
                    return '0';
                }
            };

            window.custom.formatMoney = function (n) {
                var currency = this.currency;
                /*
                 var money = new Number(money);
                 var ret = currency.symbol + money.toFixed(currency.decimal_digits);
                 return ret;
                 */
                return this.formatMoneyWithCurrency(n, currency.symbol);
            };

            window.custom.parse_eng_date = function(d) {
                var ms = Date.parse(d);
                var date = new Date(ms);
                var months = window.custom.english_months;

                return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
            };

            window.custom.parse_hij_date = function(d) {
                var ms = Date.parse(d);
                var date = new Date(ms);
                var months = window.custom.islamic_months;

                return date.getDate() + ' ' + months[date.getMonth()];
            };

            window.custom.messages = {
                internal_error : {
                    status: 'danger',
                    message: 'Internal Error'
                },
                processing: {
                    status: 'warning',
                    message: 'Please wait...'
                }
            };

        }
    });
})(window, document, window.jQuery);