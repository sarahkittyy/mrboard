# mrboard

site for community level leaderboards <3

## Setup

first, edit the .env file.

```
cp .env.example .env
vim .env
```

create ur own self-signed cert for local https dev

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

then launch vagrant ^^

```
vagrant up --provision-with deps,dev
```