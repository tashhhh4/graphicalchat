Graphical Chat App
By Natasha Libera

official website: graphicalchat.app


The Workflow for developing the 3D App
--------------------------------------
Because the 3D app is essentially a completely separate program from the chatting app, there are actually three primary "environments" for the project.
Instead of the typical "django local develpoment server" -> "production server", instead it is like:

"npx vite development server" -> "django local development server" -> "production server"


* First you have to go into the folder "gcmain/static/game". This is where the Three.js -based project lives.
* Use a command to start the local server:

    npx vite

* This will run the javascript file using the temporary "index.html" page included in the same directory. This is a
  DIFFERENT index.html than the one that is used by the actual website. Its only job is to run this javascript file. So you
  will completely finish making all of the changes you want to the 3D world, then build the output, and THEN build other elements of
  the chat app on top of it using django.

* When done developing the "game" world, you run:

    npx vite build

* This generates the file "bundle.js" in the same directory. This will be the "final" version of the 3D app that runs underneath the standard
  HTML/CSS web app elements in our Django app. The name of the output file is configured in "vite.config.js" (also in the "game" directory).

* So now you run the django server (from the root of the project, the "/app" folder)

    docker compose up -d

    (Check the log stream while developing)

    docker compose logs -f web

* Then open a browser and go to "localhost:8000". The template defining the REAL index page for the website is at "gcmain/templates/gcmain/index.html"
* When done developing the django app, the project is then pushed using:

    git push

* Sometimes the workflow might fail, commonly this happens because I changed settings on the live server, and then "git pull" does not automatically work due
  to merge conflicts. In that case, I just go onto my server, copy the new versions of the configs I changed to my development code, delete the files on the server,
  and from the server, manually run `git pull` again, and restart the docker containers.

* The 3D assets are defined in a `<script>` tag on the index page for both the "JavaScript development version" and the "real django version" of the page.
  They are stored in the folder "app/assets" for development. Put a copy of the assets folder at "app/gcmain/static/gcmain/game/assets" to make the assets
  readable by the working version of the JavaScript program (since the npx server runs from that directory, it cannot go UP into the "assets" folder at the project's root.) The assets are not included in the repository, so their copyright is retained by myself or other artists that made them.

* For the production server, the assets are retrieved from an s3 storage bucket.