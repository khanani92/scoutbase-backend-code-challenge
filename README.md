# scoutbase-backend-code-challenge

Demo Link : 

A basic graphql implementation using apollo-express-server


## Mutation - createUser
```graphql
mutation createUser($username: String, $password: String) {
  createUser(username: $username, password: $password) {
    token
    user {
      id
      username
    }
  }
}
```

Do remember to pass query variables inside the graphql playground

```json
{
  "username": "usernameGoesHere",
  "password": "passwordGoesHere"
}
```

## Mutation - login
```graphql
mutation login($username: String, $password: String) {
  login(username: $username, password: $password) {
    token
    user {
      id
      usernamename
    }
  }
}
```

Do remember to pass query variables inside the graphql playground

```json
{
  "username": "usernameGoesHere",
  "password": "passwordGoesHere"
}
```

## Query - Movies
```graphql
{
  movies {
    title
    year
    rating
    actors {
      name
      birthday
      country
      directors {
        name
        birthday
        country
      }
    }
  }
}
```

## Authenticated users may request additional fields for the query used earlier.
New `scoutbase_rating` field will return a random string between 5.0-9.0

Pass the token that you got earlier while logging in or creating the user as below in HTTP Header in the graphql playground

```json
{
  "authorization":"authorizationtoken"
}
```


```graphql
{
  movies {
    scoutbase_rating
    title
    year
    rating
    actors {
      name
      birthday
      country
      directors {
        name
        birthday
        country
      }
    }
  }
}
```