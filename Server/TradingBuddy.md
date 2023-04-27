# Zetflix API Documentation

## Endpoints:

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login-with-google`
- `GET /get-all-companies-in-indonesia`
- `GET /get-us-stocks-news`
- `GET /get-id-business-news`

## POST users/register

### Description

- Create new user with role Admin  to system

### Request

- Body
  ```json
  {
    "username": "string",
    "email" : "string",
    "password" : "string",
    "phoneNumber" : "string",
    "address": "string"
  }
  ```

### Responses:

_201 - Created_

```json
{
  "id": "integer",
  "email": "string",
  "message": "User with email <user_email> and username <user_username> is succesfully registered"
}
```

_400 - Bad Request_

```json
{
  "message": "Username is required!" 
}
OR
{
  "message": "Username already exists, please use another username!"
}
OR
{
  "message": "Email is required!"
}
OR
{
  "message": "Email format is not valid!"
}
OR
{
  "message": "Email is already used, please use another email!"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password length min are 5 characters!"
}
```

## POST /login

### Description

- Log in to application using user's email and password

### Request

- Body
  ```json
  {
    "email" : "string",
    "password" : "string"
  }
  ```

### Responses:

_200 - OK_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "<user_username> is successfully logged in"
}
```

_(400 - Bad Request)_

```json
{
  "message": "Email is Required!"
}
OR
{
  "message": "Password is Required!"
}
```

_(401 - Unauthorized)_

```json
{
  "message": "Invalid email or password "
}
```

## POST /login-with-google

### Description

- Create User and Log in to application using user's google account(social media)

### Request

- Headers

```json
{
  "google_access_token": "<user_google_access_token>"
}
```

### Responses:

_200 - OK_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "<user_username> is successfully logged in"
}
```

_201 - Created_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "User with email <user_email> and username <user_username> is succesfully registered"
}
```

## GET /get-all-companies-in-indonesia

### Description

- Get all name and logo companies from Indonesia Stocks Market from GoAPI.id

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

### Responses:

_(200 - OK)_

```json
[
   {
        "ticker": "AALI",
        "name": "Astra Agro Lestari Tbk",
        "logo": "https://s3.goapi.id/logo/AALI.jpg"
    },
    {
        "ticker": "ABBA",
        "name": "Mahaka Media Tbk",
        "logo": "https://s3.goapi.id/logo/ABBA.jpg"
    },
    {
        "ticker": "ABDA",
        "name": "Asuransi Bina Dana Arta Tbk",
        "logo": "https://s3.goapi.id/logo/ABDA.jpg"
    },
    {
        "ticker": "ABMM",
        "name": "ABM Investama Tbk",
        "logo": "https://s3.goapi.id/logo/ABMM.jpg"
    },
    {
        "ticker": "ACES",
        "name": "Ace Hardware Indonesia Tbk",
        "logo": "https://s3.goapi.id/logo/ACES.jpg"
    },
    {
        "ticker": "ACST",
        "name": "PT Acset Indonusa Tbk.",
        "logo": "https://s3.goapi.id/logo/ACST.jpg"
    },
    {
        "ticker": "ADCP",
        "name": "PT Adhi Commuter Properti Tbk",
        "logo": "https://s3.goapi.id/logo/ADCP.jpg"
    },
    {
        "ticker": "ADES",
        "name": "Akasha Wira International Tbk  Tbk",
        "logo": "https://s3.goapi.id/logo/ADES.jpg"
    },
    ....
]
```

## GET /get-us-stocks-news

### Description

- Get all news related to one US company that listed in Stock Market

### Request:

- Headers

```json
{
  "access_token": "string"
}
```


- params

```json
{
  "symbol": "string"
}
```
### Responses:

_(200 - OK)_

