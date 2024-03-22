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
* (If not already installed) Install three.js and vite:

    npm install --save three
    npm install --save-dev vite

* Run `npx vite`:

    npx vite

* Check out the page in a browser at: http://localhost:5173/game/index.html
* Make changes to the program at: `app/game/game.js`
* Add 3D files as needed by adding them to the folder `app/assets` and updating the list defined as a JavaScript Object inside
  the `<script>` tags in `app/game/index.html` and also add the asset names to `app/gcmain/templates/gcmain/index.html`
* Build the built version of the JavaScript program by running vite build:

    npx vite build

* That will create/update the file "bundle.js" at `app/gcmain/static/game/bundle.js`


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