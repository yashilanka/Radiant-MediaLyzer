/* Radiant Medialyzer 1.0.3 | Copyright (c) 2014 Radiant Media Player | https://www.radiantmediaplayer.com
For contact information please visit http://www.radiantmedialyzer.net/about.html
Released under MIT License: http://www.radiantmedialyzer.net/license.html
*/

var RadiantML = (function() {

    /****** constructor ******/
    function RadiantML() {
        this._userAgent = this.getUserAgent();
        this._plugins = this.getPlugins();
        this._mimeTypes = this.getMimeTypes();
        this._standalone = this.getStandaloneMode();
    }

    /****** adding methods to the prototype ******/
    /** Getters  **/
    RadiantML.prototype.getUserAgent = function() {
        if (typeof window.navigator.userAgent !== 'undefined') {
            this._userAgent = window.navigator.userAgent;
        } else {
            this._userAgent = null;
        }
        return this._userAgent;
    };
    RadiantML.prototype.getPlugins = function() {
        if (typeof window.navigator.plugins !== 'undefined' && window.navigator.plugins.length > 0) {
            this._plugins = window.navigator.plugins;
            this._plugins.length =  window.navigator.plugins.length;
        } else {
            this._plugins = null;
        }
        return this._plugins;
    };
    RadiantML.prototype.getMimeTypes = function() {
        if (typeof window.navigator.mimeTypes !== 'undefined' && window.navigator.mimeTypes.length > 0) {
            this._mimeTypes = window.navigator.mimeTypes;
            this._mimeTypes.length = window.navigator.mimeTypes.length;
        } else {
            this._mimeTypes = null;
        }
        return this._mimeTypes;
    };
    RadiantML.prototype.getStandaloneMode = function() {
        if (typeof window.navigator.standalone !== 'undefined') {
            this._standalone = window.navigator.standalone;
        } else {
            this._standalone = null;
        }
        return this._standalone;
    };

    /** feature detection **/
    // Video tag support
    RadiantML.prototype.hasVideoTagSupport = function() {
        return !!document.createElement('video').canPlayType;
    };
    // MP4 support
    RadiantML.prototype.hasMp4Support = function() {
        var support = false;
        if (this.hasVideoTagSupport()) {
            var testTag = document.createElement('video');
            var canPlayType= testTag.canPlayType('video/mp4');
            if (canPlayType !== "") {
                support = true;
            }
        }
        return support;
    };
    // WebM support
    RadiantML.prototype.hasWebmSupport = function() {
        var support = false;
        if (this.hasVideoTagSupport()) {
            var testTag = document.createElement('video');
            var canPlayType= testTag.canPlayType('video/webm');
            if (canPlayType !== "") {
                support = true;
            }
        }
        return support;
    };
    // OGV support
    RadiantML.prototype.hasOgvSupport = function() {
        var support = false;
        if (this.hasVideoTagSupport()) {
            var testTag = document.createElement('video');
            var canPlayType= testTag.canPlayType('video/ogg');
            if (canPlayType !== "") {
                support = true;
            }
        }
        return support;
    };
    // Native fullscreen support
    RadiantML.prototype.hasNativeFullscreenSupport = function() {
        if ((!document.documentElement.requestFullscreen && ! document.documentElement.mozRequestFullScreen && !document.documentElement.webkitRequestFullscreen && !document.documentElement.msRequestFullscreen)) {
            return false;
        } else {
            return true;
        }
    };
    // Audio tag support
    RadiantML.prototype.hasAudioTagSupport = function() {
        return !!document.createElement('audio').canPlayType;
    };
    // MP3 support
    RadiantML.prototype.hasMp3Support = function() {
        var support = false;
        if (this.hasAudioTagSupport()) {
            var testTag = document.createElement('audio');
            var canPlayType= testTag.canPlayType('audio/mpeg');
            if (canPlayType !== "") {
                support = true;
            }
        }
        return support;
    };
    // OGG support
    RadiantML.prototype.hasOggSupport = function() {
        var support = false;
        if (this.hasAudioTagSupport()) {
            var testTag = document.createElement('audio');
            var canPlayType= testTag.canPlayType('audio/ogg');
            if (canPlayType !== "") {
                support = true;
            }
        }
        return support;
    };
    // WAV support
    RadiantML.prototype.hasWavSupport = function() {
        var support = false;
        if (this.hasAudioTagSupport()) {
            var testTag = document.createElement('audio');
            var canPlayType= testTag.canPlayType('audio/wav');
            if (canPlayType !== "") {
                support = true;
            }
        }
        return support;
    };
    // Web Audio API
    RadiantML.prototype.hasWebAudioApiSupport = function() {
        var support = false;
        var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        if (typeof AudioContext !== "undefined") {
            support = true;
        }
        return support;
    };
    // MPEG-DASH support 
    RadiantML.prototype.hasDashSupport = function() {
        "use strict";
        if (this.isMacOSX()[0] && this.isSafari()[0]) {
            return false;
        } else {
            var hasWebKit = ("WebKitMediaSource" in window), hasMediaSource = ("MediaSource" in window);
            return (hasWebKit || hasMediaSource);
        }
    };
    // Apple HLS support
    RadiantML.prototype.hasHlsSupport = function() {
        var support = false;
        if (this.hasVideoTagSupport()) {
            var testTag = document.createElement('video');
        } else if (this.hasAudioTagSupport()){
            var testTag = document.createElement('audio');
        } else {
            return support;
        }
        var testMime1 = testTag.canPlayType('application/vnd.apple.mpegurl');
        var testMime2 = testTag.canPlayType('application/x-mpegURL');
        var isAndroid = this.isAndroid();
        if (testMime1 === "maybe" || testMime1 === "probably" || testMime2 === "maybe" || testMime2 === "probably") {
            support = true;
        } else if(this.isIOS()[0]) {
            support = true;
        } else if(isAndroid[0] && isAndroid[1][0] >= 4) {
            support = true;
        }
        return support;
    };
    // Get User Media API
    RadiantML.prototype.hasGetUserMediaSupport = function() {
        var support = false;
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (typeof getUserMedia !== "undefined") {
            support = true;
        }
        return support; 
    };
    // RTCPeerConnection API
    RadiantML.prototype.hasRTCPeerConnectionSupport = function() {
        var support = false;
        var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
        if (typeof RTCPeerConnection !== "undefined") {
            support = true;
        }
        return support; 
    };
    // RTCSessionDescription  
    RadiantML.prototype.hasRTCSessionDescriptionSupport = function() {
        var support = false;
        var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
        if (typeof RTCSessionDescription  !== "undefined") {
            support = true;
        }
        return support; 
    };
    // WebSocket  
    RadiantML.prototype.hasWebSocketSupport = function() {
        var support = false;
        var WebSocket = window.WebSocket || window.MozWebSocket;
        if (typeof WebSocket  !== "undefined") {
            support = true;
        }
        return support; 
    };
    // Web Worker  
    RadiantML.prototype.hasWebWorkerSupport = function() {
        var support = false;
        var WebWorker = window.Worker;
        if (typeof WebWorker  !== "undefined") {
            support = true;
        }
        return support; 
    };
    // Web Storage (try/catch to fix a bug in older versions of Firefox)
    RadiantML.prototype.hasWebStorageSupport = function() {
        try {
            if ((typeof window.localStorage !== 'undefined') && window['localStorage'] !== null && (typeof window.sessionStorage !== 'undefined')) {
                return true;
            } else {
                return false;    
            }
        } catch(e) {
            return false;
        }
    };
    // Canvas support
    RadiantML.prototype.hasCanvasSupport = function() {
        return !!document.createElement('canvas').getContext;
    };
    // Canvas text API support
    RadiantML.prototype.hasCanvasTextSupport = function() {
        if (!this.hasCanvasSupport()) { 
            return false; 
        }
        var context = document.createElement('canvas').getContext('2d');
        return typeof context.fillText == 'function';
    };
    // Canvas blending support
    RadiantML.prototype.hasCanvasBlendingSupport = function() {
        if (!this.hasCanvasSupport()) { 
            return false; 
        }
        var context = document.createElement('canvas').getContext('2d');
        context.globalCompositeOperation = 'screen';
        return context.globalCompositeOperation === 'screen';
    };
    // Canvas WebGL support
    RadiantML.prototype.hasCanvasWebGLSupport = function() {
        if (!this.hasCanvasSupport()) { 
            return false; 
        }
        var canvas = document.createElement('canvas'),context;
        try { 
            context = canvas.getContext('webgl');
            return true;
        } catch (e) { 
            context = null; 
        }
        if (context === null) {
            try { 
                context = canvas.getContext("experimental-webgl"); 
                return true;
            } catch (e) { 
                context = null; 
                return false;
            }
        }
    };
    
    /** plugin detection **/
    // Private functions to get plugin version
    var _parsePluginVersion = function(version) {
        if (typeof version !== 'undefined') {
            var versionArray = version.split('.');
            if (versionArray) {
                return [parseInt(versionArray[0], 10), parseInt(versionArray[1], 10), parseInt(versionArray[2] || 0, 10)];
            }
        }
        return [null, null, null];
    };
    var _parsePluginDescription = function(description) {
        if (typeof description !== 'undefined') {
            var matches = description.match(/[\d]+/g);
            if (matches) {
                if (matches.length >= 3) {
                    matches.length = 3;
                }
                return [parseInt(matches[0], 10), parseInt(matches[1], 10), parseInt(matches[2] || 0, 10)]; 
            }
        }
        return [null, null, null];
    };
    // Flash support + version
    RadiantML.prototype.flashSupport = function() {
        var hasFlash = false;
        var flashVersion = [null, null, null];
        var support = [hasFlash, flashVersion];
        // IE 8,9,10 with ActiveXObject
        var ie = this.isIe();
        if (ie[0] && ie[1][0] < 11) {
            try {
                var flash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                hasFlash = true;
                flashVersion = _parsePluginDescription(flash.GetVariable('$version'));
                support = [hasFlash, flashVersion];
            } catch(e) {
                support = [hasFlash, flashVersion];
            }
        } else if(this._plugins) {
            // check by plugin direct name first as explained on https://developer.mozilla.org/en-US/docs/Web/API/NavigatorPlugins.plugins
            var flash = navigator.plugins['Shockwave Flash'];
            if (typeof flash !== 'undefined') {
                hasFlash = true;
                if (typeof flash.version !== 'undefined') {
                    flashVersion = _parsePluginVersion(flash.version);
                } else if (typeof flash.description !== 'undefined') {
                    flashVersion = _parsePluginDescription(flash.description);
                }
                support = [hasFlash, flashVersion];
            }
        } else if (this._mimeTypes) {
            // check by mimeTypes as a fallback
            var flash = navigator.mimeTypes['application/x-shockwave-flash'];
            if (typeof flash !== 'undefined' && flash.enabledPlugin) {
                hasFlash = true;
                if (typeof flash.enabledPlugin.description !== 'undefined') {
                    flashVersion = _parsePluginDescription(flash.enabledPlugin.description);
                }
                support = [hasFlash, flashVersion];
            }
        }
        return support;
    };
    
    /** OS detection **/
    // Mac OS
    RadiantML.prototype.isMacOSX = function() {
        var isMacOSX = false;
        var macOSXVersion = [null, null, null];
        var support = [isMacOSX, macOSXVersion];
        var pattern1 = /(macintosh|mac os)/i;
        if (pattern1.test(this._userAgent) && !this.isIOS()[0]) {
            isMacOSX = true;
            var pattern2 = /mac os x\s(\d+)\_(\d+)\_?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern2);
            if (versionArray) {
                macOSXVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isMacOSX, macOSXVersion];
        }
        return support;
    };

    // Windows OS (Desktop, Windows Phone, Surface ... all Windows OS)
    RadiantML.prototype.isWindows = function() {
        var pattern = /windows/i;
        return [pattern.test(this._userAgent), [null, null, null]];
    };
    // Windows NT OS + version (Desktop, Surface but not Windows Phone)
    RadiantML.prototype.isWindowsNT = function() {
        var isWindowsNT = false;
        var windowsNTVersion = [null, null, null];
        var support = [isWindowsNT, windowsNTVersion];
        var pattern = /windows nt/i;
        if (pattern.test(this._userAgent)) {
            isWindowsNT = true;
            var pattern = /windows nt\s(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (versionArray) {
                windowsNTVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isWindowsNT, windowsNTVersion];
        }
        return support;
    };
    // Windows Phone (7+ only)
    RadiantML.prototype.isWindowsPhone = function() {
        var isWindowsPhone = false;
        var windowsPhoneVersion = [null, null, null];
        var support = [isWindowsPhone, windowsPhoneVersion];
        var pattern = /(?=.*windows)(?=.*phone)/i;
        if (pattern.test(this._userAgent)) {
            isWindowsPhone = true;
            var pattern = /windows phone\s(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (!versionArray) {
                pattern = /windows phone os\s(\d+)\.(\d+)\.?(\d+)?/i;
                versionArray =  this._userAgent.match(pattern);
            }
            if (versionArray) {
                windowsPhoneVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isWindowsPhone, windowsPhoneVersion];
        }
        return support;
    };
    // Linux OS
    RadiantML.prototype.isLinux = function() {
        var pattern = /linux/i;
        return [pattern.test(this._userAgent), [null, null, null]];
    };
    // UNIX OS
    RadiantML.prototype.isUnix = function() {
        var pattern = /x11/i;
        return [pattern.test(this._userAgent), [null, null, null]];
    };
    // Chrome OS
    RadiantML.prototype.isChromeOS = function() {
        var pattern = /cros/i;
        return [pattern.test(this._userAgent), [null, null, null]];
    };
    // iOS
    RadiantML.prototype.isIOS = function() {
        var isIOS = false;
        var iOSVersion = [null, null, null];
        var support = [isIOS, iOSVersion];
        var pattern = /(ipad|iphone|ipod|apple tv)/i;
        if (pattern.test(this._userAgent)) {
            isIOS = true;
            var pattern = /os\s(\d+)_(\d+)_?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (versionArray) {
                iOSVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isIOS, iOSVersion];
        }
        return support;
    };
    // Android
    RadiantML.prototype.isAndroid = function() {
        var isAndroid = false;
        var androidVersion = [null, null, null];
        var support = [isAndroid, androidVersion];
        var pattern = /android/i;
        if (pattern.test(this._userAgent)) {
            isAndroid = true;
            var pattern = /android\s(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (versionArray) {
                androidVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isAndroid, androidVersion];
        }
        return support;
    };
    // BlackBerry OS
    RadiantML.prototype.isBlackBerryOS = function() {
        var pattern = /(bb10|blackberry|rim tablet)/i;
        return [pattern.test(this._userAgent), [null, null, null]];
    };
    
    /** Browser detection **/
    // Safari
    RadiantML.prototype.isSafari = function() {
        var isSafari = false;
        var safariVersion = [null, null, null];
        var support = [isSafari, safariVersion];
        var pattern1 = /safari/i;
        var pattern2 = /chrome/i;
        if (pattern1.test(this._userAgent) && !pattern2.test(this._userAgent) && !this._standalone && !this.isNativeAndroidBrowser()[0]) {
            isSafari = true;
            var pattern = /version\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (versionArray) {
                safariVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isSafari, safariVersion];
        }
        return support;
    };
    // Chrome 
    RadiantML.prototype.isChrome = function() {
        var isChrome = false;
        var chromeVersion = [null, null, null];
        var support = [isChrome, chromeVersion];
        var windowChrome = !!window.chrome;
        // check it is not a WebView
        if (!this.isAndroidChromeWebView() && !this.isNativeAndroidBrowser()[0]) {
            if (windowChrome) {
                // Opera returns true on !!window.chrome 
                var pattern = /(opr|opera)/i;
                if (!pattern.test(this._userAgent)) {
                    isChrome = true;
                }
            } else {
                // Chrome iOS specific test
                var pattern = /crios/i;
                if (pattern.test(this._userAgent)) {
                    isChrome = true;
                }
            }
        }
        if (isChrome) {
            var pattern = /chrome\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (versionArray) {
                chromeVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isChrome, chromeVersion];
        }
        return support;
    };
    // Internet Explorer (Desktop, mobile ... all IE)
    RadiantML.prototype.isIe = function() {
        var isIe = false;
        var ieVersion = [null, null, null];
        var support = [isIe, ieVersion];
        var pattern = /(msie|trident)/i;
        if (pattern.test(this._userAgent) && !this.isIeMobile()[0]) {
            if (window.ActiveXObject !== 'undefined') {
                isIe = true;
                ieVersion = [11, 0, 0];
                if (!document.querySelector) ieVersion = [7, 0, 0];
                if (!document.addEventListener) ieVersion = [8, 0, 0];
                if (!window.atob) ieVersion = [9, 0, 0];
                if (!document.__proto__) ieVersion = [10, 0, 0];
            }
            support = [isIe, ieVersion];
        }
        return support;
    };
    // Internet Explorer Mobile only
    RadiantML.prototype.isIeMobile = function() {
        var isIeMobile = false;
        var ieMobileVersion = [null, null, null];
        var support = [isIeMobile, ieMobileVersion];
        var pattern = /iemobile/i;
        if (pattern.test(this._userAgent)) {
            isIeMobile = true;
            var pattern = /iemobile\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (versionArray) {
                ieMobileVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isIeMobile, ieMobileVersion];
        }
        return support;
    };
    // Firefox
    RadiantML.prototype.isFirefox = function() {
        var isFirefox = false;
        var firefoxVersion = [null, null, null];
        var support = [isFirefox, firefoxVersion];
        var pattern = /firefox/i;
        if (pattern.test(this._userAgent)) {
            isFirefox = true;
            var pattern = /firefox\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (versionArray) {
                firefoxVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isFirefox, firefoxVersion];
        }
        return support;
    };
    // Opera (15+ only)
    RadiantML.prototype.isOpera = function() {
        var isOpera = false;
        var operaVersion = [null, null, null];
        var support = [isOpera, operaVersion];
        var pattern = /opr/i;
        if (pattern.test(this._userAgent)) {
            isOpera = true;
            var pattern = /opr\/(\d+)\.(\d+)\.?(\d+)?/i;
            var versionArray =  this._userAgent.match(pattern);
            if (versionArray) {
                operaVersion = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
            }
            support = [isOpera, operaVersion];
        }
        return support;
    };
    // Opera Mini
    RadiantML.prototype.isOperaMini = function() {
        var pattern = /opera mini/i;
        return [pattern.test(this._userAgent), [null, null, null]];
    };
    // Native Android Browser
    RadiantML.prototype.isNativeAndroidBrowser = function() {
        var support = [false, [null, null, null]]; 
        if (this.isAndroid()[0]) {
            var pattern1 = /(?=.*mozilla\/5.0)(?=.*applewebkit)(?=.*android)/i;
            var pattern2 = /chrome/i;
            if (pattern1.test(this._userAgent) && !pattern2.test(this._userAgent)) {
                support[0] = true;
            }
        }
        return support;
    };
    
    /** WebView detection **/
    // iOS standalone mode = <meta name="apple-mobile-web-app-capable" content="yes" />
    RadiantML.prototype.isIOSStandaloneMode = function() {
        var isIt = false;
        if (this.isIOS()[0]) {
            var pattern = /safari/i;
            var safari = pattern.test(this._userAgent);
            if (this._standalone && !safari) {
                isIt = true;
            }
        }
        return isIt;
    };
    // iOS WebView
    RadiantML.prototype.isIOSWebView = function() {
        var isIt = false;
        if (this.isIOS()[0]) {
            var pattern = /safari/i;
            var safari = pattern.test(this._userAgent);
            if (!this._standalone && !safari) {
                isIt = true;
            }
        }
        return isIt;
    };
    // Android Chrome WebView
    RadiantML.prototype.isAndroidChromeWebView = function() {
        var isIt = false;
        if (this.isAndroid()[0]) {
            var pattern1 = /version\/(\d+)\.(\d+)/i;
            var webView = pattern1.test(this._userAgent);
            var pattern2 = /chrome/i;
            var chrome = pattern2.test(this._userAgent);
            if (webView && chrome) {
                isIt = true;
            }
        }
        return isIt;
    };
    /** Device detection **/
    // Chromecast
    RadiantML.prototype.isChromecast = function() {
        var pattern = /crkey/i;
        return pattern.test(this._userAgent);
    };
    // iPhone detection
    RadiantML.prototype.isIphone = function() {
        var pattern = /iphone/i;
        return pattern.test(this._userAgent);
    };
    // iPod detection
    RadiantML.prototype.isIpod = function() {
        var pattern = /ipod/i;
        return pattern.test(this._userAgent);
    };
    // iPad detection
    RadiantML.prototype.isIpad = function() {
        var pattern = /ipad/i;
        return pattern.test(this._userAgent);
    };
    // Apple TV detection
    RadiantML.prototype.isAppleTV = function() {
        var pattern = /apple tv/i;
        return pattern.test(this._userAgent);
    };
    
    return RadiantML;

})();