# Description
Thanks team Insynk Studios,
I like the your website, and i am well aligned with the company ideology
 - I also like to be detail-oriented for whatever i build.

Here is my thought process while Completing this challenge
#### What are the steps you took to approach this assignment & How much time did you spend on each step?
A) Went through the whole requirements, understood the product, took the decision that i'll make it little bit
  challenging for myself as well, i will create backend along with frontend ( I know its not required but, but i love whatever i try to build...) ( Time taken - 30 mins.)

B) Next started with designing the product 
 1) Identified all the entities for which i have to store the data
   -  Users
   -  Expenses
   -  Categories

 2) Scrapped all the attributes from the product requirements for all these entities.
   -  Users
       - user_id,
       - email,
       - password,
       - first_name,
       - last_name

   -  Expenses
       - expense_id
       - amount,
       - date,
       - description,
       - type,
       - created_at
       - updated_at


   -  Categories
       - category_id,
       - name,
       - is_main,
       - created_at,
       - updated_at

 3) Identified relation between all the entities and defined the cadinality
     - user - expenses (1:M)
     - expenses - categories (M:1)
     - user - categories (1:M)
 

 4) Finalised the schema 

   ```sql
   create table user (
	user_id int auto_increment primary key,
    email varchar(100) not null,
    password varchar(100) not null,
    name varchar(40) not null
);

create table categories (
	category_id int auto_increment primary key,
    name varchar(50) not null,
    is_main bool default false,
	created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    user_id int not null,
    foreign key (user_id) references user(user_id),
    index user_idx (user_id)
);

create table expenses (
	expense_id int auto_increment primary key,
	amount decimal(10,2) not null,
    date date not null,
    description varchar(255),
    type enum('IN','OUT'),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    user_id int not null,
    category_id int not null,
    CHECK (amount >= 0),
    foreign key (user_id) references user(user_id),
    foreign key (category_id) references categories(category_id) on delete cascade,
    index user_idx (user_id)
);

   ```
  
#### - ( Time taken - 1:30 hrs - 2:00 hrs)


C) Next step was to create the rest apis satisfying all the requirements so i went through all the requirements and noted the required api endpoints.
   1) user 
     - user login 
     - user signup
     - user profile
   2) categories
     - category list
     - create category
     - update category
     - retrieve category
     - delete category
   3) expenses
     - list all expenses (grouped by months & monthly total expense)
     - create expense
     - update expense
     - delete expense
#### - ( Time taken - 30 mins )

D) Decided to go with Python Django Rest Framwork for creting quick apis 
  - Django project setup

```python
├── expense_tracker_backend/
│   ├── core/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── wsgi.py
│   │   └── urls.py
│   ├── users/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── categories/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── expenses/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
 ```
 - Created postgres database server locally and added connection to django project
 - Added djoser authentication layer for quick sign up & login flow
 - Created all the models as per the sql schema, using viewsets completed all the endpoints & api-routing.
#### - ( Time taken - 3:30 hrs - 4:00 hrs )

E) Again went through all the requirements & cross checked if all conditions are satisfying or not , i realised i have to explistly handle categories respective to user so added relation in 

- user - categories (1:M)

as well as updated categories schema with user foreign key.

One more challenge i can see was getting the monthly expenses for the user with respecive categories that they either spent or earned.

To tackle this issue i just have ordered the expenses based on expense date & in frontend i can do some transformation & calculate the commulative sum to get desired list.

Finally i have conclude the backend rest apis & secured the all endpoints so that only owner of the object can access the endpoints & objects that they have created.

In short Admin user will have access to all the endpoints. Users will have access to  only expenses & categories that they have created.

#### - ( Time taken - 3:00 hrs - 4:00 hrs )

F)  Now comes the exiting part creating frontend application and making all the functionality live
  - So i have started with the project scoffholding using create-react-app with typescript template 
  - Added eslint & pretier configurations folling good practise for the project
  - Created the basic client routing using react router v6 ( Followed docs as the router v6 is new to me )
  - Added axis interceptor to intercept request and response object so that i can do necessory client side logging and error handling
  - Created white-labels for all the routing headers at one place using constants file
  - Added toast messages to catch errors & success responses 

#### - ( Time taken - 2:00 hrs )

G) Next trageted user login & signup functionality , created basic forms & added api integrations and used local storage for storing the userdetails.

 - Now next part was once user logged in will redirect to expense tracker page where they have to create the category and add expense 
 - Created all the reusable components for category like Select component, Datepicker, Button Switch etc.. 
 - Category list functionality completed with api integrations 
 - Now all CRUD functionality added to the form

#### - ( Time taken - 4:00 hrs )

H) Next was expense tracker main crud functionality that has been added along with all the api integrations & group by monthly expense part was bit tricky but i have handled the ordering of the expense as per expense date in backend , then in frontend it was quiet easy to get it done in O(N) TC as we are only iteration number  of expenses times created by user. 

#### - ( Time taken - 3:00 hrs - 4:00 hrs )
 
I) This is Quiet challenging and part i have host backend and frontend as well handling all the issues like cors & firewalls.
 -  I decided to go ahead with vps server for backend & postgres db and for frontend  i have used vercel 
 - Created vps added ssh access with my local machine setup done for postgres 
 - Added backend project and created persistent server using gunicorn & nginx ( although im not well aware of both  i have followed digital ocean blogs to handel those )
 - Deployed project its up & running my vps ip , i have used cloudflare to handle all dns settings for domain hosting & created subdomain for backend apis separately 
 - Added ssl to backend subdomain on the deployed vps ip 
 - Now everything was running but i noticed one issue which was my static files like css for django projects was not getting served on while hitting apis getting (403 forbidden ) this was most challenging part i faced during whole process, as the solution was quiet simple but it ended up take more time that i expected.
 - The issue was i have added nginx configurations for serving the project on remote vps , but the main user group of nginx had not given privileges to access the static files this was good learning for me.
 - Finally deployed frontend part on vercel
 - Voila ...!!

 #### - ( Time taken - 4:00 hrs - 5:00 hrs )