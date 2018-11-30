from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, ForeignKey, TIMESTAMP, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

Base = declarative_base()

#  id          | uuid
#  created_at  | timestamp with time zone
#  username    | character varying
#  password    | character varying
#  name        | character varying
#  last_name   | character varying
#  email       | character varying

class Users(Base):
    __tablename__ = 'users'

    id = Column(UUID, primary_key=True)
    created_at = Column(TIMESTAMP)
    username = Column(String)
    password = Column(String)
    name = Column(String)
    last_name = Column(String)
    email = Column(String)

    user_tokens = relationship("UserTokens", backref="users")
    transactions = relationship("Transactions", backref="users")

#  user_id         | uuid
#  consumer_secret | character varying
#  consumer_key    | character varying
#  url             | character varying
#  sync_date       | timestamp with time zone

class UserTokens(Base):
    __tablename__ = 'user_tokens'

    user_id = Column(ForeignKey('users.id'), primary_key=True)
    consumer_secret = Column(String)
    consumer_key = Column(String)
    url = Column(String)
    sync_date = Column(TIMESTAMP)

#  user_id         | uuid
#  consumer_secret | character varying
#  consumer_key    | character varying
#  url             | character varying
#  sync_date       | timestamp with time zone

class UserOperationStatus(Base):
    __tablename__ = 'user_operation_status'

    user_id = Column(ForeignKey('users.id'), primary_key=True)
    status = Column(String)
    updated_at = Column(TIMESTAMP)

# --------------+--------------------------
#  local_id     | integer
#  id           | integer
#  customer_id  | integer
#  date_created | timestamp with time zone
#  total        | integer
#  user_id      | uuid

class Transactions(Base):
    __tablename__ = 'transactions'
    local_id = Column(Integer,  primary_key=True)
    order_key = Column(String)
    customer_id = Column(Integer)
    date_created = Column(TIMESTAMP)
    total = Column(Integer)
    user_id = Column(ForeignKey('users.id'))