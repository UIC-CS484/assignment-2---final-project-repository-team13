# TEAM'S MEMBERS:
```
Tru Nguyen, Marko Glamocak
```

## mission of the sites

```
The mission of the site is to let our users get the latest datas about the movies and see all movies that are trending at the exact moment, and also let the user 
feel that their voice matter to us by letting them interact/rate, like and watch the movie in which will get reflected back to them, so they can see that
which movies that they have liked or watched previously
```

## goal of the sites

```
To Attract and find as many users as it possibly could to come and enjoy the application and rate these movies to their opinion
```

## Team member roles

Tru Nguyen

```
My name is tru nguyen, i'm a senior in CS, and my responsibility and role for this project is mainly lies in the back-end service, where i have to construct the endpoints,
create database schema, I have to take care of the security when dealing with databases and api endpoints. I got to set-up connection to sqlite as well as passport services for the application, and CI/CD for the project
```

## API Interaction

This is the code where we retrieve the now playing movies from the third party API provider
```javascript
app.get('/movie/now_playing', requireLogin, async (req, res) => {
        let page = req.query.page ? req.query.page : 1;
        try {
            let result = await sendGET("/movie/now_playing", page);
            res.status(200).send(result.results);
        } catch (e) {
            res.status(404).send({ status: false})
        }
    })
```

This is the authentication code where user will be login into our website
with passport
```javascript
app.post('/api/login', ifNotLoggedIn, (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(404).send({success: false, error: 'User Not Found'})
            req.logIn(user, (err) => {
                if (err) return next(err)
                return res.status(200).send({success: true})
            })
        })(req, res, next)
    })
```

This is how users retrieve their action (like or watch) by doing a get to this particular endpoints
```javascript
app.get('/api/:action', requireLogin, async (req, res) => {
        const action = req.params.action
        const email = req.user.email

        let userId = undefined 

        // Get User Id
        try {
            let listUserId = await getUserIdByName(email)
            userId = listUserId[0]
        } catch (e) { console.log("get user id", e.message) }

        if (!userId) return res.status(404).send({status: false, message: `MovieID and UserId Not Found`})

        // Get List of movies according to user and user's action
        try {
            let result = await getMovieByAction(userId.userID, action)
            res.status(200).send(result)
        } catch (e) {
            console.log(e)
            res.status(404).send({status: false, message: e.message})
        }
    })
```


## TESTING STRATEDGY:

```
We will write tests after each feature we implement, to make sure that it is a functional feature, before moving on to other features. Testing code in smaller chunks is easier 
than testing the entire project at the end. It is easier to spot and fix a bug when your working with a smaller part of a program. Another reason we will be testing each 
feature as soon as we finish implementing it, is so that we can make sure that other features that are built on top of it are easier to debug. If one feature builds off of 
another feature and the first feature has some sort of bug, it just adds to the complexitity of trying to find the bug. The code is larger and more interconnected, making it 
harder to debug. We will also be automating our testing process. The first test we made in this assignment (In Endpoint.test.js) checks to see if a new user can create an 
account successfully and the second test checks to see if this new user can then login successfully after creating an account.
```

## ER Diagram of Database

```
Note: Bold word means that attributes is NOT NULL
```

![ERDiag.png](ERDiag.png)

## SORTING TABLE AND DATA:

```
The sorting table that we implemented in our project allows users to sort movies by "popularity rank", "title", "rating", and "number of people that rated the movie". When 
pressing on a category in the sortable table the movies are first sorted by highest to lowest value, and when the same category is pressed again the movies are sorted from 
lowest to highest values. For some categories, like rank, 1 is a higher value than 10 because 1 is a "higher ranking" on the ranking scale. For other categories 1 is a lower 
value than 10, like for rating, because 10 is a "higher rating" than 1 on the rating scale. A sortable table make it easy for users to find what they are really looking for. 
For example if a user wants to watch a movie that has the most amount of ratings, then they could simply click on the "Number of ratings" table header and the movie with the 
highest number of ratings would show up in the first row of the table. Not only does it make it easier for users to find what they are looking for based on category, but it 
makes it easier for users to compare movies. Comparing items using charts can be limited to 2 (2d chart) or sometimes 3 variables (3d chart). Sortable tables let you compare a 
lot more variables, than just 2 or 3. For example our sortable table has 4 which users can compare and interact with ("popularity rank", "title", "rating", and "number of 
people that rated the movie").
```

## Tools used

1. postman
2. insomnia
3. DB Browser for SQLite
5. adobe xd
6. discord
7. git
8. vscode
9. heroku CLI
10. docker

## Resources

https://coolors.co/191610-40434e-702632-912f40-fffffa
https://www.split.io/blog/node-js-continuous-deployment-jenkins-heroku/
https://docs.docker.com/get-started/

## Build With Docker

build image from docker file

```
docker build --tag final-project .
```

create and run container from image

```
docker run -d -p 3000:3000 final-project
```

## URL To Hosted App On Heroku

https://flix-project.herokuapp.com/

