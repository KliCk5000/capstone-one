# Mexican Spanish Quiz App
My first Capstone project while attending Thinkfull's Full Stack Flex Program.

## Programmer
Nick Dean

### Technologies Used
HTML, CSS, Javascript, Jquery
Visual Studio Code and Github

#### User experience requirements
The following requirements cover what the app must do, from the user's perspective.

- [x] The starting screen should have a button that users can click to start the quiz.
- [x] Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
- [x] Users should be asked questions 1 after the other.
- [x] Users should only be prompted with 1 question at a time.
- [x] Users should not be able to skip questions.
- [x] Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
Upon submitting an answer, users should:
- [x] receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
- [x] be moved onto the next question (or interact with an element to move on).
- [x] Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
- [x] Users should be able to start a new quiz.

#### Technical requirements
Your quiz app must:

- [x] Render answer choices in a <form>.
- [x] Use semantic HTML, along with CSS and jQuery.
- [x] Follow a11y best practices. Refer back to the lessons on accessibility and forms for help.
- [x] Use responsive design and be usable in 320px-wide viewports. Refer to this checklist for help.
- [x] Be fully usable by keyboard (which will be easy enough if you start with a form).

# Capstone UI/UX Checklist I: Responsiveness

As mentioned in [an earlier lesson](https://courses.thinkful.com/web-dev-001v1/assignment/1.6.1), one of the basic assumptions you’ll need to make as a modern web developer is that your users will be accessing your projects using a wide range of devices, with an even wider range of screen sizes. Before submitting your project, quickly go through this responsiveness checklist with your mentor to implement simple best practices to ensure your projects look and work great regardless of device screen size.

## In this project, I have (my student has)...

- [x] Mobile-first design - all main features and content are present on mobile view.
- [x] Used the [viewport meta tag](https://developers.google.com/speed/docs/insights/ConfigureViewport#overview) in the `<head>` section:
	`<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] Added [media queries for all standard devices](https://responsivedesign.is/develop/browser-feature-support/media-queries-for-common-device-breakpoints/):
	- [ ] Smart phone portrait
	- [ ] Smart phone landscape
	- [ ] Tablet portrait
	- [ ] Tablet landscape
- [ ] Written CSS rules for each media query (screen size) that optimize:
	- [ ] Text readability (e.g. font sizes easy to read without having to zoom in/out).
	- [ ] Image to screen ratio (e.g. image width/height defined by percentage of screen size).
	- [ ] Usability of UI (e.g. size and vertical spacing for clickable elements).
- [x] Used a [responsive CSS grid](https://github.com/Thinkful-Ed/responsive-grid-example-and-challenge/blob/solution/css/float-grid.css) to vertically reorganize any horizontal columns or boxes when user views on a mobile device.
- [ ] Avoided positioning any content or elements in a way that requires user to scroll horizontally or zoom in/out to view (excluding map data).
- [ ] Converted desktop horizontal nav menus to a drop down vertical menu on mobile view.
- [x] Used Chrome DevTools to simulate [common mobile device viewports](https://developers.google.com/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#viewport-controls) and confirmed that everything behaves as expected.
- [x] Tested the project on as many devices as possible to account for [the limitations of DevTools simulations](https://developers.google.com/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#limitations).