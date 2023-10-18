<div align="center">
    <a href="https://www.umpisa.co/">
        <img src="https://rdblobprod.blob.core.windows.net/prod/custom/company-photo/original/phpM6Pklz-607c73530cd89.png" width="128px" />
    </a>
    <h1>Software Engineer Exam</h1>
    <p align="center">
        <p>Jonathan Esparas | October 2023 </p>
    </p>
</div>

<hr>

# App Feature
1. Login
   1. *JWT*
2. Registration
3. Dashboard (_Graph not YET working_)
4. Customer
   1. *List*
   2. *Add*
   3. *Edit*
   4. *Delete*
5. Logout

<hr>

# Getting started

```
🚀 Prerequisite: Docker
```

#### Step 1: Clone the repository
   - Open the Powershell (or Terminal) and paste the following command/s
```bash
git clone https://github.com/natesparas/umpisa-exam.git
```

```bash
cd umpisa-exam
```


#### Step 2: Run the following command/s
```bash
docker-compose up --build
```

#### Step 3: Accessing the app
*Client* : [http://localhost:5173/login](http://localhost:5173/login)

<hr>


# API Specification
To test the REST API, you may use **Postman** or any tool to that you prefer. ⭐️

:exclamation: **BASE URL :** `http://localhost:8085/login`

## Login ⭐️

#### Request
| Endpoint | Method | Body/Parameter |
| :--- | :--- | :--- |
| `/login` | `POST` | ```{ "email": "123","password": "123" }``` |



## Registration ⭐️
#### Request
| Endpoint | Method | Body/Parameter |
| :--- | :--- | :--- |
| `/register` | `POST` | ```{ "firstname": "Juan","lastname":"Dela Cruz","email":"juan@gmail.com","password":"juan" }``` |



## Customer ⭐️
#### Request
| Endpoint | Method | Body/Parameter |
| :--- | :--- | :--- |
| `/customer` | `POST` | ```{"name":"Jonathan234567891011","address":"Paranaque","contactno":"123"}``` |
| `/customer` | `GET` |  |
| `/customer` | `POST` | ```{"id":"1","name":"Jonathan234567891011","address":"Paranaque","contactno":"123"}``` |
| `/customer/:id` | `DELETE` | ```1``` |



## Logout ⭐️
#### Request
| Endpoint | Method | Body/Parameter |
| :--- | :--- | :--- |
| `/logout` | `POST` |  |

<hr>


# Technical Specification
1. Tools
   1. ***Docker*** - Containerization
   2. ***Git*** - Version Control
   3. ***Github*** - Code Repository
   4. ***VSCode*** - Text Editor
   5. ***Postman*** - API Testing
2. Frontend
   1. ***ReactJS***
   2. ***Redux***  - State management
   3. ***Vite*** - For building fast and optimized web applications

3. Backend
   1. ***ExpressJS*** - Node
   2. ***JWT*** - Authentication

4. Database
   1. ***MongoDB*** - NoSQL
   
<br>

#### Schema
##### *User*
| Name | DataType | Unique | Required |
| :--- | :--- | :--- | :--- |
| `firstname` | `String` |  |  |
| `lastname` | `String` |  |  |
| `email` | `String` | `True` | `Yes` |
| `password` | `String` |  | `Yes` |

##### *Customer*
| Name | DataType | Unique | Required |
| :--- | :--- | :--- | :--- |
| `name` | `String` | `True` | `Yes` |
| `address` | `String` |  |  |
| `contactno` | `String` |  |  |


