from google_auth_oauthlib.flow import InstalledAppFlow
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
]

credentials_path = os.path.join(BASE_DIR, "credentials.json")
token_path = os.path.join(BASE_DIR, "token.json")

flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
creds = flow.run_local_server(port=0)

with open(token_path, "w") as f:
    f.write(creds.to_json())

print("token.json generado correctamente!")
