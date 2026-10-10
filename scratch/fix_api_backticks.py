import os

def fix_api():
    path = r'src/services/api.js'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The bad code:
    bad_code1 = "export const emitirVoto = (votacionId, opcionId, unidadId) => fetchWithAuth(/api/v1/ph/votaciones/${votacionId}/emitir_voto/,"
    good_code1 = "export const emitirVoto = (votacionId, opcionId, unidadId) => fetchWithAuth(`/api/v1/ph/votaciones/${votacionId}/emitir_voto/`,"

    # Check for other backtick removals
    bad_code2 = "export const getActaBorrador = (asambleaId) => fetchWithAuthBlob(/api/v1/ph/asambleas/${asambleaId}/descargar_borrador_acta/)"
    good_code2 = "export const getActaBorrador = (asambleaId) => fetchWithAuthBlob(`/api/v1/ph/asambleas/${asambleaId}/descargar_borrador_acta/`)"

    content = content.replace(bad_code1, good_code1)
    content = content.replace(bad_code2, good_code2)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_api()
