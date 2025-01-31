from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy import Column, JSON

# OrderDessert model for many-to-many relationship between Orders and Desserts
class OrderDessert(db.Model):
    __tablename__ = 'order_desserts'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    dessert_id = db.Column(db.Integer, db.ForeignKey('desserts.id'))
    
    # Relationships
    order = db.relationship('Order', backref='order_desserts')
    dessert = db.relationship('Dessert', backref='order_desserts')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Modify serialize_rules to avoid recursion on orders
    serialize_rules = ('-orders.user',)  # Avoid serializing the user in orders

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    # One-to-many: a User can have many Orders
    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='orders')
    order_desserts = db.relationship('OrderDessert', back_populates='order', cascade='all, delete-orphan')
    desserts = db.relationship('Dessert', secondary='order_desserts', back_populates='orders')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'desserts': [dessert.to_dict() for dessert in self.desserts]  # Include desserts
        }

class Dessert(db.Model, SerializerMixin):
    __tablename__ = 'desserts'

    serialize_rules = ('-order_desserts.dessert', '-orders.desserts')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = Column(JSON, nullable=True)  # Storing image paths as JSON

    # e.g. store image paths as JSON or separate columns
    thumbnail = db.Column(db.String)
    mobile = db.Column(db.String)
    tablet = db.Column(db.String)
    desktop = db.Column(db.String)

    # Relationship to order_desserts
    order_desserts = db.relationship('OrderDessert', back_populates='dessert')

    # Many-to-many with Order through OrderDessert
    orders = db.relationship('Order', secondary='order_desserts', back_populates='desserts', overlaps="order_desserts")

    def to_dict(self):
        """Custom serialization method for Desserts."""
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'price': self.price,
            'image': self.image,
            'thumbnail': self.thumbnail,
            'mobile': self.mobile,
            'tablet': self.tablet,
            'desktop': self.desktop,
        }