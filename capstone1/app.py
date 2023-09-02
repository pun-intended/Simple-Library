from forms import LoginForm
from flask import Flask, redirect, render_template, request, flash
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.app_context().push()
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = ""
debug = DebugToolbarExtension(app)

app.route('/')
def landing_page():
    """redirect to user page, or login page"""
    return

app.route('/login')
def xxx():
    """Display login page if no user is logged in"""
    return

app.route('/signup')
def xxx():
    """Display signup page"""
    return

app.route('/user/pokemon')
def xxx():
    """Dispay all pokemon for logged in user"""
    return

app.route('/user/pokemon/details')
def xxx(id):
    """display details for specified pokemon"""
    return

app.route('/user/pokemon/add')
def xxx():
    """display form for adding pokemon to user's inventory"""
    return

app.route('/pokemon')
def xxx():
    """Display all pokemon"""
    return




"""
TODO
- set up basic views
- set up login
- set up database
- retrieve data from API
- set up templates
- search functionality - mirror fruit search
- 
"""