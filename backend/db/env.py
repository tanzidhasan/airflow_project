from alembic import context

#new
from core.config import settings  
from db.base_class import Base


config = context.config


config.set_main_option("sqlalchemy.url",settings.DATABASE_URL)

target_metadata = Base.metadat