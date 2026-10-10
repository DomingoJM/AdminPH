import os

def fix_porteria_icon():
    path = r'src/pages/PorteriaPH.jsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The bad code:
    content = content.replace("IdCard", "CreditCard")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_porteria_icon()
