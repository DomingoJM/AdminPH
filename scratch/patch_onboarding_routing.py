import os

def patch_onboarding_routing():
    path = r'src/pages/Onboarding.jsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    target_email = "navigate('/dashboard')"
    replacement_email = """if (role === 'admin') navigate('/admin-ph')
      else if (role === 'porteria') navigate('/porteria-ph')
      else navigate('/mi-copropiedad')"""
      
    target_google = "window.location.href = '/dashboard'"
    replacement_google = """if (role === 'admin') window.location.href = '/admin-ph'
      else if (role === 'porteria') window.location.href = '/porteria-ph'
      else window.location.href = '/mi-copropiedad'"""

    content = content.replace(target_email, replacement_email)
    content = content.replace(target_google, replacement_google)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
patch_onboarding_routing()
