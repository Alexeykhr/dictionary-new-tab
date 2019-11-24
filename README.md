# Chrome Extension - Dictionary New Tab

## Introducing

Sometimes it’s very difficult (almost always) to force yourself to learn a new language.
This extension is for the Chrome browser, which will help make at least constantly see new words for yourself.

This is also a practical example of how to use Webpack + Chrome Extension :)

## How it works?

You are reading a text and do not know the translation of a word or phrase. Go to
[google translate](https://translate.google.com/) and translate, then
right-click and select **Add translate to dictionary**.

Done! Now this word is saved in your dictionary and will be displayed every time
you open a new tab (random word).

You can also open the **Developer Console** on the google translate and see what
data has been added to your dictionary.

Not sure which words to add? Here is a short list of words:
[MIT](https://github.com/Alexeykhr/dictionary-new-tab/tree/master/words)

## Hotkeys

Since there are no bookmarks, top sites and other sections, here is a list of the necessary hot keys
for quick access to the address line and other sections without using the mouse

- `CTRL + T` - new tab | **global**
- `CTRL + W` - close tab | **global**
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

## How can this be improved?

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
