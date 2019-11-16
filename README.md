# Chrome Extension - Dictionary New Tab

## Introducing

Sometimes it’s very difficult (almost always) to force yourself to learn a new language.
This extension is for the Chrome browser, which will help make at least constantly see new words for yourself.

This is also a practical example of how to use Webpack + Chrome Extension :)

## Hotkeys

Since there are no bookmarks, top sites and other sections, here is a list of the necessary hot keys
for quick access to the address line and other sections without using the mouse

- `CTRL + T` - new tab | **global**
- `CTRL + W` - close tab | **global**
- `CTRL + L` - focus on address line | **global**

# Links
https://developer.chrome.com/extensions/notifications
https://developer.chrome.com/extensions/alarms
https://developer.chrome.com/extensions/contextMenus
https://developer.chrome.com/extensions/pageAction

https://stackoverflow.com/questions/19103183/how-to-insert-html-with-a-chrome-extension

# Features
- Notification
- Background
- Dark/Light Theme
- Top Sites
- Alarms (interval, wait before clear, sound)

# Object
- name
- translate
- transcription
- lang_from
- lang_to
- updated_at
- translations
-- name
-- rows
--- word
--- frequency
- definitions
-- name
-- rows
--- name
--- example
- examples
-- text

- view_at
- views
- quality

## How can this be improved?

- [ ] Polls of learned words
- [ ] Notifications and notification settings (for example, every 5 minutes a new word)
- [ ] Better design (without using any libraries like React, Vue)
- [ ] Hotkey editing

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/Alexeykhr/dictionary-new-tab/blob/master/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)
