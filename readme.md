Graphical Chat App
------------------
By Natasha Libera

official website: graphicalchat.app


How to run the project locally
------------------------------
* Be in the project's root folder at `/app`
* (If not already installed) Install three and mustache and vite:

    npm install --save three
    npm install --save mustache
    npm install --save-dev vite

* Run the 3D Project:

    npx vite

* Check out the page in a browser at: http://localhost:5173


Run the project locally, with Django Auth
-----------------------------------------
* (Needs Docker and Compose installed)
* Build the Vite project:

    npx vite build

* It should create the folder `/app/dist` which contains the bundled javascript and css, ready to serve.
* Run the Django project using Docker Compose:

    docker compose up -d

* This version of the website requires a user account to view the main app.
* Check out the website in a browser: http://localhost:8000


How to create a superuser account in django
-------------------------------------------
* You need a superuser account to use the pages at [site]/admin and [site]/djadmin .

    docker compose exec web python manage.py createsuperuser

    > You will be prompted for username, email, and password


How to invite users (such as yourself) to test the app
------------------------------------------------------
* Go to the website at: "[site]/admin
* Click the link "Invite Users"
* Type in an email address and submit the form.