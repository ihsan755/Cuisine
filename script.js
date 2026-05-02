// script.js

// Global variables
let currentUser = null;
let currentPage = 1;
let recipesPerPage = 10;
let filteredRecipes = [];
let allRecipes = [];
let currentRecipeIndex = -1;

// Utility functions
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function showElement(selector) {
    $(selector).style.display = 'block';
}

function hideElement(selector) {
    $(selector).style.display = 'none';
}

function toggleElement(selector) {
    const el = $(selector);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function addClass(selector, className) {
    $(selector).classList.add(className);
}

function removeClass(selector, className) {
    $(selector).classList.remove(className);
}

function hasClass(selector, className) {
    return $(selector).classList.contains(className);
}

function toggleClass(selector, className) {
    $(selector).classList.toggle(className);
}

function setText(selector, text) {
    $(selector).textContent = text;
}

function getText(selector) {
    return $(selector).textContent;
}

function setHTML(selector, html) {
    $(selector).innerHTML = html;
}

function getHTML(selector) {
    return $(selector).innerHTML;
}

function setValue(selector, value) {
    $(selector).value = value;
}

function getValue(selector) {
    return $(selector).value;
}

function addEvent(selector, event, handler) {
    $(selector).addEventListener(event, handler);
}

function removeEvent(selector, event, handler) {
    $(selector).removeEventListener(event, handler);
}

function createElement(tag, attributes = {}, text = '') {
    const el = document.createElement(tag);
    Object.keys(attributes).forEach(attr => {
        el.setAttribute(attr, attributes[attr]);
    });
    el.textContent = text;
    return el;
}

function appendChild(parentSelector, child) {
    $(parentSelector).appendChild(child);
}

function removeChild(parentSelector, child) {
    $(parentSelector).removeChild(child);
}

function insertBefore(parentSelector, newChild, referenceChild) {
    $(parentSelector).insertBefore(newChild, referenceChild);
}

function getAttribute(selector, attr) {
    return $(selector).getAttribute(attr);
}

function setAttribute(selector, attr, value) {
    $(selector).setAttribute(attr, value);
}

function removeAttribute(selector, attr) {
    $(selector).removeAttribute(attr);
}

function getData(selector, key) {
    return $(selector).dataset[key];
}

function setData(selector, key, value) {
    $(selector).dataset[key] = value;
}

function removeData(selector, key) {
    delete $(selector).dataset[key];
}

function animate(selector, animation) {
    addClass(selector, animation);
    setTimeout(() => removeClass(selector, animation), 1000);
}

function fadeIn(selector) {
    animate(selector, 'fade-in');
}

function fadeOut(selector) {
    animate(selector, 'fade-out');
}

function slideIn(selector) {
    animate(selector, 'slide-in');
}

function slideOut(selector) {
    animate(selector, 'slide-out');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateUsername(username) {
    return username.length >= 3;
}

function showError(message) {
    const errorEl = createElement('div', { class: 'error' }, message);
    appendChild('body', errorEl);
    setTimeout(() => removeChild('body', errorEl), 3000);
}

function showSuccess(message) {
    const successEl = createElement('div', { class: 'success' }, message);
    appendChild('body', successEl);
    setTimeout(() => removeChild('body', successEl), 3000);
}

function confirmDialog(message) {
    return confirm(message);
}

function promptDialog(message, defaultValue = '') {
    return prompt(message, defaultValue);
}

function alertDialog(message) {
    alert(message);
}

function log(message) {
    console.log(message);
}

function error(message) {
    console.error(message);
}

function warn(message) {
    console.warn(message);
}

function info(message) {
    console.info(message);
}

function debug(message) {
    console.debug(message);
}

function trace(message) {
    console.trace(message);
}

function group(label) {
    console.group(label);
}

function groupEnd() {
    console.groupEnd();
}

function time(label) {
    console.time(label);
}

function timeEnd(label) {
    console.timeEnd(label);
}

function count(label) {
    console.count(label);
}

function countReset(label) {
    console.countReset(label);
}

function assert(condition, message) {
    console.assert(condition, message);
}

function clear() {
    console.clear();
}

function dir(object) {
    console.dir(object);
}

function dirxml(object) {
    console.dirxml(object);
}

function table(data) {
    console.table(data);
}

function profile(label) {
    console.profile(label);
}

function profileEnd(label) {
    console.profileEnd(label);
}

function timeStamp(label) {
    console.timeStamp(label);
}

function memory() {
    return performance.memory;
}

function now() {
    return performance.now();
}

function mark(name) {
    performance.mark(name);
}

function measure(name, startMark, endMark) {
    performance.measure(name, startMark, endMark);
}

function getEntriesByType(type) {
    return performance.getEntriesByType(type);
}

function getEntriesByName(name) {
    return performance.getEntriesByName(name);
}

function clearMarks(name) {
    performance.clearMarks(name);
}

function clearMeasures(name) {
    performance.clearMeasures(name);
}

function getNavigationTiming() {
    return performance.getEntriesByType('navigation')[0];
}

function getPaintTiming() {
    return performance.getEntriesByType('paint');
}

function getResourceTiming() {
    return performance.getEntriesByType('resource');
}

function getMarkTiming(name) {
    return performance.getEntriesByName(name)[0];
}

function getMeasureTiming(name) {
    return performance.getEntriesByName(name)[0];
}

function observePerformance(callback) {
    const observer = new PerformanceObserver(callback);
    observer.observe({ entryTypes: ['measure', 'mark', 'navigation', 'resource', 'paint'] });
    return observer;
}

function unobservePerformance(observer) {
    observer.disconnect();
}

function getUserAgent() {
    return navigator.userAgent;
}

function getLanguage() {
    return navigator.language;
}

function getLanguages() {
    return navigator.languages;
}

function getPlatform() {
    return navigator.platform;
}

function getCookieEnabled() {
    return navigator.cookieEnabled;
}

function getOnLine() {
    return navigator.onLine;
}

function getHardwareConcurrency() {
    return navigator.hardwareConcurrency;
}

function getDeviceMemory() {
    return navigator.deviceMemory;
}

function getMaxTouchPoints() {
    return navigator.maxTouchPoints;
}

function getServiceWorker() {
    return navigator.serviceWorker;
}

function getGeolocation() {
    return navigator.geolocation;
}

function getPermissions() {
    return navigator.permissions;
}

function getPresentation() {
    return navigator.presentation;
}

function getCredentials() {
    return navigator.credentials;
}

function getStorage() {
    return navigator.storage;
}

function getLocks() {
    return navigator.locks;
}

function getWakeLock() {
    return navigator.wakeLock;
}

function getBluetooth() {
    return navigator.bluetooth;
}

function getUSB() {
    return navigator.usb;
}

function getHID() {
    return navigator.hid;
}

function getSerial() {
    return navigator.serial;
}

function getNFC() {
    return navigator.nfc;
}

function getWebOTP() {
    return navigator.credentials;
}

function getWebAuthn() {
    return navigator.credentials;
}

function getWebShare() {
    return navigator.share;
}

function getWebShareTarget() {
    return navigator.shareTarget;
}

function getWebAppManifest() {
    return navigator.getInstalledRelatedApps();
}

function getBattery() {
    return navigator.getBattery();
}

function getConnection() {
    return navigator.connection;
}

function getMemory() {
    return navigator.deviceMemory;
}

function getConcurrentHardware() {
    return navigator.hardwareConcurrency;
}

function getUserActivation() {
    return navigator.userActivation;
}

function getScheduling() {
    return navigator.scheduling;
}

function getMediaCapabilities() {
    return navigator.mediaCapabilities;
}

function getMediaSession() {
    return navigator.mediaSession;
}

function getWebRTC() {
    return navigator.mediaDevices;
}

function getWebAudio() {
    return window.AudioContext || window.webkitAudioContext;
}

function getWebGL() {
    const canvas = document.createElement('canvas');
    return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
}

function getWebGL2() {
    const canvas = document.createElement('canvas');
    return canvas.getContext('webgl2');
}

function getIndexedDB() {
    return window.indexedDB;
}

function getWebSQL() {
    return window.openDatabase;
}

function getLocalStorage() {
    return window.localStorage;
}

function getSessionStorage() {
    return window.sessionStorage;
}

function getCookies() {
    return document.cookie;
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getViewportWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getViewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

function getScrollLeft() {
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

function scrollToElement(selector) {
    $(selector).scrollIntoView();
}

function getElementPosition(selector) {
    const el = $(selector);
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + getScrollTop(),
        left: rect.left + getScrollLeft(),
        width: rect.width,
        height: rect.height
    };
}

function isElementVisible(selector) {
    const el = $(selector);
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= getViewportHeight() && rect.right <= getViewportWidth();
}

function getElementSize(selector) {
    const el = $(selector);
    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    };
}

function setElementSize(selector, width, height) {
    const el = $(selector);
    el.style.width = width + 'px';
    el.style.height = height + 'px';
}

function getElementStyle(selector, property) {
    const el = $(selector);
    return window.getComputedStyle(el)[property];
}

function setElementStyle(selector, property, value) {
    $(selector).style[property] = value;
}

function addStyleRule(selector, rules) {
    const style = document.createElement('style');
    style.textContent = selector + ' { ' + rules + ' }';
    document.head.appendChild(style);
}

function removeStyleRule(selector) {
    const styles = $$('style');
    styles.forEach(style => {
        if (style.textContent.includes(selector)) {
            document.head.removeChild(style);
        }
    });
}

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

function unloadScript(src) {
    const scripts = $$('script');
    scripts.forEach(script => {
        if (script.src === src) {
            document.head.removeChild(script);
        }
    });
}

function unloadCSS(href) {
    const links = $$('link');
    links.forEach(link => {
        if (link.href === href) {
            document.head.removeChild(link);
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function memoize(func) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
    };
}

function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

function compose(...funcs) {
    return function composed(result) {
        for (let i = funcs.length - 1; i >= 0; i--) {
            result = funcs[i](result);
        }
        return result;
    };
}

function pipe(...funcs) {
    return function piped(result) {
        for (let i = 0; i < funcs.length; i++) {
            result = funcs[i](result);
        }
        return result;
    };
}

function partial(func, ...args) {
    return function partiallyApplied(...moreArgs) {
        return func.apply(this, args.concat(moreArgs));
    };
}

function once(func) {
    let called = false;
    let result;
    return function() {
        if (!called) {
            called = true;
            result = func.apply(this, arguments);
        }
        return result;
    };
}

function after(n, func) {
    let count = 0;
    return function() {
        count++;
        if (count >= n) {
            return func.apply(this, arguments);
        }
    };
}

function before(n, func) {
    let count = 0;
    return function() {
        count++;
        if (count < n) {
            return func.apply(this, arguments);
        }
    };
}

function delay(func, wait) {
    return function() {
        setTimeout(() => func.apply(this, arguments), wait);
    };
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function unique(array) {
    return [...new Set(array)];
}

function flatten(array) {
    return array.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

function chunk(array, size) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
}

function range(start, end, step = 1) {
    const result = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}

function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}

function average(array) {
    return sum(array) / array.length;
}

function max(array) {
    return Math.max(...array);
}

function min(array) {
    return Math.min(...array);
}

function median(array) {
    const sorted = array.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function mode(array) {
    const counts = {};
    array.forEach(el => counts[el] = (counts[el] || 0) + 1);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

function variance(array) {
    const avg = average(array);
    return average(array.map(el => Math.pow(el - avg, 2)));
}

function standardDeviation(array) {
    return Math.sqrt(variance(array));
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function isEven(n) {
    return n % 2 === 0;
}

function isOdd(n) {
    return n % 2 !== 0;
}

function isPositive(n) {
    return n > 0;
}

function isNegative(n) {
    return n < 0;
}

function isZero(n) {
    return n === 0;
}

function abs(n) {
    return Math.abs(n);
}

function ceil(n) {
    return Math.ceil(n);
}

function floor(n) {
    return Math.floor(n);
}

function round(n) {
    return Math.round(n);
}

function trunc(n) {
    return Math.trunc(n);
}

function sign(n) {
    return Math.sign(n);
}

function sqrt(n) {
    return Math.sqrt(n);
}

function pow(base, exponent) {
    return Math.pow(base, exponent);
}

function log(n) {
    return Math.log(n);
}

function log10(n) {
    return Math.log10(n);
}

function log2(n) {
    return Math.log2(n);
}

function exp(n) {
    return Math.exp(n);
}

function sin(n) {
    return Math.sin(n);
}

function cos(n) {
    return Math.cos(n);
}

function tan(n) {
    return Math.tan(n);
}

function asin(n) {
    return Math.asin(n);
}

function acos(n) {
    return Math.acos(n);
}

function atan(n) {
    return Math.atan(n);
}

function atan2(y, x) {
    return Math.atan2(y, x);
}

function sinh(n) {
    return Math.sinh(n);
}

function cosh(n) {
    return Math.cosh(n);
}

function tanh(n) {
    return Math.tanh(n);
}

function asinh(n) {
    return Math.asinh(n);
}

function acosh(n) {
    return Math.acosh(n);
}

function atanh(n) {
    return Math.atanh(n);
}

function hypot(...args) {
    return Math.hypot(...args);
}

function clz32(n) {
    return Math.clz32(n);
}

function imul(a, b) {
    return Math.imul(a, b);
}

function fround(n) {
    return Math.fround(n);
}

function toFixed(n, digits) {
    return n.toFixed(digits);
}

function toPrecision(n, precision) {
    return n.toPrecision(precision);
}

function toExponential(n, fractionDigits) {
    return n.toExponential(fractionDigits);
}

function toString(n, radix) {
    return n.toString(radix);
}

function parseInt(str, radix) {
    return window.parseInt(str, radix);
}

function parseFloat(str) {
    return window.parseFloat(str);
}

function isNaN(n) {
    return window.isNaN(n);
}

function isFinite(n) {
    return window.isFinite(n);
}

function isInteger(n) {
    return Number.isInteger(n);
}

function isSafeInteger(n) {
    return Number.isSafeInteger(n);
}

function EPSILON() {
    return Number.EPSILON;
}

function MAX_SAFE_INTEGER() {
    return Number.MAX_SAFE_INTEGER;
}

function MAX_VALUE() {
    return Number.MAX_VALUE;
}

function MIN_SAFE_INTEGER() {
    return Number.MIN_SAFE_INTEGER;
}

function MIN_VALUE() {
    return Number.MIN_VALUE;
}

function NEGATIVE_INFINITY() {
    return Number.NEGATIVE_INFINITY;
}

function POSITIVE_INFINITY() {
    return Number.POSITIVE_INFINITY;
}

function NaN() {
    return Number.NaN;
}

function formatDate(date, format) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', options);
}

function formatTime(date, format) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Date(date).toLocaleTimeString('en-US', options);
}

function formatDateTime(date, format) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Date(date).toLocaleString('en-US', options);
}

function getCurrentDate() {
    return new Date();
}

function getCurrentTime() {
    return new Date().getTime();
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function getCurrentMonth() {
    return new Date().getMonth();
}

function getCurrentDay() {
    return new Date().getDate();
}

function getCurrentHour() {
    return new Date().getHours();
}

function getCurrentMinute() {
    return new Date().getMinutes();
}

function getCurrentSecond() {
    return new Date().getSeconds();
}

function getCurrentMillisecond() {
    return new Date().getMilliseconds();
}

function getDayOfWeek(date) {
    return new Date(date).getDay();
}

function getDayOfYear(date) {
    const start = new Date(new Date(date).getFullYear(), 0, 0);
    const diff = new Date(date) - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function getWeekOfYear(date) {
    const d = new Date(Date.UTC(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function addYears(date, years) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
}

function subtractDays(date, days) {
    return addDays(date, -days);
}

function subtractMonths(date, months) {
    return addMonths(date, -months);
}

function subtractYears(date, years) {
    return addYears(date, -years);
}

function diffDays(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((new Date(date1) - new Date(date2)) / oneDay));
}

function diffMonths(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (d1.getFullYear() - d2.getFullYear()) * 12 + d1.getMonth() - d2.getMonth();
}

function diffYears(date1, date2) {
    return new Date(date1).getFullYear() - new Date(date2).getFullYear();
}

function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getDaysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isValidDate(date) {
    return !isNaN(new Date(date).getTime());
}

function parseDate(dateString) {
    return new Date(dateString);
}

function serializeDate(date) {
    return new Date(date).toISOString();
}

function deserializeDate(dateString) {
    return new Date(dateString);
}

function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
}

function formatNumber(number, locale) {
    return new Intl.NumberFormat(locale).format(number);
}

function formatPercent(number, locale) {
    return new Intl.NumberFormat(locale, { style: 'percent' }).format(number);
}

function formatUnit(number, unit, locale) {
    return new Intl.NumberFormat(locale, { style: 'unit', unit: unit }).format(number);
}

function getLocale() {
    return navigator.language;
}

function getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getCurrency() {
    return 'USD'; // Default
}

function getCountry() {
    return navigator.language.split('-')[1];
}

function getLanguageCode() {
    return navigator.language.split('-')[0];
}

function translate(text, from, to) {
    // Placeholder for translation API
    return text;
}

function detectLanguage(text) {
    // Placeholder for language detection
    return 'en';
}

function getWeather(location) {
    // Placeholder for weather API
    return { temperature: 20, condition: 'Sunny' };
}

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, reject);
        } else {
            reject(new Error('Geolocation is not supported'));
        }
    });
}

function getAddress(latitude, longitude) {
    // Placeholder for geocoding API
    return { address: '123 Main St, City, State' };
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function rad2deg(rad) {
    return rad * (180 / Math.PI);
}

function getDirection(lat1, lon1, lat2, lon2) {
    const dLon = deg2rad(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(deg2rad(lat2));
    const x = Math.cos(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) - Math.sin(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(dLon);
    const brng = Math.atan2(y, x);
    return rad2deg(brng);
}

function getBearing(direction) {
    const bearings = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return bearings[Math.round(direction / 22.5) % 16];
}

function getSpeed(distance, time) {
    return distance / time;
}

function getTime(distance, speed) {
    return distance / speed;
}

function convertUnits(value, from, to) {
    // Placeholder for unit conversion
    return value;
}

function getExchangeRate(from, to) {
    // Placeholder for currency exchange
    return 1;
}

function calculateTax(amount, rate) {
    return amount * rate;
}

function calculateDiscount(amount, discount) {
    return amount * (1 - discount);
}

function calculateTip(amount, percentage) {
    return amount * percentage;
}

function calculateInterest(principal, rate, time) {
    return principal * rate * time;
}

function calculateCompoundInterest(principal, rate, time, n) {
    return principal * Math.pow(1 + rate / n, n * time);
}

function calculateMortgage(principal, rate, time) {
    const monthlyRate = rate / 12;
    const numPayments = time * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
}

function calculateBMI(weight, height) {
    return weight / (height * height);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function calculateCalories(weight, height, age, gender, activity) {
    // Placeholder for calorie calculation
    return 2000;
}

function getNutrition(food) {
    // Placeholder for nutrition API
    return { calories: 100, protein: 10, carbs: 20, fat: 5 };
}

function searchRecipes(query) {
    return allRecipes.filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(query.toLowerCase()));
}

function filterRecipes(cuisine) {
    if (cuisine === '') return allRecipes;
    return allRecipes.filter(recipe => recipe.cuisine === cuisine);
}

function sortRecipes(criteria) {
    switch (criteria) {
        case 'title':
            return allRecipes.sort((a, b) => a.title.localeCompare(b.title));
        case 'cuisine':
            return allRecipes.sort((a, b) => a.cuisine.localeCompare(b.cuisine));
        case 'rating':
            return allRecipes.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'date':
            return allRecipes.sort((a, b) => new Date(b.date) - new Date(a.date));
        default:
            return allRecipes;
    }
}

function paginateRecipes(recipes, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return recipes.slice(start, end);
}

function getTotalPages(recipes, perPage) {
    return Math.ceil(recipes.length / perPage);
}

function loadSampleRecipes() {
    const sampleRecipes = [
        {
            title: 'Spaghetti Carbonara',
            description: 'Classic Italian pasta dish',
            cuisine: 'Italian',
            ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black pepper'],
            prepTime: 10,
            cookTime: 20,
            servings: 4,
            tags: ['pasta', 'italian', 'quick'],
            steps: [
                { text: 'Cook spaghetti according to package instructions.', media: null },
                { text: 'Fry pancetta until crispy.', media: null },
                { text: 'Mix eggs and cheese.', media: null },
                { text: 'Combine everything.', media: null }
            ],
            author: 'Chef Mario',
            date: '2023-01-01',
            rating: 4.5,
            likes: 10,
            comments: []
        },
        {
            title: 'Chicken Tikka Masala',
            description: 'Spicy Indian curry',
            cuisine: 'Indian',
            ingredients: ['Chicken', 'Yogurt', 'Spices', 'Tomatoes', 'Cream'],
            prepTime: 30,
            cookTime: 40,
            servings: 6,
            tags: ['curry', 'indian', 'spicy'],
            steps: [
                { text: 'Marinate chicken in yogurt and spices.', media: null },
                { text: 'Grill chicken.', media: null },
                { text: 'Make sauce with tomatoes and cream.', media: null },
                { text: 'Combine and simmer.', media: null }
            ],
            author: 'Chef Raj',
            date: '2023-02-01',
            rating: 4.8,
            likes: 15,
            comments: []
        },
        {
            title: 'Sushi Rolls',
            description: 'Fresh Japanese sushi',
            cuisine: 'Japanese',
            ingredients: ['Rice', 'Nori', 'Fish', 'Vegetables', 'Soy sauce'],
            prepTime: 45,
            cookTime: 30,
            servings: 4,
            tags: ['sushi', 'japanese', 'seafood'],
            steps: [
                { text: 'Cook sushi rice.', media: null },
                { text: 'Prepare fillings.', media: null },
                { text: 'Roll sushi.', media: null },
                { text: 'Slice and serve.', media: null }
            ],
            author: 'Chef Tanaka',
            date: '2023-03-01',
            rating: 4.7,
            likes: 20,
            comments: []
        },
        {
            title: 'Pad Thai',
            description: 'Thai stir-fried noodles',
            cuisine: 'Thai',
            ingredients: ['Rice noodles', 'Shrimp', 'Tofu', 'Peanuts', 'Lime'],
            prepTime: 20,
            cookTime: 15,
            servings: 4,
            tags: ['noodles', 'thai', 'spicy'],
            steps: [
                { text: 'Soak noodles.', media: null },
                { text: 'Stir-fry ingredients.', media: null },
                { text: 'Add sauce.', media: null },
                { text: 'Garnish and serve.', media: null }
            ],
            author: 'Chef Somsak',
            date: '2023-04-01',
            rating: 4.6,
            likes: 18,
            comments: []
        },
        {
            title: 'Beef Bourguignon',
            description: 'French beef stew',
            cuisine: 'French',
            ingredients: ['Beef', 'Red wine', 'Onions', 'Carrots', 'Mushrooms'],
            prepTime: 30,
            cookTime: 180,
            servings: 6,
            tags: ['stew', 'french', 'wine'],
            steps: [
                { text: 'Brown beef.', media: null },
                { text: 'Sauté vegetables.', media: null },
                { text: 'Add wine and simmer.', media: null },
                { text: 'Cook slowly.', media: null }
            ],
            author: 'Chef Dubois',
            date: '2023-05-01',
            rating: 4.9,
            likes: 25,
            comments: []
        },
        {
            title: 'Tacos al Pastor',
            description: 'Mexican pork tacos',
            cuisine: 'Mexican',
            ingredients: ['Pork', 'Pineapple', 'Onions', 'Cilantro', 'Tortillas'],
            prepTime: 60,
            cookTime: 30,
            servings: 8,
            tags: ['tacos', 'mexican', 'pork'],
            steps: [
                { text: 'Marinate pork.', media: null },
                { text: 'Grill pork and pineapple.', media: null },
                { text: 'Chop and mix.', media: null },
                { text: 'Serve in tortillas.', media: null }
            ],
            author: 'Chef Rodriguez',
            date: '2023-06-01',
            rating: 4.4,
            likes: 12,
            comments: []
        },
        {
            title: 'Dim Sum',
            description: 'Chinese steamed dumplings',
            cuisine: 'Chinese',
            ingredients: ['Flour', 'Pork', 'Shrimp', 'Vegetables', 'Soy sauce'],
            prepTime: 40,
            cookTime: 20,
            servings: 6,
            tags: ['dumplings', 'chinese', 'steamed'],
            steps: [
                { text: 'Make dough.', media: null },
                { text: 'Prepare filling.', media: null },
                { text: 'Wrap dumplings.', media: null },
                { text: 'Steam and serve.', media: null }
            ],
            author: 'Chef Li',
            date: '2023-07-01',
            rating: 4.3,
            likes: 14,
            comments: []
        },
        {
            title: 'Paella',
            description: 'Spanish rice dish',
            cuisine: 'Spanish',
            ingredients: ['Rice', 'Seafood', 'Chicken', 'Saffron', 'Peas'],
            prepTime: 25,
            cookTime: 35,
            servings: 6,
            tags: ['rice', 'spanish', 'seafood'],
            steps: [
                { text: 'Sauté ingredients.', media: null },
                { text: 'Add rice and broth.', media: null },
                { text: 'Simmer.', media: null },
                { text: 'Rest and serve.', media: null }
            ],
            author: 'Chef Garcia',
            date: '2023-08-01',
            rating: 4.5,
            likes: 16,
            comments: []
        },
        {
            title: 'Falafel',
            description: 'Middle Eastern chickpea fritters',
            cuisine: 'Middle Eastern',
            ingredients: ['Chickpeas', 'Herbs', 'Onions', 'Garlic', 'Tahini'],
            prepTime: 15,
            cookTime: 10,
            servings: 4,
            tags: ['falafel', 'middle eastern', 'vegetarian'],
            steps: [
                { text: 'Blend ingredients.', media: null },
                { text: 'Form patties.', media: null },
                { text: 'Fry until golden.', media: null },
                { text: 'Serve with sauce.', media: null }
            ],
            author: 'Chef Ahmed',
            date: '2023-09-01',
            rating: 4.2,
            likes: 11,
            comments: []
        },
        {
            title: 'Kimchi Jjigae',
            description: 'Korean kimchi stew',
            cuisine: 'Korean',
            ingredients: ['Kimchi', 'Pork', 'Tofu', 'Onions', 'Gochujang'],
            prepTime: 10,
            cookTime: 25,
            servings: 4,
            tags: ['stew', 'korean', 'spicy'],
            steps: [
                { text: 'Sauté pork and kimchi.', media: null },
                { text: 'Add water and simmer.', media: null },
                { text: 'Add tofu.', media: null },
                { text: 'Serve hot.', media: null }
            ],
            author: 'Chef Kim',
            date: '2023-10-01',
            rating: 4.6,
            likes: 19,
            comments: []
        }
    ];
    allRecipes = sampleRecipes;
    localStorage.setItem('recipes', JSON.stringify(allRecipes));
}

function loadUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUserUI();
    }
}

function saveUserData() {
    if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }
}

function updateUserUI() {
    if (currentUser) {
        setText('#user-greeting', `Hello, ${currentUser.username}!`);
        hideElement('#login-btn');
        hideElement('#register-btn');
        showElement('#logout-btn');
    } else {
        setText('#user-greeting', '');
        showElement('#login-btn');
        showElement('#register-btn');
        hideElement('#logout-btn');
    }
}

function showLoginModal() {
    showElement('#login-modal');
}

function showRegisterModal() {
    showElement('#register-modal');
}

function closeModal(modalId) {
    hideElement(modalId);
}

function login(email, password) {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            saveUserData();
            updateUserUI();
            closeModal('#login-modal');
            showSuccess('Logged in successfully!');
        } else {
            showError(data.message || 'Login failed');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        showError('Login failed. Please try again.');
    });
}

