import os

def fix_onboarding_icon():
    path = r'src/pages/Onboarding.jsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace("KeySquare", "Key")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_onboarding_icon()
