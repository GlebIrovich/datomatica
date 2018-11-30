from sqlalchemy.sql import select
from .db.schema import Users, UserTokens, Transactions, UserOperationStatus
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy import create_engine, func
from sqlalchemy.exc import DataError
from .settings import settings
from datetime import datetime
import pandas as pd

# configure Session class with desired options
Session = sessionmaker()

# later, we create the engine
engine = create_engine(settings['postgresql'])

# associate it with our custom Session class
Session.configure(bind=engine)


def fetch_data(user_id, model):
    session = Session()
    try:
        SQLquery = session.query(model).filter_by(user_id = user_id)
        df = pd.read_sql(SQLquery.statement, session.bind)

        if df.empty:
            return None
        return df
    except DataError: 
        session.rollback()
        return None
    finally:
        session.close()

def delete_data(user_id, model):
    session = Session()
    try:
        result = session.query(model).filter_by(user_id = user_id).delete(synchronize_session=False)
        if result > 0 :
            session.commit()

        return result
    # except Exception: 
    #     session.rollback()
    #     return None
    finally:
        session.close()


    

# class UpdateStatus(object):
#     def __init__(self, user_id):
#         self.table = UserOperationStatus
#         self.user_id = user_id
#         self.session = Session()

#     def update(self, status):
#         try:
#             self.session.query(self.table).filter(self.table.user_id == self.user_id).update({'status': status, 'updated_at': datetime.now()})
#             self.session.commit()
#         except NoResultFound:
#             print('status update failed')
#             self.session.rollback()
#         finally:
#             self.session.close()
        
        

# class StoreResults(object):
#     def __init__(self, user):
#         self.user_id = user['user_id']

#     def _change_total_to_float(self, transaction):
#         transaction['total'] = float(transaction['total'])
#         transaction['user_id'] = self.user_id
#         return transaction

#     def store(self, transactions):
#         transactions = list(map(self._change_total_to_float, transactions))
#         if len(transactions) > 0: 
#             engine.execute(
#                 Transactions.__table__.insert(),
#                 transactions
#             )
#         else:
#             print('data is synced')
