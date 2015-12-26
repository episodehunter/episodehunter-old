'use strict';

var utility = {

    /**
     * Shortcut for printing
     * @return {undefined}
     */
    p: function() {
        console.log.apply(console, arguments);
    },

    is: {

        /**
         * Determines if a reference is a string
         * @param  {object} str
         * @return {boolean}
         */
        string: function(str) {
            return (typeof str === 'string' || str instanceof String);
        },

        /**
         * Determines if a reference is an Array
         * @param  {object} arr
         * @return {boolean}
         */
        array: function(arr) {
            return Array.isArray(arr);
        },

        /**
         * Determines if a reference is an integer
         * @param  {object} n
         * @return {boolean}
         */
        int: function(n) {
            return n === +n && n === (n|0);
        },

        /**
         * Determines if a reference is defined or not null
         * @param  {object} variable
         * @return {boolean}
         */
        set: function(variable) {
            return (typeof variable !== 'undefined' && variable !== null);
        }

    },

    to: {

        /**
         * Convert object to int
         * @param  {object} obj
         * @return {integer}
         */
        int: function(obj) {
            return obj|0;
        }

    },

    time: {

        /**
         * Return the local time
         * @return {integer}    Unixtimestamp * 1000
         */
        now: function() {
            return new Date().getTime();
        },

        /**
         * Convert a UTC date to a local timezone
         * @param  {integer} unixtimestamp
         * @return {Date}
         */
        convertUTCDateToLocalDate: function(unixtimestamp) {
            var utcDate = new Date(unixtimestamp * 1000);

            var offset = utcDate.getTimezoneOffset() / 60;
            var hours = utcDate.getHours();

            utcDate.setHours(hours - offset);

            return utcDate;
        },

        /**
         * Generate next Sunday, basted on day d
         * @param  {Date} d
         * @return {Date}
         */
        nextSunday: function(d) {
            return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 7);
        },

        /**
         * Generate a date 'n' days from now
         * @param  {integer} n
         * @return {string} on form YYYY-MM-DD
         */
        futureDate: function(n) {
            var timestamp = new Date().getTime();
            var d = new Date(timestamp + (n || 0) * 86400000);
            var month = d.getMonth() + 1;
            return [
                d.getFullYear(),
                (month < 10 ? '0' + month : month),
                (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
            ].join('-');
        }

    },

    /**
     * Convert JSON string to an object.
     * @param  {string} obj
     * @return {object}
     */
    jsonParser: function(obj) {
        try {
            return JSON.parse(obj);
        } catch(e) {
            return null;
        }
    },

    /**
     * Generate a URL friendly title
     * @param  {string} text
     * @return {string}
     */
    urlTitle: function(text) {
        if (text) {
            return text.toLowerCase()
                       .replace(/[^\w ]+/g, '')
                       .replace(/ +/g, '-');
        }
        return '';
    },

    /**
     * Generate a episode number on form SXXEXX
     * @param  {integer} season
     * @param  {integer} episode
     * @return {string}
     */
    episodeNumber: function(season, episode) {
        var SE = 'S';

        if (season < 10) {
            SE += '0' + season;
        } else {
            SE += season;
        }

        SE += 'E';

        if (episode < 10) {
            SE += '0' + episode;
        } else {
            SE += episode;
        }

        return SE;
    }

};

export default utility;