function register(email, password) {
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            saveUserData();
            updateUserUI();
            closeModal('#register-modal');
            showSuccess('Registered successfully!');
        } else {
            showError(data.message || 'Registration failed');
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        showError('Registration failed. Please try again.');
    });
}

function logout() {
    currentUser = null;
    localStorage.removeItem('user');
    updateUserUI();
    showSuccess('Logged out successfully!');
}

function rateRecipe() {
    if (!currentUser) {
        showError('Please login to rate recipes');
        return;
    }
    showElement('#rate-modal');
}

function submitRating() {
    const rating = getValue('#rating-select');
    if (currentRecipeIndex >= 0) {
        fetch('/api/recipes/' + allRecipes[currentRecipeIndex].id + '/rate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: parseFloat(rating) }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allRecipes[currentRecipeIndex].rating = rating;
                closeModal('#rate-modal');
                showSuccess('Rating submitted!');
                viewRecipe(currentRecipeIndex);
            } else {
                showError(data.message || 'Failed to submit rating');
            }
        })
        .catch(error => {
            console.error('Rating error:', error);
            showError('Failed to submit rating');
        });
    }
}

function likeRecipe() {
    if (!currentUser) {
        showError('Please login to like recipes');
        return;
    }
    if (currentRecipeIndex >= 0) {
        fetch('/api/recipes/' + allRecipes[currentRecipeIndex].id + '/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allRecipes[currentRecipeIndex].likes = (allRecipes[currentRecipeIndex].likes || 0) + 1;
                showSuccess('Liked!');
                viewRecipe(currentRecipeIndex);
            } else {
                showError(data.message || 'Failed to like recipe');
            }
        })
        .catch(error => {
            console.error('Like error:', error);
            showError('Failed to like recipe');
        });
    }
}

