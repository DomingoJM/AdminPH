with open('src/services/api.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("fetchWithAuth(/api/v1/ph/visitas//registrar_ingreso/,", "fetchWithAuth(`/api/v1/ph/visitas/${id}/registrar_ingreso/`,")

with open('src/services/api.js', 'w', encoding='utf-8') as f:
    f.write(text)
