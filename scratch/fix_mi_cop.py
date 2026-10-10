import os

def fix_micopropiedad():
    path = r'src/pages/MiCopropiedad.jsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The bad code:
    bad_code = """        const vis = await getVisitas()
        setVisitas(vis.results || vis)
        const vis = arguments[0][4] || []
        setVisitas(vis.results || vis)"""

    good_code = """        const vis = await getVisitas()
        setVisitas(vis.results || vis)"""
        
    content = content.replace(bad_code, good_code)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
fix_micopropiedad()
