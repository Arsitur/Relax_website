import articles from '../data/articles.json';
import { niceDateFormatting } from './utils.js';
import { siteUrl } from './site.js';

class ArticleItem extends HTMLElement {
    connectedCallback() {
        const article = articles.find(item => item.id === this.getAttribute('article-id'));
        if (!article) return;
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = `<style>
            * { box-sizing:border-box; font-family:Poppins,Roboto,sans-serif; user-select:text; -webkit-user-select:text; }
            :host { display:block; min-width:0; }
            a { display:flex; flex-direction:column; gap:12px; color:var(--day-dark01); text-decoration:none; }
            .img { width:100%; height:240px; overflow:hidden; border-radius:12px; }
            img { width:100%; height:100%; object-fit:cover; transition:transform .2s; }
            a:hover img { transform:scale(1.04); }
            .name { font-size:26px; font-weight:700; }
            .date { color:var(--day-dark04); font-size:14px; }
        </style><a><div class="img"><img loading="lazy"></div><span class="name"></span><span class="date"></span></a>`;
        root.querySelector('a').href = siteUrl(`pages/articol.html?id=${encodeURIComponent(article.id)}`);
        root.querySelector('img').src = siteUrl(article.image);
        root.querySelector('img').alt = article.name;
        root.querySelector('.name').textContent = article.name;
        root.querySelector('.date').textContent = niceDateFormatting(article.datePosted);
    }
}
customElements.define('article-item', ArticleItem);
const section = document.querySelector('.articles');
section.replaceChildren(...[...articles].sort((a, b) => b.datePosted - a.datePosted).map(article => {
    const card = document.createElement('article-item');
    card.setAttribute('article-id', article.id);
    return card;
}));
