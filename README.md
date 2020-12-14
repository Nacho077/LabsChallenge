<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Iniciar
Clona el repositorio y haz npm install y npm start en las carpetas client y api, luego crea un archivo `.env` en la carrpeta api con el siguiente formato:

    DATABASE_URL=postgres://usuarioDePostgres:contraseñaDePostgres@localhost:5432/mercadolibre
    PORT=3001
    FRONT_URL=http://localhost:3000

ya puedes usar la página!

## Home
<img src='./img/Home.png'/>
En el inicio vas a poder buscar en la searchBar o entrar a categorias, al hacer click en algun producto se te va a abrir un mini resumen y vas a tener la opcion de agregarlo a favoritos y ver la descripción detallada del producto.

## Product
<img src='./img/Product.png'/>
En ésta seccion vas a tener un carrusel para ver las imagenes junto con algunos detalles del producto, luego vas a tener la descipción detallada junto con las caracteristicas.

## Category
<img src='./img/Category.png'/>
Aca vas a tener los productos filtrados por categoria y al inicio de la página vas a tener categorias relacionadas con la que estas buscando.

## Favoritos
<img src='./img/Favs.png'/>
Aca vas a poder acceder a todos los productos que hayas marcado como favoritos sin tener que andar buscandolos.

#

# Labs Challenge

El objetivo del challenge es construir un Front-End y un Back-End que interactuen con una API externa.

Vamos a usar la API pública de **Mercado Libre**. De ella vamos a extraer publicaciones que luego vamos a guardar en nuestro propio back-end usando un caché. Para el Fron-end vamos a desarrollar una serie de Componentes de React para poder mostrar e interactuar con las publicaciones antes mencionadas.

## Back-End

Tomamos productos de mercado libre y los guardamos en nuestra base de datos, usando un cache evitamos hacer varios pedidos sobre el mismo producto.

Usamos los siguiente endpoints de Mercado Libre
- `https://api.mercadolibre.com/sites/MLA/search?q={query}`.
Recibe un queryString con el parámetro `q` con un string que indica el keyword a buscar.

- `https://api.mercadolibre.com/items/{id}`.
Recibe como parametro el `id` de un producto y devuelve la información detallada.

- `https://api.mercadolibre.com/items/{id}/descriptions`.
Recibe como parametro el `id` de un producto y devuelve la descripción.

- `https://api.mercadolibre.com/sites/MLA/search?category={id}`.
Recibe un queryString con el parametro `category` con el id de la categoria a buscar.

- `https://api.mercadolibre.com/categories/${id}`.
Recibe como parametro el `id` de la categoria y devuelve las categorias relacionadas.

La API retorna un JSON con la siguiente forma:
```json
{
  "site_id": "MLA",
  "query": "iphone",
  "paging": {...},
  "results": [{
  	"id": "MLA851931164",
    "site_id": "MLA",
    "title": "iPhone 11 128 Gb Morado 4 Gb Ram",
    "seller": {},
    "price": 182240,
    ...
  }],
  "secondary_results": [
    ...
  ],
  "related_results": [
  	...
  ],
  "sort": {
    "id": "relevance",
    "name": "More relevant"
  },
  "available_sorts": [],
  "filters": [],
  "available_filters": []
}
```

Nuestro Back-End tiene las rutas:
- `/api/search` : Devuelve los resultados de la busqueda
- `/api/categories` : Devuelve las categorias principales
- `/api/product` : Devuelve el detalle de un producto
- `/api/category` : Devuelve categorias relacionadas


### Cache
Usamos `memory-cache` para guardar los datos en un cache durante una hora para no hacer varios pedidos al mismo endpoint

## Front-End

### SearchBar

Un formulario **controlado** con un input de búsqueda, que dispare los requests a la API (a nuestro BACK-END, no a Mercado Libre).

### Product Card

En este componente se muestra un producto en particular, debemos mostrar:
- su imagen.
- su titulo.
- su precio (con la moneda).
- su condicion.
- si tiene stock o no.

### Catalogo

Este componente va mostrar un arreglo de productos (obtenidos de la API) usando Product Card. Tambien debe posibilitar:
* Poder ordenar los productos en base a su precio, de forma ascendete o descendente.
* Poder filtrar por condicion.
* Poder páginar los resultados de a 30 productos por página.