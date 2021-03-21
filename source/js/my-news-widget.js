import NewsWidget from './components/news-widget';

const initWidget = () => {
  const widgetEl = document.createElement('news-widget');
  document.querySelector('main').appendChild(widgetEl);
  customElements.define('news-widget', NewsWidget);
};

initWidget();
