import os

def patch_routes():
    path = r'src/main.jsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add imports
    if 'import SuperAdminPH' not in content:
        content = content.replace("import AdminPH from './pages/AdminPH'", "import AdminPH from './pages/AdminPH'\nimport SuperAdminPH from './pages/SuperAdminPH'\nimport PorteriaPH from './pages/PorteriaPH'")

    # Add Routes
    if '<Route path="/super-admin-ph" element={<SuperAdminPH />} />' not in content:
        target_route = '<Route path="/admin-ph" element={<AdminPH />} />'
        replacement = target_route + '\n              <Route path="/super-admin-ph" element={<SuperAdminPH />} />\n              <Route path="/porteria-ph" element={<PorteriaPH />} />'
        content = content.replace(target_route, replacement)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
patch_routes()
