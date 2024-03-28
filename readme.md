Graphical Chat App
By Natasha Libera

official website: graphicalchat.app


The Workflow for developing the 3D App
--------------------------------------
Because the 3D app is essentially a completely separate program from the chatting app, there are actually three primary "environments" for the project.
Instead of the typical "django local develpoment server" -> "production server", instead it is like:

"npx vite development server" -> "django local development server" -> "production server"


How to develop the JavaScript-based Graphics App
------------------------------------------------
* Go to the "game" folder at `/app/game`
* (If not already installed) Install three.js and vite and html:

    npm install --save three
    npm install --save-dev vite
    npm install --save-dev vite-plugin-html

* Run `npx vite`:

    npx vite

* Check out the page in a browser at: http://localhost:5173/game/index.html
* Make changes to the program at: `app/game/game.js`
* Add 3D files as needed by adding them to the folder `app/assets` and updating the list defined as a JavaScript Object inside
  the `<script>` tags in `app/game/index.html` and also add the asset names to `app/gcmain/templates/gcmain/index.html`
* Build the built version of the JavaScript program by running vite build:

    npx vite build

* That will create/update the file "bundle.js" at `app/gcmain/static/game/bundle.js`

    Creating a test page besides the main app (i.e. graphicalchat.app/debug)

    There is only one output flow in the file "vite.config.js". When the server is run with "npx vite", it only shows whatever is in
    "index.html". In order to make a temporary test page, you have to stash the changes in "index.html" in the "game-entrypoint" folder. Then
    replace the contents of index.html with, for example, a script tag that loads a test script.

    Then change `vite.config.js`. Add a subfolder to the output directory (i.e. `gcmain/static/game/debug`), and change the name of the output,
    so that existing builds of your main program won't be overwritten. After that, you have to manually copy the html file to the directory
    `gcmain/templates/gcmain`. Add `{% load static %}` to the template and replace the links to js and css files with django static tags linking
    to the files in the output folder. Then create a new view and url pattern for the new test page.


How to develop the Django app (handles auth, chat, user save data, and friends list):
-------------------------------------------------------------------------------------
* Go into the project's root folder `/app`
* Run:

    docker compose up -d

* (Check the server output while developing):

    docker compose logs -f web

* Then open a browser and go to "localhost:8000".
* The template that defines what is shown at the domain's root is at: `app/gcmain/templates/gcmain/index.html`
* Commit and push changes:

    git add *
    git commit -m "Cool commit message"
    git push

** The workflow updates the server code using `git pull`. Therefore it will sometimes fail due to merge conflicts
   if any files on the server were changed (such as when tweaking the settings to get them just right). In these
   cases, just make sure your local project reflects the most recent updates, delete the conflicting files on the
   server, and then manually run `git pull` and `docker-compose -f docker-compose-prod.yml down` and
   `docker-compose -f docker-compose-prod.yml up -d` on the server.


How to create a superuser account in django
-------------------------------------------
* be in the same directory that the docker-compose file is located at.

    docker compose exec web python manage.py createsuperuser

    > You will be prompted for username, email, and password


How to invite users to test the app
-----------------------------------
* Go to the website at: "[localhost:8000/graphicalchat.app]/admin
* Click the link "Invite Users"
* Type in an email address and Submit the form.