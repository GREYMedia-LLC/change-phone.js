
  /**
   * Changes Phones from utm mark
   *
   * version 0.0.4
   * Copyright 2016 by Rasy
   */

  function changePhones(phone, url, utm, searcher) {

    var options = {
      phone: phone || null,
      url: url || '.dynamic-url',
      utm: utm || '#utm_source=yandex',
      searcher: searcher || 'yandex'
    };

    options.windowComponent = window.location.hash;

    if (options.windowComponent.match(/utm_source/)) {
      // соответствует строке содержащей метку с буквами до амперсанда, вопроса или цифры
      var regex = /#utm_source=[^&|?|\d]+/;
      options.windowComponent = options.windowComponent.match(regex)[0];
    }

    if (options.utm !== options.windowComponent && localStorage.getItem('utm_'+options.searcher+'') !== options.searcher) {
      return;
    }
    if (options.phone.length !== 13) {
      return;
    }

    var phoneMask = mask();

    function mask() {
      var cut1 = options.phone.substring(0, 4),
          cut2 = options.phone.substring(4, 6),
          cut3 = options.phone.substring(6, 9),
          cut4 = options.phone.substring(9, 11),
          cut5 = options.phone.substring(11),
          glued = cut1 + ' (' + cut2 + ') ' + cut3 + '-' + cut4 + '-' + cut5;

      return glued;
    }

    options.phones = document.querySelectorAll(options.url);

    for (var i = 0; i < options.phones.length; i++) {
      options.phones[i].innerText = phoneMask;
      options.phones[i].href = options.phone;
    }

    generateMark('yandex');
    generateMark('google');

    function generateMark(searchMark) {
      if (localStorage.getItem('utm_'+options.searcher+'') === null && options.searcher === searchMark) {
        localStorage.setItem('utm_'+options.searcher+'', searchMark);
      }
    }

  }

  function initUtm() {
    changePhones('+375332333436');
    changePhones('+375442333446', '.dynamic-url1', '#utm_source=google','google');
  }

  document.addEventListener('DOMContentLoaded', initUtm);
