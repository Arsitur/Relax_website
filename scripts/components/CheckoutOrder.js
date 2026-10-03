class CheckoutOrder extends HTMLElement
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
      img {
            pointer-events: none;
            border-radius: inherit;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        :host {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        :host>.wrap {
            display: flex;
            gap: 16px;
            align-items: center;
        }

        :host>.wrap>.img {
            width: 80px;
            height: 80px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.10);
            position: relative;
        }
        :host>.wrap>.img>.quantity
        {
            position: absolute;
            top: -8px;
            right: -7px;
            border-radius: 100px;
            background: var(--day-dark02);
            width: 24px;
            height: 24px;
            color: var(--day-white01);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
        }
        :host>.wrap>.name {
            display: flex;
            flex-direction: column;
            width: 165px;
            overflow: hidden;
            
        }
        :host>.wrap>.name>.name
        {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2
            color: var(--day-dark01);
            font-size: 20px;
            font-weight: 700;
        }
        :host>.wrap>.name>.price
        {
            display: none;
        }
        :host>.price, :host>.wrap>.name>.price {
            color: var(--day-dark3);
            font-size: 18px;
            font-weight: 600;
            white-space: nowrap;
        }

        @media (max-width: 1100px) {
                    :host>.price, :host>.wrap>.name>.price {
                        font-size: 22px; 
                    }
                    :host>.wrap>.name
                    {
                        font-size: 24px;
                    }
                    :host>.wrap>.img
                    {
                        width: 96px;
                        height: 96px;
                    }
                    
                }
        @media (max-width: 550px)
        {
            :host>.price
            {
                display: none;
            }
            :host>.wrap>.name>.price
            {
                display: initial;
            }

            :host>.wrap>.name>.price {
                font-size: 18px;
                width: auto;
            }
            :host>.wrap>.name
            {
                width: 100%;
                font-size: 20px;
            }
            :host>.wrap>.img
            {
                width: 80px;
                height: 80px;
            }
        }
        
      </style>

      
    <div class="wrap">
        <div class="img">
            <div class="quantity">${this.getAttribute('quantity')}</div>
            <img src="${this.getAttribute('img')}" alt="Imagine cu ${this.getAttribute('name')}">
        </div>
        <span class="name"> <span class="name">${this.getAttribute('name')}</span> <span class="price">${this.getAttribute('price')}.00 MDL</span> </span>
    </div>

    <span class="price">${this.getAttribute('price')}.00 MDL</span>
                    
    `;
    }

}

window.customElements.define("checkout-order", CheckoutOrder)