function addComment() {
    if (!currentUser) {
        showError('Please login to comment');
        return;
    }
    const commentText = getValue('#new-comment');
    if (commentText.trim() === '') {
        showError('Comment cannot be empty');
        return;
    }
    if (currentRecipeIndex >= 0) {
        fetch('/api/recipes/' + allRecipes[currentRecipeIndex].id + '/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: commentText, author: currentUser.username }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const comment = {
                    text: commentText,
                    author: currentUser.username,
                    date: new Date().toISOString()
                };
                allRecipes[currentRecipeIndex].comments = allRecipes[currentRecipeIndex].comments || [];
                allRecipes[currentRecipeIndex].comments.push(comment);
                setValue('#new-comment', '');
                showSuccess('Comment added!');
                viewRecipe(currentRecipeIndex);
            } else {
                showError(data.message || 'Failed to add comment');
            }
        })
        .catch(error => {
            console.error('Comment error:', error);
            showError('Failed to add comment');
        });
    }
}

function printRecipe() {
    if (currentRecipeIndex >= 0) {
        const recipe = allRecipes[currentRecipeIndex];
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>${recipe.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h1 { color: #6B4423; }
                    .ingredients { margin: 20px 0; }
                    .steps { margin: 20px 0; }
                </style>
            </head>
            <body>
                <h1>${recipe.title}</h1>
                <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
                <p><strong>Description:</strong> ${recipe.description}</p>
                <div class="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                <div class="steps">
                    <h2>Steps</h2>
                    <ol>
                        ${recipe.steps.map(step => `<li>${step.text}</li>`).join('')}
                    </ol>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

function applyFilters() {
    const cuisine = getValue('#cuisine-filter');
    const searchQuery = getValue('#search').toLowerCase();
    filteredRecipes = allRecipes.filter(recipe => {
        const matchesCuisine = cuisine === '' || recipe.cuisine === cuisine;
        const matchesSearch = searchQuery === '' ||
            recipe.title.toLowerCase().includes(searchQuery) ||
            recipe.description.toLowerCase().includes(searchQuery) ||
            recipe.cuisine.toLowerCase().includes(searchQuery);
        return matchesCuisine && matchesSearch;
    });
    currentPage = 1;
    displayRecipes();
}

function clearFilters() {
    setValue('#cuisine-filter', '');
    setValue('#search', '');
    filteredRecipes = allRecipes;
    currentPage = 1;
    displayRecipes();
}

function displayRecipes() {
    const recipesToShow = paginateRecipes(filteredRecipes, currentPage, recipesPerPage);
    const recipeList = $('#recipe-list');
    setHTML('#recipe-list', '');
    recipesToShow.forEach((recipe, index) => {
        const card = createElement('div', { class: 'recipe-card' });
        setHTML(card, `
            <h3>${recipe.title}</h3>
            <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
            <p>${recipe.description}</p>
            <p><strong>Rating:</strong> ${recipe.rating || 'N/A'}</p>
            <button onclick="viewRecipe(${allRecipes.indexOf(recipe)})">View Recipe</button>
        `);
        appendChild('#recipe-list', card);
    });
    updatePagination();
}

function updatePagination() {
    const totalPages = getTotalPages(filteredRecipes, recipesPerPage);
    setText('#page-info', `Page ${currentPage} of ${totalPages}`);
    const prevBtn = $('#pagination button:first-child');
    const nextBtn = $('#pagination button:last-child');
    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    if (currentPage === totalPages) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayRecipes();
    }
}

function nextPage() {
    const totalPages = getTotalPages(filteredRecipes, recipesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayRecipes();
    }
}

function viewRecipe(index) {
    currentRecipeIndex = index;
    const recipe = allRecipes[index];
    setText('#view-title', recipe.title);
    setText('#view-description', recipe.description);
    setText('#view-cuisine', recipe.cuisine);
    setText('#view-author', recipe.author || 'Anonymous');
    setText('#view-rating', recipe.rating || 'N/A');
    setText('#like-count', recipe.likes || 0);

    const ingredientsList = $('#view-ingredients ul') || createElement('ul');
    setHTML('#view-ingredients', '<h3>Ingredients</h3>');
    appendChild('#view-ingredients', ingredientsList);
    setHTML(ingredientsList, '');
    recipe.ingredients.forEach(ing => {
        const li = createElement('li', {}, ing);
        appendChild(ingredientsList, li);
    });

    const stepsDiv = $('#view-steps');
    setHTML(stepsDiv, '');
    recipe.steps.forEach((step, i) => {
        const stepDiv = createElement('div', { class: 'step' });
        setHTML(stepDiv, `<h4>Step ${i+1}</h4><p>${step.text}</p>`);
        if (step.media) {
            if (step.media.startsWith('data:image')) {
                const img = createElement('img', { src: step.media, alt: 'Step image' });
                appendChild(stepDiv, img);
            } else if (step.media.startsWith('data:video')) {
                const video = createElement('video', { controls: true });
                const source = createElement('source', { src: step.media });
                appendChild(video, source);
                appendChild(stepDiv, video);
            }
        }
        appendChild(stepsDiv, stepDiv);
    });

    const commentsList = $('#comments-list');
    setHTML(commentsList, '');
    (recipe.comments || []).forEach(comment => {
        const commentDiv = createElement('div', { class: 'comment' });
        setHTML(commentDiv, `<strong>${comment.author}</strong>: ${comment.text} <small>${formatDate(comment.date)}</small>`);
        appendChild(commentsList, commentDiv);
    });

    hideElement('#recipes');
    showElement('#recipe-view');
}

function closeView() {
    hideElement('#recipe-view');
    showElement('#recipes');
}

function setupUploadForm() {
    const addStepBtn = $('#add-step');
    const stepsContainer = $('#steps-container');
    const form = $('#upload-form');

    addEvent('#add-step', 'click', function() {
        const stepDiv = createElement('div', { class: 'step' });
        setHTML(stepDiv, `
            <textarea placeholder="Step ${stepsContainer.children.length + 1} description" required></textarea>
            <input type="file" accept="image/*,video/*">
        `);
        appendChild(stepsContainer, stepDiv);
    });

    addEvent('#upload-form', 'submit', async function(e) {
        e.preventDefault();
        if (!currentUser) {
            showError('Please login to upload recipes');
            return;
        }
        const title = getValue('#title');
        const description = getValue('#description');
        const cuisine = getValue('#cuisine');
        const ingredients = getValue('#ingredients').split('\n').filter(i => i.trim() !== '');
        const prepTime = parseInt(getValue('#prep-time'));
        const cookTime = parseInt(getValue('#cook-time'));
        const servings = parseInt(getValue('#servings'));
        const tags = getValue('#tags').split(',').map(t => t.trim()).filter(t => t !== '');

        const steps = [];
        const stepElements = $$('.step');
        for (let stepEl of stepElements) {
            const text = stepEl.querySelector('textarea').value;
            const fileInput = stepEl.querySelector('input[type="file"]');
            let media = null;
            if (fileInput.files[0]) {
                media = await fileToDataURL(fileInput.files[0]);
            }
            steps.push({ text, media });
        }

        const recipe = {
            title,
            description,
            cuisine,
            ingredients,
            prepTime,
            cookTime,
            servings,
            tags,
            steps,
            author: currentUser.username,
            date: new Date().toISOString(),
            rating: 0,
            likes: 0,
            comments: []
        };

        fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccess('Recipe uploaded!');
                window.location.href = 'index.html';
            } else {
                showError(data.message || 'Failed to upload recipe');
            }
        })
        .catch(error => {
            console.error('Upload error:', error);
            showError('Failed to upload recipe');
        });
    });
}