```json
[
    {
        "title": "SHAREHOLDER ALERT: Levi & Korsinsky, LLP Notifies Investors of an Investigation into the Fairness of the Merger Between TravelCenters of America Inc. and BP Products North America Inc.",
        "desc": "/PRNewswire/ -- The following statement is being issued by Levi & Korsinsky, LLP: To All Persons or Entities who own TravelCenters of America Inc....",
        "imgUrl": "https://mma.prnewswire.com/media/1687309/LK_1920x1080_Logo.jpg?p=facebook",
        "createdAt": "Apr 6, 2023",
        "source": "prnewswire.com",
        "url": "https://www.prnewswire.com/news-releases/shareholder-alert-levi--korsinsky-llp-notifies-investors-of-an-investigation-into-the-fairness-of-the-merger-between-travelcenters-of-america-inc-and-bp-products-north-america-inc-301791141.html"
    },
    {
        "title": "SHAREHOLDER INVESTIGATION: Halper Sadeh LLC Investigates TA, SGEN, UNVR, USX",
        "desc": "/PRNewswire/ -- Halper Sadeh LLC, an investor rights law firm, is investigating the following companies for potential violations of the federal securities laws...",
        "imgUrl": "https://mma.prnewswire.com/media/1896150/Firm_Logo_with_Investor_Law_Firm_Logo.jpg?p=facebook",
        "createdAt": "Apr 5, 2023",
        "source": "prnewswire.com",
        "url": "https://www.prnewswire.com/news-releases/shareholder-investigation-halper-sadeh-llc-investigates-ta-sgen-unvr-usx-301790737.html"
    },
    ....
]
```

## GET /get-id-business-news

### Description

- Get all news related to business sector in Indonesia

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

### Responses:

_(200 - OK)_

```json
[
     {
        "title": "Wuling Hadirkan Promo Ramadan, Ada Diskon hingga Rp 6 Juta - Ramadan.Tempo.co",
        "createdAt": "Apr 5, 2023",
        "source": "Ramadan.Tempo.co",
        "url": "https://news.google.com/rss/articles/CBMiX2h0dHBzOi8vcmFtYWRhbi50ZW1wby5jby9yZWFkLzE3MTEzNDIvd3VsaW5nLWhhZGlya2FuLXByb21vLXJhbWFkYW4tYWRhLWRpc2tvbi1oaW5nZ2EtcnAtNi1qdXRh0gEA?oc=5"
    },
    {
        "title": "Ngeri! Aksi Jokowi Ini Berpotensi Jadi 'Malapetaka' Besar - CNBC Indonesia",
        "createdAt": "Apr 5, 2023",
        "source": "CNBC Indonesia",
        "url": "https://news.google.com/rss/articles/CBMicWh0dHBzOi8vd3d3LmNuYmNpbmRvbmVzaWEuY29tL25ld3MvMjAyMzA0MDUwOTUxMjMtNC00Mjc0NjMvbmdlcmktYWtzaS1qb2tvd2ktaW5pLWJlcnBvdGVuc2ktamFkaS1tYWxhcGV0YWthLWJlc2Fy0gF1aHR0cHM6Ly93d3cuY25iY2luZG9uZXNpYS5jb20vbmV3cy8yMDIzMDQwNTA5NTEyMy00LTQyNzQ2My9uZ2VyaS1ha3NpLWpva293aS1pbmktYmVycG90ZW5zaS1qYWRpLW1hbGFwZXRha2EtYmVzYXIvYW1w?oc=5"
    },
    {
        "title": "Harga Batu Bara Ambruk, Sahamnya di RI Loyo Lagi - CNBC Indonesia",
        "createdAt": "Apr 5, 2023",
        "source": "CNBC Indonesia",
        "url": "https://news.google.com/rss/articles/CBMibWh0dHBzOi8vd3d3LmNuYmNpbmRvbmVzaWEuY29tL21hcmtldC8yMDIzMDQwNTEwMTIxMC0xNy00Mjc0NzEvaGFyZ2EtYmF0dS1iYXJhLWFtYnJ1ay1zYWhhbW55YS1kaS1yaS1sb3lvLWxhZ2nSAXFodHRwczovL3d3dy5jbmJjaW5kb25lc2lhLmNvbS9tYXJrZXQvMjAyMzA0MDUxMDEyMTAtMTctNDI3NDcxL2hhcmdhLWJhdHUtYmFyYS1hbWJydWstc2FoYW1ueWEtZGktcmktbG95by1sYWdpL2FtcA?oc=5"
    },
    ....
]
```



## Global Error

### Responses:
_(500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_(401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}