from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)

db.create_all()

@app.route('/auth/staff', methods=['POST'])
def staff_login():
    email = request.json['email']
    password = request.json['password']
    staff = User.query.filter_by(email=email, password=password, role='staff').first()
    if staff:
        return jsonify({'authenticated': True}), 200
    else:
        return jsonify({'authenticated': False}), 401

@app.route('/auth/customer', methods=['POST'])
def customer_login():
    email = request.json['email']
    password = request.json['password']
    customer = User.query.filter_by(email=email, password=password, role='customer').first()
    if customer:
        return jsonify({'authenticated': True}), 200
    else:
        return jsonify({'authenticated': False}), 401

if __name__ == '__main__':
    app.run()