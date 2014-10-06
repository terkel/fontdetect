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
        fontDataWOFF = 'data:application/font-woff;base64,d09GRgABAAAAAAREAA8AAAAABgQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABWAAAABwAAAAcbNveqkdERUYAAAF0AAAAHQAAACAAMQAET1MvMgAAAZQAAABDAAAAYGVJZyBjbWFwAAAB2AAAAEcAAAFSACIEFmN2dCAAAAIgAAAABAAAAAQAIQJ5Z2FzcAAAAiQAAAAIAAAACP//AANnbHlmAAACLAAAAFQAAABUPaWWPmhlYWQAAAKAAAAAMAAAADYBLgvpaGhlYQAAArAAAAAcAAAAJAUUAyVobXR4AAACzAAAABAAAAAQCTwAIWxvY2EAAALcAAAACgAAAAoAVABUbWF4cAAAAugAAAAfAAAAIABIADluYW1lAAADCAAAAQUAAAHc+4lFanBvc3QAAAQQAAAAKwAAADlLkh2id2ViZgAABDwAAAAGAAAABrO3VDIAAAABAAAAAMw9os8AAAAA0EXXpQAAAADQWGQ1eNpjYGRgYOADYgkGEGBiYARCZiBmAfMYAARrADYAAAB42mNgZn7BOIGBlYGFqYspgoGBwRtCM8YxGDHqAPlAKewg1Dvcj8GBgZfBkVnhvwXDCeYXDCeAwoxIShQYGAEA7AotAHjaY2BgYGaAYBkGRgYQ8AHyGMF8FgYDIM0BhExgGV4Gx///kViM/7/+PwTVBQaMbAxwLiNIDxMDKmBkIAyYGYY0AAAwHgk2AAAhAnkAAAAB//8AAgACACEAAAEqApoAAwAHAC6xAQAvPLIHBADtMrEGBdw8sgMCAO0yALEDAC88sgUEAO0ysgcGAfw8sgECAO0yMxEhESczESMhAQnox8cCmv1mIQJYAHjaY2BkYGAA4vlljjfj+W2+MsgzvwCKMFyISDGF04pAJVpMs4BcDgYmkCgAKfgJT3jaY2BkYGB+8d8CRDIAAaMWAyMDKmABAFs2Az8BbAAhA+gAAAPoAAAAAAAAAAAAKgAqACoAKgAAeNpjYGRgYGBh4GBgYgABEMnIABJzYNADCQAABIEAggB42m2PzUrDQBRGT0ws6MJV6cJV6MKFYGnTWrVdCeJG/MGi3QlWrA2mraZRdOPz6SP4Cj6E9JvJEGqRYcK5X+49uQHW+cDHC9aAqm7OHoGqnFfYYMuxzzYtxwFlbhyv8kbquKT8x/EnFX4df1H3yjl/+2x6R9wx5Yl3TcY8MCIjZCye6cRMlB1S55J70QsJt+psUFNmTpcrTuhzJjJ9O0udJguXsmtVqbVP5Q//2C7oKTG8mI7UmdlNJ7wWEzX27NuxrI9ymp6h0kTmAZFo1959mqoO/t2vr2qgKWPOCvOp2+xc3zRpSNu+a9CRKdKzaf8rsnu2OC7mezzLHcucypzMAcGmPvcAAAB42mNgYgCD/1sZjBiwARYGBkYmRmYGFbb0nMqCDEP20rxMAwMDFwCFRwaaAAABVDKztgAA',
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
