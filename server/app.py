from flask import Flask, request, jsonify
from flask_restful import Api, Resource, marshal_with
from config import db, app
from models import User, Order, Dessert, OrderDessert

api = Api(app)

# Dessert Routesfrom flask_restful import marshal_with
from flask_restful import fields

# Define a marshal schema to specify how to serialize the dessert object
dessert_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'category': fields.String,
    'price': fields.Float,
    'image': fields.String
}

class DessertsResource(Resource):
    @marshal_with(dessert_fields)
    def get(self):
        """ GET /desserts - Returns all desserts """
        desserts = Dessert.query.all()
        return desserts, 200  # No need to wrap this in jsonify()


    def post(self):
        """ POST /desserts - Create a new dessert """
        data = request.get_json()

        if not all(k in data for k in ("name", "category")):
            return jsonify({"message": "Missing required fields"}), 400

        new_dessert = Dessert(
            name=data.get('name'),
            category=data.get('category'),
            price=data.get('price', 0.0)
        )

        db.session.add(new_dessert)
        db.session.commit()
        return jsonify(new_dessert.to_dict()), 201

api.add_resource(DessertsResource, '/desserts')

class DessertByIDResource(Resource):
    def get(self, dessert_id):
        """ GET /desserts/<int:dessert_id> - Get a specific dessert by ID """
        dessert = Dessert.query.get_or_404(dessert_id)
        return jsonify(dessert.to_dict()), 200

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
orders_fields = {
    'id': fields.Integer,
    'user_id': fields.String,
    'created_at': fields.String,
    'desserts': fields.List(fields.Nested(dessert_fields))  # include desserts info
}

class OrdersResource(Resource):
    @marshal_with(orders_fields)
    def get(self):
        """ GET /orders - Returns all orders """
        orders = Order.query.all()  # Get all orders

        # Optionally, include the related desserts for each order
        for order in orders:
            order_desserts = OrderDessert.query.filter_by(order_id=order.id).all()
            order.desserts = [dessert.to_dict() for dessert in order_desserts]  # Add the desserts to the order

        return orders, 200  # Marshal the orders with the new fields


api.add_resource(OrdersResource, '/orders')

class OrderByIDResource(Resource):
    def get(self, order_id):
        """ GET /orders/<int:order_id> - Returns a specific order by ID """
        order = Order.query.get_or_404(order_id)
        return jsonify(order.to_dict()), 200

api.add_resource(OrderByIDResource, '/orders/<int:order_id>')

# User Routes
class UsersResource(Resource):
    def get(self):
        """ GET /users - Returns all users """
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200

api.add_resource(UsersResource, '/users')

class UserByIDResource(Resource):
    def get(self, user_id):
        """ GET /users/<int:user_id> - Returns a specific user by ID """
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict()), 200

api.add_resource(UserByIDResource, '/users/<int:user_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
