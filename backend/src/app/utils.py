import os
from app.models import Product, Category, Photo, Color, Address, User


def query_to_dict(query: str) -> dict:
    params = query.split("&")
    result = dict()
    for param in params:
        key, val = param.split("=", 2)
        vals = []
        if key in result:
            vals = result[key]
        vals.append(val)
        result[key] = vals
    return result


def product_to_json(product: Product, categories: dict, photos: dict, colors: dict) -> dict:
    result = dict()
    result["id"] = product.product_id
    result["seller"] = product.seller_id
    result["name"] = product.name
    result["description"] = product.product_description
    result["quantity"] = product.quantity
    result["total_price"] = product.total_price
    result["sale_type"] = product.sale_type
    result["photos"] = photos
    result["categories"] = categories
    result["colors"] = colors
    return result


def category_to_json(category: Category) -> dict:
    result = dict()
    result["id"] = category.category_id
    result["name"] = category.name
    return result


def color_to_json(color: Color) -> dict:
    result = dict()
    result["id"] = color.color_id
    result["name"] = color.name
    return result


def photo_to_json(photo: Photo) -> dict:
    result = dict()
    result["id"] = photo.photo_id
    result["url"] = photo.photo_url
    return result


def address_to_json(address: Address) -> dict:
    result = dict()
    result["id"] = address.address_id
    result["country"] = address.country
    result["region"] = address.region
    result["city"] = address.city
    result["postal_code"] = address.postal_code
    result["street"] = address.street
    result["building"] = address.building
    result["flat"] = address.flat
    result["latitude"] = address.latitude
    result["longitude"] = address.longitude
    return result


def user_to_json(user: User) -> dict:
    result = dict()
    result["id"] = user.user_id
    result["role"] = user.role_id
    result["address"] = user.address_id
    result["username"] = user.username
    result["email"] = user.email
    result["password"] = user.password
    return result
