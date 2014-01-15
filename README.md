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

### Commiting to the project
We're going to be using [this](http://nvie.com/posts/a-successful-git-branching-model/)
workflow. When you want to implement a new feature, create a branch from dev:

    git branch your-branch-name dev

and commit only to your branch. When you're ready to merge your feature into the
deploy-ready project, create an **[informative](https://github.com/bitly/dablooms/pull/19)**
pull request, stating what you've managed to achieve or fix, and where your new
code would best fit in (is this a hotfix to be merged to master? A feature to be
merged to dev? A fix to a feature that has been merged to dev already?)

Do not, under any circumstances, work directly on dev or master. We want these
two branches to be deployable at any point in time. Any changes made on dev
or master that we haven't seen in a pull request will be immediately `` reset --hard ``,
and we'll ask you to make a pull request.

If any instructions are confusing, ask at the next dev team meeting, or in the
Google hangout.