function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function loadProfile() {
    if (!currentUser) {
        setHTML('#profile-section', '<p>Please login to view your profile.</p>');
        return;
    }
    setText('#profile-username', currentUser.username);
    setText('#profile-email', currentUser.email);
    const myRecipes = allRecipes.filter(recipe => recipe.author === currentUser.username);
    setText('#profile-recipes-count', myRecipes.length);

    const myRecipesDiv = $('#my-recipes');
    setHTML(myRecipesDiv, '');
    myRecipes.forEach(recipe => {
        const card = createElement('div', { class: 'recipe-card' });
        setHTML(card, `
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <button onclick="viewRecipe(${allRecipes.indexOf(recipe)})">View</button>
            <button onclick="editRecipe(${allRecipes.indexOf(recipe)})">Edit</button>
            <button onclick="deleteRecipe(${allRecipes.indexOf(recipe)})">Delete</button>
        `);
        appendChild(myRecipesDiv, card);
    });

    const favorites = currentUser.favorites || [];
    const myFavoritesDiv = $('#my-favorites');
    setHTML(myFavoritesDiv, '');
    favorites.forEach(index => {
        const recipe = allRecipes[index];
        if (recipe) {
            const card = createElement('div', { class: 'recipe-card' });
            setHTML(card, `
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <button onclick="viewRecipe(${index})">View</button>
            `);
            appendChild(myFavoritesDiv, card);
        }
    });
}

