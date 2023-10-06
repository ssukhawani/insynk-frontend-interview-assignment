# Description
Thanks team Insynk Studios,
I like the your website, and i am well aligned with the company ideology
 - I also like to be detail-oriented for whatever i build.

Here is my thought process while Completing this challenge
## What are the steps you took to approach this assignment & How much time did you spend on each step?
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
    updated_at timestamp default current_timestamp on update current_timestamp
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
  
- ( Time taken - 1:30 hrs - 2:00 hrs)



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
- ( Time taken - 30 mins )

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
- ( Time taken - 3:30 hrs - 4:00 hrs )