from flask import Flask, request, jsonify
from flask_restful import Api, Resource, marshal_with, fields
from config import db, app
from models import User, Order, Dessert, OrderDessert
from datetime import datetime

api = Api(app)

# Define marshal schemas
dessert_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'category': fields.String,
    'price': fields.Float,
#     'image': fields.String,
#     'thumbnail': fields.String,
#     'mobile': fields.String,
#     'tablet': fields.String,
#     'desktop': fields.String
 }

orders_fields = {
    'id': fields.Integer,
    'user_id': fields.String,
    'created_at': fields.String,
    'desserts': fields.List(fields.Nested(dessert_fields))
}

# Dessert Routes
class DessertsResource(Resource):
    @marshal_with(dessert_fields)
    def get(self):
        """ GET /desserts - Returns all desserts """
        desserts = Dessert.query.all()
        return desserts, 200

    def post(self):
        """ POST /desserts - Create a new dessert """
        data = request.get_json()

        if not all(k in data for k in ("name", "category", "price")):
            return jsonify({"message": "Missing required fields"}), 400

        new_dessert = Dessert(
            name=data.get('name'),
            category=data.get('category'),
            price=data.get('price'),
            image=data.get('image', {}),
            thumbnail=data.get('thumbnail', ''),
            mobile=data.get('mobile', ''),
            tablet=data.get('tablet', ''),
            desktop=data.get('desktop', '')
        )

        db.session.add(new_dessert)
        db.session.commit()
        return jsonify(new_dessert.to_dict()), 201

api.add_resource(DessertsResource, '/desserts')

class DessertByIDResource(Resource):
    @marshal_with(dessert_fields)
    def get(self, dessert_id):
        """ GET /desserts/<int:dessert_id> - Get a specific dessert by ID """
        dessert = Dessert.query.get_or_404(dessert_id)
        return dessert, 200

    def patch(self, dessert_id):
        """ PATCH /desserts/<int:dessert_id> - Update a dessert """
        dessert = Dessert.query.get_or_404(dessert_id)
        data = request.get_json()

        if 'name' in data:
            dessert.name = data['name']
        if 'category' in data:
            dessert.category = data['category']
        if 'price' in data:
            dessert.price = data['price']
        if 'image' in data:
            dessert.image = data['image']
        if 'thumbnail' in data:
            dessert.thumbnail = data['thumbnail']
        if 'mobile' in data:
            dessert.mobile = data['mobile']
        if 'tablet' in data:
            dessert.tablet = data['tablet']
        if 'desktop' in data:
            dessert.desktop = data['desktop']

        db.session.commit()
        return jsonify(dessert.to_dict()), 200

    def delete(self, dessert_id):
        """ DELETE /desserts/<int:dessert_id> - Delete a dessert """
        dessert = Dessert.query.get_or_404(dessert_id)
        db.session.delete(dessert)
        db.session.commit()
        return jsonify({'message': 'Dessert deleted successfully'}), 200

api.add_resource(DessertByIDResource, '/desserts/<int:dessert_id>')

# Order Routes
class OrdersResource(Resource):
    @marshal_with(orders_fields)
    def get(self):
        """ GET /orders - Returns all orders """
        orders = Order.query.all()
        for order in orders:
            order_desserts = OrderDessert.query.filter_by(order_id=order.id).all()
            order.desserts = [dessert.to_dict() for dessert in order_desserts]
        return orders, 200

    def post(self):
        """ POST /orders - Create a new order """
        data = request.get_json()

        if not all(k in data for k in ("user_id", "desserts")):
            return jsonify({"message": "Missing required fields"}), 400

        new_order = Order(
            user_id=data.get('user_id'),
            created_at=datetime.utcnow()
        )

        db.session.add(new_order)
        db.session.commit()

        for dessert_id in data.get('desserts', []):
            order_dessert = OrderDessert(order_id=new_order.id, dessert_id=dessert_id)
            db.session.add(order_dessert)

        db.session.commit()
        return jsonify(new_order.to_dict()), 201

api.add_resource(OrdersResource, '/orders')

class OrderByIDResource(Resource):
    @marshal_with(orders_fields)
    def get(self, order_id):
        """ GET /orders/<int:order_id> - Returns a specific order by ID """
        order = Order.query.get_or_404(order_id)
        order_desserts = OrderDessert.query.filter_by(order_id=order.id).all()
        order.desserts = [dessert.to_dict() for dessert in order_desserts]
        return order, 200

    def delete(self, order_id):
        """ DELETE /orders/<int:order_id> - Delete an order """
        order = Order.query.get_or_404(order_id)
        db.session.delete(order)
        db.session.commit()
        return jsonify({'message': 'Order deleted successfully'}), 200

api.add_resource(OrderByIDResource, '/orders/<int:order_id>')

# User Routes
class UsersResource(Resource):
    def get(self):
        """ GET /users - Returns all users """
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200

    def post(self):
        """ POST /users - Create a new user """
        data = request.get_json()

        if not all(k in data for k in ("username", "email")):
            return jsonify({"message": "Missing required fields"}), 400

        new_user = User(
            username=data.get('username'),
            email=data.get('email')
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

api.add_resource(UsersResource, '/users')

class UserByIDResource(Resource):
    def get(self, user_id):
        """ GET /users/<int:user_id> - Returns a specific user by ID """
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict()), 200

    def delete(self, user_id):
        """ DELETE /users/<int:user_id> - Delete a user """
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200

api.add_resource(UserByIDResource, '/users/<int:user_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)