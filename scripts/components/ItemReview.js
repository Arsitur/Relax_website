import { escapeHTML } from '../site.js';
import { lockScroll, unlockScroll, assignStars } from "../utils.js";

class ItemReview extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback()
    {
        this.shadowRoot.innerHTML = `
      <style>
        *
      {
        margin : 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Poppins, Roboto;
        -webkit-user-select: text;
        user-select: text;
        z-index: 3;
      }
        :host {
            display: flex;
            flex-direction: column;
        }

        :host>.header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        :host>.header>.acc {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        :host>.header>.acc>.img {
            width: 40px;
            height: 40px;
            border-radius: 125px;
            box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.10), 0px 3px 3px 0px rgba(0, 0, 0, 0.09), 0px 6px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 4px 0px rgba(0, 0, 0, 0.01), 0px 16px 5px 0px rgba(0, 0, 0, 0.00);
        }

        :host>.header>.acc>.img>img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }

        :host>.header>.acc>.text {
            display: flex;
            flex-direction: column;
        }

        :host>.header>.acc>.text>.name {
            color: var(--day-dark01);
            font-size: 20px;
            font-weight: 600;
            line-height: 20px;
        }

        :host>.header>.acc>.text>.date {
            color: var(--day-dark04);
            font-size: 12px;
            font-weight: 600;
        }

        :host>.header>button {
            background: none;
            position: relative;
        }

        :host>.stars {
            color: var(--day-gold);
            font-size: 20px;
            font-weight: 700;
            margin-top: 2px;
        }

        :host>.description {
            color: var(--day-dark03);
            font-size: 16px;
            font-weight: 500;
            word-break: break-all;
        }
      </style>

      <div class="header">
            <div class="acc">
                <div class="img">
                    <img src="${escapeHTML(this.getAttribute('img') || '')}"
                        alt="Imaginea de profil a lui ${escapeHTML(this.getAttribute('name') || '')}" draggable="false">
                </div>

                <div class="text">
                    <span class="name">${escapeHTML(this.getAttribute('name') || '')}</span>
                    <span class="date">${escapeHTML(this.getAttribute('date') || '')}</span>
                </div>
            </div>
            
        </div>
        <div class="stars">${assignStars(this.getAttribute('stars'))}</div>
        <div class="description">${escapeHTML(this.getAttribute('description') || '')}</div>
    `;

    }

}

window.customElements.define("item-review", ItemReview)

// < !-- < button >
// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
//     fill="none">
//     <path
//         d="M1.9806 6.02002C0.885977 6.02002 0 6.9055 0 7.99962C0 9.09374 0.884979 9.97971 1.9806 9.97971C3.07322 9.97971 3.96019 9.09523 3.96019 7.99962C3.96019 6.9055 3.07322 6.02002 1.9806 6.02002ZM8.10257 6.02002C7.01045 6.02002 6.12198 6.905 6.12198 7.99912C6.12198 9.09324 7.00945 9.97921 8.10257 9.97921C9.19569 9.97921 10.0842 9.09473 10.0842 7.99912C10.0832 6.9055 9.19569 6.02002 8.10257 6.02002ZM14.0209 6.02002C12.9268 6.02002 12.0398 6.9055 12.0398 8.00012C12.0398 9.09324 12.9253 9.97921 14.0209 9.97921C15.113 9.97921 16 9.09473 16 8.00012C16 6.9055 15.113 6.02002 14.0209 6.02002Z"
//         fill="#0C0C0C" fill-opacity="0.75" />
// </svg>
//         </ > -->