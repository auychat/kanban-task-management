# Frontend Mentor - Kanban task management web app solution created by chr-dev(Chatcharin Rangsisawat)

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)


### The challenge
Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar
- Toggle the theme between light/dark modes
- **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
- **Bonus**: Build this project as a full-stack application

### Screenshot
![](./screenshot.jpg)

### Links
- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process


### Built with
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [ReactHookForm](https://react-hook-form.com/) - For form validation
- [NextUi](https://nextui.org/) - For button and Theme mode toggle button
- [React-Beautiful-dnd](https://github.com/hello-pangea/dnd) - For drag and drop

### What I learned
While working on this Kanban task management web app challenge, I had the opportunity to learn and practice several key concepts and techniques:

- **React State Management:** I gained a deeper understanding of managing state in React. I used state to keep track of boards, columns, tasks, and their respective statuses, enabling a dynamic and interactive user interface.

- **Responsive Design:** Implementing a responsive design was crucial to ensure that the app looks and functions well on various screen sizes. I learned how to use media queries and adapt the layout and styling accordingly.

- **Form Validation:** I implemented form validation for creating and editing boards and tasks. This helped me ensure that users receive meaningful feedback when interacting with the app.

- **Drag-and-Drop Functionality:** One of the exciting features of this project was the ability to drag and drop tasks to change their status and reorder them within a column and between column. I learned how to implement this interactive feature using react-dnd libraries.

- **Local Storage:** To keep track of changes theme mode and hidesidebar value even after browser refresh, I explored using localStorage as a way to persist data locally. This allowed users to continue where they left off, enhancing the user experience.

- **Theme Switching:** Implementing a light/dark mode theme switcher was an interesting challenge. I learned how to toggle between different themes and apply corresponding styles.


### Continued development

**Full-Stack Development** I will create a back-end for this project to store user data, boards, and tasks in the database, solely for demonstration purposes in a full-stack environment, not intended for production.

## Author
- Frontend Mentor - [@auychat](https://www.frontendmentor.io/profile/auychat)
- Linkedin Profile - [@Chatcharin](https://www.linkedin.com/in/chatcharin-rangsisawat-9b42ba184/)
