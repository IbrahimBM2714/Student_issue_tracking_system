# Getting Started with Create React App

This is a project that was created using React and supabase. <br>
The styling was done using bootstrap components. 

<br>

This was a semester project for a web development class I took in my university years. The basic premise of this website is to serve as a portal where students can register their issues and have them displayed to the relevant authorities. This was a very basic learning project, so I didn't add any way of differentiating between different types of users as well as some other features.

<br>

I used supabase as the backend because that was our requirement. I've noticed that supabase pauses my projects when I haven't worked with them for some time. So to work around it, you can contact me to resume the project, or you can create your own supabase project. <br>
Your supabase project will have two tables: std_issues (I should have used a more professional name I know) and issue_comments. 
std_issues looks like this:
![image](https://github.com/IbrahimBM2714/student_issue_tracking_system/assets/115867055/cd54a969-e87b-4b39-b1a8-baec87891568)
<br>
Meanwhile, issue_comments looks like this: 
![image](https://github.com/IbrahimBM2714/student_issue_tracking_system/assets/115867055/7aef007e-d4f2-4693-9809-a30bc64a26c6)

issue_comments uses std_issues's id as foreign key. This is because the issue_comments table stores all the comments made by the relevant authorities. And to differentiate which comment was for which student, the foreign relationship is used.


<br> 

To run the project, you need to run npm i or npm install. This will install all the dependencies on your project. After which, you need to run npm start.
You might get an error that the bootstrap component is not found. To resolve this, simply run npm i bootstrap.
