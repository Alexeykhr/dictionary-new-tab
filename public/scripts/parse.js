(function () {
  var el;

  // Default values
  var result = {
    name: '',
    translate: '',
    lang_from: 'auto',
    lang_to: '',
    definitions: [],
    examples: [],
    translations: []
  };

  /* | ----------------------------------------------------------------------
   * | - Name -
   * | ----------------------------------------------------------------------
   */

  el = document.querySelector('#source');
  if (el) {
    result.name = el.value.trim();
  }

  /* | ----------------------------------------------------------------------
   * | - Translate -
   * | ----------------------------------------------------------------------
   */

  el = document.querySelector('.tlid-translation');
  if (el) {
    result.translate = el.textContent.trim();
  }

  /* | ----------------------------------------------------------------------
   * | - Lang From -
   * | ----------------------------------------------------------------------
   */

  el = document.querySelector('.sl-sugg .jfk-button[aria-pressed="true"]');
  if (el) {
    var lang = el.getAttribute('value') || 'auto';

    result.lang_from = lang.trim();
  }

  /* | ----------------------------------------------------------------------
   * | - Lang To -
   * | ----------------------------------------------------------------------
   */

  el = document.querySelector('.tl-wrap .jfk-button[aria-pressed="true"]');
  if (el) {
    var lang = el.getAttribute('value') || '';

    result.lang_to = lang.trim();
  }

  /* | ----------------------------------------------------------------------
   * | - Definitions -
   * | ----------------------------------------------------------------------
   */

  el = document.querySelector('.gt-cd-mmd');
  if (el) {
    blocks = el.querySelectorAll('.gt-cd-pos, .gt-def-list');

    var len = blocks.length - blocks.length % 2;

    // Verb, noun, etc
    for (var i = 0; i < len; i += 2) {
      var definition = {
        name: blocks[i].textContent.trim(),
        rows: []
      };

      var rowElements = blocks[i + 1].children;
      var existsRows = false;

      // Name, example
      for (var j = 0; j < rowElements.length; j++) {
        var row = {};

        var nameElement = rowElements[j].querySelector('.gt-def-row');
        if (nameElement) {
          row.name = nameElement.textContent.trim();
        }

        // Name is required
        if (!row.name) {
          continue;
        }

        var exampleElement = rowElements[j].querySelector('.gt-def-example');
        if (exampleElement) {
          row.example = exampleElement.textContent.trim();
        }

        definition.rows.push(row);
        existsRows = true;
      }

      if (existsRows) {
        result.definitions.push(definition);
      }
    }
  }

  /* | ----------------------------------------------------------------------
   * | - Examples -
   * | ----------------------------------------------------------------------
   */

  el = document.querySelector('.gt-cd-mex');
  if (el) {
    blocks = el.querySelectorAll('.gt-ex-text');

    for (var i = 0; i < blocks.length; i++) {
      var content = blocks[i].textContent.trim();

      if (content) {
        result.examples.push(content);
      }
    }
  }

  /* | ----------------------------------------------------------------------
   * | - Translations -
   * | ----------------------------------------------------------------------
   */

  // .gt-cd-mbd
  el = document.querySelector('.gt-cd-baf .gt-baf-table > tbody');
  if (el) {
    var currentTranslation = null;

    for (var i = 0; i < el.children.length; i++) {
      if (!el.children[i].classList.contains('gt-baf-entry')) {
        var nameElement = el.children[i].querySelector('.gt-cd-pos');

        if (nameElement) {
          currentTranslation = {
            name: nameElement.textContent.trim(),
            rows: []
          };

          result.translations.push(currentTranslation);
        }

        continue;
      }

      if (!currentTranslation) {
        continue;
      }

      var translateElement = el.children[i].querySelector('.gt-baf-cell');
      if (translateElement) {
        currentTranslation.rows.push({
          word: translateElement.textContent.trim(),
          frequency: el.children[i].querySelectorAll('.gt-score-dot.filled').length || 1
        });
      }
    }
  }

  console.log(result);

  return result;
})();
