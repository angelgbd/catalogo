import estilos from './boton-app.css?inline';

export class BotonApp extends HTMLElement {
  static observedAttributes = ['variante', 'deshabilitado'];

  private readonly raiz: ShadowRoot;

  constructor() {
    super();
    this.raiz = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.pintar();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.pintar();
  }

  private pintar() {
    const variante = this.getAttribute('variante') ?? 'primario';
    const deshabilitado = this.hasAttribute('deshabilitado');

    this.raiz.innerHTML = `
      <style>${estilos}</style>
      <button class="${variante}" ${deshabilitado ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
  }
}

if (!customElements.get('boton-app')) {
  customElements.define('boton-app', BotonApp);
}
