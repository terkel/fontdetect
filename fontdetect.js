/*!
 * FontDetect v0.1.0
 * https://github.com/terkel/fontdetect
 *
 * Copyright (c) 2014 Takeru Suzuki - http://terkel.jp/
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 */
var FontDetect = FontDetect || (function () {

    'use strict';

    var style = document.createElement('style'),
        fontDataWOFF = 'data:application/font-woff;base64,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',
        fontDataTTF = 'data:;base64,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',
        styleText =
            '@font-face{font-family:A0;src:' +
                'url(' + fontDataWOFF + ')format("woff"),' +
                'url(' + fontDataTTF + ')format("truetype")}',
        testNode = document.createElement('span');


    if (typeof style.appendChild !== 'function') {
        return {
            test: function () {
                return this;
            }
        };
    }

    style.id = 'fontdetect-style';
    style.appendChild(document.createTextNode(styleText));
    document.head.appendChild(style);

    testNode.id = 'fontdetect-test';
    testNode.style.fontFamily = 'A0';
    testNode.style.height = 0;
    testNode.style.overflow = 'hidden';
    testNode.style.position = 'absolute';
    testNode.style.visibility = 'hidden';
    testNode.appendChild(document.createTextNode('A'));
    document.body.appendChild(testNode);

    return {
        test: test
    };

    function test (slug, familyName) {

        var testInterval = setInterval(detect, 16),
            testTimeout = setTimeout(function () {
                clearInterval(testInterval);
            }, 4096);

        detect();

        function detect () {

            var test = false,
                key,
                i,
                len;

            if (testNode.offsetWidth === 0) {
                clearInterval(testInterval);
                clearTimeout(testTimeout);
                if (typeof slug === 'object') {
                    for (key in slug) {
                        FontDetect.test(key, slug[key]);
                    }
                } else {
                    if (Object.prototype.toString.call(familyName) === '[object Array]') {
                        len = familyName.length;
                        for (i = 0; i < len; i++) {
                            if (isFontAvailable(familyName[i])) {
                                test = true;
                                break;
                            }
                        }
                    } else {
                        if (familyName === undefined) {
                            familyName = slug;
                            slug = slug.toLowerCase().replace(/\s/g, '');
                        }
                        test = isFontAvailable(familyName);
                    }
                    addHTMLClass(slug, test);
                }
            }
        }

        function isFontAvailable (fontName) {
            var result;
            testNode.style.fontFamily = '"' + fontName + '",A0';
            result = testNode.offsetWidth > 0;
            testNode.style.fontFamily = 'A0';
            return result;
        }

        function addHTMLClass (slug, test) {
            document.documentElement.className += (test? ' ': ' no-') + slug;
        }

        return this;
    }
}());
