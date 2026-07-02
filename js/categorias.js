document.addEventListener("DOMContentLoaded", function () {
    const filtrosPrecio =
        document.querySelectorAll(".filtro-precio");

    const productos =
        document.querySelectorAll(".product-col[data-precio]");

    const mensaje =
        document.getElementById("resultadoFiltro");

    function filtrarPorPrecio(precioMaximo) {
        let cantidadVisible = 0;

        productos.forEach(function (producto) {
            const precioProducto =
                Number(producto.dataset.precio);

            const mostrar =
                precioProducto <= precioMaximo;

            producto.classList.toggle(
                "d-none",
                !mostrar
            );

            if (mostrar) {
                cantidadVisible++;
            }
        });

        // Sincroniza el filtro lateral y el filtro móvil.
        filtrosPrecio.forEach(function (filtro) {
            filtro.value = precioMaximo;
        });

        mensaje.textContent =
            "Mostrando " +
            cantidadVisible +
            " producto(s) hasta S/" +
            precioMaximo;
    }

    filtrosPrecio.forEach(function (filtro) {
        filtro.addEventListener(
            "input",
            function (evento) {
                filtrarPorPrecio(
                    Number(evento.target.value)
                );
            }
        );
    });
});