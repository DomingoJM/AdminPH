import os

def fix_encoding_issues(text):
    replacements = {
        'GestiÃ³n': 'Gestión',
        'GESTIÃ³N': 'GESTIÓN',
        'DirecciÃ³n': 'Dirección',
        'MENSAJERÃA': 'MENSAJERÍA',
        'MENSAJERÃa': 'MENSAJERÍA',
        'PorterÃ\xada': 'Portería',
        'GestiÃ³n': 'Gestión',
        'Ã¡': 'á',
        'Ã©': 'é',
        'Ã­': 'í',
        'Ã³': 'ó',
        'Ãº': 'ú',
        'Ã±': 'ñ',
        'Ã ': 'Á',
        'Ã‰': 'É',
        'Ã ': 'Í',
        'Ã“': 'Ó',
        'Ãš': 'Ú',
        'Ã‘': 'Ñ'
    }
    for bad, good in replacements.items():
        text = text.replace(bad, good)
    return text

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js') or file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = fix_encoding_issues(content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Fixed encoding in {filepath}')
