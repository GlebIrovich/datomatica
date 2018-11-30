# Deployment of the Datomatica web service the Heroku cloud hosting

## Set up

1) Clone git repository with the project.

```https://github.com/cookiehunter22/datomatica.git```

2) Create an account on [Heroku](https://www.heroku.com/home)

3) Create four applications on Heroku, one for each service(`falcon-fetcher`, `falcon-model`, `auth-backend`, and `webapp`).

## Configure Addons
1. Go to `auth-backend` application Heroku page and on the `Resources` add `Heroku Postrgres`
2. Go to `falcon-fetcher` application and add `Heroku Redis` on the `Resource` tab
3. Attach database created in the first one to `fetcher` and `model` instances. 
- In the root folder of the project type `heroku addons`, and find the name of the database associated with the auth-backend instance in the list. 
Run ```heroku addons:attach [NAME OF THE ADDON]  -a  [NAME OF THE AUTH INSTANCE]``` to attach db to the fetcher
- Run ```heroku addons:attach postgresql-clear-39531  -a  [NAME OF THE MODEL INSTANCE]``` to attach `Postgres` to the falcon-model instance
- In the Heroku account check, that services were correctly attached to the applications
4. In the webapp aplication, on the `Settings` tab add `ENV` variables:
- set `NODE_ENV`  to `production`
- `REACT_APP_AUTH_URL` to `[ URL OF YOUR AUTH BACKEND ]`
- `REACT_APP_RETURN_URL` to `[ URL OF THE WEBAPP ITSELF ]`
- Add React buildpack by providing an URL `mars/create-react-app` 

## Deployment
Folders alredy contain all required configurations, all you need to do is to add remotes and push services.

### Adding remotes
Remotes can be found on the application page, `Deploy` tab.

1. Add remote:

```heroku git:remote -a datomatica-auth-1```

2. Rename the remote

```git remote rename heroku [CHOOSE A NAME]```

Repeate these steps for every service (four times).

### Deploying to Heroku
To push services to Heroku we will use `git subtree`. It allows to push only subdirectories. Commands must be executed from the project root folder:

```git subtree push --prefix auth-backend [AUTH REMOTE NAME] master```

```git subtree push --prefix falcon-fetcher [AUTH REMOTE NAME] master```

```git subtree push --prefix falcon-model [AUTH REMOTE NAME] master```

```git subtree push --prefix webapp [AUTH REMOTE NAME] master```

After the deployment go to the falcon-fetcher application page. On the `Overview` tab make sure, that both processes, `web` and `celery worker` are turned `ON` (tumblers in the position `ON`)

Use the [demo store](http://datomatica.fvds.ru/) to check the application. Contact me to obtain the credentials.

For the demo application, please check: [Datomatica](https://datomatica-webapp.herokuapp.com/)