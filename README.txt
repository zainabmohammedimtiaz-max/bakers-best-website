BAKERS BEST — GITHUB PROJECT SETUP
==================================

PROJECT STRUCTURE
-----------------
index.html                         Home page and GitHub Pages entry point
bakers-best-core.css               Shared site styling
bakers-best-site.js                Shared site interactions
bakers-best-sponsors.html          Sponsors page
bakers-best-cake-studio.html       Build My Cake page
bakers-best-cake-studio.css        Cake-builder-only styling
bakers-best-cake-studio.js         Cake-builder-only interactions
bakers-best-rewards-club.html      Rewards & Loyalty page
images/                            Shared image assets

IMPORTANT: index.html is intentionally retained. GitHub Pages looks for an
index.html entry point in the published folder. It is the one generic filename
that should be treated as reserved for the homepage. Do not let teammates add
or overwrite another index.html in the repository root.

BRANCH PLAN
-----------
1. Create the GitHub repository with a README (or upload the MAIN folder first).
2. Put the contents of MAIN/ in the repository root and commit to main.
   This gives the repository a working home page.
3. Create your personal branch from main, for example:
      zizou/bakers-best-pages
   Replace "zizou" with your GitHub username if different.
4. Put the contents of YOUR-BRANCH/ into the repository root while on that
   branch. Commit and push the branch.
5. Open a pull request from your branch into main. Review the file list, then
   merge it. GitHub Pages will then publish the combined website from main.
6. Invite teammates as repository collaborators. Ask each teammate to create
   a branch from the latest main and use unique page and asset names.

GITHUB PAGES
------------
After the homepage is committed to main:
- Open the repository on GitHub.
- Go to Settings > Pages.
- Under Build and deployment, choose Deploy from a branch.
- Select main and /(root), then Save.
- After GitHub finishes publishing, the Pages URL will appear in Settings >
  Pages. The homepage is index.html.

TEAM FILE-NAMING RULE
---------------------
Do not create generic root files such as styles.css, script.js, about.html,
or another index.html. Use a unique project/person prefix, for example:
  bakers-best-<page-name>-<yourname>.html
  bakers-best-<page-name>-<yourname>.css
  bakers-best-<page-name>-<yourname>.js
Only shared integration files should be edited by agreement. Avoid renaming
or replacing shared assets without coordinating with the team.

LINKS
-----
The navigation contains links to pages planned for the wider team project
(products.html, team.html, workshops.html, contact.html). Those pages are not
included in this starter package. The four included pages and their assets
are linked locally and can be opened directly. Links to pages not yet created
will work once your teammates add those pages using the agreed filenames.

TEST LOCALLY
------------
Extract the ZIP and open index.html in a browser. For best results, use a
local development server (for example, VS Code Live Server) because it behaves
more like GitHub Pages.
