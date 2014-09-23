# FontDetect

Detect if the specific fonts are installed, and add classes to the `html` element. Does not support IE 8 and below.

## Usage

    <script src="./fontdetect.js"></script>

    <script>
    // Basic
    FontDetect.test('gillsans', 'Gill Sans');

    // Slug can be omitted (Assumed as 'segoeui')
    FontDetect.test('Segoe UI');

    // Multiple family names as an array
    FontDetect.test('palatino', [ 'Palatino', 'Palatino Linotype' ]);

    // Multiple tests as an object
    FontDetect.test({
        meiryo: 'Meiryo',
        mincho: [ 'Hiragino Mincho ProN', 'Yu Mincho', 'YuMincho' ]
    });
    </script>

Result:

    <html class=" gillsans no-segoeui palatino no-meiryo mincho">
