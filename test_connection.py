import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Carrega as variáveis do arquivo .env
load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

if not url or not key:
    print("❌ Erro: As variáveis SUPABASE_URL e SUPABASE_KEY precisam estar configuradas no arquivo .env!")
else:
    try:
        # Inicializa o cliente Supabase
        supabase: Client = create_client(url, key)
        print("✅ Conexão inicializada com sucesso com o Supabase!")
        
        # Teste de comunicação simples
        # Obs: Certifique-se de ter ao menos uma tabela criada ou apenas verificar a resposta do cliente
        print("Servidor do Supabase alcançado:", url)
        
    except Exception as e:
        print("❌ Falha na conexão com o Supabase:", e)