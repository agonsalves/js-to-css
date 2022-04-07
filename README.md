This tool uses `glamor` to convert complex style objects to CSS for use in migrating from glamor to another styling library.

Demo: https://agonsalves.github.io/js-to-css/

### Behavior

1. When the document loads, the focus is put on the `input` element so you can paste in your JS styles.
2. If you click into `input` the document will reload. This will clear out the previous input and output.
3. You can paste in a whole JS object, or a partial one.
4. When the value of `input` changes, it will be run through `eval()` (naughty, I know) and then passed to `glamor` which converts it into CSS style. Glamor then inserts the style into `document`. `output` is then updated to display the contents of that style.
5. When you select text within `output` it will be automatically added to your clipboard.
6. Errors from step 4 are displayed in `output`