function editRecipe(index) {
    // Placeholder for edit functionality
    alert('Edit functionality not implemented yet');
}

function deleteRecipe(index) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        allRecipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(allRecipes));
        showSuccess('Recipe deleted!');
        loadProfile();
    }
}

function setupContactForm() {
    addEvent('#contact-form', 'submit', function(e) {
        e.preventDefault();
        const name = getValue('#contact-name');
        const email = getValue('#contact-email');
        const subject = getValue('#contact-subject');
        const message = getValue('#contact-message');
        // Placeholder for sending email
        showSuccess('Message sent! We will get back to you soon.');
        setValue('#contact-name', '');
        setValue('#contact-email', '');
        setValue('#contact-subject', '');
        setValue('#contact-message', '');
    });
}

function loadRecipes() {
    return fetch('/api/recipes')
        .then(response => response.json())
        .then(data => {
            allRecipes = data.recipes || [];
            filteredRecipes = allRecipes;
            // Add IDs to recipes if they don't have them (for backward compatibility)
            allRecipes.forEach((recipe, index) => {
                if (!recipe.id) {
                    recipe.id = 'legacy_' + index;
                }
            });
            return allRecipes;
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
            allRecipes = [];
            filteredRecipes = [];
            return [];
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split('/').pop();

    loadSampleRecipes();
    loadUserData();
    loadRecipes().then(() => {
        if (page === 'index.html' || page === '') {
            displayRecipes();
            addEvent('#search', 'input', debounce(applyFilters, 300));
            addEvent('#cuisine-filter', 'change', applyFilters);
        } else if (page === 'upload.html') {
            setupUploadForm();
        } else if (page === 'profile.html') {
            loadProfile();
        } else if (page === 'contact.html') {
            setupContactForm();
        }
    });

    // Setup login form
    addEvent('#login-form', 'submit', function(e) {
        e.preventDefault();
        const email = getValue('#login-email');
        const password = getValue('#login-password');
        login(email, password);
    });

    // Setup register form
    addEvent('#register-form', 'submit', function(e) {
        e.preventDefault();
        const email = getValue('#reg-email');
        const password = getValue('#reg-password');
        const passwordConfirm = getValue('#reg-password-confirm');
        if (!validateEmail(email)) {
            showError('Invalid email');
            return;
        }
        if (password !== passwordConfirm) {
            showError('Passwords do not match');
            return;
        }
        if (!validatePassword(password)) {
            showError('Password must be at least 6 characters');
            return;
        }
        register(email, password);
    });
});