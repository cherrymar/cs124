Todo:

Must
<!-- - Add priority rating -->
- Sorting by priority- name, creation date, priority
    - Date in light gray under 
    <!-- - Slider stars (like when you give reviews) -->

<!-- - Fix has hascompleted to fix delete all completed button -->


NTH
- Filter by priority
<!-- - fade out completed tasks -->
- text box to expand as we type 
- Align right buttons
- Fix button custom styling if possible
<!-- - fix return key accepts text -->
- fix return key accepts text when editing
<!-- - keep delete button on bottom of screen when long list -->
- make our own custom button
- when adding task, switch tabs from complete to all

# Lab 3

Interaction Design Lab 03

Cher Ma and Emily Chin

Fall 2021


View website here: https://cherrymar.github.io/cs124/

## Design Decisions
<!-- your design decisions, including their rationale (include images) -->

We went for a clean and minimalistic approach for the design. There is a text field 
at the top of the page, above any existing tasks. There is a placeholder "New Task" 
to indicate where the user can input. Next to the "New Task" field, there are also stars
that the user can select 0-3 of in order to indicate priority levels. Once there is 
text in the field, the "Add" button 
becomes enabled and the user can add the task to the list. This also prevents the user 
from accidentally adding an empty text field as a task. Each existing task is also put 
in a text field to be easily edited, along with the initial priority rating that can be 
edited as well, and has a trashcan next to it, as a simple indicator 
for deleting the task. We opted for an expandable text field so that the whole text can 
be displayed rather than a one liner that is 
difficult to scroll through. Each of the tasks also feature a checkbox to indicate 
completion and there is a button at the end of the list to delete all the completed
tasks. This button is disabled when there are no tasks that are completed. 
There is also a warning alert when the "Delete Completed" button is pressed to 
ensure that the user actually meant to press that button. Above all the exiting tasks, 
there are tabs that easily switch the views between all tasks, completed tasks, and tasks
that are not yet completed. Lastly, we also included a 
dropdown menu, so that the user can easily choose between three available sort options: 
date created, name of the task, and priority.

## Alternative Designs
<!-- alternative designs you considered, including images -->

We tried different paddings, margins, font sizes, and placements until we got the clean 
look we wanted that was balanced and easy to use. We also tried different text field 
and button styles. We also considered having three buttons instead of the dropdown menu, 
but we found that the dropdown was cleaner and looked better. We changed our text field 
components to text area components to allow for easy viewing of task descriptions. We 
started with our own components, but we ended up using several components from Material 
UI which gave our app a more cohesive and sophisticated look. 

We also considered having two dropdown menus for sorting and filtering, but we found that
that looked messy, so we opted to make one of them tabs. We also tried different placements
for the stars, such as below that task, but we found that putting them next to the task 
was clearer.

## User Testing
<!-- any user testing you did -->

We asked two people to test our app. Some issues they faced and some feedback for 
improvement include:
- unable to retrieve accidentally deleted tasks
- the style of the warning alert doesn't match the style of the rest of the app

On the other hand, some features that were easy to use and understand include:
- the underline under New Task that indicates the user can start typing
- editing existing tasks and priority levels
- deleting tasks
- delete all completed tasks
- sorting
- switching the filtered views




## Final Design
<!-- the final design, including screen images and the flow for each task. -->



### Designs
<!-- Bullet 1 -->
|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| <img width= "500" src="./react-starter/bullet1before.png"> | <img width= "500" src="./react-starter/bullet1during.png"> | <img width= "500" src="./react-starter/bullet1after.png"> |

|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
|Before: The screen starts with just the header, New Task field, blank star ratings, tab bar, dropdown menu, and disabled "Add". There is a disabled "Delete Completed" button on the bottm as well.| During: As the user is typing the new task, the "Add" button becomes active. | After: Once the user has added, the New Task field is cleared and the "Add" button is once again disabled. The new task is added into the task list below along with the selected priority. |

<!-- Bullet 2 -->
|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| <img width= "500" src="./react-starter/bullet1after.png"> | <img width= "500" src="./react-starter/bullet2during.png"> | <img width= "500" src="./react-starter/bullet2after.png"> |

|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
|Before: We start with a non empty list. The other features remain the same as the before version of the previous bullet. | During: The user starts typing the new task and the "Add" button is active. | After: We have an additional task added to the bottom of the task list. |

<!-- Bullet 3 -->
|                         |                         |
|:-----------------------:|:-----------------------:|
| <img width= "500" src="./react-starter/bullet3before.png"> | <img width= "500" src="./react-starter/bullet3after.png"> |

|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
|Before: We have a non empty list that includes the task "Call Mom".  | After: When the user clicks the checkbox, the box is checked (or unchecked if already checked). Since this was the first item in the list that was checked, doing so also enabled the "Delete Completed" button.|

<!-- Bullet 4 -->
|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| <img width= "500" src="./react-starter/bullet4before.png"> | <img width= "500" src="./react-starter/bullet4during.png"> | <img width= "500" src="./react-starter/bullet4after.png"> |

|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
|Before: We start with a non empty list with "Text John". | During: When the user clicks on the task, it focuses the textbox so that the user can edit the task description. | After: When the user clicks outside of the textbox, the task is updated with the new description "Text John about bank statements". |

<!-- Bullet 5 -->
|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| <img width= "500" src="./react-starter/bullet5before.png"> | <img width= "500" src="./react-starter/bullet5after.png"> |

|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
|Before: We start with a task list where some items are checked. | After: When the user selects "In Progress" from the tab bar, the list shows a filtered view of only tasks that have not been checked.|

<!-- Bullet 6 -->
|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| <img width= "500" src="./react-starter/bullet5before.png"> | <img width= "500" src="./react-starter/bullet6during.png"> | <img width= "500" src="./react-starter/bullet6after.png"> |

|                         |                        |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| Before: We start with a task list where some items are checked. | During: When the "Delete Completed" button is clicked, a modal alert warning shows up to make sure the user actually wants to delete all completed tasks before deleting. | After: When the user clicks the "Delete Completed" button, all checked tasks are deleted from the list. Then, the "Delete Completed" button is disabled once again. |

<!--  -->
|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| <img width= "500" src="./react-starter/bullet5before.png"> | <img width= "500" src="./react-starter/bullet6during.png"> | <img width= "500" src="./react-starter/bullet6after.png"> |

|                         |                        |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| Sort By: Date Created | Sort By: Name | Sort By: Priority |


<img width= "500" src="./react-starter/title_favicon.png">

We added a checklist icon as a logo and added a title on the brower window. 

## Challenges
<!-- challenges you faced -->

Some of the challenges we faced include trying to incorporate features from external 
react packages. It would take us several tries to find the right ones to use that 
would give us the look that we wanted. We also struggled with how to present the 
buttons (text vs an icon and text length) to make the buttons easy to understand and 
use. We also struggled to customize external packages to look and act the exact way we 
wanted to. 

We also struggled with saving the date created in a format that we could easily access
and displaying the list of tasks appropriately with the selected sort option and filter.

## Most Proud
<!-- parts of the design you're most proud of -->

We are proud of figuring out how to incorporate different icons and components from 
the react packages into our project. We are also proud of how userfriendly our app is. 
Overall, we believe this iteration of the app is much more visually pleasing than 
before. 

We also think that this new iteration of the app is clearer and the icons are aligned 
better. Another thing we are proud of is figuring out how to disable certain buttons that
shouldn't be used at times.