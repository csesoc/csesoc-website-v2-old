csesoc-website-v2
=================

Lets remake the csesoc website

## Developer setup for Ubuntu
###Core packages
```
$ sudo apt-get install git pip sqlite3
```

###Setting up virtualenv
This is only necessay if you work on a lot of Python projects. It's mainly to deal with package dependencies. It's not completely necessary, but its a good habit.
```
$ sudo apt-get install virtualenv
$ virtualenv <environment_name>
$ . <environment_name>/bin/activate
```
You'll see in your terminal that it has \<environment_name\> at the start of the line

### Installing packages
Run the following
```
$ git clone git@github.com:csesoc/csesoc-website-v2.git
$ cd csesoc-website-v2
$ pip install -r requirements.txt
```

### Database Setup
The database for the website is stored in soc-website.db so we only need to run syncdb
```
$ python manage.py syncdb
```

### Serving static files
Mezzanine has some issues serving static files. To fix this, run the following
```
$ chmod +x static.sh && static.sh
```

### Running the server
To start the server, run
```
$ python manage.py runserver
```
Enjoy!
