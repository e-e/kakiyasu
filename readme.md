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
If your new action is a combination of Shift + another key, the action key would become "<event.key>Shift", where `event.key` is the key property on the `keydown` event object.