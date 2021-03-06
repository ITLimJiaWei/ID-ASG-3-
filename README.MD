<h1>PokePlanner</h1>

Names: Lim Jia Wei, Chua Dong En<br>
Class: P01<br>
IDs: S10204971, S10202623 <br>
Website URL: https://itlimjiawei.github.io/ID-ASG-3-/<br>
Website Pitch URL: https://drive.google.com/file/d/1jbxDCzyHuaCtLXZGm7_vrSbY6TYMg1_W/view?usp=sharing<br>

<h2>Description</h2>

PokePlanner aims to allow users to track their habits and set goals for themselves all while having fun. This is done by gamifying the concept using images and data from PokeAPI as a vast amount of people recognize and find Pocket Monsters entertaining.

<h2>Update Table</h2>

Date        | Description                                               | Status
----------- | --------------------------------------------------------- | ------
10/2/2021   | Added signup and login function                           |  Done 
11/2/2021   | Added pokemon avatar api                                  |  Done 
12/2/2021   | Added functionality of removing/creating tasks            |  Done 
13/2/2021   | Finished selection.html and login.html                    |  Done
13/2/2021   | Made index.html,login.html and home.html fully responsive |  Done 
14/2/2021   | Finished base template of calendar.html                   |  Done 
15/2/2021   | Added Splash Screen                                       |  Done 
15/2/2021   | Added Date Tracking for tasks                             |  Done 
16/2/2021   | Added Modals, Todo Date fix                               |  Done 
17/2/2021   | Main Functionality of site is complete                    |  Done 
17/2/2021   | Functionality of calendar is complete                     |  Done 
18/2/2021   | UI is complete                                            |  Done 
19/2/2021   | Validated all pages                                       |  Done 
 



<h2>Design Process</h2>

<p>We utilized Adobe XD to plan out a wireframe at first as we felt it was important to communicate our ideas and concepts with each other even though a wireframe submission is not required this time around. Furthermore, communication is even more important in the creation of PokePlanner as we were split into front and back-end developers. While creating PokePlanner, we ensured each portion of code we were working on was responsive so we did not have to revisit them in the future when we should be validating our code.</p>

<h2>Features</h2>

1. Character Selection<br>
We intend to allow users to pick their character/avatar from 4 initial pokemon from PokeAPI as to allow for a greater degree of customization as they progress through our webiste. These characters 'evolve' at levels 10 and 20 similar to a Pokemon Evolution.

2. Tasks <br>
Since PokePlanner is a productivity website, tasks are crucial as it allows the user to keep track of their work and also gives them a sense of accomplishment when a task is finished. We utilized restDB to incorporate account authentication and to also keep track of all the user's tasks.

3. Shop <br>
Users can earn nuggets or in game currency after completing tasks, this can be used to purchase in game items like rare candy or custom rewards with prices set by users.

4. Gamification <br>
User has health level, experience level, as well as nuggets. User can also level up and evolve at level 10 and 20, at which point the pokemon avatar will also evovle accordingly.

5. Calendar <br>
The calendar feature showcases the due date of the to do tasks in a calendar format for easy viewing.

6. Skill Tree <br>
The Skill Tree feature references Information Technology diploma modules and the relevant skills taught in them. This encourages users as it rewards them when they pick up new skills.



<h3>Future Features</h3>

1. PokePlanner can be improved in some ways such as allowing the Skill Tree(PokeSkills) to be customizable and not only be limited to the four modules included in the current build of the website. Though, this would require extensive work both front and back-end.

2. An inventory could also be added to allow users to showcase their acquired items from the rewards/shop menu in home.html. 
   
3. Tasks sorted by date, date filter



<h2>Testing</h2>

<P> Testing is very important in all sorts of programming and especially in web development. Since our website could be deployed on a broad range of devices with varying resolutions, we tried our best to make it as responsive as possible. Furthermore, since PokePlanner relies on restDB and PokeAPI, it is crucial we test that the database, front-end and back-end are functioning correctly. We have put PokePlanner through various validators which are listed below to ensure users have an optimal experience.</p>

<h3>Online Validators Used</h3>

* W3C MarkUp Validation - https://validator.w3.org/
* W3C CSS Validation - https://jigsaw.w3.org/css-validator/
* W3C Link Checking - https://color.a11y.com/Contrast/
* Color Contrast Accessibility Validation
* Spell Checking - https://typosaur.us/
* Alt Text Checking - https://rushax.com/tools/alt-tag-checker/
* JSHint - https://jshint.com/


<h3>Devices and Resolutions Used</h3>

* XPS 13 9300 - 1920 x 1080
* XPS 13 9300 - 1920 x 1200


<h3>Browsers Used<h3>

* Google Chrome
* Microsoft Edge


<h3>Possible Problems</h3>

* PokeAPI had a daily rate limit of 300 requests per resource per IP address. We believe this is more than sufficient but it should be noted that if one was to consistently "spam" the GET requests by visiting the webpage many, many times a day, the limit may be hit causing certain images to not be initialized properly.

* RestDB is sometimes relatively slow to respond which may cause some GET, PATCH requests to be overriden if the user completes tasks in extremely quick succession which is highly unlikely but should be noted. Furthermore, if user redirects before the reqeust is completed, the request will be cancelled


<h2>Credits<h2>

<h3>Technologies Used</h3>

* HTML
* CSS
* Javascript
* jQuery
* Adobe XD 



<h3>APIs/Libraries Used</h3>

* PokeAPI - https://pokeapi.co/
* Popper.js - https://popper.js.org/
* Bootstrap - https://getbootstrap.com/
* RestDB - https://restdb.io/


<h3>Media</h3>

* Pokemon Image(index.html) - https://www.pngegg.com/en/png-wnowr/download
* Task Completion Sound - https://opengameart.org/content/completion-sound

<h2>Links</h2>

* FreePrivacyPolicy - https://app.freeprivacypolicy.com/<br>
* GoogleFonts(Roboto) - https://fonts.google.com/specimen/Roboto?query=roboto&sidebar.open=true&selection.family=Roboto<br>
* CSS Box Shadow Generator - https://html-css-js.com/css/generator/box-shadow/
* Calendar - https://codepen.io/oliviale/pen/QYqybo

<h2>Acknowledgements</h2>

<p>PokePlanner was inspired by Habitica - https://habitica.com/</p>


