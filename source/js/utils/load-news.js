const loadNews = (widget) => {
  const MONTH_NAMES = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const TMPL = widget.shadowRoot.querySelector('#snippet-template').content;
  let data = require('../data/data.json');

  const getReadableDate = (dateString) => {
    let date = new Date(Date.parse(dateString));
    return `${date.getDay()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  };


  const renderSnippet = (el) => {
    let snippetElement = TMPL.cloneNode(true);
    snippetElement.querySelector('.news-list__title').innerText = el.title;
    snippetElement.querySelector('.news-list__author').innerText = el.author;
    snippetElement.querySelector('.news-list__link').setAttribute('href', el.url);
    snippetElement.querySelector('.news-list__status').setAttribute('aria-hidden', el.isNew);
    snippetElement.querySelector('.news-list__date').innerText = getReadableDate(el.publishedAt);
    snippetElement.querySelector('.news-list__date').setAttribute('datetime', el.publishedAt);
    return snippetElement;
  };

  const renderSetOfSnippets = (arr) => {
    let fragment = document.createDocumentFragment();
    arr.forEach((element) => {
      fragment.appendChild(renderSnippet(element));
    });
    return fragment;
  };

  const updateNews = function (arr) {
    widget.shadowRoot.querySelector('ul').appendChild(renderSetOfSnippets(arr));
  };

  updateNews(data.NEWS);
};


export {loadNews};
