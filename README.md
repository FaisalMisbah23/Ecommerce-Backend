<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">ECOMMERCE-BACKEND</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/FaisalMisbah23/Ecommerce-Backend?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/FaisalMisbah23/Ecommerce-Backend?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/FaisalMisbah23/Ecommerce-Backend?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/FaisalMisbah23/Ecommerce-Backend?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

##  Quick Links

> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running Ecommerce-Backend](#-running-Ecommerce-Backend)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Repository Structure

```sh
└── Ecommerce-Backend/
    ├── package-lock.json
    ├── package.json
    └── src
        ├── App.js
        ├── constants.js
        ├── controllers
        │   ├── cart.controllers.js
        │   ├── cartItems.controllers.js
        │   ├── category.controllers.js
        │   ├── orders.controlles.js
        │   ├── product.controllers.js
        │   ├── review.controllers.js
        │   └── users.controllers.js
        ├── db
        │   └── index.js
        ├── index.js
        ├── middlewares
        │   ├── auth.middlware.js
        │   └── multer.middleware.js
        ├── models
        │   ├── cartItems.models.js
        │   ├── carts.models.js
        │   ├── categories.models.js
        │   ├── orderLines.models.js
        │   ├── orders.models.js
        │   ├── product.models.js
        │   ├── reviews.models.js
        │   └── users.models.js
        ├── routes
        │   ├── carts.routes.js
        │   ├── category.routes.js
        │   ├── orders.routes.js
        │   ├── product.routes.js
        │   ├── review.routes.js
        │   └── user.routes.js
        └── utlis
            ├── ApiError.js
            ├── ApiResponse.js
            ├── Cloudinary.js
            └── asyncHandler.js
```

---

##  Modules

<details closed><summary>Packages</summary>

| File                                                                                                   | Summary                         |
| ---                                                                                                    | ---                             |
| [package.json](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/package.json)           | <code>► INSERT-TEXT-HERE</code> |
| [package-lock.json](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/package-lock.json) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src</summary>

| File                                                                                             | Summary                         |
| ---                                                                                              | ---                             |
| [constants.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/constants.js) | <code>► INSERT-TEXT-HERE</code> |
| [App.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/App.js)             | <code>► INSERT-TEXT-HERE</code> |
| [index.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/index.js)         | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.models</summary>

| File                                                                                                                    | Summary                         |
| ---                                                                                                                     | ---                             |
| [cartItems.models.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/models/cartItems.models.js)   | <code>► INSERT-TEXT-HERE</code> |
| [categories.models.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/models/categories.models.js) | <code>► INSERT-TEXT-HERE</code> |
| [reviews.models.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/models/reviews.models.js)       | <code>► INSERT-TEXT-HERE</code> |
| [carts.models.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/models/carts.models.js)           | <code>► INSERT-TEXT-HERE</code> |
| [orderLines.models.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/models/orderLines.models.js) | <code>► INSERT-TEXT-HERE</code> |
| [product.models.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/models/product.models.js)       | <code>► INSERT-TEXT-HERE</code> |
| [orders.models.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/models/orders.models.js)         | <code>► INSERT-TEXT-HERE</code> |
| [users.models.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/models/users.models.js)           | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.routes</summary>

| File                                                                                                                | Summary                         |
| ---                                                                                                                 | ---                             |
| [review.routes.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/routes/review.routes.js)     | <code>► INSERT-TEXT-HERE</code> |
| [carts.routes.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/routes/carts.routes.js)       | <code>► INSERT-TEXT-HERE</code> |
| [category.routes.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/routes/category.routes.js) | <code>► INSERT-TEXT-HERE</code> |
| [orders.routes.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/routes/orders.routes.js)     | <code>► INSERT-TEXT-HERE</code> |
| [product.routes.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/routes/product.routes.js)   | <code>► INSERT-TEXT-HERE</code> |
| [user.routes.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/routes/user.routes.js)         | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.db</summary>

| File                                                                                        | Summary                         |
| ---                                                                                         | ---                             |
| [index.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/db/index.js) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.utlis</summary>

| File                                                                                                         | Summary                         |
| ---                                                                                                          | ---                             |
| [ApiResponse.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/utlis/ApiResponse.js)   | <code>► INSERT-TEXT-HERE</code> |
| [Cloudinary.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/utlis/Cloudinary.js)     | <code>► INSERT-TEXT-HERE</code> |
| [asyncHandler.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/utlis/asyncHandler.js) | <code>► INSERT-TEXT-HERE</code> |
| [ApiError.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/utlis/ApiError.js)         | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.controllers</summary>

| File                                                                                                                                 | Summary                         |
| ---                                                                                                                                  | ---                             |
| [cartItems.controllers.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/controllers/cartItems.controllers.js) | <code>► INSERT-TEXT-HERE</code> |
| [category.controllers.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/controllers/category.controllers.js)   | <code>► INSERT-TEXT-HERE</code> |
| [users.controllers.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/controllers/users.controllers.js)         | <code>► INSERT-TEXT-HERE</code> |
| [orders.controlles.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/controllers/orders.controlles.js)         | <code>► INSERT-TEXT-HERE</code> |
| [review.controllers.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/controllers/review.controllers.js)       | <code>► INSERT-TEXT-HERE</code> |
| [product.controllers.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/controllers/product.controllers.js)     | <code>► INSERT-TEXT-HERE</code> |
| [cart.controllers.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/controllers/cart.controllers.js)           | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>src.middlewares</summary>

| File                                                                                                                         | Summary                         |
| ---                                                                                                                          | ---                             |
| [auth.middlware.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/middlewares/auth.middlware.js)       | <code>► INSERT-TEXT-HERE</code> |
| [multer.middleware.js](https://github.com/FaisalMisbah23/Ecommerce-Backend/blob/master/src/middlewares/multer.middleware.js) | <code>► INSERT-TEXT-HERE</code> |

</details>

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **JavaScript**: `version x.y.z`

###  Installation

1. Clone the Ecommerce-Backend repository:

```sh
git clone https://github.com/FaisalMisbah23/Ecommerce-Backend
```

2. Change to the project directory:

```sh
cd Ecommerce-Backend
```

3. Install the dependencies:

```sh
npm install
```

###  Running Ecommerce-Backend

Use the following command to run Ecommerce-Backend:

```sh
node app.js
```

###  Tests

To execute tests, run:

```sh
npm test
```

---
