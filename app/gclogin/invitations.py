import random
import string

def generate_code():
    chars = string.digits + string.ascii_letters
    groups = [
        ''.join(random.choices(chars, k=4)),
        ''.join(random.choices(chars, k=4)),
        ''.join(random.choices(chars, k=4))
    ]    
    code = '-'.join(groups)
    return code