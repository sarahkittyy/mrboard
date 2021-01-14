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

## TODO

- [ ] dev update page
- [ ] a person who beats their own time-- the old time gets archived, not deleted
- [ ] place to look at all users, and place to look at a specific user (and all their times)
- [ ] vuex optimizations to reduce queries
- [ ] a place to see all levels
- [ ] notes in the submit page to re-download all old levels
- [ ] cap the maximum amount of times on the homepage, and sort by recent
- [ ] testing the sorting of timestamps
- [ ] counting the number of WRs a player has
- [ ] more carousels on the homepage (most popular levels, best players, most recent #1 places)
