from flask import Flask

def create_app():
    app = Flask(__name__)
    
    # Configuração da aplicação
    app.config.from_object('config.Config')
    
    # Registrar blueprints
    from .routes import main
    app.register_blueprint(main)
    
    return app
