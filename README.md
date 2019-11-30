# Chrome Extension - Dictionary New Tab

## Introducing

Sometimes it’s very difficult (almost always) to force yourself to learn a new language.
This extension is for the Chrome browser, which will help make at least constantly see new words for yourself.

This is also a practical example of how to use Webpack + Chrome Extension :)

## How it works?

You are reading a text and do not know the translation of a word or phrase. Go to
[Google Translate](https://translate.google.com/) and translate, then
right-click and select **Add translate to dictionary**.

Done! Now this word is saved in your dictionary and will be displayed every time
you open a new tab (random word).

You can also open the **Developer Console** on the google translate and see what
data has been added to your dictionary.

Not sure which words to add? Here is a short list of words:
[Github Folder](https://github.com/Alexeykhr/dictionary-new-tab/tree/master/words)

## Install

[Chrome Web Store](https://chrome.google.com/webstore/detail/dictionary-new-tab/bkkafkeibcbagogpnepjnkpgfpjfghla)

## Images

<table>
  <tr>
    <td>
      <img src="https://raw.githubusercontent.com/Alexeykhr/dictionary-new-tab/master/demo/1.png" width="500" alt="Google Translate - Context Menu">
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/Alexeykhr/dictionary-new-tab/master/demo/2.png" width="500" alt="Dictionary New Tab">
    </td>
  </tr>
</table>

## Hotkeys

Since there are no bookmarks, top sites and other default sections, here is a list of the necessary hot keys
for quick access to the address line and other sections without using the mouse.

### Chrome

- `CTRL + T` - new tab | **global**
- `CTRL + W` - close tab | **global**
- `CTRL + SHIFT + B` - open/close bookmarks bar | **global**
- `CTRL + L` - focus on address line | **global**

## Translation storage structure

```json
[{
  "name": "",
  "translate": "",
  "lang_from": "",
  "lang_to": "",
  "updated_at": 0,
  "_view_at": 0,
  "_views": 0,
  "_dictionary": "",
  "translations": [{
    "name": "",
    "rows": [{
      "word": "",
      "frequency": 0
    }]
  }],
  "definitions": [{
    "name": "",
    "rows": [{
      "name": "",
      "example": ""
    }]
  }],
  "examples": [""]
}]
```

## Contributing

### Setup

- Fork this repository
- Clone to your PC
- `npm ci` - install all dependencies
- `npm run dev` - starting the server in dev mode
- Add unpacked extension to Chrome

### How can this be improved?

- [ ] Design / Development for definitions
- [ ] Design / Development for examples
- [ ] Design / Development for translations
- [ ] Cron translate notifications (chrome.alerts)
- [ ] Settings Page
    - [ ] Background selection (override var styles)
    - [ ] List of words
    - [ ] List of dictionaries
    - [ ] Edit Hotkeys
    - [ ] Change cron time (alerts)

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/Alexeykhr/dictionary-new-tab/blob/master/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)
