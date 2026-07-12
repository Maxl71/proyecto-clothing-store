document.addEventListener("DOMContentLoaded", function () {
    const filtrosPrecio = document.querySelectorAll(".filtro-precio");
    const filtrosTalla = document.querySelectorAll(".filtro-talla");
    const filtrosColor = document.querySelectorAll(".filtro-color");

    const productos = document.querySelectorAll(".product-col");
    const mensajes = document.querySelectorAll(".resultado-filtro");
    const botonesLimpiar = document.querySelectorAll(".btn-limpiar-filtros");

    let precioSeleccionado = 150;
    let tallaSeleccionada = "todas";
    let colorSeleccionado = "todos";

    const filtrarProductos = () => {
        let cantidadVisible = 0;

        productos.forEach(producto => {
            const precioProducto = Number(producto.dataset.precio);
            const tallasProducto = producto.dataset.tallas.split(",");
            const coloresProducto = producto.dataset.colores.split(",");

            const cumplePrecio = precioProducto <= precioSeleccionado;
            const cumpleTalla = tallaSeleccionada === "todas" || tallasProducto.includes(tallaSeleccionada);
            const cumpleColor = colorSeleccionado === "todos" || coloresProducto.includes(colorSeleccionado);

            const mostrar = cumplePrecio && cumpleTalla && cumpleColor;

            producto.classList.toggle("d-none", !mostrar);

            if (mostrar) {cantidadVisible++;}
        });

        mensajes.forEach(mensaje => {
            mensaje.textContent =
                `Mostrando ${cantidadVisible} producto(s) encontrados`;
        });
    }

    filtrosPrecio.forEach(filtro => {
        filtro.addEventListener("input", function () {
            precioSeleccionado = Number(this.value);
            filtrosPrecio.forEach(otroFiltro => {
                otroFiltro.value = precioSeleccionado;
            });
            filtrarProductos();
        });
    });

    filtrosTalla.forEach(filtro => {
        filtro.addEventListener("change", function () {
            tallaSeleccionada = this.value;
            filtrosTalla.forEach(otroFiltro => {
                otroFiltro.value = tallaSeleccionada;
            });
            filtrarProductos();
        });
    });

    filtrosColor.forEach(filtro => {
        filtro.addEventListener("change", function () {
            colorSeleccionado = this.value;
            filtrosColor.forEach(otroFiltro => {
                otroFiltro.value = colorSeleccionado;
            });
            filtrarProductos();
        });
    });

    botonesLimpiar.forEach(boton => {
        boton.addEventListener("click", function () {
            precioSeleccionado = 150;
            tallaSeleccionada = "todas";
            colorSeleccionado = "todos";

            filtrosPrecio.forEach(filtro => {
                filtro.value = 150;
            });

            filtrosTalla.forEach(filtro => {
                filtro.value = "todas";
            });

            filtrosColor.forEach(filtro => {
                filtro.value = "todos";
            });

            productos.forEach(producto => {
                producto.classList.remove("d-none");
            });

            mensajes.forEach(mensaje => {
                mensaje.textContent = "";
            });
        });
    });
});