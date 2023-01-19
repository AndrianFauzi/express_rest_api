npx nodemon index (untuk menjalankan server)
mpn run dev (untuk menjalankan sisi client)
--
app.post("/register", Controller.Register);

```
{
- username : "your username"
- email: "your email"
- password: "your password"
- phoneNumber: "yout phone number"
- address: "your address"

}
```

---

app.post("/login", Controller.Login);

```
{
- email: "your email"
- password: "your password"
}
```

---

app.post("/google-sign-in", Controller.googleSignIn);

```
{
- access_token: dari headers
- client id: dari google yang dimasukkan di file .env
}
```

---

app.get("/listProducts", Controller.getAll);

```
in headers
{
 access_token: "your access token"
}
```

Response(200)

```
[
  {
    "id": 1,
    "name": "<asset name>",
    "description": "<asset description>",
    "price": "<asset price>"
    "imgUrl": "<imgUrl price>"
    "CategoryId": "<asset price>"
    "AuthorId": "<asset AuthorId>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  ....
]
```

---

app.get("/listProducts/:id", Controller.selectDetailProduct);

```
{
- id: "dari req.params.id"
}
```

---

app.post("/createProduct", Controller.createProduct);

```
{
-name: "your name"
-description: "description"
-price: "price"
-imgUrl: "imgUrl"
-CategoryId: select ctegory 1 || 2, 1 for men & 2 for women
}
```

---

app.delete("/deleteProduct/:id", authorization, Controller.deleteProduct);

```
{
- dikirimkan angka dari params untuk mendelete berdasarkan angka data tersebut
}
```

---

app.get("/listProducts/:id", Controller.selectDetailProduct);

```
 {
  - dikirimkan angka dari params untuk mengambil berdasarkan angka data tersebut
 }
```

Response(200)

```
{
    "id": 1,
    "name": "Nike Air Force 1 '07",
    "description": "The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
    "price": 1379000,
    "imgUrl": "https://i.imgur.com/U7ElPT1.jpg",
    "CategoryId": 1,
    "AuthorId": 1,
    "status": "active",
    "createdAt": "2022-07-15T23:03:38.515Z",
    "updatedAt": "2022-07-15T23:03:38.515Z"
}
```

---

app.post("/pub/register", CustomerController.Register);

```
{
 - username : "your username"
- email: "your email"
- password: "your password"
- phoneNumber: "yout phone number"
- address: "your address"
}
```

---

app.post("/pub/login", CustomerController.Login);

```
{
- email: "your email"
- password: "your password"
}
```

Response(200)

```
{
    "access_token": "access_token",
    "username": "customer",
    "role": "Customer"
}
```

---

app.post("/pub/google-sign-in", CustomerController.googleSignIn);

```
{
  - access_token: dari headers
- client id: dari google yang dimasukkan di file .env
}
```

---

app.get("/pub/listProducts", CustomerController.getAll);

```
{}
```

Response(200)

```
[
    {
        "id": 1,
        "name": "Nike Air Force 1 '07",
        "description": "The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
        "price": 1379000,
        "imgUrl": "https://i.imgur.com/U7ElPT1.jpg",
        "CategoryId": 1,
        "AuthorId": 1,
        "status": "active",
        "createdAt": "2022-07-15T23:03:38.515Z",
        "updatedAt": "2022-07-15T23:03:38.515Z"
    },
    ...
]
```

---

app.post("/pub/addFavorite/:productId", CustomerController.AddFavorite);

```
{
    - dikirimkan angka dari params untuk add berdasarkan angka data tersebut
}
```

Response(201)

```
{
    "addFavorite": {
        "CustomerId": 2,
        "ProductId": 3,
        "updatedAt": "2022-07-18T01:47:27.136Z",
        "createdAt": "2022-07-18T01:47:27.136Z"
    }
}
```

---

app.get("/pub/listFavorite", CustomerController.ListFavorite);

```
in headers
{
   access_token: "your access token"
}
```

Response(200)

```
[
    {
        "CustomerId": 2,
        "ProductId": 3,
        "createdAt": "2022-07-15T23:24:48.379Z",
        "updatedAt": "2022-07-15T23:24:48.379Z",
        "Product": {
            "id": 3,
            "name": "Nike Air Zoom Infinity Tour NEXT% NRG",
            "description": "We listened to the feedback you had on the Infinity Tour, refined it and brought it to life on the Nike Air Zoom Infinity Tour NEXT%. We increased the overall volume to give your foot more room. We added 2 large Zoom Air units for even more energy transfer through your swing",
            "price": 2849000,
            "imgUrl": "https://i.imgur.com/MUpQ7x0.jpg",
            "CategoryId": 1,
            "AuthorId": 1,
            "status": "active",
            "createdAt": "2022-07-15T23:03:38.515Z",
            "updatedAt": "2022-07-15T23:03:38.515Z"
        }
    },
]
```

app.get("/pub/detailsProduct/:id", CustomerController.selectDetailProduct);

```
 {
  - dikirimkan angka dari params untuk mengambil berdasarkan angka data tersebut
 }
```

Response(200)

```
{
    "id": 1,
    "name": "Nike Air Force 1 '07",
    "description": "The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
    "price": 1379000,
    "imgUrl": "https://i.imgur.com/U7ElPT1.jpg",
    "CategoryId": 1,
    "AuthorId": 1,
    "status": "active",
    "createdAt": "2022-07-15T23:03:38.515Z",
    "updatedAt": "2022-07-15T23:03:38.515Z"
}
```
