# Lab 1

Interaction Design Lab 01

Cher Ma and Emily Chin

Fall 2021


## Design Decisions
<!-- your design decisions, including their rationale (include images) -->

We went with a simple and user-friendly approach for the design. We added a textfield at the top so that users could easily find the add new task input box and add their task. The textfield has a placeholder "New Task", so the user knows exactly what it's for.  We also made each of the tasks in the list a textbox so that the tasks can be be editted. The buttons have descriptions that indicate their purpose. The trashcan icon is a simple and clean way to indicate that button is used for deleting a task.

## Alternative Designs
<!-- alternative designs you considered, including images -->

We considered using an underline to separate the title from the task list, but it did not look as clean. We ended up placing the title into a header box with a blue background. We also tried different paddings and margins for each of the elements until we found one we liked. 

## User Testing
<!-- any user testing you did -->

We plan to do user testing when we make the app more functional. 

## Final Design
<!-- the final design, including screen images and the flow for each task. -->

For the first bullet, the screen starts with just the header, footer, a textbox with placeholder "New Task" and an add button. Then, the user can add the text into the textbox and the final screen shows the added task as a bulletpoint with a checkbox. 

### Designs

| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |
|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|<img width="500" src="./images/bullet1before.png"> Before: The screen starts with just the header, footer, New Task textbox, and add button. |<img width="500" src="./images/bullet1during.png"> During: A user can start typing their task into the text box. |<img width="500" src="./images/bullet1after.png"> After: Once the user clicks the "+" button or presses enter, a new task is created and added to the list below. |
|<img width="500" src="./images/bullet1after.png"> Before: We start with a non empty list. |<img width="500" src="./images/bullet2during.png"> During: The user starts typing a new task to add. |<img width="500" src="./images/bullet2after.png"> After: Another task is added to the non-empty task list. |
|<img width="500" src="./images/bullet3before.png"> Before: We start with a non empty list with a task called "Call Mom". | NA |<img src="./images/bullet3after.png"> After: When the user clicks the checkbox, the box is checked (or unchecked if already checked). |
|<img width="500" src="./images/bullet4before.png"> Before: We start with a non empty list with "Test John". |<img width="500" src="./images/bullet1during.png"> During: When the user clicks on the task, it focuses the textbox so that the user can edit the task description. |<img width="500" src="./images/bullet4after.png"> After: When the user clicks outside of the textbox or presses enter, the task is updated with the new description. |
|<img width="500" src="./images/bullet5before.png"> Before: We start with a task list where some items are checked. | NA |<img width="500" src="./images/bullet5after.png"> After: When the user clicks the "View Incomplete" button, the list shows of filtered view of only tasks that have not been checked. |
|<img width="500" src="./images/bullet6before.png"> Before: We start with a task list where some items are checked. | NA |<img width="500" src="./images/bullet6after.png"> After: When the user clicks the "Delete All Completed" button, all checked tasks are deleted from the list. The "Delete All Completed" button becomes disabled until new tasks are checked. |


<!-- 
|                         |                         |                         |
|:-----------------------:|:-----------------------:|:-----------------------:|
| <img width= "500" src="./images/bullet1before.png"> | <img width= "500" src="./images/bullet1during.png"> | <img width= "500" src="./images/bullet1after.png"> |
|Before: The screen starts with just the header, footer, New Task textbox, and add button. | During: A user can start typing their task into the text box. | After: Once the user clicks the "+" button or presses enter, a new task is created and added to the list below. |
| <img src="./images/bullet1after.png"> | <img src="./images/bullet2during.png"> | <img src="./images/bullet2after.png"> |
| Before: We start with a non empty list. | During: The user starts typing a new task to add. | After: Another task is added to the non-empty task list. |
|<img src="./images/bullet3before.png"> Before: We start with a non empty list with a task called "Call Mom". | NA |<img src="./images/bullet3after.png"> After: When the user clicks the checkbox, the box is checked (or unchecked if already checked). |
|<img src="./images/bullet4before.png"> Before: We start with a non empty list with "Test John". |<img src="./images/bullet1during.png"> During: When the user clicks on the task, it focuses the textbox so that the user can edit the task description. |<img src="./images/bullet4after.png"> After: When the user clicks outside of the textbox or presses enter, the task is updated with the new description. |
|<img src="./images/bullet5before.png"> Before: We start with a task list where some items are checked. | NA |<img src="./images/bullet5after.png"> After: When the user clicks the "View Incomplete" button, the list shows of filtered view of only tasks that have not been checked. |
|<img src="./images/bullet6before.png"> Before: We start with a task list where some items are checked. | NA |<img src="./images/bullet6after.png"> After: When the user clicks the "Delete All Completed" button, all checked tasks are deleted from the list. The "Delete All Completed" button becomes disabled until new tasks are checked. | -->

## Challenges
<!-- challenges you faced -->

We wanted to remove the border of the texboxes when clicked, but setting the border to none did not work. We had to set outline to none as well. It took us a while to figure that out. We also struggled with making our app more aethetically pleasing. Although it is simple, it isn't quite as eye catching as some other task tracker apps. This is a significant issue, as mentioned in the reading, because more aesthetic apps make users feel like the app is easier to use. We also struggled with determining the text for the buttons, balancing the length of the description with how clear the instructions were. 

## Most Proud
<!-- parts of the design you're most proud of -->

We are proud of figuring out how to add a trashcan icon. We also feel like the overall flow is pretty straightforward, although user testing may prove otherwise. 
