# Web Development Project 3 - *Flashcards 2*

Submitted by: **Md Hossain**

This web app: **An interactive science flashcard application that tests users' knowledge across Physics, Chemistry, Biology, Earth Science, and Astronomy. Features a modern dark theme with floating science-themed particle animations, intelligent answer checking, progress tracking, and card shuffling capabilities.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The user can enter their guess into an input box *before* seeing the flipside of the card**
  - Application features a clearly labeled input box with a submit button where users can type in a guess
  - Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong ("Try again!" in red)
  -  Clicking on the submit button with a **correct** answer shows visual feedback that it is correct ("Correct!" in green)
- [x] **The user can navigate through an ordered list of cards**
  - A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - A previous/back button displayed on the card returns to the previous card in the set sequence when clicked
  - Both the next and back buttons have hover effects and visual feedback, preventing navigation beyond the first/last card

The following **optional** features are implemented:

- [x] **Users can use a shuffle button to randomize the order of the cards**
  - Cards remain in the same sequence unless the shuffle button is clicked 
  - Cards change to a random sequence once the shuffle button is clicked using Fisher-Yates shuffle algorithm
- [x] **A user's answer may be counted as correct even when it is slightly different from the target answer**
  - Answers are considered correct even if they only partially match the answer on the card 
  - Features include: ignoring uppercase/lowercase discrepancies, ignoring punctuation discrepancies, accepting multiple variations of answers
  - Examples: "H2O", "h2o", "H₂O" are all accepted for water; "carbon dioxide", "co2", "co₂" all work
- [ ] **A counter displays the user's current and longest streak of correct responses**
- [ ] **A user can mark a card that they have mastered and have it removed from the pool of displayed cards**

The following **additional** features are implemented:

* [x] **Professional Dark Theme**: Modern zinc-900 color scheme with gradient text effects
* [x] **Animated Science Particles**: Floating science-themed emojis (⚛️🧪🔬🧬⚗️🌡️💊🦠⭐) with random positioning and timing
* [x] **Progress Tracking**: Visual progress bar showing current position in the deck with "X of Y" counter
* [x] **Welcome Screen**: Engaging start page with gradient title and call-to-action button
* [x] **Difficulty Indicators**: Visual difficulty levels (Easy, Medium, Hard) displayed on cards
* [x] **Smart Answer Checking**: Intelligent matching with array of accepted answers per question
* [x] **Restart Functionality**: Ability to restart the entire session and reshuffle cards
* [x] **Visual Feedback**: Color-coded correct/incorrect responses with smooth transitions

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Features Breakdown

### Core Functionality
- **20 Science Questions** covering Physics, Chemistry, Biology, Earth Science, and Astronomy
- **Smart Answer Validation** with multiple accepted answer formats
- **Card Navigation** with previous/next buttons and visual feedback
- **Card Shuffling** using Fisher-Yates algorithm for true randomization
- **Progress Tracking** with visual progress bar and counter

### User Experience
- **Welcome Screen** with engaging introduction and science theme
- **Dark Professional Theme** with zinc-900 background and gradient text
- **Floating Particle Animation** with science-themed emojis
- **Smooth Transitions** and hover effects throughout the interface
- **Visual Feedback** for correct/incorrect answers
- **Responsive Design** that works on various screen sizes

### Technical Implementation
- **React Hooks** for state management (useState, useEffect, useRef)
- **CSS Animations** for particles, card flips, and transitions
- **Tailwind CSS** for styling and responsive design
- **Component Architecture** with reusable Flashcard and Guess components
- **Smart Answer Normalization** removing punctuation and case sensitivity

## Notes

### Challenges Encountered:
1. **Z-index Management**: Ensuring floating particles stayed in background while keeping interactive elements accessible
2. **Animation Timing**: Synchronizing particle animations to appear seamless and random
3. **Answer Validation**: Implementing flexible answer checking that accepts multiple correct formats
4. **State Management**: Coordinating flip state, guess validation, and card navigation across components
5. **Responsive Design**: Balancing visual appeal with functionality across different screen sizes

### Technical Decisions:
- Chose Fisher-Yates shuffle for true randomization over simple Math.random() sorting
- Implemented accepted answers array for each question to handle multiple valid responses
- Used CSS keyframes for smooth particle animations rather than JavaScript-based animation
- Applied modern color palette (zinc-900) for professional appearance while maintaining readability

## Technologies Used
- **React 18** with Vite build tool
- **Tailwind CSS** for styling and responsive design
- **CSS3** animations and keyframes
- **JavaScript ES6+** with modern React patterns
- **Component-based architecture** for modularity and reusability

## License

    Copyright 2024 Md Hossain

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.