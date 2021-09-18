Binds actions to keys for the input element selector provided.　Useful when using square-bracket notation for adding furigana/yomigana readings.

| Key      | Action |
| ----------- | ----------- |
| Escape      | Inserts "[]" at the current cursor position       |
| Shift + Escape   | Inserts "()" at the current cursor position        |
| Alt   | Inserts a space at the current cursor position        |

### usage
```javascript
const Kakiyasu = require("kakiyasu").default;
new Kakiyasu("#my-input-selector");
```

#### add additional actions
```javascript
const Kakiyasu = require("kakiyasu").default;
new Kakiyasu("#my-input-selector", {
  "<event.key>": {
    text: "text to insert",
    offset: number
  }
});
```
where `text` is the text to insert, and `offset` is the offset _back_ from the end of the inserted text, and is where the cursor will be placed. For example, for the default `Escape` action which inserts "[]", the offset is `-1` in order to place the cursor inbetween the brackets.

If your new action is a combination of Shift + another key, the action key would become "<event.key>Shift", where `event.key` is the key property on the `keydown` event object.

The default actions are as follows and can be overridden:
```
const defaultActions: Actions = {
  Escape: {
    text: "[]",
    offset: -1,
  },
  EscapeShift: {
    text: "()",
    offset: -1,
  },
  Alt: {
    text: " ",
    offset: 0,
  },
};
```