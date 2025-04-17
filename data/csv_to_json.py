import csv
import json

csv_path = 'data/Contenedores_varios.csv'
json_path = 'data/contenedores.json'

with open(csv_path, encoding='utf-8') as f:
    reader = csv.reader(f, delimiter=';')
    data = []
    for row in reader:
        if len(row) < 13:
            continue  # skip incomplete lines
        try:
            item = {
                'tipo': row[1],
                'modelo': row[2],
                'cantidad': int(row[3]),
                'distrito': row[4],
                'barrio': row[5],
                'utm_x': float(row[7].replace(',', '.')),
                'utm_y': float(row[8].replace(',', '.')),
                'lon': float(row[9].replace(',', '.')),
                'lat': float(row[10].replace(',', '.')),
                'codigo': row[11],
                'direccion': row[12]
            }
            data.append(item)
        except Exception as e:
            print(f'Error en la fila: {row}\n{e}')

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print(f'Conversión completada. Total de registros: {len(data)}')
