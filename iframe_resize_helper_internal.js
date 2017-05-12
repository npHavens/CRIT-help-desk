/**
 * This script must be included in a FormAssembly form.
 * When loaded in an IFRAME, it will continuously send its updated
 * height so that the container can adjust IFRAME height to match
 * it content's height.
 *
 * The posting is done through a cross-domain message mechanism.
 * simpleStorage js library is also used (included minified below) -
 * it is needed to store data between page reloads in the IFRAME.
 *
 * The message sent in the following format:
 * h,iframeID,targetUrl
 *
 * - h: either new height in pixels or a command like "submitted";
 *   the message receiver in the parent window will handle it accordingly.
 * - iframeID: the unique iframe ID for which the message must be applied,
 *   in other words it is the IFRAME running this script;
 * - targetURL: the fallback solution if no iframeID is available;
 *   indicates the value of IFRAME's "src" attribute to identify
 *   the IFRAME. Identifying IFRAME by targetURL will not work after
 *   form resubmission as the IFRAME's "src" attribute will remain unchanged
 *   and will no longer match the targetURL passed with the message.
 *
 * The corresponding FormAssembly documentation that explain IFRAME embedding:
 * https://help.formassembly.com/knowledgebase/articles/340359-publish-with-an-iframe
 */

/*! simpleStorage v0.2.1, Unlicense 2016. https://github.com/andris9/simpleStorage */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(b):"undefined"!=typeof exports?module.exports=b():a.simpleStorage=b()}(this,function(){"use strict";function a(){p=j(),d(),g(),b(),"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&c()},!1),p=!0}function b(){"addEventListener"in window?window.addEventListener("storage",c,!1):document.attachEvent("onstorage",c)}function c(){try{d()}catch(a){return void(p=!1)}g()}function d(){var a=localStorage.getItem("simpleStorage");try{n=JSON.parse(a)||{}}catch(b){n={}}o=f()}function e(){try{localStorage.setItem("simpleStorage",JSON.stringify(n)),o=f()}catch(a){return k(a)}return!0}function f(){var a=localStorage.getItem("simpleStorage");return a?String(a).length:0}function g(){var a,b,c,d,f,h=1/0,j=0;if(clearTimeout(q),n&&n.__simpleStorage_meta&&n.__simpleStorage_meta.TTL){for(a=+new Date,f=n.__simpleStorage_meta.TTL.keys||[],d=n.__simpleStorage_meta.TTL.expire||{},b=0,c=f.length;c>b;b++){if(!(d[f[b]]<=a)){d[f[b]]<h&&(h=d[f[b]]);break}j++,delete n[f[b]],delete d[f[b]]}h!==1/0&&(q=setTimeout(g,Math.min(h-a,2147483647))),j&&(f.splice(0,j),i(),e())}}function h(a,b){var c,d,e=+new Date,f=!1;if(b=Number(b)||0,0!==b){if(!n.hasOwnProperty(a))return!1;if(n.__simpleStorage_meta||(n.__simpleStorage_meta={}),n.__simpleStorage_meta.TTL||(n.__simpleStorage_meta.TTL={expire:{},keys:[]}),n.__simpleStorage_meta.TTL.expire[a]=e+b,n.__simpleStorage_meta.TTL.expire.hasOwnProperty(a))for(c=0,d=n.__simpleStorage_meta.TTL.keys.length;d>c;c++)n.__simpleStorage_meta.TTL.keys[c]===a&&n.__simpleStorage_meta.TTL.keys.splice(c);for(c=0,d=n.__simpleStorage_meta.TTL.keys.length;d>c;c++)if(n.__simpleStorage_meta.TTL.expire[n.__simpleStorage_meta.TTL.keys[c]]>e+b){n.__simpleStorage_meta.TTL.keys.splice(c,0,a),f=!0;break}f||n.__simpleStorage_meta.TTL.keys.push(a)}else if(n&&n.__simpleStorage_meta&&n.__simpleStorage_meta.TTL){if(n.__simpleStorage_meta.TTL.expire.hasOwnProperty(a))for(delete n.__simpleStorage_meta.TTL.expire[a],c=0,d=n.__simpleStorage_meta.TTL.keys.length;d>c;c++)if(n.__simpleStorage_meta.TTL.keys[c]===a){n.__simpleStorage_meta.TTL.keys.splice(c,1);break}i()}return clearTimeout(q),n&&n.__simpleStorage_meta&&n.__simpleStorage_meta.TTL&&n.__simpleStorage_meta.TTL.keys.length&&(q=setTimeout(g,Math.min(Math.max(n.__simpleStorage_meta.TTL.expire[n.__simpleStorage_meta.TTL.keys[0]]-e,0),2147483647))),!0}function i(){var a,b=!1,c=!1;if(!n||!n.__simpleStorage_meta)return b;n.__simpleStorage_meta.TTL&&!n.__simpleStorage_meta.TTL.keys.length&&(delete n.__simpleStorage_meta.TTL,b=!0);for(a in n.__simpleStorage_meta)if(n.__simpleStorage_meta.hasOwnProperty(a)){c=!0;break}return c||(delete n.__simpleStorage_meta,b=!0),b}function j(){var a,b=0;if(null===window.localStorage||"unknown"==typeof window.localStorage)throw a=new Error("localStorage is disabled"),a.code=t,a;if(!window.localStorage)throw a=new Error("localStorage not supported"),a.code=s,a;try{b=window.localStorage.length}catch(c){throw k(c)}try{window.localStorage.setItem("__simpleStorageInitTest",Date.now().toString(16)),window.localStorage.removeItem("__simpleStorageInitTest")}catch(c){throw b?k(c):(a=new Error("localStorage is disabled"),a.code=t,a)}return!0}function k(a){var b;return 22===a.code||1014===a.code||[-2147024882,-2146828281,-21474675259].indexOf(a.number)>0?(b=new Error("localStorage quota exceeded"),b.code=u,b):18===a.code||1e3===a.code?(b=new Error("localStorage is disabled"),b.code=t,b):"TypeError"===a.name?(b=new Error("localStorage is disabled"),b.code=t,b):a}function l(a){if(!a)return r="OK",a;switch(a.code){case s:case t:case u:r=a.code;break;default:r=a.code||a.number||a.message||a.name}return a}var m="0.2.1",n=!1,o=0,p=!1,q=null,r="OK",s="LS_NOT_AVAILABLE",t="LS_DISABLED",u="LS_QUOTA_EXCEEDED";try{a()}catch(v){l(v)}return{version:m,status:r,canUse:function(){return"OK"===r&&!!p},set:function(a,b,c){if("__simpleStorage_meta"===a)return!1;if(!n)return!1;if("undefined"==typeof b)return this.deleteKey(a);c=c||{};try{b=JSON.parse(JSON.stringify(b))}catch(d){return k(d)}return n[a]=b,h(a,c.TTL||0),e()},hasKey:function(a){return n&&n.hasOwnProperty(a)&&"__simpleStorage_meta"!==a?!0:!1},get:function(a){return n?n.hasOwnProperty(a)&&"__simpleStorage_meta"!==a&&this.getTTL(a)?n[a]:void 0:!1},deleteKey:function(a){return n&&a in n?(delete n[a],h(a,0),e()):!1},setTTL:function(a,b){return n?(h(a,b),e()):!1},getTTL:function(a){var b;return n&&n.hasOwnProperty(a)?n.__simpleStorage_meta&&n.__simpleStorage_meta.TTL&&n.__simpleStorage_meta.TTL.expire&&n.__simpleStorage_meta.TTL.expire.hasOwnProperty(a)?(b=Math.max(n.__simpleStorage_meta.TTL.expire[a]-+new Date||0,0),b||!1):1/0:!1},flush:function(){if(!n)return!1;n={};try{return localStorage.removeItem("simpleStorage"),!0}catch(a){return k(a)}},index:function(){if(!n)return!1;var a,b=[];for(a in n)n.hasOwnProperty(a)&&"__simpleStorage_meta"!==a&&b.push(a);return b},storageSize:function(){return o}}});
/* END simpleStorage library minified code */

(function () {

    var i, sep;

    /**
     * This class is responsible for posting messages to the document
     * that contains the IFRAME which loads the form.
     *
     * The method to be used is XS.postMessage()
     */
    var XD = function () {

        var cache_bust = 1;
        var window = this;

        return {
            postMessage: function (message, target_url, target) {

                if (!target_url) {
                    return;
                }

                target = target || parent;  // default to parent

                if (window['postMessage']) {
                    // the browser supports window.postMessage, so call it with a targetOrigin
                    // set appropriately, based on the target_url parameter.
                    target['postMessage'](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));

                } else if (target_url) {
                    // the browser does not support window.postMessage, so set the location
                    // of the target to target_url#message. A bit ugly, but it works! A cache
                    // bust parameter is added to ensure that repeat messages trigger the callback.
                    target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
                }
            }
        };
    }();

    // The code below runs on hosted page (inside iframe).
    // The main idea is to compute the page height and pass it on
    // to the parent window.

    // Initially, parent URL is NULL, which means there is no parent window
    // to send messages to. The frame unique ID is a random identifier
    // that is generated by the parent page for each IFRAME.
    // The parent window is responsible for passing these two parameters
    // to the IFRAME's "src" attribute, for example
    // ?faIframeUniqueId=1234567890&hostURL=...
    // This is done by the complementary script iframe_resize_helper.js
    var parentURL = null;
    var faIframeUniqueId = null;

    // Get hostURL from a hidden form field, or a URL parameter
    try {
        parentURL = decodeURIComponent(window.location.search.split('hostURL=')[1].split("&")[0]);
    } catch (e) {
        // hostURL not set. By convention, look for input with class 'calc-HOSTURL'
        var fields = document.getElementsByTagName('input');
        for (i = 0; i < fields.length; i++) {
            if (fields[i].className && fields[i].className.indexOf('calc-HOSTURL') != -1) {
                parentURL = fields[i].value;
                break;
            }
        }
    }

    // Get IFRAME unique ID from a URL parameter
    try {
        faIframeUniqueId = decodeURIComponent(window.location.search.split('faIframeUniqueId=')[1].split("&")[0]);
    } catch (e) {
        faIframeUniqueId = null;
    }
    // console.log("In IFRAME: unique ID = ", faIframeUniqueId, "parent (host) URL = ", parentURL);

    // Only monitor page height and post it to the parent window if
    // there is a parent window to post messages to.
    if (parentURL) {

        // The latest document height that was passed to the parent window
        var height = 0;

        // Various methods of getting the page height.
        // - name is used to store the values in browser cache
        // - value is used to store the values in memory while the page
        //   stays the same, but its height changes (e.g. when showing
        //   validation errors)
        var heights = [
            {
                name: 'bodyScrollHeight',
                value: 0,
                getter: function() { return document.body.scrollHeight }
            },
            {
                name: 'bodyOffsetHeight',
                value: 0,
                getter: function() { return document.body.offsetHeight }
            },
            {
                name: 'bodyClientHeight',
                value: 0,
                getter: function() { return document.body.clientHeight }
            },
            {
                name: 'htmlScrollHeight',
                value: 0,
                getter: function() { return document.documentElement.scrollHeight }
            },
            {
                name: 'htmlOffsetHeight',
                value: 0,
                getter: function() { return document.documentElement.offsetHeight }
            },
            {
                name: 'htmlClientHeight',
                value: 0,
                getter: function() { return document.documentElement.clientHeight }
            }
        ];

        // Initialize values from local storage, if any.
        // This preserves previously retrieved heights between page reloads
        // and thus allows for some advanced calculations when determining
        // the need for IFRAME to resize.
        if (simpleStorage && simpleStorage.canUse()) {
            for (i = 0; i < heights.length; i++) {
                var cachedValue = simpleStorage.get(heights[i].name);
                if (typeof cachedValue !== "undefined" && !isNaN(cachedValue)) {
                    heights[i].value = cachedValue;
                    // console.log(heights[i].name + ' initialized from local storage:', heights[i].value);
                }
            }
            // The final height is also stored
            cachedValue = simpleStorage.get('maximumHeight');
            if (typeof cachedValue !== "undefined" && !isNaN(cachedValue)) {
                height = cachedValue;
                // console.log('maximumHeight:', height);
            }
        }

        /**
         * Calculates current document height with combining a few techniques,
         * for which it uses previously cached values.
         * Also caches the new heights.
         *
         * @returns {number}
         */
        var getNewHeight = function() {

            // console.log('Calculating new height...');

            // Retrieve all possible heights and also build a separate list
            // of the changed heights only
            var i;
            var newHeights = [];
            var changedHeights = [];
            for (i = 0; i < heights.length; i++) {
                var heightMeta = heights[i];
                var newSingleHeight = heightMeta.getter();
                newHeights.push(newSingleHeight);
                if (newSingleHeight != heightMeta.value) {
                    changedHeights.push(newSingleHeight);
                }

                // console.log(heightMeta.name + ": old = " + heightMeta.value + ", new = " + newSingleHeight);

                // Record new height value after using the old one
                heightMeta.value = newSingleHeight;
            }

            // Save values to local storage if it is available.
            // TTL = 3 days
            if (simpleStorage && simpleStorage.canUse()) {
                for (i = 0; i < heights.length; i++) {
                    simpleStorage.set(heights[i].name, heights[i].value, {TTL: 1000 * 60 * 60 * 24 * 3});
                }
            }

            // Find out the maximum value of the height values
            var newMaxHeight = Math.max.apply(null, newHeights);

            // If the new height value differs to the cached one,
            // we already know that IFRAME needs resizing, so return immediately
            if (newMaxHeight != height) {
                // console.log('New maximum height ' + newMaxHeight + " != old one " + height + ", RETURNING.");
                return newMaxHeight;
            }

            // If the new maximum height is the same, this means the content
            // has not increased in height. However, it does not mean that
            // the content has not decreased in size - that is because
            // one of the heights used in calculations represents
            // the viewport height. Once IFRAME's height increases,
            // for example to 800px, the viewport size reported to the hosted
            // page will always be 800px, which makes it impossible to find out
            // whether the content has become smaller in size by looking
            // at the maximum value.
            // In order to tackle this, we must check if any of the heights
            // has changed (even if their maximum value has not been changed).
            // Now, if there are any changed heights, let us find their maximum
            // value. If this value is smaller than the overall maximum height,
            // it indicates the content's height has been changed, but not
            // the viewport height. If this is the case, use the maximum
            // of the changed heights as a new content height.
            if (changedHeights.length > 0) {
                // console.log('Some heights changed...');
                var newMaxChangedHeight = Math.max.apply(null, changedHeights);
                if (newMaxChangedHeight < newMaxHeight) {
                    // console.log('New maximum of changed heights ' + newMaxChangedHeight + " is smaller than the new maximum height " + newMaxHeight + ", RETURNING the former.");
                    return newMaxChangedHeight;
                }
            }

            // Finally, if both the maximum height and the maximum
            // of the changed heights are the same,
            // return the unchanged height value.

            // console.log('RETURNING old unchanged height ' + height);
            return newMaxHeight; // unchanged, i.e. = height
        };

        /**
         * Monitors content's height and submits a message with an updated height
         * to the parent window. Runs every 0.5 seconds.
         */
        var monitor = function() {
            var newHeight = getNewHeight();

            // Persist new height after page reload
            if (simpleStorage && simpleStorage.canUse()) {
                simpleStorage.set('maximumHeight', newHeight, {TTL: 1000 * 60 * 60 * 24 * 3});
            }

            if (newHeight != height) {
                // console.log('Posting new height from IFRAME: ' + newHeight);
                height = newHeight;
                var msg = height + ",";
                msg += (faIframeUniqueId === null)? 'unknown' : faIframeUniqueId;
                msg += "," + window.location.href.replace(/^https?:/, '');
                XD.postMessage(msg, parentURL);
            }
            window.setTimeout(function(){monitor()}, 500);
        };

        // Start monitoring immediately.
        // This is needed for the IFRAME to take its content height upon loading.
        monitor();

        // Rewrite links to preserve hostURL and faIframeUniqueId parameters:

        // ... in anchors
        var links = document.links;
        for (i = 0; i < links.length; i++) {
            if (!links[i].target) {
                sep = (links[i].href.indexOf('?') != -1) ? '&' : '?';
                links[i].href = links[i].href + sep + 'faIframeUniqueId=' + faIframeUniqueId + '&hostURL=' + parentURL;
            }
        }

        // ... and in forms
        var forms = document.forms;
        for (i = 0; i < forms.length; i++) {
            if (forms[i].action) {
                sep = (forms[i].action.indexOf('?') != -1) ? '&' : '?';
                forms[i].action = forms[i].action + sep + 'faIframeUniqueId=' + faIframeUniqueId + '&hostURL=' + parentURL;
            }
        }

        // This forces the outer page back to the top when inner iframe has been submitted
        try {
            window.onunload = function () {
                var msg = "submitted" + ",";
                msg += (faIframeUniqueId === null)? 'unknown' : faIframeUniqueId + ",";
                msg += window.location.href.replace(/^https?:/, '');
                XD.postMessage(msg, parentURL);
            }
        } catch (e) {
            // wForms was not loaded (no form)
        }
    }
})();