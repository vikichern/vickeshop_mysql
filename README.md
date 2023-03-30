

* Description:
Interior design e-commerce.
For the back-end - the Django framework API and Simple JWT for handling user authentication and managing data and MySQL as database. 
On the front-end - React with Redux and TypeScript enable a dynamic and responsive user interface.  

* Technologies: 
Django, Django REST framewor, Simple JWT, React, Redux, TypeScript, MySQL.

* Running Instructions:
# Back-end adjustment:
1. `Clone the project from GitHub`:
      https://github.com/vikichern/vickeshop_sqlite.git
2. `Navigate to the back-end directory`: 
     cd Back-end
3. `Create virtual environment`:  
      py -m virtualenv myenv
4. `Activate the created virtual environment`:
      myenv\Scripts\activate
5. `Install the project dependencies`:
      pip install -r .\requirements.txt
6. `Apply the database migrations`:
      py manage.py migrate
7. `Run the back-end server`
      py manage.py runserver      

# Front-end adjustment:
1. `Open new terminal and navigate to the front-end directory`:
      cd .\Front-end\shop\
2. `Install the front-end dependencies`:
      npm install
3. `Run the front-end server`:
      npm start

* Admin & Staff
# In order to be able to access the admin panel of Django, note that you are in Back-end directory and create superuser as written:
  py manage.py createsuperuser

# To access the admin page of eshop, create superuser or log in with the following details:
  Username: admin
  Password: 123
 
# Contact 
victoriac555@gmail.com
https://github.com/vikichern
