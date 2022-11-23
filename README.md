# Crimimatch
Developed by Raquel Tejada and Pedro Suárez

| HTTP METHOD | URI PATH | DESCRIPTION | JSON |
| --- | --- | --- | --- |
| GET | / | Index page |  |
| GET | /auth/sign-up | Create user form | |
| POST | /auth/sing-up | Create user handler | |
| GET | /auth/log-in | Init session form | |
| POST | /auth/log-in | Init session handler | |
| POST | /auth/log-out | Exit session handler | --- |
| GET | /news/create | News create form |  |
| POST | /news/create | News create form handler |  |
| GET | /news/list | News list render |  |
| GET | /news/{id} | News details render |  |
| GET | /news/{id}/edit | Edit news form render |  |
| POST | /news/{id}/edit | Edit news form handler |  |
| POST | /news/{id}/delete | Delete new | |
| GET | /api/news | News list | ✔️|
| GET | /api/news/{id} | News details | ✔️ |
| GET | /news/{id}/create-comment | New comment form |  |
| POST | /news/{id}/create-comment | New comment handler |  |
| GET | /news/{id}/edit-comment | Edit comment form | |
| POST | /news/{id}/edit-comment | Edit comment handler | |
| POST | /news/{id}/delete-comment | Delete comment form  |  |


| GET | /wanted/api | Most wanted list render | |
| GET | /wanted/api/{id} | Criminal details render | |
| GET | /match | Get criminal match form render |  |
| POST | /match | Criminal match form handler |  |








