import {loadNews} from '../utils/load-news';

const rssIcon = '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M36.8 33.6H32.5336C32.5336 23.6008 24.3993 15.4664 14.4002 15.4664V11.2C26.7513 11.2 36.8 21.2488 36.8 33.6ZM14.4002 30.4C14.4002 28.6328 15.833 27.2 17.6002 27.2C19.3674 27.2 20.8002 28.6328 20.8002 30.4C20.8002 32.1672 19.3674 33.6 17.6002 33.6C15.833 33.6 14.4002 32.1672 14.4002 30.4ZM25.0671 33.6H29.3334C29.3334 25.3656 22.6343 18.6664 14.4 18.6664V22.9336C20.2815 22.9336 25.0671 27.7184 25.0671 33.6Z" fill="#ffffff"/></svg>';

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="css/my-news-widget.min.css">
  <section class="news-widget">
  <div class="news-widget__content">
    <h2 class="news-widget__header">Свежие новости</h2>
    <ul class="news-list">
    </ul>
  </div>
  <button type="button" class="news-widget__toggle news-widget__toggle--not-active btn btn--rss js-news-widget-toggle" aria-label="Открыть список новостей" aria-pressed="false">
    ${rssIcon}
    <span class="news-widget__unread"></span>
  </button>
  </section>
  <template id='snippet-template'>
    <li class="news-list__item">
      <span class="news-list__status" aria-hidden="true">new</span>
      <h3 class="news-list__title"></h3>
      <p class="news-list__author"></p>
      <time datetime="2020-10-20 19:00" class="news-list__date"></time>
      <a href="#" class="news-list__link">Подробнее</a>
    </li>
  </template>
`;

class NewsWidget extends HTMLElement {
  constructor() {
    super();

    const shadowDOM = this.attachShadow({mode: 'open'});

    shadowDOM.appendChild(template.content.cloneNode(true));

    this.loadSomeNews = this.loadSomeNews.bind(this);
  }

  connectedCallback() {

    let initListeners = () => {
      const toggleBtn = this.shadowRoot.querySelector('.js-news-widget-toggle');
      const popup = this.shadowRoot.querySelector('.news-widget__content');

      const open = () => {
        popup.classList.add('news-widget__content--active');
      };

      const close = () => {
        popup.classList.remove('news-widget__content--active');
      };

      const onBtnClick = () => {
        let pressed = (toggleBtn.getAttribute('aria-pressed') === 'true');
        toggleBtn.setAttribute('aria-pressed', !pressed);
        if (pressed) {
          close();
        } else {
          open();
        }
      };

      toggleBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        onBtnClick();
      });

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.target.children) {
            toggleBtn.querySelector('span').innerText = mutation.target.children.length;
            toggleBtn.classList.remove('news-widget__toggle--not-active');
          }
        });
      });

      observer.observe(this.shadowRoot.querySelector('ul'), {childList: true});
    };

    initListeners();

    this.loadSomeNews();
  }

  loadSomeNews() {
    loadNews(this);
  }
}

export default NewsWidget;
