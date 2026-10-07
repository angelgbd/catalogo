import estilos from './tarjeta-producto.css?inline';
import type { DetalleAgregar } from './tipos';

export class TarjetaProducto extends HTMLElement {
  static observedAttributes = ['producto-id', 'nombre', 'precio', 'imagen', 'existencia'];

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
    const id = this.getAttribute('producto-id') ?? '';
    const nombre = this.getAttribute('nombre') ?? '';
    const precio = Number(this.getAttribute('precio') ?? 0);
    const imagen = this.getAttribute('imagen') ?? '';
    const existencia = Number(this.getAttribute('existencia') ?? 0);
    const agotado = existencia <= 0;

    this.raiz.innerHTML = `
      <style>${estilos}</style>
      <article class="tarjeta">
        <img src="${imagen}" alt="${nombre}" loading="lazy">
        <div class="cuerpo">
          <h3>${nombre}</h3>
          <p class="precio">$${precio.toLocaleString('es-MX')}</p>
          <p class="existencia ${agotado ? 'agotado' : ''}">
            ${agotado ? 'Agotado' : `${existencia} disponibles`}
          </p>
          <boton-app variante="primario" ${agotado ? 'deshabilitado' : ''}>
            Agregar al carrito
          </boton-app>
        </div>
      </article>
    `;

    this.raiz.querySelector('boton-app')?.addEventListener('click', () => {
      const detalle: DetalleAgregar = { id, nombre, precio };
      this.dispatchEvent(new CustomEvent<DetalleAgregar>('agregar', {
        detail: detalle,
        bubbles: true,
        composed: true,
      }));
    });
  }
}

if (!customElements.get('tarjeta-producto')) {
  customElements.define('tarjeta-producto', TarjetaProducto);
}
