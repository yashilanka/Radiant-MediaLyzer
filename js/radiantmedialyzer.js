/*
Radiant Medialyzer 1.0.1 | (c) 2014 Radiant Media Player 

For contact information please visit https://www.radiantmediaplayer.com/support.html

Radiant Medialyzer is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Radiant Medialyzer is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Magneticmediajs library starter edition. If not, see http://www.gnu.org/licenses/.
*/
var RadiantML = (function() {
    
	
	/****** constructor ******/
    function RadiantML(){
		if(typeof window.navigator.userAgent !== 'undefined'){
        	this._userAgent = window.navigator.userAgent;
		}else{
			this._userAgent = null;
		}
		if(typeof window.navigator.plugins !== 'undefined' && window.navigator.plugins.length > 0){
        	this._plugins = window.navigator.plugins;
			this._plugins.length =  window.navigator.plugins.length;
		}else{
			this._plugins = null;
		}
		if(typeof window.navigator.standalone !== 'undefined'){
        	this._standalone = window.navigator.standalone;
		}else{
			this._standalone = null;
		}
    };


	/****** adding methods to the prototype ******/
	/** userAgent and plugins getters  **/
	RadiantML.prototype.getUserAgent = function() {
        return this._userAgent;
    };
	RadiantML.prototype.getPlugins = function() {
        return this._plugins;
    };
	RadiantML.prototype.getStandaloneMode = function() {
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
		if (this.hasVideoTagSupport()){
			var testTag = document.createElement('video');
			var canPlayType= testTag.canPlayType('video/mp4');
			if (canPlayType !== ""){
				support = true;
			}
		}
		return support;
	};
	// WebM support
	RadiantML.prototype.hasWebmSupport = function() {
		var support = false;
		if (this.hasVideoTagSupport()){
			var testTag = document.createElement('video');
			var canPlayType= testTag.canPlayType('video/webm');
			if (canPlayType !== ""){
				support = true;
			}
		}
		return support;
	};
	// OGV support
	RadiantML.prototype.hasOgvSupport = function() {
		var support = false;
		if (this.hasVideoTagSupport()){
			var testTag = document.createElement('video');
			var canPlayType= testTag.canPlayType('video/ogg');
			if (canPlayType !== ""){
				support = true;
			}
		}
		return support;
	};
	// Native fullscreen support
	RadiantML.prototype.hasNativeFullscreenSupport = function() {
		if ((!document.documentElement.requestFullscreen && ! document.documentElement.mozRequestFullScreen && !document.documentElement.webkitRequestFullscreen && !document.documentElement.msRequestFullscreen)){
			return false;
		}else{
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
		if (this.hasAudioTagSupport()){
			var testTag = document.createElement('audio');
			var canPlayType= testTag.canPlayType('audio/mpeg');
			if (canPlayType !== ""){
				support = true;
			}
		}
		return support;
	};
	// OGG support
	RadiantML.prototype.hasOggSupport = function() {
		var support = false;
		if (this.hasAudioTagSupport()){
			var testTag = document.createElement('audio');
			var canPlayType= testTag.canPlayType('audio/ogg');
			if (canPlayType !== ""){
				support = true;
			}
		}
		return support;
	};
	// WAV support
	RadiantML.prototype.hasWavSupport = function() {
		var support = false;
		if (this.hasAudioTagSupport()){
			var testTag = document.createElement('audio');
			var canPlayType= testTag.canPlayType('audio/wav');
			if (canPlayType !== ""){
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
		if (this.isMacOS() && this.isSafari()){
			return false;
		}
		else{
			var hasWebKit = ("WebKitMediaSource" in window), hasMediaSource = ("MediaSource" in window);
			return (hasWebKit || hasMediaSource);
		}
	};
	// Apple HLS support
	RadiantML.prototype.hasHlsSupport = function() {
		var support = false;
		if (this.hasVideoTagSupport()){
			var testTag = document.createElement('video');
		}else if(this.hasAudioTagSupport()){
			var testTag = document.createElement('audio');
		}else{
			return support;
		}
		var testMime1 = testTag.canPlayType('application/vnd.apple.mpegurl');
		var testMime2 = testTag.canPlayType('application/x-mpegURL');
		if(testMime1 === "maybe" || testMime1 === "probably" || testMime2 === "maybe" || testMime2 === "probably"){
			support = true;
		}
		else if(this.isIOS()){
			support = true;
		}
		else if(this.androidVersion() && this.androidVersion()[0] >= 4){
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
		if (typeof RTCPeerConnection !== "undefined"){
			support = true;
		}
		return support; 
	};
	// RTCSessionDescription  
	RadiantML.prototype.hasRTCSessionDescriptionSupport = function() {
		var support = false;
		var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
		if (typeof RTCSessionDescription  !== "undefined"){
			support = true;
		}
		return support; 
	};
	// WebSocket  
	RadiantML.prototype.hasWebSocketSupport = function() {
		var support = false;
		var WebSocket = window.WebSocket || window.MozWebSocket;
		if (typeof WebSocket  !== "undefined"){
			support = true;
		}
		return support; 
	};
	// Web Worker  
	RadiantML.prototype.hasWebWorkerSupport = function() {
		var support = false;
		var WebWorker = window.Worker;
		if (typeof WebWorker  !== "undefined"){
			support = true;
		}
		return support; 
	};
	// Flash support
	RadiantML.prototype.hasFlashSupport = function() {
		var support = false;
		if(this._plugins){
			var pattern = /shockwave flash/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern.test(this._plugins[i].name)){
							return true;
					}
				}
			}
		}
		return support;
	};
	// Flash version 
	RadiantML.prototype.flashVersion = function() {
		var version = null;
		if(this._plugins){
			var pattern1 = /shockwave flash/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern1.test(this._plugins[i].name)){
						if(typeof this._plugins[i].version !== 'undefined'){
							var versionArray = this._plugins[i].version;
							versionArray = versionArray.split('.');
							return [parseInt(versionArray[0], 10), parseInt(versionArray[1], 10), parseInt(versionArray[2] || 0, 10)]; 
						}else if(typeof this._plugins[i].description !== 'undefined'){
							var pattern2 = /shockwave\sflash\s(\d+)\.(\d+)\s?r?(\d+)?/i;
							var versionArray =  this._plugins[i].description.match(pattern2);
							if(versionArray){
								return [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
							}
						}
					}
				}
			}
		}
		return version;
	};
	// Java support
	RadiantML.prototype.hasJavaSupport = function() {
		var support = false;
		if(this._plugins){
			var pattern = /(?=.*java)(?=.*se)/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern.test(this._plugins[i].name)){
							return true;
					}
				}
			}
		}
		return support;
	};
	// Java Plug-in version 
	RadiantML.prototype.javaPlugInVersion = function() {
		var version = null;
		if(this._plugins){
			var pattern1 = /(?=.*java)(?=.*se)/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern1.test(this._plugins[i].name)){
						if(typeof this._plugins[i].version !== 'undefined'){
							var versionArray = this._plugins[i].version;
							versionArray = versionArray.split('.');
							return [parseInt(versionArray[0], 10), parseInt(versionArray[1], 10), parseInt(versionArray[2] || 0, 10)]; 
						}else if(typeof this._plugins[i].description !== 'undefined'){
							var pattern2 = /plug-in\s(\d+)\.(\d+)\.?(\d+)?/i;
							var versionArray =  this._plugins[i].description.match(pattern2);
							if(versionArray){
								return [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
							}
						}
					}
				}
			}
		}
		return version;
	};
	// Java version 
	RadiantML.prototype.javaVersion = function() {
		var version = null;
		if(this._plugins){
			var pattern1 = /(?=.*java)(?=.*se)/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern1.test(this._plugins[i].name)){
						var pattern2 = /se\s(\d+)\s?u?(\d+)?/i;
						var versionArray =  this._plugins[i].name.match(pattern2);
						if(versionArray){
							return [parseInt(versionArray[1], 10), 0, parseInt(versionArray[2] || 0, 10)];
						}
					}
				}
			}
		}
		return version;
	};
	// Silverlight support
	RadiantML.prototype.hasSilverlightSupport = function() {
		var support = false;
		if(this._plugins){
			var pattern = /silverlight/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern.test(this._plugins[i].name)){
							return true;
					}
				}
			}
		}
		return support;
	};
	// Silverlight version 
	RadiantML.prototype.silverlightVersion = function() {
		var version = null;
		if(this._plugins){
			var pattern1 = /silverlight/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern1.test(this._plugins[i].name)){
						if(typeof this._plugins[i].version !== 'undefined'){
							var versionArray = this._plugins[i].version;
							versionArray = versionArray.split('.');
							return [parseInt(versionArray[0], 10), parseInt(versionArray[1], 10), parseInt(versionArray[2] || 0, 10)]; 
						}else if(typeof this._plugins[i].description !== 'undefined'){
							var pattern2 = /(\d+)\.(\d+)\.?(\d+)?/i;
							var versionArray =  this._plugins[i].description.match(pattern2);
							if(versionArray){
								return [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
							}
						}
					}
				}
			}
		}
		return version;
	};
	// Quicktime support
	RadiantML.prototype.hasQuicktimeSupport = function() {
		var support = false;
		if(this._plugins){
			var pattern = /quicktime/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern.test(this._plugins[i].name)){
							return true;
					}
				}
			}
		}
		return support;
	};
	// Quicktime version 
	RadiantML.prototype.quicktimeVersion = function() {
		var version = null;
		if(this._plugins){
			var pattern1 = /quicktime/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern1.test(this._plugins[i].name)){
						if(typeof this._plugins[i].version !== 'undefined'){
							var versionArray = this._plugins[i].version;
							versionArray = versionArray.split('.');
							return [parseInt(versionArray[0], 10), parseInt(versionArray[1], 10), parseInt(versionArray[2] || 0, 10)]; 
						}else{
							var pattern2 = /plug-in\s(\d+)\.(\d+)\.?(\d+)?/i;
							var versionArray =  this._plugins[i].name.match(pattern2);
							if(versionArray){
								return [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
							}
						}
					}
				}
			}
		}
		return version;
	};
	// VLC support
	RadiantML.prototype.hasVLCSupport = function() {
		var support = false;
		if(this._plugins){
			var pattern = /vlc\sweb/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern.test(this._plugins[i].name)){
							return true;
					}
				}
			}
		}
		return support;
	};
	// VLC version 
	RadiantML.prototype.VLCVersion = function() {
		var version = null;
		if(this._plugins){
			var pattern1 = /vlc\sweb/i;
			for (i = 0; i < this._plugins.length; i++ ) {
				if(typeof this._plugins[i].name !== 'undefined'){
					if (pattern1.test(this._plugins[i].name)){
						if(typeof this._plugins[i].version !== 'undefined'){
							var versionArray = this._plugins[i].version;
							versionArray = versionArray.split('.');
							return [parseInt(versionArray[0], 10), parseInt(versionArray[1], 10), parseInt(versionArray[2] || 0, 10)]; 
						}else if(typeof this._plugins[i].description !== 'undefined'){
							var pattern2 = /plugin\s(\d+)\.(\d+)\.?(\d+)?/i;
							var versionArray =  this._plugins[i].description.match(pattern2);
							if(versionArray){
								return [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
							}
						}
					}
				}
			}
		}
		return version;
	};
	
	
   	/** OS detection **/
	// Mac OS
	RadiantML.prototype.isMacOS = function() {
		var pattern = /(macintosh|mac os)/i;
		if(pattern.test(this._userAgent) && !this.isIOS()){
			return true;
		}else{
			return false;
		}
	};
	// Mac OS X version
	RadiantML.prototype.macOSXVersion = function() {
		var result = null;
		if(this.isMacOS()){
			var pattern = /mac os x\s(\d+)\_(\d+)\_?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Windows OS (Desktop, Windows Phone, Surface ... all Windows OS)
	RadiantML.prototype.isWindows = function() {
		var pattern = /windows/i;
		return pattern.test(this._userAgent);
	};
	// Windows NT OS (Desktop, Surface but not Windows Phone)
	RadiantML.prototype.isWindowsNT = function() {
		var pattern = /windows nt/i;
		return pattern.test(this._userAgent);
	};
	// Windows NT version
	RadiantML.prototype.windowsNTVersion = function() {
		var result = null;
		if(this.isWindowsNT()){
			var pattern = /windows nt\s(\d+)\.(\d+)\.?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Windows Phone (7+ only)
	RadiantML.prototype.isWindowsPhone = function() {
		var pattern = /(?=.*windows)(?=.*phone)/i;
		return pattern.test(this._userAgent);
	};
	// Windows Phone version
	RadiantML.prototype.windowsPhoneVersion = function() {
		var result = null;
		if(this.isWindowsPhone()){
			var pattern = /windows phone\s(\d+)\.(\d+)\.?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if (!versionArray){
				pattern = /windows phone os\s(\d+)\.(\d+)\.?(\d+)?/i;
				versionArray =  this._userAgent.match(pattern);
			}
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Linux OS
	RadiantML.prototype.isLinux = function() {
		var pattern = /linux/i;
		return pattern.test(this._userAgent);
	};
	// UNIX OS
	RadiantML.prototype.isUnix = function() {
		var pattern = /x11/i;
		return pattern.test(this._userAgent);
	};
	// Chrome OS
	RadiantML.prototype.isChromeOS = function() {
		var pattern = /cros/i;
		return pattern.test(this._userAgent);
	};
	// iOS
	RadiantML.prototype.isIOS = function() {
		var pattern = /(ipad|iphone|ipod|apple tv)/i;
		return pattern.test(this._userAgent);
	};
	// iOS version
	RadiantML.prototype.iOSVersion = function() {
		var result = null;
		if(this.isIOS()){
			var pattern = /os\s(\d+)_(\d+)_?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Android
	RadiantML.prototype.isAndroid = function() {
		var pattern = /android/i;
		return pattern.test(this._userAgent);
	};
	// Android version
	RadiantML.prototype.androidVersion = function() {
		var result = null;
		if(this.isAndroid()){
			var pattern = /android\s(\d+)\.(\d+)\.?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// BlackBerry OS
	RadiantML.prototype.isBlackBerryOS = function() {
		var pattern = /(bb10|blackberry|rim tablet)/i;
		return pattern.test(this._userAgent);
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
	
	
	/** Browser detection **/
	// Safari
	RadiantML.prototype.isSafari = function() {
		var pattern1 = /safari/i;
		var pattern2 = /chrome/i;
		if(pattern1.test(this._userAgent) && !pattern2.test(this._userAgent) && !this._standalone){
			return true;
		}else{
			return false;
		}
	};
	// Safari Version
	RadiantML.prototype.safariVersion = function() {
		var result = null;
		if(this.isSafari()){
			var pattern = /version\/(\d+)\.(\d+)\.?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Chrome 
	RadiantML.prototype.isChrome = function() {
		var windowChrome = !!window.chrome;
		if(!this.isAndroidChromeWebView()){
			if(windowChrome){
				// Opera returns true on !!window.chrome 
				var pattern = /(opr|opera)/i;
				return !pattern.test(this._userAgent);
			}
			else{
				// Chrome iOS specific test
				var pattern = /crios/i;
				return pattern.test(this._userAgent);
			}
		}
	};
	// Chrome version
	RadiantML.prototype.chromeVersion = function() {
		var result = null;
		if(this.isChrome()){
			var pattern = /chrome\/(\d+)\.(\d+)\.?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Internet Explorer (Desktop, mobile ... all IE)
	RadiantML.prototype.isIe = function() {
		var pattern = /(msie|trident)/i;
		return pattern.test(this._userAgent);
	};
	// Internet Explorer Version (feature detection)
	RadiantML.prototype.ieVersion = function() {
		if(this.isIe()){
			if (window.ActiveXObject === 'undefined') return null;
			if (!document.querySelector) return [7,0,0];
			if (!document.addEventListener) return [8,0,0];
			if (!window.atob) return [9,0,0];
			if (!document.__proto__) return [10,0,0];
			return [11,0,0];
		}
	};
	// Internet Explorer Mobile only
	RadiantML.prototype.isIeMobile = function() {
		var pattern = /iemobile/i;
		return pattern.test(this._userAgent);
	};
	// Internet Explorer Mobile version
	RadiantML.prototype.ieMobileVersion = function() {
		var result = null;
		if(this.isIeMobile()){
			var pattern = /iemobile\/(\d+)\.(\d+)\.?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Firefox
	RadiantML.prototype.isFirefox = function() {
		var pattern = /firefox/i;
		return pattern.test(this._userAgent);
	};
	// Firefox Version
	RadiantML.prototype.firefoxVersion = function() {
		var result = null;
		if(this.isFirefox()){
			var pattern = /firefox\/(\d+)\.(\d+)\.?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Opera (15+ only)
	RadiantML.prototype.isOpera = function() {
		var pattern = /opr/i;
		return pattern.test(this._userAgent);
	};
	// Opera version
	RadiantML.prototype.operaVersion = function() {
		var result = null;
		if(this.isOpera()){
			var pattern = /opr\/(\d+)\.(\d+)\.?(\d+)?/i;
			var versionArray =  this._userAgent.match(pattern);
			if(versionArray){
				result = [parseInt(versionArray[1], 10), parseInt(versionArray[2], 10), parseInt(versionArray[3] || 0, 10)];
			}
		}
		return result;
	};
	// Opera Mini
	RadiantML.prototype.isOperaMini = function() {
		var pattern = /opera mini/i;
		return pattern.test(this._userAgent);
	};
	// Native Android Browser
	RadiantML.prototype.isNativeAndroidBrowser = function() {
		var pattern1 = /(?=.*mozilla\/5.0)(?=.*applewebkit)(?=.*android)/i;
		var pattern2 = /chrome/i;
		if(pattern1.test(this._userAgent) && !pattern2.test(this._userAgent)){
			return true;
		}else{
			return false;
		}
	};
	
	/** WebView detection **/
	// iOS standalone mode = <meta name="apple-mobile-web-app-capable" content="yes" />
	RadiantML.prototype.isIOSStandaloneMode = function() {
		var isIt = false;
		if(this.isIOS()){
			var pattern = /safari/i;
			var safari = pattern.test(this._userAgent);
			if(this._standalone && !safari){
				isIt = true;
			}
		}
		return isIt;
	};
	// iOS WebView
	RadiantML.prototype.isIOSWebView = function() {
		var isIt = false;
		if(this.isIOS()){
			var pattern = /safari/i;
			var safari = pattern.test(this._userAgent);
			if(!this._standalone && !safari){
				isIt = true;
			}
		}
		return isIt;
	};
	// Android Chrome WebView
	RadiantML.prototype.isAndroidChromeWebView = function() {
		var isIt = false;
		if(this.isAndroid()){
			var pattern1 = /version\/(\d+)\.(\d+)/i;
			var webView = pattern1.test(this._userAgent);
			var pattern2 = /chrome/i;
			var chrome = pattern2.test(this._userAgent);
			if(webView && chrome){
				isIt = true;
			}
		}
		return isIt;
	};
	
	
	
	
	
    return RadiantML;
	
	
})();