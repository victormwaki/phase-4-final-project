# server/seed.py

from faker import Faker
from config import app, db
from models import User, Order, Dessert, OrderDessert

fake = Faker()

def seed_data():
    print("Seeding database...")

    # Clear existing data (use with caution in production!)
    OrderDessert.query.delete()
    Order.query.delete()
    Dessert.query.delete()
    User.query.delete()

    # Create some users
    users = []
    for _ in range(5):
        user = User(
            username=fake.user_name(),
            email=fake.email()
        )
        db.session.add(user)
        users.append(user)

    # Create some desserts with images
    desserts = [
        Dessert(
            name='Waffle with Berries', 
            category='Waffle', 
            price=6.50,
            image={
                'thumbnail': '/static/images/image-waffle-thumbnail.jpg',
                'mobile': '/static/images/image-waffle-mobile.jpg',
                'tablet': '/static/images/image-waffle-tablet.jpg',
                'desktop': '/static/images/image-waffle-desktop.jpg'
            }
        ),
        Dessert(
            name='Vanilla Bean Crème Brûlée', 
            category='Crème Brûlée', 
            price=7.00,
            image={
                'thumbnail': '/static/images/image-creme-brulee-thumbnail.jpg',
                'mobile': '/static/images/image-creme-brulee-mobile.jpg',
                'tablet': '/static/images/image-creme-brulee-tablet.jpg',
                'desktop': '/static/images/image-creme-brulee-desktop.jpg'
            }
        ),
        Dessert(
            name='Macaron Mix of Five', 
            category='Macaron', 
            price=8.00,
            image={
                'thumbnail': '/static/images/image-macaron-thumbnail.jpg',
                'mobile': '/static/images/image-macaron-mobile.jpg',
                'tablet': '/static/images/image-macaron-tablet.jpg',
                'desktop': '/static/images/image-macaron-desktop.jpg'
            }
        ),
        Dessert(
            name='Classic Tiramisu', 
            category='Tiramisu', 
            price=5.50,
            image={
                'thumbnail': '/static/images/image-tiramisu-thumbnail.jpg',
                'mobile': '/static/images/image-tiramisu-mobile.jpg',
                'tablet': '/static/images/image-tiramisu-tablet.jpg',
                'desktop': '/static/images/image-tiramisu-desktop.jpg'
            }
        ),
        Dessert(
            name='Pistachio Baklava', 
            category='Baklava', 
            price=4.00,
            image={
                'thumbnail': '/static/images/image-baklava-thumbnail.jpg',
                'mobile': '/static/images/image-baklava-mobile.jpg',
                'tablet': '/static/images/image-baklava-tablet.jpg',
                'desktop': '/static/images/image-baklava-desktop.jpg'
            }
        ),
        Dessert(
            name='Lemon Meringue Pie', 
            category='Pie', 
            price=5.00,
            image={
                'thumbnail': '/static/images/image-meringue-thumbnail.jpg',
                'mobile': '/static/images/image-meringue-mobile.jpg',
                'tablet': '/static/images/image-meringue-tablet.jpg',
                'desktop': '/static/images/image-meringue-desktop.jpg'
            }
        ),
        Dessert(
            name='Red Velvet Cake', 
            category='Cake', 
            price=4.50,
            image={
                'thumbnail': '/static/images/image-cake-thumbnail.jpg',
                'mobile': '/static/images/image-cake-mobile.jpg',
                'tablet': '/static/images/image-cake-tablet.jpg',
                'desktop': '/static/images/image-cake-desktop.jpg'
            }
        ),
        Dessert(
            name='Salted Caramel Brownie', 
            category='Brownie', 
            price=4.50,
            image={
                'thumbnail': '/static/images/image-brownie-thumbnail.jpg',
                'mobile': '/static/images/image-brownie-mobile.jpg',
                'tablet': '/static/images/image-brownie-tablet.jpg',
                'desktop': '/static/images/image-brownie-desktop.jpg'
            }
        ),
        Dessert(
            name='Vanilla Panna Cotta', 
            category='Panna Cotta', 
            price=6.50,
            image={
                'thumbnail': '/static/images/image-panna-cotta-thumbnail.jpg',
                'mobile': '/static/images/image-panna-cotta-mobile.jpg',
                'tablet': '/static/images/image-panna-cotta-tablet.jpg',
                'desktop': '/static/images/image-panna-cotta-desktop.jpg'
            }
        )
    ]
    
    db.session.add_all(desserts)

    db.session.commit()

    # Create some orders, attach some desserts
    for _ in range(3):
        order = Order(user_id=fake.random_element(elements=[u.id for u in users]))
        db.session.add(order)
        db.session.commit()

        # For each new order, associate some random desserts
        dessert_sample = fake.random_elements(elements=desserts, length=2)
        for dessert in dessert_sample:
            od = OrderDessert(
                order_id=order.id,
                dessert_id=dessert.id,
                quantity=fake.random_int(min=1, max=5)
            )
            db.session.add(od)
        db.session.commit()

    print("Database seeded!")

if __name__ == '__main__':
    with app.app_context():
        seed_data()
