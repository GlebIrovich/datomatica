from sqlalchemy.sql import select
from .db.schema import Users, UserTokens, Transactions, UserOperationStatus
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy import create_engine
from sqlalchemy import func 
from .settings import settings
from datetime import datetime 

# configure Session class with desired options
Session = sessionmaker()

# later, we create the engine
engine = create_engine(settings['postgresql'])

# associate it with our custom Session class
Session.configure(bind=engine)

def select_latest(user_id):
    session = Session()  
    try:
        # result = session.query(func.max(Transactions.date_created)).one_or_none()
        result = session.query(func.max(Transactions.date_created)).filter_by(user_id = user_id).one_or_none()
        result = result[0].strftime('%Y-%m-%dT%H:%M:%S')
        return result
    except NoResultFound: 
        session.rollback()
        return None
    except  AttributeError:
        session.rollback()
        return None
    finally:
        session.close()


def get_user_token(user_id):
    session = Session()  
    try:
        result = session.query(
                UserTokens.consumer_key,
                UserTokens.consumer_secret,
                UserTokens.url
            ).filter_by(user_id=user_id).one()
        return result._asdict()
    except NoResultFound:
        session.rollback()
        return None
    finally:
        session.close()

class UpdateStatus(object):
    def __init__(self, user_id):
        self.table = UserOperationStatus
        self.user_id = user_id
        self.session = Session()

    def update(self, status):
        try:
            self.session.query(self.table).filter(self.table.user_id == self.user_id).update({'status': status, 'updated_at': datetime.now()})
            self.session.commit()
        except NoResultFound:
            print('status update failed')
            self.session.rollback()
        finally:
            self.session.close()
        

class StoreTransactions(object):
    def __init__(self, user):
        self.user_id = user['user_id']

    def _change_total_to_float(self, transaction):
        transaction['total'] = float(transaction['total'])
        transaction['user_id'] = self.user_id
        return transaction

    def store(self, transactions):
        transactions = list(map(self._change_total_to_float, transactions))
        if len(transactions) > 0: 
            engine.execute(
                Transactions.__table__.insert(),
                transactions
            )
        else:
            print('data is synced')
