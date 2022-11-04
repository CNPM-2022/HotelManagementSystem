Update in server by Quang
API change info user
PUT http://localhost:5000/api/user/636490c3f06ebbbb390c0984/change-info
Content-Type: application/json

{
"username": "quang",
"email": "quanghuynwtf@gmail.com",
"Name": "Nguyen Quang Huynh",
"CMND": "0123456789",
"address": "Ha Noi"
}

API change password user
PUT http://localhost:5000/api/user/636490c3f06ebbbb390c0984/change-password
Content-Type: application/json

{
"password": "123478",
"newPassword": "123456"
}
