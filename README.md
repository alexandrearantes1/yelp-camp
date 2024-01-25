# YelpCamp

The [YelpCamp](https://yelp-camp-ireland-f3576c498663.herokuapp.com/) is a fictitional yelp-like website for rating camping sites. 

This website was developed during The Web Developer Bootcamp course by Colt Steele, and while it's layout and functionality is based on the course's web app, I have implemented some additional features to improve user's and site administrator experience.

![Responsive Mockup](https://yelp-camp-ireland-f3576c498663.herokuapp.com/images/desktop.png)


## Project Goals

The goal of this project is to deliver a fully implemented and responsive front-end web application to help people find and share their experiences and pictures of camp sites they visit.

The site was designed to be intuitive, easy and quick to use, and to provide relevant and valuable information about each camp site along with it's location, pictures, comments and ratings from users.

## Target Audience

This web app was targeted to adventurous people and anyone considering going camping.

## Technologies

- HTML
  - The structure of the web app was developed using HTML5. 
- CSS
  - The layout was styled using CSS3. 
  - CSS variables were widely used to make it easy to change color scheme, animation curve, border thickness, etc.
- Javascript 
  - JavaScript ES6 was used to add interactivity to the app.
- Node JS
- IDE - Visual Studio Code
  - The app was developed using the latest version of Visual Studio Code (1.70.2).
- Git 
  - Used to backup and document the development process.
- GitHub
  - The source code is hosted on GitHub and deployed using GitHub Pages.

### Accessibility

- All form elements contain labels and / or aria-labels to be read out by screen readers. 
- Color contrasts meet the minimum contrast ratio indicated by the Lighthouse from the devtools.
- Semantic HTML was used to create the structure of the website.
- All non-textual elements relevant to users contain aria-label to ensure screen readers are effective. 
- HTML page lang attribute is set to "en".

### Unfixed Bugs
- If percentages have more than 4 digits before the decimal place, the space designated for the percentage box starts to blow up and can generate odd layout issues. It is unlikely to occur on a realistic scenario, but this issue will be addressed in a future release.

## Deployment

### Version Control

The web app was created using Virtual Studio Code IDE and pushed to the remote repository 'yelp-camp'.

The following git commands were used throughout the development of the app:

```git add <file>``` - This command was used to add the files to the staging area before they are committed.

```git commit -m "commit message"``` - This command was used to commit changes to the local repository. 

```git push``` - This command was used to push the commits to the remote repository on GitHub. 

```git pull``` - This command was used to update local files before pushing new commits, which was necessary because I was editing the README.md file directly on GitHub website. 

### Clone the Repository Code Locally
1. Navigate to the [Yelp Camp Repository](https://github.com/alexandrearantes1/yelp-camp).
2. Click on the code drop down button
3. Click on HTTPS
4. Copy the repository link to the clipboard
5. Open your IDE of choice (git must be installed for the next steps)
6. Type git clone copied-git-url into the IDE terminal
7. The project will now of been cloned on your local machine for use.


## Credits

- This website design and general functionality is based on the final project of Colt Steele's Full Stack Web Development course on Udemy.
