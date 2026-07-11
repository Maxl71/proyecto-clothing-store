document.addEventListener("DOMContentLoaded", function () {
    const carruseles = document.querySelectorAll("[data-product-carousel]");
    const duracionAnimacion = 360;

    carruseles.forEach(function (carrusel) {
        const filaProductos = carrusel.querySelector(".productos-bootstrap");
        const productos = Array.from(carrusel.querySelectorAll(".product-col")).slice(0, 10);
        const botonAnterior = carrusel.querySelector("[data-carousel-prev]");
        const botonSiguiente = carrusel.querySelector("[data-carousel-next]");
        let indiceInicial = 0;
        let animando = false;

        if (!filaProductos || productos.length === 0 || !botonAnterior || !botonSiguiente) {
            return;
        }

        function obtenerCantidadVisible() {
            const ancho = window.innerWidth;

            if (ancho >= 1400) {
                return 5;
            }

            if (ancho >= 992) {
                return 4;
            }

            if (ancho >= 768) {
                return 3;
            }

            return 2;
        }

        function obtenerProducto(indice) {
            const totalProductos = productos.length;
            const indiceSeguro = (indice + totalProductos) % totalProductos;

            return productos[indiceSeguro];
        }

        function prepararProductos(indiceBase, cantidadVisible, direccion) {
            const cantidadRenderizada = Math.min(cantidadVisible + 1, productos.length);
            const inicioRender = direccion === "prev" ? indiceBase - 1 : indiceBase;

            filaProductos.style.setProperty("--carousel-visible", cantidadVisible);
            filaProductos.classList.remove(
                "product-carousel-moving-next",
                "product-carousel-moving-prev",
                "product-carousel-from-prev"
            );

            productos.forEach(function (producto) {
                producto.classList.add("d-none");
            });

            for (let i = 0; i < cantidadRenderizada; i++) {
                const producto = obtenerProducto(inicioRender + i);

                filaProductos.appendChild(producto);
                producto.classList.remove("d-none");
            }
        }

        function actualizarProductos() {
            const cantidadVisible = Math.min(obtenerCantidadVisible(), productos.length);

            prepararProductos(indiceInicial, cantidadVisible, "next");

            productos.forEach(function (producto, indice) {
                const distancia = (indice - indiceInicial + productos.length) % productos.length;
                const visible = distancia < cantidadVisible;

                producto.classList.toggle("d-none", !visible);
            });
        }

        function moverCarrusel(direccion) {
            const cantidadVisible = Math.min(obtenerCantidadVisible(), productos.length);

            if (animando || productos.length <= cantidadVisible) {
                return;
            }

            animando = true;
            prepararProductos(indiceInicial, cantidadVisible, direccion);

            if (direccion === "prev") {
                filaProductos.classList.add("product-carousel-from-prev");
                filaProductos.offsetWidth;
            }

            requestAnimationFrame(function () {
                filaProductos.classList.add(
                    direccion === "next" ? "product-carousel-moving-next" : "product-carousel-moving-prev"
                );
            });

            setTimeout(function () {
                if (direccion === "next") {
                    indiceInicial = (indiceInicial + 1) % productos.length;
                } else {
                    indiceInicial = (indiceInicial - 1 + productos.length) % productos.length;
                }

                filaProductos.classList.add("product-carousel-reset");
                actualizarProductos();
                filaProductos.offsetWidth;

                requestAnimationFrame(function () {
                    filaProductos.classList.remove("product-carousel-reset");
                    animando = false;
                });
            }, duracionAnimacion + 30);
        }

        botonSiguiente.addEventListener("click", function () {
            moverCarrusel("next");
        });

        botonAnterior.addEventListener("click", function () {
            moverCarrusel("prev");
        });

        window.addEventListener("resize", function () {
            if (!animando) {
                actualizarProductos();
            }
        });

        actualizarProductos();
    });
});