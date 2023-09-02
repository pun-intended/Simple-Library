from forms import LoginForm
from flask import Flask, redirect, render_template, request, flash, session, g
from flask_debugtoolbar import DebugToolbarExtension

from models import User, UserMon, Pokemon


app = Flask(__name__)
app.app_context().push()
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = ""
debug = DebugToolbarExtension(app)

CURR_USER_KEY = "curr_user"

@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""
    print(f"--------------inside add_user_to_g")
    if CURR_USER_KEY:
        print(CURR_USER_KEY)
        print(session)
    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])
        
    else:
        g.user = None

def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id


def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]

app.route('/', methods=["GET"])
def landing_page():
    """redirect to user page, or login page"""
    return redirect("/login")

app.route('/login', methods=["GET", "POST"])
def login():
    """Display login page if no user is logged in"""
    # render login form
    return render_template("login.html")

app.route('/signup', methods=["GET", "POST"])
def signup():
    """Display signup page"""
    # render signup form
    return render_template("signup.html")

app.route('/user/pokemon', methods=["GET"])
def display_user():
    """Dispay all pokemon for logged in user"""
    # show username
    # show cards for each mon
    return render_template("user.html")

app.route('/users/pokemon/edit', methods=["GET", "POST"])
def edit_pokemon():
    """Edit details for a user's pokemon"""
    return render_template('edit.html')

app.route('/user/pokemon/details', methods=["GET"])
def display_details(id):
    """display details for specified pokemon"""
    # display name, type and image of pokemon
    return render_template("details.html")

app.route('/user/pokemon/add', methods=["POST"])
def add_pokemon():
    """display form for adding pokemon to user's inventory"""
    # add pokemon to user inventory
    # redirect back to list of pokemon
    return redirect("/pokemon")

app.route('/pokemon', methods=["GET"])
def display_all():
    """Display all pokemon"""
    return render_template("pokemon.html")




"""
TODO
- set up basic views
- set up login
- set up database
- retrieve data from API
- set up templates
- search functionality - mirror fruit search
- sort by id/name/type (if implemented)

-------
Stretch
-- Add IVs
-- Add types
-- Add moves
"""