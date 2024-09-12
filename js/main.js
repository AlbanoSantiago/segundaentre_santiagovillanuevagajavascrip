// Definimos los equipos deportivos disponibles con descripciones
const equipos = [
    { nombre: "Guantes de MMA", descripcion: "Guantes de artes marciales mixtas, ideales para entrenamiento y competición.", precio: 45.00 },
    { nombre: "Espinilleras de combate", descripcion: "Protección para las espinillas, usadas en deportes de combate como Muay Thai y Kickboxing.", precio: 30.00 },
    { nombre: "Protector de genitales", descripcion: "Protección esencial para las zonas sensibles, ideal para deportes de contacto.", precio: 20.00 },
    { nombre: "Short de entrenamiento", descripcion: "Short ligero y flexible para entrenamiento de alta intensidad.", precio: 25.00 },
    { nombre: "Rash (playera) de entrenamiento", descripcion: "Playera ajustada para entrenamiento, diseñada para evitar rozaduras y mejorar el rendimiento.", precio: 35.00 }
];

// Función para mostrar los equipos disponibles con números
function mostrarEquipos() {
    const listaEquiposDiv = document.getElementById("equipos-lista");
    let listaEquipos = "Equipos deportivos disponibles:";
    for (let i = 0; i < equipos.length; i++) {
        listaEquipos += `
            
                ${i + 1} ${equipos[i].nombre}  ${equipos[i].precio.toFixed(2)}
                ${equipos[i].descripcion}
            
        `;
    }
    listaEquiposDiv.innerHTML = listaEquipos;
}

// Función para calcular el total de la compra
function calcularTotal(compras) {
    let total = 0;
    for (let i = 0; i < compras.length; i++) {
        total += equipos[compras[i]].precio;
    }
    return total;
}

// Función para mostrar los equipos comprados y no comprados
function mostrarResumenCompras(compras) {
    let equiposComprados = "Has comprado:";
    let equiposNoComprados = "Equipos que aún no has comprado:";

    for (let i = 0; i < equipos.length; i++) {
        if (compras.includes(i)) {
            equiposComprados += `
                
                ${equipos[i].nombre} - ${equipos[i].precio.toFixed(2)}
                    ${equipos[i].descripcion}
                
            `;
        } else {
            equiposNoComprados += `
                
                    ${equipos[i].nombre} - ${equipos[i].precio.toFixed(2)}
                    ${equipos[i].descripcion}
                
            `;
        }
    }
    return equiposComprados + equiposNoComprados;
}

// Función para realizar la facturación de los productos comprados
function calcularFactura(cantidad, compras) {
    const iva = 16;

    while (true) {
        let nombre, calleNumeroExterior, numeroInterior, colonia, alcaldiaMunicipio, codigoPostal, entidadFederativa, pais, rfc;

        while (true) {
            nombre = prompt("Ingresa Nombre o Razón Social del Cliente:");
            calleNumeroExterior = prompt("Ingresa Calle y número exterior del Domicilio del Cliente:");
            numeroInterior = prompt("Ingresa número Interior");
            colonia = prompt("Ingresa Colonia");
            alcaldiaMunicipio = prompt("Ingresa Alcaldía o Municipio");
            codigoPostal = prompt("Ingresa Código Postal");
            entidadFederativa = prompt("Ingresa Entidad Federativa");
            pais = prompt("Ingresa País");
            rfc = prompt("Ingresa RFC del Cliente:");
            if (nombre && calleNumeroExterior && numeroInterior && colonia && alcaldiaMunicipio && codigoPostal && entidadFederativa && pais && rfc) break;
            alert("Todos los Campos son Obligatorios.");
        }

        let ivaCalculado = Math.floor((cantidad * iva) / 100);
        let total = cantidad + ivaCalculado;

        alert(
            "--- Factura ---\n" +
            "Nombre: " + nombre.toUpperCase() + "\n" +
            "Calle y Número Exterior: " + calleNumeroExterior.toUpperCase() + "\n" +
            "Número interior: " + numeroInterior.toUpperCase() + "\n" +
            "Colonia: " + colonia.toUpperCase() + "\n" +
            "Alcaldía o Municipio: " + alcaldiaMunicipio.toUpperCase() + "\n" +
            "Código Postal: " + codigoPostal.toUpperCase() + "\n" +
            "Entidad Federativa: " + entidadFederativa.toUpperCase() + "\n" +
            "País: " + pais.toUpperCase() + "\n" +
            "RFC: " + rfc.toUpperCase() + "\n" +
            "Cantidad: $" + cantidad.toFixed(2) + "\n" +
            "IVA (16%): $" + ivaCalculado.toFixed(2) + "\n" +
            "Total: $" + total.toFixed(2)
        );

        // Preguntar si el usuario desea realizar más compras o cerrar el proceso
        let continuarCompra = prompt("¿Deseas realizar más compras? (sí/no)").toLowerCase();
        if (continuarCompra === "no") {
            alert("Gracias por utilizar nuestro sistema.");
            break;  // Finalizamos el proceso
        } else if (continuarCompra === "sí") {
            alert("Se reiniciará el proceso de compra.");
            simuladorCompra(compras);  // Pasamos las compras realizadas para que las mantenga en memoria
            break;  // Salimos del bucle de facturación para reiniciar el proceso de compra
        } else {
            alert("Opción no válida, intenta de nuevo.");
        }
    }
}

// Función principal para simular la compra
function simuladorCompra(compras = []) {
    let seguirComprando = true;
    mostrarEquipos();

    while (seguirComprando) {
        let eleccion = prompt("Elige el número del equipo que deseas comprar (1-5) o 0 para finalizar:");
        eleccion = parseInt(eleccion);

        if (eleccion === 0) {
            seguirComprando = false;
        } else if (eleccion >= 1 && eleccion <= 5) {
            if (!compras.includes(eleccion - 1)) {
                compras.push(eleccion - 1);  // Guardamos el índice del equipo
                alert(`Has añadido ${equipos[eleccion - 1].nombre} a tu carrito.`);
            } else {
                alert(`Ya has comprado ${equipos[eleccion - 1].nombre}.`);
            }

            // Preguntar si quiere comprar más y mostrar el resumen de compras
            let continuar = confirm("¿Quieres comprar algo más?");
            if (continuar) {
                alert(mostrarResumenCompras(compras));
            } else {
                seguirComprando = false;
            }
        } else {
            alert("Opción no válida, intenta de nuevo.");
        }
    }

    // Mostrar el total si hay compras
    if (compras.length > 0) {
        let total = calcularTotal(compras);
        let resumenCompra = "Resumen de tu compra:\n";
        for (let i = 0; i < compras.length; i++) {
            resumenCompra += `- ${equipos[compras[i]].nombre}: $${equipos[compras[i]].precio.toFixed(2)}\n   Descripción: ${equipos[compras[i]].descripcion}\n`;
        }
        resumenCompra += `Total a pagar: $${total.toFixed(2)}`;
        alert(resumenCompra);
        calcularFactura(total, compras);  // Llamada a la función de facturación con el total de la compra
    } else {
        alert("No has comprado ningún artículo.");
    }
}

// Ejecutamos el simulador
document.getElementById('inicio-compra').addEventListener('click', () => {
    simuladorCompra();
});
