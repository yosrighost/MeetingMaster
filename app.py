import os
import json
import logging
from datetime import datetime
from flask import Flask, render_template, request, flash, redirect, url_for, session

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "tunisian_street_food_secret")

# Load menu data from JSON file
def load_menu_data():
    try:
        with open('static/data/menu.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        logging.error(f"Error loading menu data: {e}")
        return {"categories": []}

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    menu_data = load_menu_data()
    return render_template('menu.html', menu=menu_data)

@app.route('/daily-menu')
def daily_menu():
    menu_data = load_menu_data()
    # Get today's day name
    today = datetime.now().strftime("%A").lower()
    # Filter items marked as daily special for today
    daily_specials = []
    
    for category in menu_data.get("categories", []):
        for item in category.get("items", []):
            if item.get("daily_special") == today:
                daily_specials.append({
                    "name": item.get("name"),
                    "description": item.get("description"),
                    "price": item.get("price"),
                    "category": category.get("name")
                })
    
    return render_template('daily_menu.html', daily_specials=daily_specials, today=today)

@app.route('/order', methods=['GET', 'POST'])
def order():
    menu_data = load_menu_data()
    
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone')
        email = request.form.get('email')
        address = request.form.get('address')
        items = request.form.getlist('order_items')
        notes = request.form.get('notes')
        
        # Basic validation
        if not name or not phone or not items:
            flash('Please fill in all required fields: Name, Phone, and at least one menu item', 'danger')
        else:
            # In a real app, you'd save this to a database
            # Here we just send a confirmation message
            flash('Merci! Your order has been received. We will contact you shortly!', 'success')
            return redirect(url_for('index'))
    
    return render_template('order.html', menu=menu_data)

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
