from app.models import Product, Category, Photo


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


def product_to_json(product: Product, categories: dict, photo: str) -> dict:
    result = dict()
    result["id"] = product.product_id
    result["seller"] = product.seller_id
    result["name"] = product.name
    result["description"] = product.product_description
    result["quantity"] = product.quantity
    result["total_price"] = product.total_price
    result["sale_type"] = product.sale_type
    result["photo"] = photo
    result["categories"] = categories
    return result


def category_to_json(category: Category) -> dict:
    result = dict()
    result["id"] = category.category_id
    result["name"] = category.name
    return result


def photo_to_json(photo: Photo) -> dict:
    result = dict()
    result["id"] = photo.photo_id
    result["url"] = photo.photo_url
    return result